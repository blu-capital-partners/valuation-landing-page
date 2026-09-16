import { STEPS } from '../content'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section" aria-labelledby="how-title">
      <div className="wrap">
        <div className="section__head">
          <h2 id="how-title">How it works</h2>
          <p>Three steps, all online. You only speak to us when you want to.</p>
        </div>
        <ol className="steps">
          {STEPS.map((step, i) => (
            <li className="step" key={step.title}>
              <div className="step__marker" aria-hidden="true">
                {i + 1}
              </div>
              <p className="step__when">{step.when}</p>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__body">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
