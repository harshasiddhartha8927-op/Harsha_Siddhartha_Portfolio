import type { IncomingMessage, ServerResponse } from 'http';
import https from 'https';

interface ContactRequestBody {
  visitorEmail?: string;
  subject?: string;
  message?: string;
  honeypot?: string; // Basic spam protection
}

// Simple rate-limiting memory map for dev/serverless
const rateLimitMap = new Map<string, number>();

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  // Parse body if stream
  let body: ContactRequestBody = req.body;
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

  const { visitorEmail, subject, message, honeypot } = body || {};

  // 1. Basic Spam Check: Honeypot field must be empty
  if (honeypot && honeypot.trim().length > 0) {
    // Silent rejection for bots
    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, message: 'Message sent successfully!' }));
    return;
  }

  // 2. Validation
  if (!visitorEmail || typeof visitorEmail !== 'string' || !visitorEmail.includes('@')) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'A valid email address is required.' }));
    return;
  }

  if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Subject cannot be empty.' }));
    return;
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Message cannot be empty.' }));
    return;
  }

  // 3. Simple IP Rate Limiting (max 1 message per 30 seconds per IP)
  const clientIp = (req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || '127.0.0.1').split(',')[0].trim();
  const lastSent = rateLimitMap.get(clientIp);
  const now = Date.now();

  if (lastSent && now - lastSent < 15000) {
    res.statusCode = 429;
    res.end(JSON.stringify({ error: 'Too many requests. Please wait a few seconds before sending another message.' }));
    return;
  }
  rateLimitMap.set(clientIp, now);

  const portfolioEmail = process.env.PORTFOLIO_EMAIL || 'harshasiddhartha8927@gmail.com';
  const resendApiKey = process.env.EMAIL_SERVICE_API_KEY || process.env.RESEND_API_KEY;

  // Sanitize text inputs
  const cleanEmail = visitorEmail.trim();
  const cleanSubject = subject.trim().replace(/[\r\n]/g, ' ');
  const cleanMessage = message.trim();

  try {
    if (resendApiKey) {
      // Deliver via Resend API if API Key is configured
      const postData = JSON.stringify({
        from: 'Portfolio Contact Form <onboarding@resend.dev>',
        to: [portfolioEmail],
        reply_to: cleanEmail,
        subject: `[Portfolio Contact] ${cleanSubject}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; background: #0c0c0c; color: #d7e2ea; border-radius: 12px;">
            <h2 style="color: #b600a8; margin-top: 0;">New Contact Form Message</h2>
            <p><strong>From Visitor:</strong> ${cleanEmail}</p>
            <p><strong>Subject:</strong> ${cleanSubject}</p>
            <hr style="border-color: #333; margin: 20px 0;" />
            <p style="white-space: pre-wrap; font-size: 15px; line-height: 1.6;">${cleanMessage}</p>
          </div>
        `,
      });

      await new Promise<void>((resolve, reject) => {
        const apiReq = https.request(
          'https://api.resend.com/emails',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${resendApiKey}`,
              'Content-Length': Buffer.byteLength(postData),
            },
          },
          (apiRes) => {
            let resData = '';
            apiRes.on('data', (chunk) => (resData += chunk));
            apiRes.on('end', () => {
              if (apiRes.statusCode && apiRes.statusCode >= 200 && apiRes.statusCode < 300) {
                resolve();
              } else {
                console.error('Resend API error output:', resData);
                reject(new Error(`Resend API returned status ${apiRes.statusCode}`));
              }
            });
          }
        );
        apiReq.on('error', reject);
        apiReq.write(postData);
        apiReq.end();
      });
    } else {
      // Server log delivery when local dev or env is not configured yet
      console.log('==================================================');
      console.log('[PORTFOLIO EMAIL RECEIVED]');
      console.log(`To: ${portfolioEmail}`);
      console.log(`From Visitor: ${cleanEmail}`);
      console.log(`Subject: ${cleanSubject}`);
      console.log(`Message:\n${cleanMessage}`);
      console.log('==================================================');
    }

    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, message: 'Message sent successfully!' }));
  } catch (err) {
    console.error('Failed to deliver email:', err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Something went wrong while sending the email. Please try again.' }));
  }
}
