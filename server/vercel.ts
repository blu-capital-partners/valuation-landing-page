import type { IncomingMessage, ServerResponse } from 'node:http'

type WebHandler = (request: Request) => Promise<Response>

/** Wraps a Web-standard handler so Vercel's Node runtime can serve it. */
export function toNodeHandler(handler: WebHandler) {
  return async (req: IncomingMessage, res: ServerResponse) => {
    const chunks: Buffer[] = []
    for await (const chunk of req) chunks.push(chunk as Buffer)
    const body = chunks.length ? Buffer.concat(chunks) : undefined

    const host = (req.headers['x-forwarded-host'] ?? req.headers.host ?? 'localhost') as string
    const proto = (req.headers['x-forwarded-proto'] ?? 'https') as string
    const request = new Request(`${proto}://${host}${req.url ?? '/'}`, {
      method: req.method,
      headers: req.headers as Record<string, string>,
      body,
    })

    const response = await handler(request)
    res.statusCode = response.status
    response.headers.forEach((value, key) => res.setHeader(key, value))
    res.end(Buffer.from(await response.arrayBuffer()))
  }
}
