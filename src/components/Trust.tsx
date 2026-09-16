import { CLIENT_LOGOS, CREDENTIALS, TESTIMONIALS } from '../content'

function LogoCard({ logo, duplicate, index }: { logo: (typeof CLIENT_LOGOS)[number]; duplicate: boolean; index: number }) {
  const img = <img src={logo.src} alt={duplicate ? '' : logo.alt} loading="lazy" />
  // The duplicated half is decorative, so it must not be reachable by keyboard.
  if (!logo.href || duplicate) {
    return (
      <div className="logobox" key={`${logo.alt}-${index}`} aria-hidden={duplicate}>
        {img}
      </div>
    )
  }
  return (
    <a
      className="logobox logobox--link"
      href={logo.href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${logo.alt} website`}
    >
      {img}
    </a>
  )
}

export function Trust() {
  return (
    <section id="trust" className="section" aria-labelledby="trust-title">
      <div className="wrap">
        <div className="section__head section__head--centred">
          <h2 id="trust-title">Valuations founders and CFOs rely on</h2>
          <p>
            Blu Capital Partners is an independent investment banking advisory firm in Bucharest and the exclusive
            Romanian member of M&amp;A Worldwide, a network of 450+ professionals.
          </p>
        </div>

        <dl className="creds">
          {CREDENTIALS.map((c) => (
            <div className="cred" key={c.label}>
              <dt className="cred__figure">{c.figure}</dt>
              <dd className="cred__label">{c.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function Clients() {
  return (
    <section id="clients" className="section section--paper" aria-label="What clients say, and who they are">
      <div className="wrap">
        <div className="quotes">
          {TESTIMONIALS.map((t) => (
            <figure className="quote" key={t.name}>
              <blockquote>
                <p>{t.quote}</p>
              </blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="logos">
          <h3 className="logos__label">Our clients</h3>
          {/* Continuous marquee, as on blucp.com: the list is rendered twice so the loop is seamless */}
          <div className="marquee">
            <div className="marquee__track">
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((l, i) => (
                <LogoCard key={`${l.alt}-${i}`} logo={l} duplicate={i >= CLIENT_LOGOS.length} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
