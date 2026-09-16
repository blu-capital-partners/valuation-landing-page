import { computeValuationFee } from '../src/shared/pricing'
import { INDUSTRIES, QUOTE_CONSENT_TEXT } from '../src/shared/formOptions'
import { EMAIL_RE, forwardToPowerAutomate, json, readJson, str } from './http'

// Form 1 (quotation request). Computes the fee server-side, hands the lead to Power Automate
// (which sends the quotation email with the Form 2 link) and returns the fee for instant display.

type FieldErrors = Record<string, string>

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return json(405, { error: 'Method not allowed' })

  const body = await readJson(req)
  if (!body) return json(400, { error: 'Send the form data as JSON.' })

  // Honeypot: bots fill every field. Pretend success so they don't retry.
  if (str(body.website_confirm)) return json(200, { ok: true })

  const input = {
    firstName: str(body.firstName, 80),
    lastName: str(body.lastName, 80),
    companyName: str(body.companyName, 160),
    email: str(body.email, 160).toLowerCase(),
    // Number('') is 0, so a blank becomes NaN and fails validation
    revenueEurM: Number(str(body.revenueEurM, 20).replace(',', '.') || NaN),
    phone: str(body.phone, 40),
    industry: str(body.industry, 80),
    consent: body.consent === true,
  }

  const errors: FieldErrors = {}
  if (input.companyName.length < 2) errors.companyName = 'Enter the company name.'
  if (input.firstName.length < 2) errors.firstName = 'Enter your first name.'
  if (input.lastName.length < 2) errors.lastName = 'Enter your last name.'
  if (!EMAIL_RE.test(input.email)) errors.email = 'Enter a valid work email address.'
  if (!Number.isFinite(input.revenueEurM) || input.revenueEurM < 0 || input.revenueEurM > 100_000)
    errors.revenueEurM = 'Enter revenue in EUR millions, for example 3.5.'
  if (input.phone && input.phone.replace(/[^\d]/g, '').length < 7)
    errors.phone = 'Enter a phone number with country code.'
  if (input.industry && !(INDUSTRIES as readonly string[]).includes(input.industry))
    errors.industry = 'Choose an industry from the list.'
  if (!input.consent) errors.consent = 'Tick the consent box so we can send your quote.'

  if (Object.keys(errors).length) return json(422, { error: 'Check the highlighted fields.', fields: errors })

  // Employee count is no longer collected; the fee depends on revenue alone
  const fee = computeValuationFee(input.revenueEurM, 0)
  const submittedAt = new Date().toISOString()

  const result = await forwardToPowerAutomate('POWER_AUTOMATE_QUOTE_WEBHOOK_URL', {
    source: 'valuation-landing-page',
    form: 'form1_quotation_request',
    submittedAt,
    contact: {
      firstName: input.firstName,
      lastName: input.lastName,
      fullName: `${input.firstName} ${input.lastName}`,
      email: input.email,
      phone: input.phone,
    },
    company: {
      name: input.companyName,
      industry: input.industry,
      revenueEurM: input.revenueEurM,
    },
    valuationPrice: fee.totalEur,
    priceBreakdown: fee,
    consent: { given: true, text: QUOTE_CONSENT_TEXT, at: submittedAt },
    attribution: body.attribution && typeof body.attribution === 'object' ? body.attribution : {},
  })

  if (!result.ok)
    return json(502, {
      error: 'We could not send your quote right now. Try again in a minute, or email valuation@blucp.com.',
    })

  return json(200, { ok: true, valuationPrice: fee.totalEur, dryRun: result.dryRun })
}
