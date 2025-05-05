import express from 'express';
import { getHistoricalData } from 'stock-nse-india'; // Assuming you want to use stock-nse-india module

const app = express();

// Set up middleware for JSON requests
app.use(express.json());

// Example route: Root route
app.get('/', (req, res) => {
  res.send('Welcome to NSE Historical API!');
});

// Example route to fetch historical data for a stock symbol
app.get('/historical/:symbol', async (req, res) => {
  const { symbol } = req.params;
  
  try {
    const historicalData = await getHistoricalData(symbol); // Replace with correct method from stock-nse-india
    res.json(historicalData); // Respond with historical data
  } catch (error) {
    console.error('Error fetching historical data:', error);
    res.status(500).send('Error fetching historical data');
  }
});

// Make the server listen on the appropriate port (3000 or any available port)
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
