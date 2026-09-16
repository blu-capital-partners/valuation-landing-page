import { EMAIL_RE, forwardToPowerAutomate, json, readJson, str } from './http'

// Footer newsletter sign-up.

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return json(405, { error: 'Method not allowed' })

  const body = await readJson(req)
  if (!body) return json(400, { error: 'Send the form data as JSON.' })
  if (str(body.website_confirm)) return json(200, { ok: true })

  const email = str(body.email, 160).toLowerCase()
  if (!EMAIL_RE.test(email)) return json(422, { error: 'Enter a valid email address.' })

  const submittedAt = new Date().toISOString()
  const result = await forwardToPowerAutomate('POWER_AUTOMATE_NEWSLETTER_WEBHOOK_URL', {
    source: 'valuation-landing-page',
    form: 'footer_newsletter',
    submittedAt,
    email,
    consent: { given: true, text: 'Subscribed to the BCP newsletter from the valuation landing page.', at: submittedAt },
  })

  if (!result.ok) return json(502, { error: 'We could not subscribe you right now. Try again in a minute.' })
  return json(200, { ok: true, dryRun: result.dryRun })
}
