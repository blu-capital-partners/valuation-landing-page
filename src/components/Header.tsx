export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <a href="/" className="brand" aria-label="Blu Capital Partners home">
          <img src="/bcp-logo.svg" alt="Blu Capital Partners" width="192" height="40" />
          <span className="brand__rep">Representative of M&amp;A Worldwide</span>
        </a>
        <nav className="site-nav" aria-label="Page sections">
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="btn btn--primary btn--small" href="#quote">
          Get my quote
        </a>
      </div>
    </header>
  )
}
