import { useRef, useState, type MouseEvent } from 'react'
import { FAQ } from '../content'

const DURATION = 260
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)'

// <details> snaps open with no transition, so the panel height is animated here instead.
// On close the element stays open for the length of the animation and collapses at the end.
function FaqItem({ q, a }: { q: string; a: string }) {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const animation = useRef<Animation | null>(null)
  const [open, setOpen] = useState(false)

  function run(from: number, to: number, onDone?: () => void) {
    const panel = panelRef.current
    if (!panel) return
    animation.current?.cancel()
    animation.current = panel.animate(
      { height: [`${from}px`, `${to}px`], opacity: to > from ? [0, 1] : [1, 0] },
      { duration: DURATION, easing: EASING },
    )
    animation.current.onfinish = () => {
      animation.current = null
      onDone?.()
    }
  }

  function onToggle(e: MouseEvent<HTMLElement>) {
    e.preventDefault()
    const details = detailsRef.current
    const panel = panelRef.current
    if (!details || !panel) return

    const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (details.open) {
      setOpen(false)
      if (instant) {
        details.open = false
        return
      }
      // Measure before collapsing, then run down to zero.
      run(panel.getBoundingClientRect().height, 0, () => {
        details.open = false
      })
    } else {
      details.open = true
      setOpen(true)
      if (instant) return
      // scrollHeight is only meaningful once the element is open, so measure here
      // and animate up from zero rather than from the height it already has.
      run(0, panel.scrollHeight)
    }
  }

  return (
    <details className="faq__item" ref={detailsRef}>
      <summary onClick={onToggle} aria-expanded={open}>
        {q}
      </summary>
      <div className="faq__panel" ref={panelRef}>
        <p>{a}</p>
      </div>
    </details>
  )
}

export default function Faq() {
  return (
    <section id="faq" className="section section--paper" aria-labelledby="faq-title">
      <div className="wrap faq">
        <div className="section__head">
          <h2 id="faq-title">Questions business owners ask</h2>
        </div>
        <div className="faq__list">
          {FAQ.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  )
}
