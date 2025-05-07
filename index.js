import serverless from "serverless-http";
import express from "express";
import axios from "axios";
import { NseIndia } from "stock-nse-india";
import cors from "cors";

const app = express();
const nseIndia = new NseIndia();

app.use(cors());

app.get("/historical", async (req, res) => {
  const symbol = req.query.symbol;
  const startDate = req.query.from;
  const endDate = "01-01-2025";

  if (!symbol || !startDate) {
    return res.status(400).json({ error: "Missing 'symbol' or 'from' query parameters." });
  }

  try {
    const apiUrl = `https://www.nseindia.com/api/historical/cm/equity?symbol=${symbol.toUpperCase()}&series=[%22EQ%22]&from=${startDate}&to=${endDate}`;
    const response = await axios.get(apiUrl);

    if (!response?.data || response.data.length === 0) {
      return res.status(404).json({ error: "⚠️ No historical data found." });
    }

    return res.json({ data: response.data });
  } catch (error) {
    console.error("❌ Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

export const handler = serverless(app);
