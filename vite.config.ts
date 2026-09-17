import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import type { PluginOption } from 'vite'

function apiMiddlewarePlugin(): PluginOption {
  return {
    name: 'api-middleware-plugin',
    configureServer(server) {
      // Ensure environment variables are loaded into process.env in dev mode
      const env = loadEnv('development', process.cwd(), '');
      Object.assign(process.env, env);

      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        try {
          const url = new URL(req.url, `http://${req.headers.host}`);
          const pathname = url.pathname;

          let handlerModule;
          if (pathname === '/api/send-email' || pathname === '/api/contact') {
            handlerModule = await server.ssrLoadModule('/api/send-email.ts');
          } else if (pathname.startsWith('/api/admin/')) {
            const route = pathname.replace('/api/admin/', '');
            if (route === 'login') {
              handlerModule = await server.ssrLoadModule('/api/admin/login.ts');
            } else if (route === 'session') {
              handlerModule = await server.ssrLoadModule('/api/admin/session.ts');
            } else if (route === 'logout') {
              handlerModule = await server.ssrLoadModule('/api/admin/logout.ts');
            } else if (route === 'data') {
              handlerModule = await server.ssrLoadModule('/api/admin/data.ts');
            }
          }

          if (handlerModule && handlerModule.default) {
            await handlerModule.default(req, res);
            return;
          }
        } catch (err) {
          console.error('API middleware error:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Internal Server Error' }));
          return;
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiMiddlewarePlugin()],
})

