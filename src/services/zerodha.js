// For Vite
const API_KEY = import.meta.env.VITE_ZERODHA_API_KEY;
// For Create React App (CRA)
// const API_KEY = process.env.REACT_APP_ZERODHA_API_KEY;

const BASE_URL = 'https://api.kite.trade';

export const fetchQuote = async (symbol) => {
  const response = await fetch(`${BASE_URL}/quote?api_key=${API_KEY}&symbol=${symbol}`);
  if (!response.ok) throw new Error('API request failed');
  return response.json();
};