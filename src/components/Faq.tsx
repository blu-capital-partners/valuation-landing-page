import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { FAQ } from '../content'

// Answers are stored as plain text, so any address in them is linked here rather
// than by putting markup into the content file.
const EMAIL = /([\w.+-]+@[\w-]+\.[\w.]+)/g
const IS_EMAIL = /^[\w.+-]+@[\w-]+\.[\w.]+$/

function withEmailLinks(text: string) {
  // split() with a capturing group keeps the matches, so each part is either
  // surrounding text or a whole address. IS_EMAIL is deliberately not global:
  // test() on a /g regex carries lastIndex between calls and would skip matches.
  return text.split(EMAIL).map((part, i) =>
    IS_EMAIL.test(part) ? (
      <a key={i} href={`mailto:${part}`}>
        {part}
      </a>
    ) : (
      part
    ),
  )
}

const DURATION = 260
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)'

type ItemProps = {
  q: string
  a: string
  open: boolean
  onOpen: () => void
  onClose: () => void
}

// <details> snaps open with no transition, so the panel height is animated here.
// On close the element is held open for the length of the animation and
// collapses at the end.
function FaqItem({ q, a, open, onOpen, onClose }: ItemProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const animation = useRef<Animation | null>(null)

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

  function collapse() {
    const details = detailsRef.current
    const panel = panelRef.current
    if (!details || !panel || !details.open) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      details.open = false
      return
    }
    run(panel.getBoundingClientRect().height, 0, () => {
      details.open = false
    })
  }

  function expand() {
    const details = detailsRef.current
    const panel = panelRef.current
    if (!details || !panel) return
    details.open = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // scrollHeight is only meaningful once open, so measure here and rise from zero.
    run(0, panel.scrollHeight)
  }

  function onToggle(e: MouseEvent<HTMLElement>) {
    e.preventDefault()
    if (detailsRef.current?.open) {
      onClose()
      collapse()
    } else {
      onOpen()
      expand()
    }
  }

  // Collapse when the parent hands the open slot to another question.
  useEffect(() => {
    if (!open && detailsRef.current?.open) collapse()
    // collapse reads refs only, so it does not belong in the dependency list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <details className="faq__item" ref={detailsRef}>
      <summary onClick={onToggle} aria-expanded={open}>
        {q}
      </summary>
      <div className="faq__panel" ref={panelRef}>
        <p>{withEmailLinks(a)}</p>
      </div>
    </details>
  )
}

export default function Faq() {
  // One open item at a time: opening a question closes whichever was open.
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)

  return (
    <section id="faq" className="section section--paper" aria-labelledby="faq-title">
      <div className="wrap faq">
        <div className="section__head">
          <h2 id="faq-title">Questions business owners ask</h2>
        </div>
        <div className="faq__list">
          {FAQ.map((item) => (
            <FaqItem
              key={item.q}
              q={item.q}
              a={item.a}
              open={openQuestion === item.q}
              onOpen={() => setOpenQuestion(item.q)}
              onClose={() => setOpenQuestion(null)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
