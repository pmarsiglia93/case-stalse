import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'heroverse:language';
export const languages = { PT: 'pt-BR', EN: 'en-US' };

const messages = {
  'pt-BR': {
    'nav.home': 'Home', 'nav.movies': 'Filmes', 'nav.marvel': 'Marvel', 'nav.dc': 'DC', 'nav.myList': 'Minha Lista',
    'nav.explore': 'Explorar', 'nav.caption': 'Cinema de super-heróis, em um só universo.', 'nav.search': 'Buscar',
    'nav.openSearch': 'Abrir busca', 'nav.openMenu': 'Abrir menu', 'nav.closeMenu': 'Fechar menu', 'nav.primary': 'Navegação principal',
    'language.label': 'Idioma', 'language.pt': 'PT', 'language.en': 'EN', 'skip': 'Pular para o conteúdo',
    'hero.featured': 'Filmes em destaque', 'hero.info': 'Informações do filme', 'hero.select': 'Selecionar destaque',
    'hero.details': 'Ver detalhes', 'hero.myList': 'Minha lista', 'hero.inList': 'Na minha lista', 'hero.previous': 'Destaque anterior',
    'hero.next': 'Próximo destaque', 'hero.pause': 'Pausar destaques', 'hero.resume': 'Continuar destaques',
    'hero.tt4154796.eyebrow': 'Destaque da semana', 'hero.tt1877830.eyebrow': 'Universo DC', 'hero.tt10872600.eyebrow': 'Favorito dos fãs',
    'hero.tt4154796.description': 'Os heróis restantes se unem para restaurar o universo e enfrentar uma última batalha.',
    'hero.tt1877830.description': 'Uma investigação sombria leva Batman ao coração da corrupção de Gotham.',
    'hero.tt10872600.description': 'Peter Parker enfrenta ameaças de outros universos e redefine o que significa ser um herói.',
    'common.explore': 'Explore', 'common.seeAll': 'Ver todos', 'common.movie': 'Filme', 'common.series': 'Série',
    'common.loadingMovies': 'Carregando filmes', 'common.posterUnavailable': 'Poster indisponível',
    'common.detailsOf': 'Ver detalhes de {title}', 'common.addToList': 'Adicionar {title} à minha lista', 'common.removeFromList': 'Remover {title} da minha lista',
    'collection.featured.title': 'Em destaque', 'collection.featured.description': 'Histórias essenciais para começar sua maratona.',
    'collection.marvel.title': 'Universo Marvel', 'collection.marvel.description': 'Dos clássicos ao MCU, X-Men, Spider-Verse e Sony/Marvel.',
    'collection.dc.title': 'Universo DC', 'collection.dc.description': 'Lendas de Gotham, Metrópolis, DCEU, DCU e Elseworlds.',
    'collection.others.title': 'Além de Marvel e DC', 'collection.others.description': 'Quadrinhos independentes, heróis originais, animações e cinema internacional.',
    'collection.unavailable': 'Esta coleção não está disponível agora.',
    'catalog.movies.eyebrow': 'Acervo HeroVerse', 'catalog.movies.title': 'A história dos super-heróis no cinema',
    'catalog.movies.description': 'Explore clássicos, universos compartilhados, adaptações independentes, animações e produções internacionais.',
    'catalog.marvel.eyebrow': 'Universo Marvel', 'catalog.marvel.title': 'Das primeiras adaptações ao multiverso',
    'catalog.marvel.description': 'Heróis, equipes e sagas da Marvel organizados em uma curadoria cronológica e abrangente.',
    'catalog.dc.eyebrow': 'Universo DC', 'catalog.dc.title': 'Lendas através das gerações',
    'catalog.dc.description': 'De Metrópolis a Gotham, explore as diferentes eras e universos do cinema da DC.',
    'catalog.organize': 'Organizar catálogo', 'catalog.filterUniverse': 'Filtrar por universo editorial',
    'catalog.all': 'Todos', 'catalog.marvel': 'Marvel', 'catalog.dc': 'DC', 'catalog.others': 'Outros',
    'catalog.franchise': 'Franquia', 'catalog.decade': 'Década', 'catalog.sort': 'Ordenar', 'catalog.allF': 'Todas',
    'catalog.best': 'Melhor avaliados', 'catalog.newest': 'Mais recentes', 'catalog.oldest': 'Mais antigos',
    'catalog.unavailable': 'Catálogo indisponível', 'catalog.empty': 'Nenhum filme por aqui',
    'catalog.changeFilters': 'Altere os filtros para continuar explorando.', 'catalog.found.one': '{count} filme encontrado',
    'catalog.found.other': '{count} filmes encontrados', 'catalog.more': 'Mostrar mais filmes', 'catalog.of': '{shown} de {total}',
    'search.eyebrow': 'Encontre seu próximo filme', 'search.title': 'Busca',
    'search.description': 'Busque por título, herói, franquia, universo, coleção, ano, gênero, ator ou diretor.',
    'search.label': 'Buscar filmes', 'search.placeholder': 'Busque por um filme ou herói', 'search.clear': 'Limpar', 'search.submit': 'Buscar',
    'search.error': 'Não foi possível buscar', 'search.none': 'Nenhum resultado no HeroVerse',
    'search.noneMessage': 'Não encontramos “{query}” em nosso acervo. Tente o nome do herói, filme, coleção, ator ou ano.',
    'search.promptTitle': 'O que vamos assistir?', 'search.prompt': 'Experimente “Homem-Aranha”, “Guerra Civil”, “X-Men”, “cinema indiano” ou “MCU”.',
    'search.results.one': '{count} resultado para', 'search.results.other': '{count} resultados para',
    'search.order': 'por relevância e nota IMDb', 'search.more': 'Mostrar mais resultados',
    'details.outside': 'Este título não faz parte da curadoria de super-heróis do HeroVerse.', 'details.outsideTitle': 'Título fora do catálogo',
    'details.loadError': 'Não foi possível carregar os detalhes.', 'details.explore': 'Explorar a curadoria', 'details.back': 'Voltar ao catálogo',
    'details.eyebrow': 'Filme da curadoria', 'details.add': 'Adicionar à lista', 'details.inList': 'Na minha lista', 'details.imdb': 'Ver no IMDb',
    'details.director': 'Direção', 'details.cast': 'Elenco', 'details.writer': 'Roteiro', 'details.country': 'País',
    'details.language': 'Idioma', 'details.awards': 'Prêmios', 'details.votes': 'Votos',
    'myList.eyebrow': 'Sua seleção', 'myList.title': 'Minha Lista',
    'myList.description': 'Os filmes que você salvou ficam disponíveis neste navegador e são ordenados pela nota IMDb.',
    'myList.count.one': '{count} filme salvo', 'myList.count.other': '{count} filmes salvos', 'myList.empty': 'Sua lista está vazia',
    'myList.emptyMessage': 'Salve filmes pelo ícone de coração para encontrá-los rapidamente.', 'myList.explore': 'Explorar filmes',
    'notFound.title': 'Página fora do universo', 'notFound.message': 'O endereço que você tentou acessar não existe.', 'notFound.home': 'Voltar ao início',
    'footer.description': 'Descubra grandes histórias do cinema de super-heróis.', 'footer.author': 'Desenvolvido por Paulo Francisco Marsiglia',
    'footer.data': 'Dados de filmes fornecidos por OMDb API', 'rail.previous': 'Voltar em {title}', 'rail.next': 'Avançar em {title}',
  },
  'en-US': {
    'nav.home': 'Home', 'nav.movies': 'Movies', 'nav.marvel': 'Marvel', 'nav.dc': 'DC', 'nav.myList': 'My List',
    'nav.explore': 'Explore', 'nav.caption': 'Superhero cinema, all in one universe.', 'nav.search': 'Search',
    'nav.openSearch': 'Open search', 'nav.openMenu': 'Open menu', 'nav.closeMenu': 'Close menu', 'nav.primary': 'Primary navigation',
    'language.label': 'Language', 'language.pt': 'PT', 'language.en': 'EN', 'skip': 'Skip to content',
    'hero.featured': 'Featured movies', 'hero.info': 'Movie information', 'hero.select': 'Select featured movie',
    'hero.details': 'View details', 'hero.myList': 'My list', 'hero.inList': 'In my list', 'hero.previous': 'Previous feature',
    'hero.next': 'Next feature', 'hero.pause': 'Pause features', 'hero.resume': 'Resume features',
    'hero.tt4154796.eyebrow': 'Featured this week', 'hero.tt1877830.eyebrow': 'DC Universe', 'hero.tt10872600.eyebrow': 'Fan favorite',
    'hero.tt4154796.description': 'The remaining heroes unite to restore the universe and face one final battle.',
    'hero.tt1877830.description': 'A dark investigation leads Batman into the heart of Gotham’s corruption.',
    'hero.tt10872600.description': 'Peter Parker faces threats from other universes and redefines what it means to be a hero.',
    'common.explore': 'Explore', 'common.seeAll': 'See all', 'common.movie': 'Movie', 'common.series': 'Series',
    'common.loadingMovies': 'Loading movies', 'common.posterUnavailable': 'Poster unavailable',
    'common.detailsOf': 'View details for {title}', 'common.addToList': 'Add {title} to my list', 'common.removeFromList': 'Remove {title} from my list',
    'collection.featured.title': 'Featured', 'collection.featured.description': 'Essential stories to start your marathon.',
    'collection.marvel.title': 'Marvel Universe', 'collection.marvel.description': 'From the classics to the MCU, X-Men, Spider-Verse and Sony/Marvel.',
    'collection.dc.title': 'DC Universe', 'collection.dc.description': 'Legends from Gotham and Metropolis, the DCEU, DCU and Elseworlds.',
    'collection.others.title': 'Beyond Marvel and DC', 'collection.others.description': 'Independent comics, original heroes, animation and international cinema.',
    'collection.unavailable': 'This collection is currently unavailable.',
    'catalog.movies.eyebrow': 'HeroVerse collection', 'catalog.movies.title': 'The history of superheroes on film',
    'catalog.movies.description': 'Explore classics, shared universes, independent adaptations, animation and international productions.',
    'catalog.marvel.eyebrow': 'Marvel Universe', 'catalog.marvel.title': 'From the first adaptations to the multiverse',
    'catalog.marvel.description': 'Marvel heroes, teams and sagas organized into a broad chronological collection.',
    'catalog.dc.eyebrow': 'DC Universe', 'catalog.dc.title': 'Legends across generations',
    'catalog.dc.description': 'From Metropolis to Gotham, explore the different eras and universes of DC cinema.',
    'catalog.organize': 'Organize catalog', 'catalog.filterUniverse': 'Filter by editorial universe',
    'catalog.all': 'All', 'catalog.marvel': 'Marvel', 'catalog.dc': 'DC', 'catalog.others': 'Others',
    'catalog.franchise': 'Franchise', 'catalog.decade': 'Decade', 'catalog.sort': 'Sort', 'catalog.allF': 'All',
    'catalog.best': 'Highest rated', 'catalog.newest': 'Newest', 'catalog.oldest': 'Oldest',
    'catalog.unavailable': 'Catalog unavailable', 'catalog.empty': 'No movies here',
    'catalog.changeFilters': 'Change the filters to keep exploring.', 'catalog.found.one': '{count} movie found',
    'catalog.found.other': '{count} movies found', 'catalog.more': 'Show more movies', 'catalog.of': '{shown} of {total}',
    'search.eyebrow': 'Find your next movie', 'search.title': 'Search',
    'search.description': 'Search by title, hero, franchise, universe, collection, year, genre, actor or director.',
    'search.label': 'Search movies', 'search.placeholder': 'Search for a movie or hero', 'search.clear': 'Clear', 'search.submit': 'Search',
    'search.error': 'Search failed', 'search.none': 'No results in HeroVerse',
    'search.noneMessage': 'We could not find “{query}” in our collection. Try a hero, movie, collection, actor or year.',
    'search.promptTitle': 'What are we watching?', 'search.prompt': 'Try “Spider-Man”, “Civil War”, “X-Men”, “Indian cinema” or “MCU”.',
    'search.results.one': '{count} result for', 'search.results.other': '{count} results for',
    'search.order': 'by relevance and IMDb rating', 'search.more': 'Show more results',
    'details.outside': 'This title is not part of HeroVerse’s superhero collection.', 'details.outsideTitle': 'Title outside the catalog',
    'details.loadError': 'Could not load the details.', 'details.explore': 'Explore the collection', 'details.back': 'Back to catalog',
    'details.eyebrow': 'Curated movie', 'details.add': 'Add to list', 'details.inList': 'In my list', 'details.imdb': 'View on IMDb',
    'details.director': 'Director', 'details.cast': 'Cast', 'details.writer': 'Writer', 'details.country': 'Country',
    'details.language': 'Language', 'details.awards': 'Awards', 'details.votes': 'Votes',
    'myList.eyebrow': 'Your selection', 'myList.title': 'My List',
    'myList.description': 'Movies you save are stored in this browser and sorted by IMDb rating.',
    'myList.count.one': '{count} saved movie', 'myList.count.other': '{count} saved movies', 'myList.empty': 'Your list is empty',
    'myList.emptyMessage': 'Save movies with the heart icon to find them quickly.', 'myList.explore': 'Explore movies',
    'notFound.title': 'Page outside the universe', 'notFound.message': 'The address you tried to access does not exist.', 'notFound.home': 'Back home',
    'footer.description': 'Discover great stories from superhero cinema.', 'footer.author': 'Developed by Paulo Francisco Marsiglia',
    'footer.data': 'Movie data provided by OMDb API', 'rail.previous': 'Scroll back in {title}', 'rail.next': 'Scroll forward in {title}',
  },
};

const LanguageContext = createContext(null);

const readLanguage = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return Object.values(languages).includes(saved) ? saved : languages.PT;
  } catch {
    return languages.PT;
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(readLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const t = useCallback((key, values = {}, fallback = key) => {
    const template = messages[language]?.[key] || fallback;
    return Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, value), template);
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage deve ser usado dentro de LanguageProvider.');
  return context;
}
