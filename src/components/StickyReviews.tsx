'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { testimonialsExact } from '@/content/testimonials-exact'

// Testimonials landing page — like the About page: ONE stationary (sticky)
// panel on the left. The reviews scroll on the right in ASCENDING order
// (shortest -> longest). As each review's text passes the middle of the
// viewport, the pinned panel crossfades to that review — one by one until
// the last one.
type Review = (typeof testimonialsExact)[number]
const withImg = (r: Review) => r.images && r.images.length > 0

export function StickyReviews() {
  const [active, setActive] = useState(0)

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

  const current = reviews[active]
  const hasPhoto = withImg(current)
  const img = hasPhoto ? `/assets/client/${current.images[0]}` : null
  const name = current.author.replace(/^—\s*|^–\s*/, '')

  return <div className="sticky-reviews-layout">
    {/* LEFT — the stationary panel; crossfades to each review as you scroll */}
    <div className="sticky-reviews-media">
      <div className="sticky-reviews-panel">
        {reviews.map((r, i) => {
          const img = withImg(r) ? `/assets/client/${r.images[0]}` : null
          const n = r.author.replace(/^—\s*|^–\s*/, '')
          return (
            <div key={i} className={`sticky-rev-slide${active === i ? ' is-active' : ''}`} aria-hidden={active !== i || undefined}>
              {img
                ? <Image src={img} alt={`${n} — 1st Texas Realtors in Clear Lake`} fill sizes="(max-width: 900px) 100vw, 42vw" className="sticky-rev-photo" priority={i === 0} />
                : <div className="sticky-rev-quote"><span className="sticky-rev-mark">“</span><blockquote>{r.quote}</blockquote><cite>{r.author}</cite></div>}
            </div>
          )
        })}
        <span className="sticky-rev-label">{String(active + 1).padStart(2, '0')} · {name}</span>
      </div>
    </div>

    {/* RIGHT — each review is a section; as its text finishes, the panel updates */}
    <div className="sticky-reviews-content">
      {reviews.map((review, i) => {
        const n = review.author.replace(/^—\s*|^–\s*/, '')
        const cleaned = review.quote.replace(/^[“”"'`\s]+/, '').replace(/[”"'`\s]+$/, '')
        return (
          <section key={i} id={`rev-${i}`} data-rev={i} className="sticky-rev-section">
            <span className="sticky-rev-index">{String(i + 1).padStart(2, '0')}</span>
            <blockquote>“{cleaned}”</blockquote>
            <cite>{review.author}</cite>
          </section>
        )
      })}
      <div className="page-cta"><p>For immediate assistance, call <strong>(281) 241-3121</strong>.</p><a className="button button-dark" href="/contact/">Contact a Realtor <span>↗</span></a></div>
    </div>
  </div>
}
