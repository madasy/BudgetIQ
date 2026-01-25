const http = require("http");
const { URL } = require("url");

const PORT = 8787;

const sendJson = (res, status, payload) => {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify(payload));
};

const handler = async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname !== "/price") {
    sendJson(res, 404, { error: "Not found" });
    return;
  }

  const symbol = url.searchParams.get("symbol");
  if (!symbol) {
    sendJson(res, 400, { error: "Missing symbol" });
    return;
  }

  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbol)}`
    );
    if (!response.ok) {
      sendJson(res, 502, { error: "Quote lookup failed" });
      return;
    }
    const payload = await response.json();
    const quote = payload?.quoteResponse?.result?.[0];
    const price = quote?.regularMarketPrice;
    if (typeof price !== "number") {
      sendJson(res, 404, { error: "No price found" });
      return;
    }
    sendJson(res, 200, {
      symbol: quote.symbol || symbol,
      price,
      currency: quote.currency || null,
      source: "yahoo",
    });
  } catch (error) {
    sendJson(res, 500, { error: "Price fetch error" });
  }
};

http.createServer(handler).listen(PORT, () => {
  console.log(`Price proxy running at http://localhost:${PORT}`);
});
