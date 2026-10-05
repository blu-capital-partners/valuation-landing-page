import { useEffect, useRef } from 'react'
import HeroBadges from './HeroBadges'

export default function Hero({ onWhitepaper }: { onWhitepaper: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Autoplay only when the visitor has not asked for reduced motion; otherwise the poster stays.
  useEffect(() => {
    const video = videoRef.current
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    video.play().catch(() => {
      /* autoplay blocked: poster frame remains visible */
    })
  }, [])

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <h1 id="hero-title" className="hero__title">
          {/* Punctuation sits inside each emphasised phrase: Google Translate
              handles text nodes separately and rejoins them with a space, which
              otherwise strands the comma and full stop. */}
          Get an <strong>instant business valuation,</strong> reviewed by a{' '}
          <strong>senior M&amp;A banker.</strong>
        </h1>
        <HeroBadges />
        <div className="hero__copy">
          <p className="hero__lede">
            Submit your company details and receive a valuation offer in less than 60 seconds.
          </p>
          {/* The two customer paths, side by side and equal: the self-serve quote, or a banker first. */}
          <div className="hero__actions hero__actions--paths">
            <a className="btn btn--primary" href="#quote" data-clarity-event="cta_self_serve" data-clarity-path="self_serve">
              Get your price in 60 seconds
            </a>
            <a className="btn btn--outline" href="#talk-first" data-clarity-event="cta_talk_first" data-clarity-path="talk_first">
              Talk to a banker first
            </a>
          </div>
          <button type="button" className="linklike hero__why" onClick={onWhitepaper}>
            Why is valuing my business important?
          </button>
          <p className="hero__proof">
            From €4,000. Report in 10 business days, or in 72 hours with Express delivery.
          </p>
        </div>
        <div className="hero__media">
          <video
            ref={videoRef}
            className="hero__video"
            src="/hero.mp4"
            poster="/hero-poster.jpg"
            muted
            loop
            playsInline
            preload="auto"
            width={1920}
            height={1080}
            aria-label="Animation of the valuation platform comparing company multiples and calculating a valuation"
          />
        </div>
      </div>
    </section>
  )
}
