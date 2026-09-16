import { WHITEPAPER_CONSENT_TEXT } from '../src/shared/formOptions'
import { EMAIL_RE, forwardToPowerAutomate, json, readJson, str } from './http'

// CTA 1: visitor leaves an email; Power Automate sends the bullet-point email with the DocSend link.

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return json(405, { error: 'Method not allowed' })

  const body = await readJson(req)
  if (!body) return json(400, { error: 'Send the form data as JSON.' })
  if (str(body.website_confirm)) return json(200, { ok: true })

  const email = str(body.email, 160).toLowerCase()
  if (!EMAIL_RE.test(email)) return json(422, { error: 'Enter a valid email address.', fields: { email: 'Enter a valid email address.' } })
  if (body.consent !== true)
    return json(422, { error: 'Tick the consent box so we can email you.', fields: { consent: 'Tick the consent box so we can email you.' } })

  const submittedAt = new Date().toISOString()
  const result = await forwardToPowerAutomate('POWER_AUTOMATE_WHITEPAPER_WEBHOOK_URL', {
    source: 'valuation-landing-page',
    form: 'cta1_whitepaper_request',
    submittedAt,
    email,
    consent: { given: true, text: WHITEPAPER_CONSENT_TEXT, at: submittedAt },
    attribution: body.attribution && typeof body.attribution === 'object' ? body.attribution : {},
  })

  if (!result.ok) return json(502, { error: 'We could not send the white paper right now. Try again in a minute.' })
  return json(200, { ok: true, dryRun: result.dryRun })
}
