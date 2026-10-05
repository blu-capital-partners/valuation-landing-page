import { useEffect } from 'react'
import { CONTACT } from '../content'

// Microsoft Clarity custom events and session tags, to measure the split between the two customer
// paths (self-serve quote, talk to a banker first). Each call does nothing unless Clarity is on the
// page, which it is only after the visitor accepted cookies (analytics.ts, VITE_CLARITY_ID).

export const CLARITY_EVENTS = [
  'cta_self_serve',
  'cta_talk_first',
  'quote_shown',
  'choice_upfront',
  'choice_after_delivery',
  'click_phone',
  'click_whatsapp',
  'click_book_call',
] as const

export type ClarityEvent = (typeof CLARITY_EVENTS)[number]
export type ClarityPath = 'self_serve' | 'talk_first'

const isEvent = (v: unknown): v is ClarityEvent => (CLARITY_EVENTS as readonly unknown[]).includes(v)
const isPath = (v: unknown): v is ClarityPath => v === 'self_serve' || v === 'talk_first'

export function clarityEvent(name: ClarityEvent) {
  window.clarity?.('event', name)
}

// The session is tagged with the path of the first CTA clicked, and only that one.
let pathTagged = false
export function clarityTagPath(path: ClarityPath) {
  if (pathTagged || !window.clarity) return
  pathTagged = true
  window.clarity('set', 'path', path)
}

function eventForLink(href: string): ClarityEvent | null {
  if (href.startsWith('tel:')) return 'click_phone'
  if (href.startsWith(CONTACT.whatsappUrl)) return 'click_whatsapp'
  if (href.startsWith(CONTACT.bookingUrl)) return 'click_book_call'
  return null
}

/**
 * One listener for every tracked click: an element with data-clarity-event (and optionally
 * data-clarity-path) fires that event, and every phone, WhatsApp and booking link fires its own.
 * Capture phase, so links whose scroll calls preventDefault are still counted.
 */
export function useClarityClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      const tagged = target?.closest?.('[data-clarity-event]')
      if (tagged) {
        const path = tagged.getAttribute('data-clarity-path')
        const name = tagged.getAttribute('data-clarity-event')
        if (isPath(path)) clarityTagPath(path)
        if (isEvent(name)) clarityEvent(name)
      }
      const href = target?.closest?.('a[href]')?.getAttribute('href')
      const linkEvent = href ? eventForLink(href) : null
      if (linkEvent) clarityEvent(linkEvent)
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])
}
