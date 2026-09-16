import { useEffect, useRef, useState } from 'react'
import { TRANSLATE_PICKER } from '../shared/formOptions'

const ITEM_H = 40
const SETTLE_MS = 220

type Props = {
  current: string
  onPick: (code: string) => void
  onClose: () => void
}

// A wheel in the manner of an iOS picker: the list scrolls under a fixed
// selection band, snaps to a row, and commits once the scrolling settles.
export default function LanguagePicker({ current, onPick, onClose }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const settleTimer = useRef<number | undefined>(undefined)
  const startIndex = Math.max(0, TRANSLATE_PICKER.findIndex(([code]) => code === current))
  const [active, setActive] = useState(startIndex)

  // Open on the current language without animating into place.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = startIndex * ITEM_H
  }, [startIndex])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function onScroll() {
    const el = scrollRef.current
    if (!el) return
    const index = Math.max(0, Math.min(TRANSLATE_PICKER.length - 1, Math.round(el.scrollTop / ITEM_H)))
    setActive(index)

    window.clearTimeout(settleTimer.current)
    settleTimer.current = window.setTimeout(() => {
      const code = TRANSLATE_PICKER[index][0]
      if (code !== current) onPick(code)
    }, SETTLE_MS)
  }

  function pick(index: number) {
    const el = scrollRef.current
    el?.scrollTo({ top: index * ITEM_H, behavior: 'smooth' })
    setActive(index)
    const code = TRANSLATE_PICKER[index][0]
    if (code !== current) {
      window.clearTimeout(settleTimer.current)
      window.setTimeout(() => onPick(code), SETTLE_MS)
    } else {
      onClose()
    }
  }

  return (
    <>
      <div className="langpicker__scrim" onClick={onClose} aria-hidden="true" />
      <div className="langpicker" role="dialog" aria-label="Select language">
        <div className="langpicker__band" aria-hidden="true" />
        <div className="langpicker__window" ref={scrollRef} onScroll={onScroll} role="listbox" tabIndex={-1}>
          <div className="langpicker__pad" aria-hidden="true" />
          {TRANSLATE_PICKER.map(([code, short, name], i) => (
            <button
              key={code}
              type="button"
              role="option"
              aria-selected={i === active}
              className={`langpicker__item${i === active ? ' is-active' : ''}`}
              onClick={() => pick(i)}
            >
              <span className="langpicker__code">{short}</span>
              <span className="langpicker__name">{name}</span>
            </button>
          ))}
          <div className="langpicker__pad" aria-hidden="true" />
        </div>
      </div>
    </>
  )
}
