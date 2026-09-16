import { useEffect, useRef, useState, type FormEvent } from 'react'
import { WHITEPAPER_CONSENT_TEXT } from '../shared/formOptions'
import { postForm } from '../lib/api'
import { trackLead } from '../lib/analytics'
import { CONTACT } from '../content'

type Status = 'idle' | 'sending' | 'done' | { error: string }

export default function WhitepaperDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    setStatus('sending')
    const result = await postForm('/api/whitepaper', { ...data, consent: data.consent === 'on' })
    if (result.ok) {
      trackLead('whitepaper')
      setStatus('done')
    } else {
      setStatus({ error: result.error })
    }
  }

  function handleClose() {
    onClose()
    if (status === 'done') setStatus('idle')
  }

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby="wp-title"
      onClose={handleClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
    >
      <div className="dialog__body">
        <button type="button" className="dialog__close" aria-label="Close" onClick={() => ref.current?.close()}>
          ×
        </button>
        {status === 'done' ? (
          <div role="status">
            <h2 id="wp-title">Check your inbox</h2>
            <p>We sent the white paper link to your email. It usually arrives within a minute.</p>
            <a className="btn btn--primary" href="#quote" onClick={() => ref.current?.close()}>
              Calculate my valuation price
            </a>
          </div>
        ) : (
          <>
            <h2 id="wp-title">Why value your business?</h2>
            <p>Our short white paper explains:</p>
            <ul className="wp-list">
              <li>when owners need a valuation, from a sale to bank financing or a shareholder exit</li>
              <li>which methods bankers use and why the results differ</li>
              <li>what drives value up, and what investors discount</li>
            </ul>
            <p>Leave your email and we will send you the link. No quote request needed.</p>
            <form onSubmit={onSubmit} className="form">
              <label className="field">
                <span className="field__label">Email</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <input className="hp" name="website_confirm" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <label className="consent">
                <input type="checkbox" name="consent" required />
                <span>
                  {WHITEPAPER_CONSENT_TEXT}{' '}
                  <a href={CONTACT.privacyUrl} target="_blank" rel="noreferrer">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {typeof status === 'object' && (
                <p className="form__error" role="alert">
                  {status.error}
                </p>
              )}
              <button type="submit" className="btn btn--navy btn--block" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Email me the white paper'}
              </button>
            </form>
          </>
        )}
      </div>
    </dialog>
  )
}
