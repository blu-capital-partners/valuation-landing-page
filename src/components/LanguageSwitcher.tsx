import { useEffect, useState } from 'react'
import { TRANSLATE_LANGUAGES } from '../shared/formOptions'

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

export default function LanguageSwitcher() {
  const [lang, setCurrent] = useState('en')

  // Read on mount only: the cookie is not available during server-side or first render.
  useEffect(() => {
    setCurrent(currentLang())
  }, [])

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
