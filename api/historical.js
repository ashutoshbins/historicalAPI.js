// api/historical.js
const { NseIndia } = require("stock-nse-india");

const nseIndia = new NseIndia();

module.exports = async (req, res) => {
  const { symbol, from } = req.query;
  const endDate = "01-01-2025";

  if (!symbol || !from) {
    return res.status(400).json({ error: "Missing 'symbol' or 'from' query parameters." });
  }

  try {
    const endpoint = `/api/historical/cm/equity?symbol=${symbol.toUpperCase()}&series=["EQ"]&from=${from}&to=${endDate}`;
    const response = await nseIndia.getDataByEndpoint(endpoint);

    if (!response?.data || response.data.length === 0) {
      return res.status(404).json({ error: "⚠️ No historical data found for this symbol and date range." });
    }

    return res.json({ data: response.data });
  } catch (error) {
    console.error("❌ Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
