'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { testimonialsExact } from '@/content/testimonials-exact'

// Testimonials landing page — like the About page: ONE stationary (sticky)
// panel on the left. The reviews scroll on the right in ASCENDING order
// (shortest -> longest). As each review's text passes the middle of the
// viewport, the pinned panel transitions to that review — one by one until
// the last one.
//
// PHOTO reviews: the panel shows the dedicated photo card, which FLIPS
// AUTOMATICALLY (photo -> review text -> back to photo) on a timer — no
// clicking needed. The flip restarts whenever the panel switches reviews.
type Review = (typeof testimonialsExact)[number]
const withImg = (r: Review) => r.images && r.images.length > 0

const FLIP_MS = 4000 // hold the photo 4s, flip to the text, hold 4s, flip back

export function StickyReviews() {
  const [active, setActive] = useState(0)
  const [flipped, setFlipped] = useState(false)

  // ascending by quote length: photo reviews naturally intermix by length
  const reviews = [...testimonialsExact].sort((a, b) => a.quote.length - b.quote.length)

  // scroll-spy: the review currently passing the middle drives the panel
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length) {
          const top = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
          const idx = Number(top.target.getAttribute('data-rev'))
          if (!Number.isNaN(idx) && idx >= 0) setActive(idx)
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
    )
    reviews.forEach((_, i) => {
      const el = document.getElementById(`rev-${i}`)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [reviews])

  // AUTO-FLIP: whenever the active review changes (or on mount), start a
  // timer: photo -> text -> photo -> ... forever. No clicks required.
  useEffect(() => {
    setFlipped(false)
    if (!withImg(reviews[active])) return
    const t = setInterval(() => setFlipped(f => !f), FLIP_MS)
    return () => clearInterval(t)
  }, [active, reviews])

  const current = reviews[active]
  const hasPhoto = withImg(current)
  const img = hasPhoto ? `/assets/client/${current.images[0]}` : null
  const name = current.author.replace(/^—\s*|^–\s*/, '')
  const cleaned = current.quote.replace(/^[“”"'`\s]+/, '').replace(/[”"'`\s]+$/, '')

  return <div className="sticky-reviews-layout">
    {/* LEFT — the stationary panel; transitions to each review as you scroll */}
    <div className="sticky-reviews-media">
      <div className="sticky-reviews-panel">
        {reviews.map((r, i) => {
          const rImg = withImg(r) ? `/assets/client/${r.images[0]}` : null
          const n = r.author.replace(/^—\s*|^–\s*/, '')
          const q = r.quote.replace(/^[“”"'`\s]+/, '').replace(/[”"'`\s]+$/, '')
          const isActive = active === i
          // only the ACTIVE photo card flips (auto); inactive ones are hidden
          const flip = isActive && hasPhoto && flipped
          return (
            <div key={i} className={`sticky-rev-slide${isActive ? ' is-active' : ''}${isActive && hasPhoto ? ' srf-flip' : ''}${flip ? ' is-flipped' : ''}`} aria-hidden={!isActive || undefined}>
              {rImg
                ? <div className="srf-card">
                    <div className="srf-front"><Image src={rImg} alt={`${n} — 1st Texas Realtors in Clear Lake`} fill sizes="(max-width: 900px) 100vw, 42vw" className="sticky-rev-photo" priority={i === 0} /></div>
                    <div className="srf-back"><span className="srf-mark">“</span><blockquote>{q}</blockquote><cite>{r.author}</cite></div>
                  </div>
                : <div className="sticky-rev-quote"><span className="sticky-rev-mark">“</span><blockquote>{q}</blockquote><cite>{r.author}</cite></div>}
            </div>
          )
        })}
        <span className="sticky-rev-label">{String(active + 1).padStart(2, '0')} · {name}</span>
      </div>
      {/* auto-flip hint for photo reviews */}
      {hasPhoto && <p className="srf-hint">Photo flips automatically — no click needed</p>}
    </div>

    {/* RIGHT — each review is a section; as its text passes, the panel updates */}
    <div className="sticky-reviews-content">
      {reviews.map((review, i) => {
        const n = review.author.replace(/^—\s*|^–\s*/, '')
        const q = review.quote.replace(/^[“”"'`\s]+/, '').replace(/[”"'`\s]+$/, '')
        return (
          <section key={i} id={`rev-${i}`} data-rev={i} className="sticky-rev-section">
            <span className="sticky-rev-index">{String(i + 1).padStart(2, '0')}</span>
            <blockquote>“{q}”</blockquote>
            <cite>{review.author}</cite>
          </section>
        )
      })}
      <div className="page-cta"><p>For immediate assistance, call <strong>(281) 241-3121</strong>.</p><Link className="button button-dark" href="/contact/">Contact a Realtor <span>↗</span></Link></div>
    </div>
  </div>
}
