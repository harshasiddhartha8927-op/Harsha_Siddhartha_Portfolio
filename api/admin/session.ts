import type { IncomingMessage, ServerResponse } from 'http';
import { getAuthenticatedUser } from './authHelper';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  const user = getAuthenticatedUser(req);

  res.setHeader('Content-Type', 'application/json');

  if (!user) {
    res.statusCode = 401;
    res.end(JSON.stringify({ authenticated: false }));
    return;
  }

  res.statusCode = 200;
  res.end(JSON.stringify({ authenticated: true, user }));
}
