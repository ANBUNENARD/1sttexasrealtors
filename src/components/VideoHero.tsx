'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { WordReveal } from '@/components/WordReveal'

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

export function VideoHero({ started = true }: { started?: boolean }) {
  const [mode, setMode] = useState<'video' | 'slideshow'>('video')
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // all clips are preloaded (auto) so switching is instant; only the active one plays
  useEffect(() => {
    if (mode !== 'video' || !started) return
    videoRefs.current.forEach((video, i) => {
      if (!video) return
      if (i === active) video.play().catch(() => {})
      else video.pause()
    })
  }, [active, mode, started])

  // rotate: each clip plays for its own duration, then the next dissolves in
  useEffect(() => {
    if (mode !== 'video' || paused || !started) return
    const current = VIDEOS[active]
    const timeout = setTimeout(() => setActive(a => (a + 1) % VIDEOS.length), current.dur)
    return () => clearTimeout(timeout)
  }, [mode, paused, started, active])

  // Ken Burns slideshow fallback
  useEffect(() => {
    if (mode !== 'slideshow' || paused || !started) return
    const interval = setInterval(() => setActive(a => (a + 1) % slides.length), 7000)
    return () => clearInterval(interval)
  }, [mode, paused, started])

  const onVideoError = () => setMode('slideshow')

  return <section className="video-hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-label="1st Texas Realtors">
    <div className="video-hero-media" aria-hidden="true">
      {mode === 'video' ? (
        VIDEOS.map((v, i) => (
          <div key={v.src} className={`video-hero-slide${i === active ? ' is-active' : ''}`}>
            <Image className="hero-poster" src={v.poster} alt="" fill sizes="100vw" priority={i === 0} />
            {/* all clips preloaded & playing continuously → crossfades are instant, no delay */}
            <video
              ref={el => { videoRefs.current[i] = el }}
              muted loop playsInline preload="auto" poster={v.poster}
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
      <p className="mono-label video-hero-eyebrow">Family owned since 2004 · Clear Lake NASA</p>
      <WordReveal as="h1" className="display-hero" play={started} emWord="personal.">Real estate guidance that feels personal.</WordReveal>
      <p className="video-hero-sub">Top 3% Realtors in Clear Lake, great reviews, and real-time listings for the next move in your story.</p>
      <form className="hero-search" action="/home-search/" method="get"><input name="q" placeholder="Search homes in Clear Lake" aria-label="Search homes" /><button type="submit" aria-label="Search"><span>↗</span></button></form>
      <div className="hero-actions"><Link className="button button-red" href="/contact/">Contact a Realtor</Link><Link className="button button-glass" href="/home-search/">Browse listings</Link></div>
    </div>
    <div className="video-hero-proof"><div className="hero-trust"><div className="avatar-stack"><img src="/assets/reference/agents/David-Karstedt.jpg" alt="David Karstedt" /><img src="/assets/reference/agents/Mark-Bocado.jpg" alt="Mark Bocado" /><img src="/assets/reference/agents/Nancy-Estes.jpg" alt="Nancy Estes" /><img src="/assets/reference/agents/Matt-Bradley.jpg" alt="Matt Bradley" /></div><div><span className="stars" aria-label="Rated 5 out of 5 stars">★★★★★</span><small>Trusted by families across Clear Lake NASA</small></div></div><div className="hero-features"><div><strong>Family owned</strong><small>Since 2004 in Clear Lake</small></div><div><strong>Top 3% Realtors</strong><small>Clear Lake NASA expertise</small></div><div><strong>Real-time listings</strong><small>Homes for sale &amp; rent</small></div></div></div>
  </section>
}
