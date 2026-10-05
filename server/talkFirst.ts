import { CALL_TIMES, TALK_FIRST_CONSENT_TEXT } from '../src/shared/formOptions'
import { EMAIL_RE, forwardToPowerAutomate, json, readJson, str } from './http'

// "Prefer to talk first?": a visitor who wants a banker to call before a quote, a payment or any
// document. Handed to Power Automate like the other forms; the flow emails valuation@blucp.com.

type FieldErrors = Record<string, string>

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return json(405, { error: 'Method not allowed' })

  const body = await readJson(req)
  if (!body) return json(400, { error: 'Send the form data as JSON.' })

  // Honeypot: bots fill every field. Pretend success so they don't retry.
  if (str(body.website_confirm)) return json(200, { ok: true })

  const input = {
    fullName: str(body.fullName, 120),
    companyName: str(body.companyName, 160),
    email: str(body.email, 160).toLowerCase(),
    phone: str(body.phone, 40),
    preferredTime: str(body.preferredTime, 40),
    message: str(body.message, 2000),
    consent: body.consent === true,
  }

  const errors: FieldErrors = {}
  if (input.fullName.length < 2) errors.fullName = 'Enter your name.'
  if (input.companyName.length < 2) errors.companyName = 'Enter the company name.'
  if (!EMAIL_RE.test(input.email)) errors.email = 'Enter a valid work email address.'
  if (input.phone.replace(/[^\d]/g, '').length < 7) errors.phone = 'Enter a phone number with country code.'
  if (input.preferredTime && !(CALL_TIMES as readonly string[]).includes(input.preferredTime))
    errors.preferredTime = 'Choose a time from the list.'
  if (!input.consent) errors.consent = 'Tick the consent box so a banker can contact you.'

  if (Object.keys(errors).length) return json(422, { error: 'Check the highlighted fields.', fields: errors })

  const submittedAt = new Date().toISOString()
  const result = await forwardToPowerAutomate('POWER_AUTOMATE_TALK_FIRST_WEBHOOK_URL', {
    source: 'valuation-landing-page',
    form: 'talk_first_callback_request',
    submittedAt,
    notify: 'valuation@blucp.com',
    contact: { fullName: input.fullName, email: input.email, phone: input.phone },
    company: { name: input.companyName },
    preferredTime: input.preferredTime || null,
    message: input.message || null,
    consent: { given: true, text: TALK_FIRST_CONSENT_TEXT, at: submittedAt },
    attribution: body.attribution && typeof body.attribution === 'object' ? body.attribution : {},
  })

  if (!result.ok)
    return json(502, {
      error: 'We could not send your request right now. Please call or WhatsApp us at +40 728 726 209.',
    })

  return json(200, { ok: true, dryRun: result.dryRun })
}
