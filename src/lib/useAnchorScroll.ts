import { useEffect } from 'react'

/**
 * In-page anchors, scrolled from JS. The CSS-only version was unreliable here:
 * the animated logo marquee triggers browser scroll anchoring, which cancels or
 * offsets a native smooth scroll part-way through.
 */
export function useAnchorScroll() {
  useEffect(() => {
    const headerOffset = () => document.querySelector('.site-header')?.getBoundingClientRect().height ?? 76

    const scrollToHash = (hash: string, smooth: boolean) => {
      const target = document.querySelector(hash)
      if (!target) return false
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset() - 12
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({ top, behavior: smooth && !reduce ? 'smooth' : 'auto' })
      return true
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null
      const hash = link?.getAttribute('href')
      if (!hash || hash === '#') return
      if (scrollToHash(hash, true)) {
        e.preventDefault()
        history.pushState(null, '', hash)
      }
    }

    // A page opened straight at /#quote needs the same offset
    if (location.hash) requestAnimationFrame(() => scrollToHash(location.hash, false))

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
