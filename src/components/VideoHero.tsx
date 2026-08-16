'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const slides = [
  { src: '/assets/reference/Clear-Lake-Texas-e1736781694121.jpg', alt: 'Clear Lake Texas waterfront homes' },
  { src: '/assets/reference/clearlaketxhomesforsale.jpg',         alt: 'Home for sale in Clear Lake TX' },
  { src: '/assets/reference/leaguecityhomesforsale.jpg',          alt: 'Home for sale in League City TX' },
  { src: '/assets/reference/seabrookhomesforsale.jpg',            alt: 'Home for sale in Seabrook TX' },
]

// 4 house "GIFs" — real home footage, each trimmed to a short looping clip
const VIDEOS = [
  { src: '/videos/gif-lake-house.mp4',    poster: '/assets/reference/Clear-Lake-Texas-e1736781694121.jpg', dur: 3000 },   // house near a lake — 3s
  { src: '/videos/gif-aerial-house.mp4',  poster: '/assets/reference/leaguecityhomesforsale.jpg',          dur: 3000 },   // aerial beautiful house — 3s
  { src: '/videos/gif-garden-house.mp4',  poster: '/assets/reference/friendswoodhomesforsale.jpg',         dur: 5000 },   // garden pans to house — 5s
  { src: '/videos/gif-river-houses.mp4',  poster: '/assets/reference/seabrookhomesforsale02.jpg',          dur: 4000 },   // aerial houses by river — 4s
]

// NWS-style rotating area names (your own service areas)
const AREAS = ['Clear Lake City', 'League City', 'Friendswood', 'Seabrook', 'Kemah', 'Nassau Bay', 'Galveston', 'Pearland']

export function VideoHero({ started = true }: { started?: boolean }) {
  const [mode, setMode] = useState<'video' | 'slideshow'>('video')
  const [active, setActive] = useState(0)
  const [areaIdx, setAreaIdx] = useState(0)

  // rotate: each clip plays for its own duration, then the next cuts in instantly
  useEffect(() => {
    if (mode !== 'video' || !started) return
    const current = VIDEOS[active]
    const timeout = setTimeout(() => setActive(a => (a + 1) % VIDEOS.length), current.dur)
    return () => clearTimeout(timeout)
  }, [mode, started, active])

  // NWS-style location word cycler
  useEffect(() => {
    if (!started) return
    const interval = setInterval(() => setAreaIdx(i => (i + 1) % AREAS.length), 2400)
    return () => clearInterval(interval)
  }, [started])

  // Ken Burns slideshow fallback
  useEffect(() => {
    if (mode !== 'slideshow' || !started) return
    const interval = setInterval(() => setActive(a => (a + 1) % slides.length), 7000)
    return () => clearInterval(interval)
  }, [mode, started])

  const onVideoError = () => setMode('slideshow')

  return <section className="video-hero" aria-label="1st Texas Realtors">
    <div className="video-hero-media" aria-hidden="true">
      {mode === 'video' ? (
        VIDEOS.map((v, i) => (
          <div key={v.src} className={`video-hero-slide${i === active ? ' is-active' : ''}`}>
            <Image className="hero-poster" src={v.poster} alt="" fill sizes="100vw" priority={i === 0} />
            <video
              autoPlay muted loop playsInline preload="auto" poster={v.poster}
              className="hero-video" onError={onVideoError} aria-hidden="true"
            >
              <source src={v.src} type="video/mp4" />
            </video>
          </div>
        ))
      ) : (
        slides.map((s, i) => (
          <div key={s.src} className={`video-hero-slide${i === active ? ' is-active' : ''}`}>
            <Image src={s.src} alt={s.alt} fill sizes="100vw" quality={80} priority={i === 0} loading={i === 0 ? undefined : 'lazy'} className="video-hero-img" />
          </div>
        ))
      )}
    </div>
    <div className="video-hero-overlay" aria-hidden="true" />
    <div className="video-hero-glow" aria-hidden="true" />
    <div className="video-hero-content">
      {/* NWS-style staggered headline lines */}
      <h1 className="display-hero" style={{ opacity: 0, transform: 'translateY(32px)', animation: 'heroUp 1s var(--ease-expo) forwards .15s' }}>
        <span className="hero-line">Real estate guidance</span>
        <span className="hero-line hero-line-accent">that feels personal.</span>
      </h1>
      {/* NWS-style location cycler */}
      <p className="video-hero-cycler" style={{ opacity: 0, transform: 'translateY(24px)', animation: 'heroUp 1s var(--ease-expo) forwards .3s' }}>
        <span className="mono-label">Serving</span>
        <span className="cycler-line" aria-live="polite"><span key={areaIdx} className="cycler-word">{AREAS[areaIdx]}</span></span>
        <span className="mono-label">and nearby</span>
      </p>
      <p className="video-hero-sub" style={{ opacity: 0, transform: 'translateY(24px)', animation: 'heroUp 1s var(--ease-expo) forwards .45s' }}>Top 3% Realtors in Clear Lake, great reviews, and real-time listings for the next move in your story.</p>
      <form className="hero-search" action="/home-search/" method="get" style={{ opacity: 0, transform: 'translateY(24px)', animation: 'heroUp 1s var(--ease-expo) forwards .6s' }}><input name="q" placeholder="Search homes in Clear Lake" aria-label="Search homes" /><button type="submit" aria-label="Search"><span>↗</span></button></form>
      <div className="hero-actions" style={{ opacity: 0, transform: 'translateY(24px)', animation: 'heroUp 1s var(--ease-expo) forwards .75s' }}><Link className="button button-red" href="/contact/">Contact a Realtor <span className="btn-arrow" aria-hidden="true">→</span></Link><Link className="button button-glass" href="/home-search/">Browse listings <span className="btn-arrow" aria-hidden="true">→</span></Link></div>
    </div>
    <div className="video-hero-proof"><div className="hero-trust"><div className="avatar-stack"><img src="/assets/reference/agents/David-Karstedt.jpg" alt="David Karstedt" /><img src="/assets/reference/agents/Mark-Bocado.jpg" alt="Mark Bocado" /><img src="/assets/reference/agents/Nancy-Estes.jpg" alt="Nancy Estes" /><img src="/assets/reference/agents/Matt-Bradley.jpg" alt="Matt Bradley" /></div><div><span className="stars" aria-label="Rated 5 out of 5 stars">★★★★★</span><small>Trusted by families across Clear Lake NASA</small></div></div><div className="hero-features"><div><strong>Family owned</strong><small>Since 2004 in Clear Lake</small></div><div><strong>Top 3% Realtors</strong><small>Clear Lake NASA expertise</small></div><div><strong>Real-time listings</strong><small>Homes for sale &amp; rent</small></div></div></div>
  </section>
}
