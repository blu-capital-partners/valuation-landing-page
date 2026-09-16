import { FAQ } from '../content'

export default function Faq() {
  return (
    <section id="faq" className="section section--paper" aria-labelledby="faq-title">
      <div className="wrap faq">
        <div className="section__head">
          <h2 id="faq-title">Questions business owners ask</h2>
        </div>
        <div className="faq__list">
          {FAQ.map((item) => (
            <details className="faq__item" key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
