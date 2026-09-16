import { useEffect, useState } from 'react'
import { loadTrackers, readConsent, saveConsent } from '../lib/analytics'
import { CONTACT } from '../content'

export default function ConsentBanner({ forceOpen, onClose }: { forceOpen: boolean; onClose: () => void }) {
  const [undecided, setUndecided] = useState(false)

  useEffect(() => {
    const consent = readConsent()
    if (consent === 'accepted') loadTrackers()
    setUndecided(consent === null)
  }, [])

  if (!undecided && !forceOpen) return null

  const choose = (value: 'accepted' | 'rejected') => {
    saveConsent(value)
    setUndecided(false)
    onClose()
  }

  return (
    <div className="cookie" role="region" aria-label="Cookie consent">
      <p>
        We use cookies to measure how visitors find this page (Google Analytics, Meta and LinkedIn). They load only
        if you accept. <a href={CONTACT.privacyUrl}>Privacy policy</a>
        {forceOpen && !undecided && <> Your current choice: {readConsent() === 'accepted' ? 'accepted' : 'rejected'}.</>}
      </p>
      <div className="cookie__actions">
        <button type="button" className="btn btn--outline btn--small" onClick={() => choose('rejected')}>
          Reject
        </button>
        <button type="button" className="btn btn--navy btn--small" onClick={() => choose('accepted')}>
          Accept
        </button>
      </div>
    </div>
  )
}
