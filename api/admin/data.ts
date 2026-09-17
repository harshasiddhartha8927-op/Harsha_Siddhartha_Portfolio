import type { IncomingMessage, ServerResponse } from 'http';
import { getAuthenticatedUser } from './authHelper.js';
import { getPortfolioData, savePortfolioData } from './dbStore.js';

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');

  // Verify admin authorization
  const user = getAuthenticatedUser(req);
  if (!user) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: 'Unauthorized: Session invalid or expired' }));
    return;
  }

  // GET: Return current saved portfolio data for admin view
  if (req.method === 'GET') {
    try {
      const data = await getPortfolioData();
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, data }));
    } catch (err) {
      console.error('[api/admin/data GET] Error:', err);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Failed to retrieve portfolio data' }));
    }
    return;
  }

  // POST / PUT: Save portfolio updates to persistent database
  if (req.method === 'POST' || req.method === 'PUT') {
    let body = req.body;
    if (!body) {
      body = await new Promise((resolve) => {
        let raw = '';
        req.on('data', (chunk) => (raw += chunk));
        req.on('end', () => {
          try {
            resolve(JSON.parse(raw));
          } catch {
            resolve({});
          }
        });
      });
    }

    try {
      const currentData = await getPortfolioData();

      // If full dataset is provided, use it; otherwise merge partial section updates
      const updatedData = {
        about: body.about ?? currentData.about,
        skills: body.skills ?? currentData.skills,
        services: body.services ?? currentData.services,
        projects: body.projects ?? currentData.projects,
        contact: body.contact ?? currentData.contact,
      };

      const success = await savePortfolioData(updatedData);

      if (success) {
        res.statusCode = 200;
        res.end(JSON.stringify({
          success: true,
          message: 'Portfolio updates permanently saved to database',
          data: updatedData
        }));
      } else {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Failed to persist portfolio data to database' }));
      }
    } catch (err) {
      console.error('[api/admin/data POST] Error:', err);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Server error saving portfolio data' }));
    }
    return;
  }

  res.statusCode = 405;
  res.end(JSON.stringify({ error: 'Method Not Allowed' }));
}
