const KEY = 'bcp_attribution'
const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'li_fat_id']

export function captureAttribution() {
  try {
    const url = new URL(window.location.href)
    const found = Object.fromEntries(PARAMS.flatMap((p) => (url.searchParams.get(p) ? [[p, url.searchParams.get(p)]] : [])))
    if (Object.keys(found).length || !sessionStorage.getItem(KEY)) {
      sessionStorage.setItem(KEY, JSON.stringify({ ...found, landingPage: url.pathname, referrer: document.referrer }))
    }
  } catch {
    /* storage unavailable: attribution is optional */
  }
}

export function getAttribution(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? '{}')
  } catch {
    return {}
  }
}
