import { CLIENT_LOGOS, CREDENTIALS, TESTIMONIALS } from '../content'

export default function Trust() {
  return (
    <section id="trust" className="section" aria-labelledby="trust-title">
      <div className="wrap">
        <div className="section__head">
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
                <div className="logobox" key={`${l.alt}-${i}`} aria-hidden={i >= CLIENT_LOGOS.length}>
                  <img src={l.src} alt={i >= CLIENT_LOGOS.length ? '' : l.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
