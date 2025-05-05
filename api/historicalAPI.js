// api/historical.js
import { NseIndia } from "stock-nse-india";

const nseIndia = new NseIndia();

export default async function handler(req, res) {
  const { symbol, from: startDate } = req.query;
  const endDate = "01-01-2025";

  if (!symbol || !startDate) {
    return res.status(400).json({ error: "Missing 'symbol' or 'from' query parameters." });
  }

  try {
    const endpoint = `/api/historical/cm/equity?symbol=${symbol.toUpperCase()}&series=[%22EQ%22]&from=${startDate}&to=${endDate}`;
    const response = await nseIndia.getDataByEndpoint(endpoint);

    if (!response?.data || response.data.length === 0) {
      return res.status(404).json({ error: "No historical data found." });
    }

    return res.status(200).json({ data: response.data });
  } catch (error) {
    console.error("❌ Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
