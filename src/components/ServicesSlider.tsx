'use client'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

// NWS-style services slider: 3 cards per view (1 on mobile), arrows + dots,
// auto-advances every 5 seconds, pauses on hover, loops infinitely.
export type ServiceItem = { title: string; body: string; href: string; image: string; badge: string }

export function ServicesSlider({ services }: { services: ServiceItem[] }) {
  const [page, setPage] = useState(0)
  const [perView, setPerView] = useState(3)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const hover = useRef(false)

  useEffect(() => {
    const check = () => setPerView(window.innerWidth > 1000 ? 3 : window.innerWidth > 640 ? 2 : 1)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const pages = Math.max(1, Math.ceil(services.length / perView))
  const safePage = page >= pages ? pages - 1 : page

  // auto-advance every 5 seconds
  useEffect(() => {
    const tick = () => { if (!hover.current) setPage(p => (p + 1) % pages) }
    timer.current = setInterval(tick, 5000)
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [pages, perView])

  const go = useCallback((p: number) => setPage(((p % pages) + pages) % pages), [pages])

  return <div className="svc-slider" role="region" aria-label="Our services carousel">
    <div className="svc-slider-viewport" onMouseEnter={() => { hover.current = true }} onMouseLeave={() => { hover.current = false }}>
      <div className="svc-slider-track" style={{ transform: `translateX(-${safePage * (100 / perView)}%)` }}>
        {services.map(s => <article className="svc-slider-card" key={s.title}>
          <div className="nws-card-media"><img src={s.image} alt={s.title} loading="lazy" /><span className="nws-card-badge">{s.badge}</span><Link href={s.href} className="nws-card-arrow" aria-label={`${s.title} — learn more`}><span>→</span></Link></div>
          <div className="nws-card-body"><h3>{s.title}</h3><p>{s.body}</p><Link className="nws-card-btn" href={s.href}>Learn more <span>→</span></Link></div>
        </article>)}
      </div>
    </div>

    <div className="svc-slider-controls">
      <button className="svc-slider-arrow" onClick={() => go(safePage - 1)} aria-label="Previous services">←</button>
      <div className="svc-slider-dots" role="tablist" aria-label="Service pages">
        {Array.from({ length: pages }, (_, i) => <button key={i} className={`svc-slider-dot${i === safePage ? ' is-active' : ''}`} onClick={() => go(i)} aria-label={`Page ${i + 1}`} aria-selected={i === safePage} />)}
      </div>
      <button className="svc-slider-arrow" onClick={() => go(safePage + 1)} aria-label="Next services">→</button>
    </div>
  </div>
}
