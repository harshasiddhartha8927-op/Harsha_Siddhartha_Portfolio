import type { IncomingMessage, ServerResponse } from 'http';
import { getPortfolioData } from './admin/dbStore.js';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // Allow public GET requests
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  try {
    const data = await getPortfolioData();
    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, data }));
  } catch (err) {
    console.error('Failed to fetch public portfolio data:', err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Internal server error fetching portfolio data' }));
  }
}
