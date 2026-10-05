import { ROUTES, STEPS } from '../content'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section" aria-labelledby="how-title">
      <div className="wrap">
        <div className="section__head">
          <h2 id="how-title">How it works</h2>
          <p>Choose how you start: online in minutes, or with a banker on the phone first.</p>
        </div>
        <ul className="routes">
          {ROUTES.map((route) => (
            <li className={`route route--${route.key}`} key={route.key}>
              <h3 className="route__title">{route.title}</h3>
              <p className="route__body">{route.body}</p>
              <a className="route__link" href={route.href} data-clarity-event={route.event} data-clarity-path={route.path}>
                {route.link}
              </a>
            </li>
          ))}
        </ul>
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
