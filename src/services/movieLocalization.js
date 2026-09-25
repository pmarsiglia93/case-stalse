import { languages } from '../context/LanguageContext';

const TRANSLATION_URL = 'https://api.mymemory.translated.net/get';
const CACHE_PREFIX = 'heroverse:translation:pt-BR:';
const MAX_CHUNK_BYTES = 430;

const countryTranslations = {
  'United States': 'Estados Unidos', 'United Kingdom': 'Reino Unido', Canada: 'Canadá', France: 'França',
  Germany: 'Alemanha', Italy: 'Itália', Spain: 'Espanha', Japan: 'Japão', China: 'China', India: 'Índia',
  Australia: 'Austrália', 'New Zealand': 'Nova Zelândia', 'South Africa': 'África do Sul', Brazil: 'Brasil',
};

const languageTranslations = {
  English: 'Inglês', Portuguese: 'Português', Spanish: 'Espanhol', French: 'Francês', German: 'Alemão',
  Italian: 'Italiano', Japanese: 'Japonês', Mandarin: 'Mandarim', Cantonese: 'Cantonês', Hindi: 'Hindi',
  Russian: 'Russo', Korean: 'Coreano', Arabic: 'Árabe', Latin: 'Latim',
};

const genreTranslations = {
  Action: 'Ação', Adventure: 'Aventura', Animation: 'Animação', Biography: 'Biografia', Comedy: 'Comédia',
  Crime: 'Crime', Drama: 'Drama', Family: 'Família', Fantasy: 'Fantasia', History: 'História', Horror: 'Terror',
  Music: 'Música', Musical: 'Musical', Mystery: 'Mistério', Romance: 'Romance', 'Sci-Fi': 'Ficção científica',
  Sport: 'Esporte', Thriller: 'Suspense', War: 'Guerra', Western: 'Faroeste',
};

const localizeList = (value, dictionary) => value && value !== 'N/A'
  ? value.split(',').map((item) => dictionary[item.trim()] || item.trim()).join(', ')
  : value;

const localizeAwards = (value) => {
  if (!value || value === "N/A") return value;
  return value
    .replace(/Nominated for (\d+) Oscars?\./gi, (_, count) => "Indicado a " + count + " Oscar" + (count === "1" ? "" : "s") + ".")
    .replace(/Won (\d+) Oscars?\./gi, (_, count) => "Venceu " + count + " Oscar" + (count === "1" ? "" : "s") + ".")
    .replace(/(\d+) wins?/gi, (_, count) => count + " " + (count === "1" ? "vitória" : "vitórias"))
    .replace(/(\d+) nominations?/gi, (_, count) => count + " " + (count === "1" ? "indicação" : "indicações"))
    .replace(/\btotal\b/gi, "no total")
    .replace(/ & /g, " e ");
};

const hashText = (text) => {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
};

const splitText = (text) => {
  const encoder = new TextEncoder();
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  const chunks = [];
  let current = '';

  const pushWords = (value) => {
    value.trim().split(/\s+/).forEach((word) => {
      const candidate = current ? `${current} ${word}` : word;
      if (encoder.encode(candidate).length > MAX_CHUNK_BYTES && current) {
        chunks.push(current);
        current = word;
      } else {
        current = candidate;
      }
    });
  };

  sentences.forEach((sentence) => {
    const candidate = current ? `${current} ${sentence.trim()}` : sentence.trim();
    if (encoder.encode(candidate).length <= MAX_CHUNK_BYTES) current = candidate;
    else {
      if (current) chunks.push(current);
      current = '';
      pushWords(sentence);
    }
  });
  if (current) chunks.push(current);
  return chunks;
};

const decodeEntities = (value) => {
  const element = document.createElement('textarea');
  element.innerHTML = value;
  return element.value;
};

const translateChunk = async (text) => {
  const url = new URL(TRANSLATION_URL);
  url.search = new URLSearchParams({ q: text, langpair: 'en|pt-BR' });
  const response = await fetch(url.toString());
  if (!response.ok) throw new Error('Translation unavailable');
  const data = await response.json();
  if (data.responseStatus !== 200 || !data.responseData?.translatedText) throw new Error('Translation unavailable');
  return decodeEntities(data.responseData.translatedText);
};

export const translateTextToPortuguese = async (text) => {
  if (!text || text === 'N/A') return text;
  const cacheKey = `${CACHE_PREFIX}${hashText(text)}`;
  try {
    const cached = window.localStorage.getItem(cacheKey);
    if (cached) return cached;
  } catch {
    // A tradução continua funcionando sem cache persistente.
  }

  try {
    const translated = [];
    for (const chunk of splitText(text)) translated.push(await translateChunk(chunk));
    const result = translated.join(' ');
    try { window.localStorage.setItem(cacheKey, result); } catch { /* cache opcional */ }
    return result;
  } catch {
    return text;
  }
};

export const localizeMovie = async (movie, language) => {
  if (!movie || language !== languages.PT) return movie;
  return {
    ...movie,
    Genre: localizeList(movie.Genre, genreTranslations),
    Country: localizeList(movie.Country, countryTranslations),
    Language: localizeList(movie.Language, languageTranslations),
    Awards: localizeAwards(movie.Awards),
    Plot: await translateTextToPortuguese(movie.Plot),
  };
};
