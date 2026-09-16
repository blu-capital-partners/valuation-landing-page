import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

const SECTIONS = '.hero, .section, .quote-section'

// A nudge toward the next section, as on blucp.com. It advances from wherever
// you are rather than only off the hero, and steps aside once there is nothing
// below to scroll to.
export default function ScrollDown() {
  const [hidden, setHidden] = useState(false)
  const [onDark, setOnDark] = useState(false)

  useEffect(() => {
    const update = () => {
      const atEnd =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 120
      setHidden(atEnd)

      // The quote section is navy, so the control has to invert over it.
      const probe = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight - 48)
      setOnDark(probe.some((el) => el.classList?.contains('quote-section')))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  function next() {
    const header = document.querySelector('.site-header')
    const offset = (header?.getBoundingClientRect().height ?? 0) + 1
    const target = [...document.querySelectorAll<HTMLElement>(SECTIONS)].find(
      (el) => el.getBoundingClientRect().top > offset + 8,
    )
    if (target) {
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
    }
  }

  return (
    <button
      type="button"
      className={`scrolldown${hidden ? ' hide' : ''}${onDark ? ' scrolldown--dark' : ''}`}
      onClick={next}
      aria-label="Scroll to next section"
    >
      <ChevronDown size={26} aria-hidden="true" />
    </button>
  )
}
