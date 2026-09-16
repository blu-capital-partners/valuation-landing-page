// GA4, Meta Pixel and LinkedIn Insight Tag. Nothing loads until the visitor accepts cookies (GDPR).

type AnyFn = (...args: unknown[]) => void
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: AnyFn
    fbq?: AnyFn & { queue?: unknown[]; loaded?: boolean; version?: string; callMethod?: AnyFn; push?: AnyFn }
    _fbq?: unknown
    _linkedin_partner_id?: string
    _linkedin_data_partner_ids?: string[]
    lintrk?: AnyFn & { q?: unknown[] }
  }
}

const env = import.meta.env
const CONSENT_KEY = 'bcp_cookie_consent'
let loaded = false

export type Consent = 'accepted' | 'rejected' | null

export function readConsent(): Consent {
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    return v === 'accepted' || v === 'rejected' ? v : null
  } catch {
    return null
  }
}

export function saveConsent(value: 'accepted' | 'rejected') {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    /* no storage: consent lasts for this page view */
  }
  if (value === 'accepted') loadTrackers()
}

function addScript(src: string) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

export function loadTrackers() {
  if (loaded) return
  loaded = true

  if (env.VITE_GA4_ID) {
    addScript(`https://www.googletagmanager.com/gtag/js?id=${env.VITE_GA4_ID}`)
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      // gtag expects the arguments object itself
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', env.VITE_GA4_ID, { anonymize_ip: true })
  }

  if (env.VITE_META_PIXEL_ID) {
    const fbq: NonNullable<Window['fbq']> = Object.assign(
      function (...args: unknown[]) {
        if (fbq.callMethod) fbq.callMethod(...args)
        else fbq.queue!.push(args)
      },
      { queue: [] as unknown[], loaded: true, version: '2.0' },
    )
    fbq.push = fbq
    window.fbq = fbq
    window._fbq = fbq
    addScript('https://connect.facebook.net/en_US/fbevents.js')
    fbq('init', env.VITE_META_PIXEL_ID)
    fbq('track', 'PageView')
  }

  if (env.VITE_LINKEDIN_PARTNER_ID) {
    window._linkedin_partner_id = env.VITE_LINKEDIN_PARTNER_ID
    window._linkedin_data_partner_ids = [env.VITE_LINKEDIN_PARTNER_ID]
    const lintrk = Object.assign((...args: unknown[]) => lintrk.q!.push(args), { q: [] as unknown[] })
    window.lintrk = lintrk
    addScript('https://snap.licdn.com/li.lms-analytics/insight.min.js')
  }
}

export function trackLead(kind: 'quote' | 'whitepaper', value?: number) {
  if (!loaded) return
  window.gtag?.('event', kind === 'quote' ? 'generate_lead' : 'whitepaper_request', value ? { currency: 'EUR', value } : {})
  window.fbq?.('track', kind === 'quote' ? 'Lead' : 'CompleteRegistration')
  if (kind === 'quote' && env.VITE_LINKEDIN_CONVERSION_ID)
    window.lintrk?.('track', { conversion_id: Number(env.VITE_LINKEDIN_CONVERSION_ID) })
}
