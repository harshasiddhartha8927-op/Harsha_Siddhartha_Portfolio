import type { IncomingMessage, ServerResponse } from 'http';
import {
  verifyAdminCredentials,
  createSessionToken,
  setSessionCookie,
} from './authHelper';

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse & { status?: any, json?: any }) {
  // Allow POST only
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  // Parse body if needed
  let body = req.body;
  if (!body) {
    body = await new Promise((resolve) => {
      let data = '';
      req.on('data', (chunk) => (data += chunk));
      req.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve({});
        }
      });
    });
  }

  const { username, password } = body || {};

  const isValid = verifyAdminCredentials(username, password);

  if (!isValid) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    // Generic error message: Do not reveal whether username or password was wrong
    res.end(JSON.stringify({ error: 'Invalid login credentials.' }));
    return;
  }

  // Generate session JWT token and set HttpOnly Cookie
  const token = createSessionToken(username);
  setSessionCookie(res, token);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ success: true, user: { username } }));
}
