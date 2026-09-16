import { useState } from 'react'
import { useAnchorScroll } from './lib/useAnchorScroll'
import Header from './components/Header'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
import Trust from './components/Trust'
import QuoteSection from './components/QuoteSection'
import Faq from './components/Faq'
import Footer from './components/Footer'
import WhitepaperDialog from './components/WhitepaperDialog'
import ConsentBanner from './components/ConsentBanner'
import ScrollDown from './components/ScrollDown'

export default function App() {
  const [whitepaperOpen, setWhitepaperOpen] = useState(false)
  const [consentOpen, setConsentOpen] = useState(false)
  useAnchorScroll()

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
        <QuoteSection />
        <Faq />
      </main>
      <Footer onCookieSettings={() => setConsentOpen(true)} />
      <ScrollDown />
      <WhitepaperDialog open={whitepaperOpen} onClose={() => setWhitepaperOpen(false)} />
      <ConsentBanner forceOpen={consentOpen} onClose={() => setConsentOpen(false)} />
    </>
  )
}
