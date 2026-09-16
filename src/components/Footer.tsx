import { useState, type FormEvent } from 'react'
import { Building2, CalendarDays, Mail, MapPin, Phone } from 'lucide-react'
import { LinkedInIcon, YouTubeIcon } from './socialIcons'
import { CONTACT, FOOTER_LINKS } from '../content'
import { postForm } from '../lib/api'

type Status = 'idle' | 'sending' | { error: string }

export default function Footer({ onCookieSettings }: { onCookieSettings: () => void }) {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    setStatus('sending')
    const result = await postForm('/api/newsletter', data)
    setStatus(result.ok ? 'idle' : { error: result.error })
    if (result.ok) form.reset()
  }

  return (
    <footer className="site-footer">
      <div className="wrap newsletter">
        <h2 className="newsletter__title">
          Join <em>2,000+</em> investors and M&amp;A professionals
        </h2>
        <p className="newsletter__lede">
          2,000+ business owners, investors and M&amp;A professionals subscribe to BCP’s newsletter to stay in touch
          with trends and valuations for mid-market transactions in Europe.
        </p>
        <form className="newsletter__form" onSubmit={onSubscribe}>
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input id="newsletter-email" name="email" type="email" placeholder="Email address" required />
          <input className="hp" name="website_confirm" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button type="submit" className="btn btn--navy" disabled={status === 'sending'}>
            {status === 'sending' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
        {typeof status === 'object' && (
          <p className="newsletter__error" role="alert">
            {status.error}
          </p>
        )}
        <p className="newsletter__fine">
          By subscribing, you agree to our{' '}
          <a href={CONTACT.privacyUrl} target="_blank" rel="noreferrer">
            Privacy Policy
          </a>{' '}
          and consent to receive updates
        </p>
      </div>

      <div className="wrap site-footer__grid">
        <div className="site-footer__brand">
          <img src="/bcp-logo.svg" alt="Blu Capital Partners" width="192" height="40" />
          <p>© {new Date().getFullYear()} Blu Capital Partners</p>
        </div>

        <nav className="site-footer__col" aria-labelledby="footer-services">
          <h2 className="site-footer__heading" id="footer-services">
            Our services
          </h2>
          <ul>
            {FOOTER_LINKS.services.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="site-footer__col" aria-labelledby="footer-useful">
          <h2 className="site-footer__heading" id="footer-useful">
            Useful links
          </h2>
          <ul>
            {FOOTER_LINKS.useful.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
            <li>
              <button type="button" className="linklike" onClick={onCookieSettings}>
                Cookie settings
              </button>
            </li>
          </ul>
        </nav>

        <div className="site-footer__col site-footer__contact">
          <h2 className="site-footer__heading">Contact</h2>
          <ul>
            <li>
              <Building2 size={18} strokeWidth={1.75} aria-hidden="true" />
              <span>{CONTACT.company}</span>
            </li>
            <li>
              <MapPin size={18} strokeWidth={1.75} aria-hidden="true" />
              <a href={CONTACT.mapsUrl} target="_blank" rel="noreferrer">
                {CONTACT.address}
              </a>
            </li>
            <li>
              <Mail size={18} strokeWidth={1.75} aria-hidden="true" />
              <a href={`mailto:${CONTACT.email}`}>Email the valuation team</a>
            </li>
            <li>
              <Phone size={18} strokeWidth={1.75} aria-hidden="true" />
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a>
            </li>
            <li>
              <CalendarDays size={18} strokeWidth={1.75} aria-hidden="true" />
              <a href={CONTACT.bookingUrl} target="_blank" rel="noreferrer">
                Book an introductory call
              </a>
            </li>
            <li>
              <LinkedInIcon />
              <a href={CONTACT.linkedinUrl} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <YouTubeIcon />
              <a href={CONTACT.youtubeUrl} target="_blank" rel="noreferrer">
                YouTube Channel
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap site-footer__base">
        <p>{CONTACT.registration}</p>
      </div>
    </footer>
  )
}
