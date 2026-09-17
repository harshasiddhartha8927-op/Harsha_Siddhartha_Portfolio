import { parseCookie, stringifySetCookie } from 'cookie';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { IncomingMessage, ServerResponse } from 'http';

// Default fallback secret for development if env is missing
const DEFAULT_SESSION_SECRET = 'harsha_portfolio_secure_session_secret_32_chars_long_key_2026';
const COOKIE_NAME = 'admin_session';

export function getSessionSecret(): string {
  return process.env.SESSION_SECRET || DEFAULT_SESSION_SECRET;
}

export function getAdminUsername(): string {
  return process.env.ADMIN_USERNAME || 'Harsha@1477';
}

export function getAdminPasswordHash(): string {
  let hash = process.env.ADMIN_PASSWORD_HASH || '$2b$10$ihGhfrnG.yZ9Nw5r0WoQs.Ntwzx0xzPcS4bg7nXa7lwB/ZYdkrQJW';
  if ((hash.startsWith("'") && hash.endsWith("'")) || (hash.startsWith('"') && hash.endsWith('"'))) {
    hash = hash.slice(1, -1);
  }
  hash = hash.replace(/\\ me/g, '$').replace(/\\\$/g, '$');
  if (!hash || hash.includes('$10/')) {
    hash = '$2b$10$ihGhfrnG.yZ9Nw5r0WoQs.Ntwzx0xzPcS4bg7nXa7lwB/ZYdkrQJW';
  }
  return hash.trim();
}

export function verifyAdminCredentials(username?: string, password?: string): boolean {
  if (!username || !password) return false;
  const expectedUsername = getAdminUsername();
  if (username !== expectedUsername) {
    return false;
  }

  const expectedHash = getAdminPasswordHash();
  try {
    const compareFn = (bcrypt as any).compareSync || (bcrypt as any).default?.compareSync;
    return compareFn(password, expectedHash);
  } catch (err) {
    console.error('Bcrypt comparison error:', err);
    return false;
  }
}

export function createSessionToken(username: string): string {
  const secret = getSessionSecret();
  const signFn = (jwt as any).sign || (jwt as any).default?.sign;
  return signFn({ username, role: 'admin' }, secret, { expiresIn: '24h' });
}

export function verifySessionToken(token?: string): { username: string; role: string } | null {
  if (!token) return null;
  try {
    const secret = getSessionSecret();
    const verifyFn = (jwt as any).verify || (jwt as any).default?.verify;
    const decoded = verifyFn(token, secret) as { username: string; role: string };
    return decoded;
  } catch {
    return null;
  }
}

export function parseCookies(req: IncomingMessage): Record<string, string> {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return {};
  return parseCookie(cookieHeader);
}

export function setSessionCookie(res: ServerResponse, token: string): void {
  const isProduction = process.env.NODE_ENV === 'production';
  const serialized = stringifySetCookie({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
  res.setHeader('Set-Cookie', serialized);
}

export function clearSessionCookie(res: ServerResponse): void {
  const isProduction = process.env.NODE_ENV === 'production';
  const serialized = stringifySetCookie({
    name: COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
  res.setHeader('Set-Cookie', serialized);
}

export function getAuthenticatedUser(req: IncomingMessage): { username: string } | null {
  const cookies = parseCookies(req);
  const token = cookies[COOKIE_NAME];
  const decoded = verifySessionToken(token);
  if (!decoded || !decoded.username) return null;
  return { username: decoded.username };
}
