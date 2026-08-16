'use client'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

// NWS-style services coverflow carousel: the MIDDLE card is bigger than its
// neighbors; transitioning shrinks the center card while the next one grows.
// Auto-advances every 3 seconds (loading progress on the active dot),
// ONE-WAY infinite loop (end -> start continuously), pauses on hover.
// Card width is measured live so the active card stays CENTERED at every
// screen size (desktop, tablet, mobile).
export type ServiceItem = { title: string; body: string; href: string; image: string; badge: string }

const GAP = 18

export function ServicesSlider({ services }: { services: ServiceItem[] }) {
  const [active, setActive] = useState(0)
  const [cardW, setCardW] = useState(360)
  const [progressKey, setProgressKey] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const hover = useRef(false)
  const cardRef = useRef<HTMLElement | null>(null)
  const n = services.length

  // measure the actual card width so centering works at every screen size
  useEffect(() => {
    const measure = () => {
      if (cardRef.current) {
        const w = cardRef.current.getBoundingClientRect().width
        if (w > 0) setCardW(w)
      }
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (cardRef.current) ro.observe(cardRef.current)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  // auto-advance every 3 seconds — ONE-WAY loop (wraps end -> start)
  useEffect(() => {
    const tick = () => { if (!hover.current) { setActive(a => (a + 1) % n); setProgressKey(k => k + 1) } }
    timer.current = setInterval(tick, 3000)
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [n])

  const go = useCallback((a: number) => { setActive(((a % n) + n) % n); setProgressKey(k => k + 1) }, [n])

  // center the active card (percentages of the viewport-width track + real card width)
  const trackX = `calc(50% - ${active * (cardW + GAP) + cardW / 2}px)`

  return <div className="svc-slider svc-coverflow" role="region" aria-label="Our services carousel">
    <div className="svc-coverflow-viewport" onMouseEnter={() => { hover.current = true }} onMouseLeave={() => { hover.current = false }}>
      <div className="svc-coverflow-track" style={{ transform: `translateX(${trackX})` }}>
        {services.map((s, i) => {
          const dist = ((i - active + n * 3) % n) - (n >> 1) // shortest wrapped distance (negative = left)
          const isCenter = i === active
          // scale: center 1.12, immediate neighbors 0.92, far 0.84; opacity fades with distance
          const scale = isCenter ? 1.12 : Math.abs(dist) === 1 ? 0.92 : 0.84
          const opacity = isCenter ? 1 : Math.abs(dist) === 1 ? 0.85 : 0.45
          const z = isCenter ? 3 : Math.abs(dist) === 1 ? 2 : 1
          return <article key={s.title} ref={i === 0 ? (cardRef as never) : undefined} className={`svc-coverflow-card${isCenter ? ' is-center' : ''}`} style={{ transform: `scale(${scale})`, opacity, zIndex: z }} aria-hidden={!isCenter && Math.abs(dist) > 2 || undefined}>
            <div className="nws-card-media"><img src={s.image} alt={s.title} loading="lazy" /><span className="nws-card-badge">{s.badge}</span><Link href={s.href} className="nws-card-arrow" aria-label={`${s.title} — learn more`}><span>→</span></Link></div>
            <div className="nws-card-body"><h3>{s.title}</h3><p>{s.body}</p><Link className="nws-card-btn" href={s.href}>Learn more <span>→</span></Link></div>
          </article>
        })}
      </div>
    </div>

    <div className="svc-slider-controls">
      <button className="svc-slider-arrow" onClick={() => go(active - 1)} aria-label="Previous services">←</button>
      <div className="svc-slider-dots" role="tablist" aria-label="Service pages">
        {Array.from({ length: n }, (_, i) => <button key={i} className={`svc-slider-dot${i === active ? ' is-active' : ''}`} onClick={() => go(i)} aria-label={`Service ${i + 1}`} aria-selected={i === active}>
          {i === active && <span className="svc-progress" key={progressKey} aria-hidden="true" />}
        </button>)}
      </div>
      <button className="svc-slider-arrow" onClick={() => go(active + 1)} aria-label="Next services">→</button>
    </div>
  </div>
}
