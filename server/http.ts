export const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })

export async function readJson(req: Request): Promise<Record<string, unknown> | null> {
  if (req.headers.get('content-length') && Number(req.headers.get('content-length')) > 20_000) return null
  try {
    const data = await req.json()
    return data && typeof data === 'object' && !Array.isArray(data) ? (data as Record<string, unknown>) : null
  } catch {
    return null
  }
}

export const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export type ForwardResult = { ok: true; dryRun: boolean } | { ok: false }

/**
 * Posts the payload to a Power Automate HTTP trigger. Without a configured URL outside
 * production, logs the payload instead so the page can be exercised locally.
 */
export async function forwardToPowerAutomate(envKey: string, payload: unknown): Promise<ForwardResult> {
  const url = process.env[envKey]
  if (!url) {
    if (process.env.VERCEL_ENV === 'production') {
      console.error(`${envKey} is not configured`)
      return { ok: false }
    }
    console.info(`[dry run] ${envKey} not set; payload:`, JSON.stringify(payload))
    return { ok: true, dryRun: true }
  }

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      })
      if (res.ok) return { ok: true, dryRun: false }
      console.error(`Power Automate responded ${res.status} (attempt ${attempt})`)
    } catch (err) {
      console.error(`Power Automate request failed (attempt ${attempt})`, err)
    }
  }
  return { ok: false }
}
