import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage } from 'node:http'

// Vercel serves these from /api in production; this maps the same handlers onto the Vite dev server.
const API_ROUTES: Record<string, string> = {
  '/api/quote': '/server/quote.ts',
  '/api/whitepaper': '/server/whitepaper.ts',
  '/api/newsletter': '/server/newsletter.ts',
}

async function readBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(chunk as Buffer)
  return Buffer.concat(chunks).toString('utf8')
}

function devFunctions(): Plugin {
  return {
    name: 'dev-api-functions',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req, res, next) => {
        const path = req.url?.split('?')[0] ?? ''
        const modulePath = API_ROUTES[path]
        if (!modulePath) return next()
        try {
          const mod = await server.ssrLoadModule(modulePath)
          const body = req.method === 'GET' || req.method === 'HEAD' ? undefined : await readBody(req)
          const request = new Request(`http://localhost${req.url}`, {
            method: req.method,
            headers: req.headers as Record<string, string>,
            body,
          })
          const response: Response = await mod.default(request)
          res.statusCode = response.status
          response.headers.forEach((value, key) => res.setHeader(key, value))
          res.end(await response.text())
        } catch (err) {
          next(err)
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
  return {
    plugins: [react(), devFunctions()],
  }
})
