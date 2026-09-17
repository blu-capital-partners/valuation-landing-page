import { useEffect, useRef, useState } from 'react'

const DURATION = 1400

// The credential figures are written as copy ("100+", "1m+", "€30bn"), so the
// number is pulled out of the string and the prefix and suffix are kept intact.
function parse(figure: string) {
  const match = figure.match(/^(\D*)([\d.,]+)(.*)$/s)
  if (!match) return null
  const [, prefix, digits, suffix] = match
  const value = Number(digits.replace(/,/g, ''))
  if (!Number.isFinite(value)) return null
  const decimals = digits.includes('.') ? digits.split('.')[1].length : 0
  const grouped = digits.includes(',')
  return { prefix, value, suffix, decimals, grouped }
}

function format(n: number, decimals: number, grouped: boolean) {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouped,
  })
}

export default function CountUp({ figure }: { figure: string }) {
  const parsed = parse(figure)
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(parsed ? 0 : null)

  useEffect(() => {
    const node = ref.current
    if (!parsed || !node) return

    // Nothing to animate for someone who asked for less motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(parsed.value)
      return
    }

    let frame = 0
    let started = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return
        started = true
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION)
          // ease-out, so it decelerates into the final figure
          setShown(parsed.value * (1 - Math.pow(1 - t, 3)))
          if (t < 1) frame = requestAnimationFrame(tick)
          else setShown(parsed.value)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [figure])

  // translate="no" matters as much as the animation: Google Translate replaces
  // the text nodes it touches, and React's later writes then land on detached
  // nodes, freezing the figure at its first value. Figures are also built as a
  // single string so there is one text node to update, not three.
  if (!parsed || shown === null)
    return (
      <span ref={ref} className="notranslate" translate="no">
        {figure}
      </span>
    )

  return (
    <span ref={ref} className="notranslate" translate="no">
      {`${parsed.prefix}${format(shown, parsed.decimals, parsed.grouped)}${parsed.suffix}`}
    </span>
  )
}
