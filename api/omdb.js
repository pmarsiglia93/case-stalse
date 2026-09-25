const ALLOWED_PARAMS = new Set(["i", "s", "t", "y", "type", "plot", "page"]);

module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ Response: "False", Error: "Method not allowed." });
  }

  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) {
    return response.status(500).json({ Response: "False", Error: "Movie service is not configured." });
  }

  const upstreamUrl = new URL("https://www.omdbapi.com/");
  upstreamUrl.searchParams.set("apikey", apiKey);
  Object.entries(request.query || {}).forEach(([key, rawValue]) => {
    if (!ALLOWED_PARAMS.has(key)) return;
    const value = Array.isArray(rawValue) ? rawValue[0] : rawValue;
    if (typeof value === "string" && value.length <= 180) upstreamUrl.searchParams.set(key, value);
  });

  if (!upstreamUrl.searchParams.has("i") && !upstreamUrl.searchParams.has("s") && !upstreamUrl.searchParams.has("t")) {
    return response.status(400).json({ Response: "False", Error: "A movie identifier or query is required." });
  }

  try {
    const upstreamResponse = await fetch(upstreamUrl, { headers: { Accept: "application/json" } });
    const data = await upstreamResponse.json();
    response.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
    return response.status(upstreamResponse.ok ? 200 : 502).json(data);
  } catch {
    return response.status(502).json({ Response: "False", Error: "Movie service is temporarily unavailable." });
  }
};
