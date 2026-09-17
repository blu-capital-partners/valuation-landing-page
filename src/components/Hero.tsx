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
          <div className="hero__actions">
            <a className="btn btn--primary" href="#quote">
              Calculate my valuation price
            </a>
            <button type="button" className="btn btn--outline" onClick={onWhitepaper}>
              Why is valuing my business important?
            </button>
          </div>
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
