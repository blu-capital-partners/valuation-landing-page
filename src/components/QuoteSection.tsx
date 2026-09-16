import { useState, type FormEvent } from 'react'
import { INDUSTRIES, QUOTE_CONSENT_TEXT } from '../shared/formOptions'
import { formatEur } from '../shared/pricing'
import { postForm } from '../lib/api'
import { trackLead } from '../lib/analytics'
import { CONTACT } from '../content'

const EMBED_URL = import.meta.env.VITE_MS_FORM1_EMBED_URL

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'error'; message: string }
  | { kind: 'done'; price: number; email: string }

export default function QuoteSection() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    setStatus({ kind: 'sending' })
    setFieldErrors({})

    const result = await postForm<{ valuationPrice: number }>('/api/quote', { ...data, consent: data.consent === 'on' })
    if (result.ok) {
      trackLead('quote', result.valuationPrice)
      setStatus({ kind: 'done', price: result.valuationPrice, email: data.email })
      return
    }
    setFieldErrors(result.fields ?? {})
    setStatus({ kind: 'error', message: result.error })
    const firstInvalid = result.fields && Object.keys(result.fields)[0]
    if (firstInvalid) (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus()
  }

  const err = (name: string) =>
    fieldErrors[name] ? (
      <span className="field__error" id={`${name}-error`}>
        {fieldErrors[name]}
      </span>
    ) : null
  const aria = (name: string) =>
    fieldErrors[name] ? { 'aria-invalid': true, 'aria-describedby': `${name}-error` } : {}

  return (
    <section id="quote" className="quote-section" aria-labelledby="quote-title">
      <div className="wrap quote-section__grid">
        <div className="quote-section__intro">
          <h2 id="quote-title">Get your valuation quote</h2>
          <p>
            Takes about a minute. Only the essentials are required, and nothing is charged until you sign.
          </p>
          <ul className="next">
            <li>Your quote arrives by email in under 60 seconds.</li>
            <li>The email links to the valuation request form. Once you submit it, your engagement letter is generated automatically.</li>
            <li>You receive an invoice for the first 50% of the fee and access to a secure upload folder.</li>
          </ul>
          <p className="quote-section__contact">
            Prefer to talk first? Write to <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </p>
        </div>

        <div className="panel">
          {EMBED_URL ? (
            <iframe className="ms-form" src={EMBED_URL} title="Valuation quotation request form" loading="lazy" />
          ) : status.kind === 'done' ? (
            <div className="result" role="status" aria-live="polite">
              <p className="result__label">Your estimated valuation fee</p>
              <p className="result__price">{formatEur(status.price)}</p>
              <p>
                We sent the quote and the link to the valuation request form to <strong>{status.email}</strong>. If it
                has not arrived within a few minutes, check your spam folder.
              </p>
              <button type="button" className="btn btn--outline" onClick={() => setStatus({ kind: 'idle' })}>
                Request another quote
              </button>
            </div>
          ) : (
            <form className="form" onSubmit={onSubmit} noValidate={false}>
              <div className="form__grid">
                <label className="field field--full">
                  <span className="field__label">Company</span>
                  <input name="companyName" autoComplete="organization" required {...aria('companyName')} />
                  {err('companyName')}
                </label>
                <label className="field">
                  <span className="field__label">First name</span>
                  <input name="firstName" autoComplete="given-name" required minLength={2} {...aria('firstName')} />
                  {err('firstName')}
                </label>
                <label className="field">
                  <span className="field__label">Last name</span>
                  <input name="lastName" autoComplete="family-name" required minLength={2} {...aria('lastName')} />
                  {err('lastName')}
                </label>
                <label className="field field--full">
                  <span className="field__label">Work email address</span>
                  <input name="email" type="email" autoComplete="email" required {...aria('email')} />
                  {err('email')}
                </label>
                <label className="field">
                  <span className="field__label">Annual revenue (EUR million)</span>
                  <input
                    name="revenueEurM"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.1"
                    required
                    placeholder="3.5"
                    {...aria('revenueEurM')}
                  />
                  {err('revenueEurM')}
                </label>
                <label className="field">
                  <span className="field__label">
                    Phone number <span className="field__opt">optional</span>
                  </span>
                  <input name="phone" type="tel" autoComplete="tel" placeholder="+40 7xx xxx xxx" {...aria('phone')} />
                  {err('phone')}
                </label>
                <label className="field field--full">
                  <span className="field__label">
                    Industry <span className="field__opt">optional</span>
                  </span>
                  <select name="industry" defaultValue="" {...aria('industry')}>
                    <option value="">Choose an industry</option>
                    {INDUSTRIES.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                  {err('industry')}
                </label>

                {/* Honeypot, hidden from people and assistive tech */}
                <input className="hp" name="website_confirm" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                <label className="consent field--full">
                  <input type="checkbox" name="consent" required {...aria('consent')} />
                  <span>
                    {QUOTE_CONSENT_TEXT} I have read the{' '}
                    <a href={CONTACT.privacyUrl} target="_blank" rel="noreferrer">
                      Privacy Policy
                    </a>{' '}
                    and agree to the{' '}
                    <a href={CONTACT.termsUrl} target="_blank" rel="noreferrer">
                      Terms
                    </a>
                    .
                  </span>
                </label>
                {err('consent')}
              </div>

              {status.kind === 'error' && (
                <p className="form__error" role="alert">
                  {status.message}
                </p>
              )}

              <button type="submit" className="btn btn--primary btn--block" disabled={status.kind === 'sending'}>
                {status.kind === 'sending' ? 'Calculating your quote…' : 'Calculate my valuation price'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
