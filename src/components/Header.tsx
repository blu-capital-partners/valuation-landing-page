import { CONTACT } from '../content'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        {/* Two separate destinations, so they cannot be nested anchors */}
        <div className="brand">
          <a className="brand__logo" href={CONTACT.siteUrl} aria-label="Blu Capital Partners home">
            <img src="/bcp-logo.svg" alt="Blu Capital Partners" width="192" height="40" />
          </a>
          <a className="brand__rep" href={CONTACT.maWorldwideUrl} target="_blank" rel="noreferrer">
            Representative of M&amp;A Worldwide
          </a>
        </div>
        <nav className="site-nav" aria-label="Page sections">
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <LanguageSwitcher />
        <a className="btn btn--primary btn--small" href="#quote">
          Get my quote
        </a>
      </div>
    </header>
  )
}
