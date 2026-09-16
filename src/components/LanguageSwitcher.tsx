import { useEffect, useState } from 'react'
import { TRANSLATE_LANGUAGES } from '../shared/formOptions'
import LanguagePicker from './LanguagePicker'

// Google Translate is driven entirely by the googtrans cookie, exactly as on blucp.com:
// setting it and reloading applies the translation, clearing it returns the page to English.

function currentLang(): string {
  if (typeof document === 'undefined') return 'en'
  const match = document.cookie.match(/googtrans=\/[a-z]{2}\/([a-z]{2})/)
  return match ? match[1] : 'en'
}

function setLang(code: string) {
  const host = location.hostname
  const expired = 'Thu, 01 Jan 1970 00:00:00 GMT'
  // Clear every scope the cookie may have been written to, or a stale one wins.
  for (const scope of ['', `;domain=${host}`, `;domain=.${host}`]) {
    document.cookie = `googtrans=;expires=${expired};path=/${scope}`
  }
  if (code !== 'en') {
    const value = `/en/${code}`
    document.cookie = `googtrans=${value};path=/`
    document.cookie = `googtrans=${value};path=/;domain=${host}`
    document.cookie = `googtrans=${value};path=/;domain=.${host}`
  }
  location.reload()
}

function useIsNarrow() {
  const [narrow, setNarrow] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)')
    const update = () => setNarrow(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return narrow
}

export default function LanguageSwitcher() {
  const [lang, setCurrent] = useState('en')
  const [pickerOpen, setPickerOpen] = useState(false)
  const narrow = useIsNarrow()

  // Read on mount only: the cookie is not available during the first render.
  useEffect(() => {
    setCurrent(currentLang())
  }, [])

  // The header has no room for a wheel, so on narrow screens the current
  // language opens one instead of the row sliding out.
  if (narrow) {
    return (
      <>
        <button
          type="button"
          className="lang-trigger notranslate"
          translate="no"
          onClick={() => setPickerOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={pickerOpen}
          aria-label={`Language: ${lang.toUpperCase()}. Change language`}
        >
          <span aria-hidden="true">{lang.toUpperCase()}</span>
          <svg className="lang-trigger__chev" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {pickerOpen && (
          <LanguagePicker current={lang} onPick={setLang} onClose={() => setPickerOpen(false)} />
        )}
      </>
    )
  }

  const others = TRANSLATE_LANGUAGES.filter(([code]) => code !== lang)

  return (
    <div className="lang notranslate" translate="no" tabIndex={0} aria-label="Select language">
      <div className="lang-others">
        {others.map(([code, label]) => (
          <button key={code} type="button" className="lang-opt" onClick={() => setLang(code)}>
            {label}
          </button>
        ))}
      </div>
      <span className="lang-cur" aria-hidden="true">
        {lang.toUpperCase()}
      </span>
    </div>
  )
}
