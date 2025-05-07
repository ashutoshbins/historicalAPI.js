const serverless = require('serverless-http');
const express = require("express");
const axios = require("axios");
const { NseIndia } = require("stock-nse-india");
const cors = require("cors");

const app = express();
const nseIndia = new NseIndia();

app.use(cors()); // Enable CORS for frontend access

app.get("/historical", async (req, res) => {
  const symbol = req.query.symbol;
  const startDate = req.query.from;
  const endDate = "01-01-2025"; // ✅ Fixed

  if (!symbol || !startDate) {
    return res.status(400).json({ error: "Missing 'symbol' or 'from' query parameters." });
  }

  try {
    console.log(`⏳ Fetching historical data for ${symbol} from ${startDate} to ${endDate}...`);

    const apiUrl = `https://www.nseindia.com/api/historical/cm/equity?symbol=${symbol.toUpperCase()}&series=[%22EQ%22]&from=${startDate}&to=${endDate}`;

    const response = await axios.get(apiUrl);

    if (!response || !response.data || response.data.length === 0) {
      return res.status(404).json({ error: "⚠️ No historical data found." });
    }

    return res.json({ data: response.data });
  } catch (error) {
    console.error("❌ Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

module.exports.handler = serverless(app);
