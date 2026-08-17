'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { testimonialsExact } from '@/content/testimonials-exact'

// Reviews landing page — TWO sticky columns (NOT the About single-panel):
// - The FIRST review card of EACH column is sticky (stays pinned while you
//   scroll). As you scroll down, the pinned card TRANSITIONS to the next
//   review (scroll-spy: whichever review is passing the middle of the column
//   becomes the pinned card, with a crossfade + zoom).
// - The original photo cards flow below in each column.
// - Photo cards FLIP ON HOVER (no click needed): hover the photo -> it flips
//   to the review text; leave -> flips back.
// - First 6 shown; "Show more" appears when you scroll down past them.
type Review = (typeof testimonialsExact)[number]
const withImg = (r: Review) => r.images && r.images.length > 0

export function ReviewsPage() {
  const [showAll, setShowAll] = useState(false)
  const [showMoreVisible, setShowMoreVisible] = useState(false)
  const flowRef = useRef<HTMLDivElement>(null)

  // image reviews first (ascending), then the rest (ascending)
  const reviews = [...testimonialsExact]
    .sort((a, b) => a.quote.length - b.quote.length)
    .sort((a, b) => Number(withImg(b)) - Number(withImg(a)))
  const visible = showAll ? reviews : reviews.slice(0, 6)

  // split the visible list into the two columns (alternating)
  const colA = visible.filter((_, i) => i % 2 === 0)
  const colB = visible.filter((_, i) => i % 2 === 1)

  // Show More appears when you scroll DOWN past the cards (fires when the
  // bottom of the cards area enters the lower part of the viewport)
  useEffect(() => {
    const el = flowRef.current
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setShowMoreVisible(true) })
    }, { rootMargin: '0px 0px -20% 0px', threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [visible.length])

  return <div className="reviews-page-wrap">
    <div className="reviews-summary"><div className="reviews-summary-item"><strong>74</strong><span>Client reviews</span></div><div className="reviews-summary-item"><strong>Top 3%</strong><span>Texas Monthly since 2010</span></div></div>

    <div className="reviews-cols" ref={flowRef}>
      <ReviewColumn reviews={colA} column="A" />
      <ReviewColumn reviews={colB} column="B" />
    </div>

    {!showAll
      ? <div className={`reviews-more-wrap${showMoreVisible ? ' is-visible' : ''}`}><button className="reviews-more" onClick={() => setShowAll(true)}>Show more reviews <span>↓</span></button><p className="reviews-more-note">Showing 6 of {reviews.length} reviews — scroll down and click to see all</p></div>
      : <div className="reviews-more-wrap is-visible"><button className="reviews-more" onClick={() => setShowAll(false)}>Show fewer reviews <span>↑</span></button><p className="reviews-more-note">Showing all {reviews.length} reviews — click to shorten back to 6</p></div>}

    <div className="trust-banner"><span className="trust-banner-label">Proud members of</span><div className="trust-banner-logos"><img src="/assets/client/Texas-Monthly-5-Star-Real-Estate-Agent.png" alt="Texas Monthly Five-Star Real Estate Agent" className="badge-logo" /><img src="/assets/client/Equal-Housing-Opportunity-Realtors.gif" alt="Equal Housing Opportunity" /><img src="/assets/client/Multiple-Listing-Service-Realtors.gif" alt="Member of the Multiple Listing Service" /><img src="/assets/client/Realtor-Association.gif" alt="Realtor Association Member" /></div></div>
    <p className="area-note">1st Texas Realtors reviews in Baytown, Clear Lake City, Clear Lake Shores, Deer Park, Dickinson, El Lago, Friendswood, Galveston, Kemah, La Porte, League City, Nassau Bay, Pasadena, Pearland, Seabrook, Taylor Lake Village, Texas City, Tiki Island and Webster.</p>
  </div>
}

// one sticky column: a pinned card on top + the flow of original cards below
function ReviewColumn({ reviews, column }: { reviews: Review[]; column: string }) {
  const [active, setActive] = useState(0)

  // scroll-spy: the review currently passing the middle of the column becomes
  // the pinned card — the pinned card TRANSITIONS to another review on scroll
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(`.review-col[data-col="${column}"] .review-flow-card`))
    if (!els.length) return
    const obs = new IntersectionObserver(entries => {
      const vis = entries.filter(e => e.isIntersecting)
      if (vis.length) {
        const top = vis.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        const idx = Number(top.target.getAttribute('data-idx'))
        if (!Number.isNaN(idx) && idx >= 0 && idx < reviews.length) setActive(idx)
      }
    }, { rootMargin: '-25% 0px -55% 0px', threshold: 0 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [reviews.length, column])

  const pinned = reviews[active] || reviews[0]
  if (!pinned) return null

  return <div className="review-col" data-col={column}>
    {/* STICKY pinned card — stays in place; changes to another review as you scroll */}
    <div className="review-col-sticky">
      <DropCard review={pinned} key={active} pinned />
    </div>
    {/* the ORIGINAL cards flow below */}
    {reviews.map((review, i) => (
      <div className="review-flow-card" data-idx={i} key={`${review.author}-${i}`}>
        <DropCard review={review} />
      </div>
    ))}
  </div>
}

// one review card — photo cards FLIP ON HOVER; text cards are plain
function DropCard({ review, pinned = false }: { review: Review; pinned?: boolean }) {
  const hasPhoto = withImg(review)
  const img = hasPhoto ? `/assets/client/${review.images[0]}` : null
  const cleaned = review.quote.replace(/^[“”"'`\s]+/, '').replace(/[”"'`\s]+$/, '')
  const name = review.author.replace(/^—\s*|^–\s*/, '')

  if (hasPhoto && img) {
    return <div className={`testimonial-block drop-card photo-card hover-flip${pinned ? ' is-pinned' : ''}`}>
      <div className="photo-front">
        <span className="photo-frame"><img src={img} alt={`${name} — 1st Texas Realtors in Clear Lake`} loading={pinned ? 'eager' : 'lazy'} /></span>
        <span className="photo-name">{name}</span>
      </div>
      <div className="photo-back" aria-label={`Review from ${name}`}>
        <span className="photo-back-inner">
          <blockquote>“{cleaned}”</blockquote>
          <cite>{review.author}</cite>
        </span>
      </div>
    </div>
  }

  // text-only card: drop-down reveal (stars removed — normal font quote)
  return <div className={`testimonial-block drop-card${pinned ? ' is-pinned' : ''}`}>
    <blockquote>
      <p className="drop-cap-text">“{cleaned}”</p>
      {review.author && <cite>{review.author}</cite>}
    </blockquote>
  </div>
}
