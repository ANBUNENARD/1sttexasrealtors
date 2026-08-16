'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Hero: "SERVING {area} AND NEARBY" — each area has its own photo displayed
// as a living Ken Burns "GIF" (slow zoom + drift). The area text and its photo
// change TOGETHER every 4 seconds, continuously, crossfading between areas.
const AREAS = [
  { name: 'Clear Lake City', img: '/assets/areas/clear-lake-sale-1-clear-lake-homes-for-sale-jpeg', alt: 'Homes for sale in Clear Lake City TX' },
  { name: 'League City',     img: '/assets/areas/league-city-1-4725-isla-canela-lane-239-jpeg',     alt: 'Homes for sale in League City TX' },
  { name: 'Friendswood',     img: '/assets/areas/friendswood-1-friendswood-homes-01-e1682175182867-jpeg', alt: 'Homes for sale in Friendswood TX' },
  { name: 'Seabrook',        img: '/assets/areas/seabrook-1-seabrook-homes-01-e1682175503186-jpeg',  alt: 'Homes for sale in Seabrook TX' },
  { name: 'Kemah',           img: '/assets/areas/kemah-1-kemah-homes-01-e1682175228189-jpeg',         alt: 'Homes for sale in Kemah TX' },
  { name: 'Nassau Bay',      img: '/assets/areas/nassau-bay-1-nassau-bay-homes-01-e1682175347786-jpeg', alt: 'Homes for sale in Nassau Bay TX' },
  { name: 'Galveston',       img: '/assets/areas/galveston-1-pirates-beach-239-jpeg',                 alt: 'Homes for sale in Galveston TX' },
  { name: 'Pearland',        img: '/assets/areas/pearland-1-pearland-homes-01-e1699454752509-jpeg',   alt: 'Homes for sale in Pearland TX' },
]

const SLIDE_MS = 4000 // 4 seconds per area — text + image change together

export function VideoHero({ started = true }: { started?: boolean }) {
  const [active, setActive] = useState(0)

  // single 4s timer drives BOTH the area text and its photo
  useEffect(() => {
    if (!started) return
    const interval = setInterval(() => setActive(a => (a + 1) % AREAS.length), SLIDE_MS)
    return () => clearInterval(interval)
  }, [started])

  return <section className="video-hero" aria-label="1st Texas Realtors">
    <div className="video-hero-media" aria-hidden="true">
      {AREAS.map((area, i) => (
        <div key={area.name} className={`video-hero-slide${i === active ? ' is-active' : ''}`}>
          {/* the "GIF" — the area photo living with a Ken Burns zoom, looping forever */}
          <Image src={area.img} alt={area.alt} fill sizes="100vw" quality={90} priority={i === 0} loading={i === 0 ? undefined : 'lazy'} className="video-hero-img" />
        </div>
      ))}
    </div>
    <div className="video-hero-overlay" aria-hidden="true" />
    <div className="video-hero-glow" aria-hidden="true" />
    <div className="video-hero-content">
      <h1 className="display-hero" style={{ opacity: 0, transform: 'translateY(32px)', animation: 'heroUp 1s var(--ease-expo) forwards .15s' }}>
        <span className="hero-line">Real estate guidance</span>
        <span className="hero-line hero-line-accent">that feels personal.</span>
      </h1>
      {/* area cycler — text changes every 4s, synced with the photo */}
      <p className="video-hero-cycler" style={{ opacity: 0, transform: 'translateY(24px)', animation: 'heroUp 1s var(--ease-expo) forwards .3s' }}>
        <span className="mono-label">Serving</span>
        <span className="cycler-line" aria-live="polite"><span key={active} className="cycler-word">{AREAS[active].name}</span></span>
        <span className="mono-label">and nearby</span>
      </p>
      <p className="video-hero-sub" style={{ opacity: 0, transform: 'translateY(24px)', animation: 'heroUp 1s var(--ease-expo) forwards .45s' }}>Top 3% Realtors in Clear Lake, great reviews, and real-time listings for the next move in your story.</p>
      <form className="hero-search" action="/home-search/" method="get" style={{ opacity: 0, transform: 'translateY(24px)', animation: 'heroUp 1s var(--ease-expo) forwards .6s' }}><input name="q" placeholder="Search homes in Clear Lake" aria-label="Search homes" /><button type="submit" aria-label="Search"><span>↗</span></button></form>
      <div className="hero-actions" style={{ opacity: 0, transform: 'translateY(24px)', animation: 'heroUp 1s var(--ease-expo) forwards .75s' }}><Link className="button button-red" href="/contact/">Contact a Realtor <span className="btn-arrow" aria-hidden="true">→</span></Link><Link className="button button-glass" href="/home-search/">Browse listings <span className="btn-arrow" aria-hidden="true">→</span></Link></div>
    </div>
    <div className="video-hero-proof"><div className="hero-trust"><div className="avatar-stack"><img src="/assets/reference/agents/David-Karstedt.jpg" alt="David Karstedt" /><img src="/assets/reference/agents/Mark-Bocado.jpg" alt="Mark Bocado" /><img src="/assets/reference/agents/Nancy-Estes.jpg" alt="Nancy Estes" /><img src="/assets/reference/agents/Matt-Bradley.jpg" alt="Matt Bradley" /></div><div><span className="stars" aria-label="Rated 5 out of 5 stars">★★★★★</span><small>Trusted by families across Clear Lake NASA</small></div></div><div className="hero-features"><div><strong>Family owned</strong><small>Since 2004 in Clear Lake</small></div><div><strong>Top 3% Realtors</strong><small>Clear Lake NASA expertise</small></div><div><strong>Real-time listings</strong><small>Homes for sale &amp; rent</small></div></div></div>
  </section>
}
