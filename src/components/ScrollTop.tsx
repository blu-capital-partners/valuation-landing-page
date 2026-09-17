import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

// Appears once the visitor is a screen or so down the page, and returns them to
// the top. Stays clear of the cookie banner while that is showing.
export default function ScrollTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <button
      type="button"
      className={`scrolltop${visible ? '' : ' hide'}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp size={22} aria-hidden="true" />
    </button>
  )
}
