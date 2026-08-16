'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { testimonialsExact } from '@/content/testimonials-exact'

// Reviews page: 6 reviews shown initially, "Show more" reveals the rest.
// Each review's drop-cap letter DROPS DOWN when scrolled into view, then the
// text follows — continuously for every card (initial 6 + revealed ones).
export function ReviewsPage() {
  const [showAll, setShowAll] = useState(false)
  const [active, setActive] = useState(0)
  const reviews = [...testimonialsExact].sort((a, b) => a.quote.length - b.quote.length)
  const visible = showAll ? reviews : reviews.slice(0, 6)

  return <div className="reviews-page-wrap">
    <div className="reviews-summary"><div className="reviews-summary-item"><strong>74</strong><span>Client reviews</span></div><div className="reviews-summary-item"><span className="stars" aria-label="Rated 5 out of 5 stars">★★★★★</span><span>Rated 5 stars</span></div><div className="reviews-summary-item"><strong>Top 3%</strong><span>Texas Monthly since 2010</span></div></div>
    <div className="testimonial-flow">
      {visible.map((review, i) => <DropCard key={`${review.author}-${i}`} review={review} active={active === i} onActive={() => setActive(i)} />)}
    </div>
    {!showAll && <div className="reviews-more-wrap"><button className="reviews-more" onClick={() => setShowAll(true)}>Show more reviews <span>↓</span></button><p className="reviews-more-note">Showing 6 of {reviews.length} reviews — click to see all</p></div>}
    <div className="trust-banner"><span className="trust-banner-label">Proud members of</span><div className="trust-banner-logos"><img src="/assets/client/Texas-Monthly-5-Star-Real-Estate-Agent.png" alt="Texas Monthly Five-Star Real Estate Agent" className="badge-logo" /><img src="/assets/client/Equal-Housing-Opportunity-Realtors.gif" alt="Equal Housing Opportunity" /><img src="/assets/client/Multiple-Listing-Service-Realtors.gif" alt="Member of the Multiple Listing Service" /><img src="/assets/client/Realtor-Association.gif" alt="Realtor Association Member" /></div></div>
    <p className="area-note">1st Texas Realtors reviews in Baytown, Clear Lake City, Clear Lake Shores, Deer Park, Dickinson, El Lago, Friendswood, Galveston, Kemah, La Porte, League City, Nassau Bay, Pasadena, Pearland, Seabrook, Taylor Lake Village, Texas City, Tiki Island and Webster.</p>
  </div>
}

// one review card — the drop-cap letter falls in, then the text reveals
function DropCard({ review, active, onActive }: { review: (typeof testimonialsExact)[number]; active: boolean; onActive: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)

  // scroll-trigger: when the card enters the viewport, play the drop animation
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { setOn(true); onActive(); obs.disconnect() } })
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [onActive])

  const letter = review.quote.replace(/[“”"'`\s]/g, '').charAt(0).toUpperCase() || '“'

  return <div ref={ref} className={`testimonial-block drop-card${on ? ' is-on' : ''}${active ? ' is-active' : ''}`}>
    {review.images.map((img, j) => <img key={j} className="testimonial-photo" src={`/assets/client/${img}`} alt="1st Texas Realtors in Clear Lake" loading="lazy" />)}
    <blockquote>
      <span className="drop-letter" aria-hidden="true">{letter}</span>
      <span className="drop-stars stars" aria-label="Rated 5 out of 5 stars">★★★★★</span>
      <p>“{review.quote}”</p>
      {review.author && <cite>{review.author}</cite>}
    </blockquote>
  </div>
}
