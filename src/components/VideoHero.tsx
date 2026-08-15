'use client'
import Image from 'next/image'
import Link from 'next/link'
import { WordReveal } from '@/components/WordReveal'

export function VideoHero({ started = true }: { started?: boolean }) {
  return <section className="video-hero" aria-label="1st Texas Realtors">
    <div className="video-hero-media" aria-hidden="true">
      {/* vintage Seabrook Quadrangle map — slow cinematic pan */}
      <div className="hero-map-layer">
        <Image src="/assets/reference/seabrook-quadrangle-map.png" alt="" fill sizes="100vw" priority className="hero-map-img" />
      </div>
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
