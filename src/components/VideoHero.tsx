'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const slides = [
  { src: '/assets/reference/Clear-Lake-Texas-e1736781694121.jpg', alt: 'Clear Lake Texas waterfront homes' },
  { src: '/assets/reference/clearlaketxhomesforsale.jpg',         alt: 'Home for sale in Clear Lake TX' },
  { src: '/assets/reference/leaguecityhomesforsale.jpg',          alt: 'Home for sale in League City TX' },
  { src: '/assets/reference/seabrookhomesforsale.jpg',            alt: 'Home for sale in Seabrook TX' },
  { src: '/assets/reference/friendswoodhomesforsale.jpg',         alt: 'Home for sale in Friendswood TX' },
  { src: '/assets/reference/NASAhomesforsale.jpg',                alt: 'Home for sale near NASA Clear Lake' },
  { src: '/assets/reference/seabrookhomesforsale02.jpg',          alt: 'Waterfront home in Seabrook TX' },
]

export function VideoHero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => setActive(a => (a + 1) % slides.length), 7000)
    return () => clearInterval(interval)
  }, [paused])

  useEffect(() => {
    const onVisibility = () => { if (document.hidden) setPaused(true); else setPaused(false) }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  return <section className="video-hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-label="1st Texas Realtors">
    <div className="video-hero-media" aria-hidden="true">
      {slides.map((s, i) => (
        <div key={s.src} className={`video-hero-slide${i === active ? ' is-active' : ''}`}>
          <Image src={s.src} alt={s.alt} fill sizes="100vw" quality={80} priority={i === 0} loading={i === 0 ? undefined : 'lazy'} className="video-hero-img" />
        </div>
      ))}
    </div>
    <div className="video-hero-overlay" aria-hidden="true" />
    <div className="video-hero-glow" aria-hidden="true" />
    <div className="video-hero-logo-ghost" aria-hidden="true"><Image src="/assets/reference/1stTexasRealtors-logo.png" alt="" width={560} height={269} priority /></div>
    <div className="video-hero-content">
      <p className="mono-label video-hero-eyebrow">Family owned since 2004 · Clear Lake NASA</p>
      <h1 className="display-hero">Real estate guidance<br />that feels <em>personal.</em></h1>
      <p className="video-hero-sub">Top 3% Realtors in Clear Lake, great reviews, and real-time listings for the next move in your story.</p>
      <form className="hero-search" action="/home-search/" method="get"><input name="q" placeholder="Search homes in Clear Lake" aria-label="Search homes" /><button type="submit" aria-label="Search"><span>↗</span></button></form>
      <div className="hero-actions"><Link className="button button-primary" href="/contact/">Contact a Realtor</Link><Link className="button button-glass" href="/home-search/">Browse listings</Link></div>
    </div>
    <div className="video-hero-proof"><div className="hero-trust"><div className="avatar-stack"><img src="/assets/reference/agents/David-Karstedt.jpg" alt="David Karstedt" /><img src="/assets/reference/agents/Mark-Bocado.jpg" alt="Mark Bocado" /><img src="/assets/reference/agents/Nancy-Estes.jpg" alt="Nancy Estes" /><img src="/assets/reference/agents/Matt-Bradley.jpg" alt="Matt Bradley" /></div><div><span className="stars" aria-label="Rated 5 out of 5 stars">★★★★★</span><small>Trusted by families across Clear Lake NASA</small></div></div><div className="hero-features"><div><strong>Family owned</strong><small>Since 2004 in Clear Lake</small></div><div><strong>Top 3% Realtors</strong><small>Clear Lake NASA expertise</small></div><div><strong>Real-time listings</strong><small>Homes for sale &amp; rent</small></div></div></div>
  </section>
}
