import type { IncomingMessage, ServerResponse } from 'http';
import { getAuthenticatedUser } from './authHelper';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');

  // Verify authentication for admin operations
  const user = getAuthenticatedUser(req);
  if (!user) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: 'Unauthorized: Session invalid or expired' }));
    return;
  }

  // Handle protected admin data requests
  if (req.method === 'GET' || req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
    res.statusCode = 200;
    res.end(JSON.stringify({
      success: true,
      message: 'Admin operation authorized',
      user
    }));
    return;
  }

  res.statusCode = 405;
  res.end(JSON.stringify({ error: 'Method Not Allowed' }));
}
