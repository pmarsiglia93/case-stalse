# HeroVerse

HeroVerse é uma experiência de descoberta de filmes de super-heróis construída em React e integrada à OMDb API. O projeto combina uma interface cinematográfica, catálogo por universos, busca em tempo real e uma lista pessoal persistida no navegador.

O acervo é um recorte editorial amplo, não uma alegação de totalidade histórica: entram os títulos da pesquisa-base fornecida, organizados com IDs exatos para permitir expansão segura.
O projeto nasceu como um case simples de consumo de API, focado em Batman, Spider-Man e Avengers. Depois, foi modernizado como projeto de portfólio, com atenção especial a arquitetura front-end, experiência de uso, acessibilidade e responsividade.

## Preview

> Espaço reservado para a captura de tela da versão final publicada.

Aplicação publicada: [case-stalse.vercel.app](https://case-stalse.vercel.app/)

## Funcionalidades

- Home com hero rotativo e coleções temáticas;
- interface bilíngue em português e inglês, com preferência persistida no navegador;
- sinopses, gêneros, países, idiomas e prêmios localizados para PT-BR nos detalhes;
- acervo editorial com 169 filmes, de 1920 a 2026, dividido entre Marvel, DC e outros universos;
- busca refinada por título, herói, franquia, universo, coleção, ano, gênero, ator ou diretor;
- filtros por universo, franquia e década, com ordenação por nota IMDb, ano ou título;
- detalhes completos carregados diretamente pelo `imdbID`;
- favoritos persistidos em `localStorage`, sem duplicatas;
- skeletons, estados vazios e mensagens de erro integrados ao visual;
- fallback para posters ausentes ou com falha de carregamento;
- navegação responsiva e suporte a teclado;
- animações sutis com respeito a `prefers-reduced-motion`.

## Tecnologias

- React 18;
- React Router 7;
- Create React App / React Scripts;
- CSS moderno (custom properties, Grid, Flexbox, scroll snap e media queries);
- Testing Library;
- OMDb API.
- MyMemory Translation API para tradução sob demanda das sinopses, com cache e fallback para o texto original.

Nenhuma biblioteca de UI ou gerenciamento global de estado é necessária. O carrossel utiliza rolagem nativa com CSS scroll snap.

## Arquitetura

```text
src/
├── components/       # Componentes reutilizáveis de interface
├── context/          # Estado global de favoritos e idioma
├── data/             # Configuração das coleções e destaques
├── hooks/            # Hooks reutilizáveis, como debounce
├── pages/            # Home, catálogo, busca, detalhes e minha lista
├── services/         # OMDb API e localização de conteúdo
├── App.js             # Rotas e composição principal
└── App.css            # Design tokens e estilos compartilhados
```

Os contextos concentram somente os estados compartilhados de favoritos e idioma. A seleção editorial de IDs e categorias fica em `data/catalog.js`. Requisições ficam em `services/omdbApi.js`, que normaliza erros e mantém cache local por 24 horas para evitar chamadas duplicadas.

## Integração com OMDb API

O cliente expõe duas operações principais:

- `getCatalogMovies(entries)` para carregar os títulos da curadoria por identificador;
- `getMovieDetails(imdbID)` para a página de detalhes.
O catálogo utiliza uma lista explícita de 169 `imdbID`s de produções Marvel, DC, independentes, originais e internacionais. Essa estratégia evita falsos positivos das buscas textuais da OMDb, como filmes sem relação com super-heróis que contenham “Avengers” no título.

A chave não faz parte do código-fonte nem do bundle de produção. Na Vercel, o front-end consulta a função serverless `api/omdb.js`, que mantém `OMDB_API_KEY` somente no servidor. Em desenvolvimento local, o cliente usa `REACT_APP_OMDB_API_KEY` do arquivo `.env`.

## Como executar

Requisitos: Node.js 18 ou superior e uma chave da [OMDb API](https://www.omdbapi.com/apikey.aspx).

```bash
npm install
cp .env.example .env
npm start
```

Abra `http://localhost:3000`.

Para validar a versão de produção:

```bash
npm test -- --watchAll=false
npm run build
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz:

```env
REACT_APP_OMDB_API_KEY=your_api_key_here
```

Reinicie o servidor de desenvolvimento após alterar variáveis de ambiente. O arquivo `.env` está ignorado pelo Git; apenas `.env.example` deve ser versionado. Na Vercel, configure `OMDB_API_KEY` para Production e Preview; ela é lida apenas pela função serverless.

## Responsividade

Os layouts foram preparados para celulares a partir de 320 px, tablets e desktops amplos. Navbar, hero, cards, busca, filtros e detalhes reorganizam seu conteúdo por CSS, sem depender de leitura de `window.innerWidth`.

## Melhorias futuras

- filtros adicionais por coleção cinematográfica;
- testes de integração adicionais para falhas da API;
- compartilhamento de listas por URL;
- captura automatizada do preview no pipeline de deploy.

## Autor

Desenvolvido por [Paulo Francisco Marsiglia](https://www.linkedin.com/in/paulomarsiglia/).

- [GitHub](https://github.com/pmarsiglia93)
- [LinkedIn](https://www.linkedin.com/in/paulomarsiglia/)
