const API_URL = 'https://www.omdbapi.com/';
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const CACHE_PREFIX = 'heroverse:omdb:';
const CACHE_TTL = 24 * 60 * 60 * 1000;
const MAX_CONCURRENT_REQUESTS = 6;
const responseCache = new Map();

export class OmdbError extends Error {
  constructor(message, code = 'API_ERROR') {
    super(message);
    this.name = 'OmdbError';
    this.code = code;
  }
}

const getRequestKey = (params) => new URLSearchParams(params).toString();

const readStoredResponse = (requestKey) => {
  try {
    const cached = JSON.parse(window.localStorage.getItem(`${CACHE_PREFIX}${requestKey}`));
    if (cached?.data && Date.now() - cached.savedAt < CACHE_TTL) return cached.data;
  } catch {
    return null;
  }
  return null;
};

const storeResponse = (requestKey, data) => {
  try {
    window.localStorage.setItem(`${CACHE_PREFIX}${requestKey}`, JSON.stringify({ data, savedAt: Date.now() }));
  } catch {
    // Cache persistente é uma otimização; a aplicação continua sem ele.
  }
};

const request = async (params, signal) => {
  if (!API_KEY) {
    throw new OmdbError('Configure REACT_APP_OMDB_API_KEY para carregar o catálogo.', 'MISSING_API_KEY');
  }

  const requestKey = getRequestKey(params);
  if (responseCache.has(requestKey)) return responseCache.get(requestKey);

  const storedResponse = readStoredResponse(requestKey);
  if (storedResponse) {
    const cachedPromise = Promise.resolve(storedResponse);
    responseCache.set(requestKey, cachedPromise);
    return cachedPromise;
  }

  const url = new URL(API_URL);
  Object.entries({ ...params, apikey: API_KEY }).forEach(([key, value]) => url.searchParams.set(key, value));

  const pendingRequest = fetch(url.toString(), { signal })
    .then(async (response) => {
      if (!response.ok) throw new OmdbError('A OMDb está indisponível no momento.');
      const data = await response.json();
      if (data.Response === 'False') {
        const notFound = /not found/i.test(data.Error || '');
        throw new OmdbError(notFound ? 'Filme não encontrado na OMDb.' : data.Error || 'Não foi possível consultar a OMDb.', notFound ? 'NOT_FOUND' : 'API_ERROR');
      }
      storeResponse(requestKey, data);
      return data;
    })
    .catch((error) => {
      responseCache.delete(requestKey);
      if (error.name === 'AbortError') throw error;
      if (error instanceof OmdbError) throw error;
      throw new OmdbError('Não foi possível conectar à OMDb. Verifique sua conexão.');
    });

  responseCache.set(requestKey, pendingRequest);
  return pendingRequest;
};

export const getMovieSummary = (imdbID, options = {}) => {
  if (!imdbID) return Promise.reject(new OmdbError('Identificador do filme inválido.'));
  return request({ i: imdbID, plot: 'short' }, options.signal);
};

export const getMovieDetails = (imdbID, options = {}) => {
  if (!imdbID) return Promise.reject(new OmdbError('Identificador do filme inválido.'));
  return request({ i: imdbID, plot: 'full' }, options.signal);
};

export const getCatalogMovies = async (entries) => {
  const results = new Array(entries.length);
  let nextIndex = 0;

  const worker = async () => {
    while (nextIndex < entries.length) {
      const index = nextIndex;
      nextIndex += 1;
      const entry = entries[index];
      try {
        results[index] = { status: 'fulfilled', value: { ...(await getMovieSummary(entry.imdbID)), ...entry } };
      } catch (reason) {
        results[index] = { status: 'rejected', reason };
      }
    }
  };

  await Promise.all(Array.from(
    { length: Math.min(MAX_CONCURRENT_REQUESTS, entries.length) },
    () => worker()
  ));

  const movies = results.filter(({ status }) => status === 'fulfilled').map(({ value }) => value);
  if (!movies.length) {
    const failed = results.find(({ status }) => status === 'rejected');
    if (failed) throw failed.reason;
  }
  return movies;
};

export const hasApiKey = Boolean(API_KEY);
export const __clearApiCacheForTests = () => responseCache.clear();
