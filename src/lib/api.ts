import { getAttribution } from './attribution'
import { computeValuationFee } from '../shared/pricing'

export type ApiResult<T> =
  | ({ ok: true } & T)
  | { ok: false; error: string; fields?: Record<string, string> }

// Static previews (VS Code Live Server) have no serverless functions; answer locally instead.
function mockResponse(path: string, data: Record<string, unknown>) {
  if (path === '/api/quote') {
    const fee = computeValuationFee(Number(data.revenueEurM) || 0, Number(data.employees) || 0)
    return { ok: true as const, valuationPrice: fee.totalEur, dryRun: true }
  }
  return { ok: true as const, dryRun: true }
}

export async function postForm<T>(path: string, data: Record<string, unknown>): Promise<ApiResult<T>> {
  if (import.meta.env.VITE_PREVIEW_MOCK_API === 'true') {
    await new Promise((r) => setTimeout(r, 600))
    return mockResponse(path, data) as unknown as ApiResult<T>
  }
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, attribution: getAttribution() }),
    })
    const body = await res.json().catch(() => ({}))
    if (res.ok) return { ok: true, ...body }
    return { ok: false, error: body.error ?? 'Something went wrong. Try again.', fields: body.fields }
  } catch {
    return { ok: false, error: 'No connection. Check your internet and try again.' }
  }
}
