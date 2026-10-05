import { useState } from 'react'
import { useAnchorScroll } from './lib/useAnchorScroll'
import { useClarityClicks } from './lib/clarity'
import Header from './components/Header'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
import { Trust, Clients } from './components/Trust'
import QuoteSection from './components/QuoteSection'
import TalkFirst from './components/TalkFirst'
import Faq from './components/Faq'
import Footer from './components/Footer'
import WhitepaperDialog from './components/WhitepaperDialog'
import ConsentBanner from './components/ConsentBanner'

export default function App() {
  const [whitepaperOpen, setWhitepaperOpen] = useState(false)
  const [consentOpen, setConsentOpen] = useState(false)
  useAnchorScroll()
  useClarityClicks()

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero onWhitepaper={() => setWhitepaperOpen(true)} />
        <HowItWorks />
        <Pricing />
        <Trust />
        <Clients />
        <QuoteSection />
        <TalkFirst />
        <Faq />
      </main>
      <Footer onCookieSettings={() => setConsentOpen(true)} />
      <WhitepaperDialog open={whitepaperOpen} onClose={() => setWhitepaperOpen(false)} />
      <ConsentBanner forceOpen={consentOpen} onClose={() => setConsentOpen(false)} />
    </>
  )
}
