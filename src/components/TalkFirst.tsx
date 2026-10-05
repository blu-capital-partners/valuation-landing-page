import { useState, type FormEvent } from 'react'
import { CALL_TIMES, TALK_FIRST_CONSENT_TEXT } from '../shared/formOptions'
import { postForm } from '../lib/api'
import { clarityEvent } from '../lib/clarity'
import { CONTACT } from '../content'

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'error'; message: string } | { kind: 'done' }

// The second customer path: for clients who want to speak to a banker before paying or uploading
// confidential data. A short call-back form beside direct phone and WhatsApp buttons, with the
// booking link as a secondary option. Phone, WhatsApp and booking clicks are counted by
// useClarityClicks.
export default function TalkFirst() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    setStatus({ kind: 'sending' })
    setFieldErrors({})

    const result = await postForm('/api/talk-first', { ...data, consent: data.consent === 'on' })
    if (result.ok) {
      clarityEvent('talk_form_submitted')
      setStatus({ kind: 'done' })
      return
    }
    setFieldErrors(result.fields ?? {})
    setStatus({ kind: 'error', message: result.error })
    const firstInvalid = result.fields && Object.keys(result.fields)[0]
    if (firstInvalid) (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus()
  }

  const err = (name: string) =>
    fieldErrors[name] ? (
      <span className="field__error" id={`talk-${name}-error`}>
        {fieldErrors[name]}
      </span>
    ) : null
  const aria = (name: string) =>
    fieldErrors[name] ? { 'aria-invalid': true, 'aria-describedby': `talk-${name}-error` } : {}
  const req = (
    <span className="field__req" aria-hidden="true">
      *
    </span>
  )

  return (
    <section id="talk-first" className="section section--paper talk-first" aria-labelledby="talk-first-title">
      <div className="wrap talk-first__grid">
        <div className="talk-first__intro">
          <h2 id="talk-first-title">Prefer to talk first?</h2>
          <p>
            Speak to a senior banker before you pay anything or share confidential data. Leave your details and we call
            you back, or reach us directly.
          </p>
          <p className="talk-first__promise">No payment and no documents needed before we talk.</p>
          <div className="talk-first__direct">
            <a className="btn btn--navy" href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>
              Call {CONTACT.phone}
            </a>
            <a className="btn btn--outline" href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer">
              WhatsApp us
            </a>
          </div>
          <p className="talk-first__book">
            Or{' '}
            <a href={CONTACT.bookingUrl} target="_blank" rel="noreferrer">
              book a 15-min call
            </a>{' '}
            at a time that suits you.
          </p>
        </div>

        <div className="panel">
          {status.kind === 'done' ? (
            <div className="result" role="status" aria-live="polite">
              <p className="result__label">Thank you. We have your request.</p>
              <p>
                A banker will call you back, at the time you chose if you gave one. No payment and no documents are
                needed before we talk.
              </p>
            </div>
          ) : (
            <form className="form" onSubmit={onSubmit} noValidate={false}>
              <p className="talk-first__formTitle">Ask a banker to call you</p>
              <div className="form__grid">
                <label className="field">
                  <span className="field__label">Full name {req}</span>
                  <input name="fullName" autoComplete="name" required minLength={2} {...aria('fullName')} />
                  {err('fullName')}
                </label>
                <label className="field">
                  <span className="field__label">Company {req}</span>
                  <input name="companyName" autoComplete="organization" required minLength={2} {...aria('companyName')} />
                  {err('companyName')}
                </label>
                <label className="field">
                  <span className="field__label">Work email address {req}</span>
                  <input name="email" type="email" autoComplete="email" required {...aria('email')} />
                  {err('email')}
                </label>
                <label className="field">
                  <span className="field__label">Phone number {req}</span>
                  <input name="phone" type="tel" autoComplete="tel" required placeholder="+40 7xx xxx xxx" {...aria('phone')} />
                  {err('phone')}
                </label>
                <label className="field field--full">
                  <span className="field__label">
                    Preferred time to call (Romanian time) <span className="field__opt">optional</span>
                  </span>
                  <select name="preferredTime" defaultValue="" {...aria('preferredTime')}>
                    <option value="">Choose a time</option>
                    {CALL_TIMES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  {err('preferredTime')}
                </label>
                <label className="field field--full">
                  <span className="field__label">
                    Message <span className="field__opt">optional</span>
                  </span>
                  <textarea name="message" rows={3} maxLength={2000} {...aria('message')} />
                  {err('message')}
                </label>

                {/* Honeypot, hidden from people and assistive tech */}
                <input className="hp" name="website_confirm" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                <label className="consent field--full">
                  <input type="checkbox" name="consent" required {...aria('consent')} />
                  <span>
                    {req} {TALK_FIRST_CONSENT_TEXT} I have read the{' '}
                    <a href={CONTACT.privacyUrl} target="_blank" rel="noreferrer">
                      Privacy Policy
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
                {status.kind === 'sending' ? 'Sending…' : 'Request a call'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
