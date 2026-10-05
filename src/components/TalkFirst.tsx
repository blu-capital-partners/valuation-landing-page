import { CONTACT } from '../content'

// The second customer path, a section of its own: for clients who want to speak to a banker before
// committing to a valuation. No form (the quote form is the page's only one): phone, WhatsApp and
// the booking link, with email beneath. Phone, WhatsApp and booking clicks are counted by
// useClarityClicks.
export default function TalkFirst() {
  return (
    <section id="talk-first" className="section talk-first" aria-labelledby="talk-first-title">
      <div className="wrap talk-first__grid">
        <div className="talk-first__intro">
          <h2 id="talk-first-title">Prefer to talk first?</h2>
          <p>
            Speak to a senior banker before you commit to a valuation. Call or message us, or book a 15-minute call at a
            time that suits you.
          </p>
        </div>

        <div className="talk-first__options">
          <a className="btn btn--navy" href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>
            Call {CONTACT.phone}
          </a>
          <a className="btn btn--outline" href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer">
            WhatsApp us
          </a>
          <a className="btn btn--outline" href={CONTACT.bookingUrl} target="_blank" rel="noreferrer">
            Book a 15-min call
          </a>
          <p className="talk-first__email">
            Or write to <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
