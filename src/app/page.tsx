'use client'
import Link from 'next/link'
import { useState } from 'react'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { ScrollReveals } from '@/components/Motion'
import { ScrollSpy } from '@/components/ScrollSpy'
import { LeadModal } from '@/components/LeadModal'
import { VideoHero } from '@/components/VideoHero'
import { VideoBand } from '@/components/VideoBand'
import { FeaturedStrip } from '@/components/FeaturedStrip'
import { ChatFab } from '@/components/ChatFab'
import { WordReveal } from '@/components/WordReveal'
import { areaSlug, serviceAreas, testimonials } from '@/content/site'
import { areaCards } from '@/content/area-cards'

const services = [
  ['Buying a Home', 'Real-time listings, pre-approval guidance, saved searches, and support through closing.', '/home-buyers/', '/assets/reference/leaguecityhomesforsale.jpg'],
  ['Selling a Home', 'Market analysis, staging, marketing, negotiation, and focused closing support.', '/seller-services/', '/assets/reference/seabrookhomesforsale.jpg'],
  ['Homes for Rent', 'Neighborhood guidance, rental listings, leasing, and property management.', '/homes-for-rent/', '/assets/reference/clearlaketxhomesforsale.jpg'],
  ['New Construction', 'Builder guidance and experienced representation from plans to closing.', '/new-home-construction/', '/assets/reference/friendswoodhomesforsale.jpg'],
]

const faqs = [
  ['How do I get started with buying a home?', 'Get pre-approved by a mortgage banker for the amount you want, then use our real-time MLS Home Search to explore homes for sale and rent. We guide you through offers, contingencies, addendums, and closing.'],
  ['What is a free Market Analysis?', 'We review your home, neighborhood, and recent sales to recommend a competitive price and a marketing plan — at no cost and with no obligation.'],
  ['Do you help with rentals and property management?', 'Yes. We handle real-time rental listings, tenant interviews, background checks, leases, deposits, maintenance, and repairs for owners.'],
  ['Which areas do you serve?', 'We serve Clear Lake NASA and surrounding communities including League City, Friendswood, Seabrook, Kemah, Nassau Bay, Galveston, Pearland, and more.'],
  ['Are you a full-service brokerage?', 'Family owned since 2004, we represent buyers, sellers, renters, and commercial clients with over 100 years of combined experience.'],
]

export default function Home() {
  const [started] = useState(true)

  return <div className="site-shell"><SiteHeader /><main id="main-content">
    <VideoHero started={started} />
    <section className="section intro-section reveal" id="welcome"><div className="section-heading"><p className="eyebrow">Welcome to 1st Texas Realtors</p><WordReveal as="h2" className="display-section">Clarity for buying, selling, and everything between.</WordReveal><p><strong>Family owned since 2004,</strong> we provide expert Realtors in Clear Lake, dedicated customer service and real-time listings of homes for sale and rent.</p><p><strong>David Karstedt and wife Simone</strong> work as a team at 1st Texas Realtors, receive overwhelmingly positive reviews highlighting their exceptional responsiveness, deep knowledge and strong negotiation skills. This dynamic duo is known for personalized, patient service making the complex home buying and selling process smooth and enjoyable for their clients. They are praised for exceeding expectations and trusted advisors earning loyalty through high-quality service. Please see more <Link className="text-link" href="/realtor-reviews/">Testimonials <span>↗</span></Link>.</p><p>Our team of talented Realtors provide you with the critical elements of success; local experience, dedicated customer service and real-time property listings. <strong>Every year since 2010, we have been recognized by Texas Monthly Magazine as Top 3% Realtors in Clear Lake – NASA.</strong></p></div><div className="intro-copy"><div className="stats-band"><div className="stat"><strong>50+</strong><small>Years combined experience</small></div><div className="stat"><strong>Top 3%</strong><small>Realtor ranking</small></div><div className="stat"><strong>2004</strong><small>Family owned since</small></div></div><Link className="button button-dark" href="/contact/">Contact a Realtor <span>↗</span></Link></div></section>
    <section className="section section-dark nws-services reveal" id="services"><div className="section-heading"><p className="eyebrow">How we help</p><WordReveal as="h2" className="display-section">A better way forward.</WordReveal></div><div className="nws-card-grid">{services.map(([title, body, href, image], index) => <article className="nws-service-card reveal-item" key={title}><div className="nws-card-media"><img src={image} alt={title} loading="lazy" /><span className="nws-card-badge">{['Buy', 'Sell', 'Rent', 'Build'][index] || 'Service'}</span><Link href={href} className="nws-card-arrow" aria-label={`${title} — learn more`}><span>→</span></Link></div><div className="nws-card-body"><h3>{title}</h3><p>{body}</p><Link className="nws-card-btn" href={href}>Learn more <span>→</span></Link></div></article>)}</div></section>
    <section className="section split-section reveal" id="team"><div><p className="eyebrow">Local knowledge</p><WordReveal as="h2" className="display-section">People who know the place.</WordReveal><p>From Clear Lake City and Friendswood to League City, Kemah, Seabrook, and Galveston, we know the neighborhoods, schools, grocery stores, commutes, and local people.</p><Link className="button button-navy" href="/agents/">Meet our Realtors <span className="btn-icon">↗</span></Link></div><img src="/assets/reference/1st-Texas-Realtors-Team2.png" alt="The 1st Texas Realtors team" /></section>
    <section className="nws-reviews reveal" id="reviews"><div className="nws-reviews-inner"><div className="nws-reviews-head"><span className="nws-pill-badge">Client feedback</span><h2 className="nws-reviews-title">Check what our clients are saying</h2><p className="nws-reviews-sub">Don’t take our word for it</p></div><div className="nws-reviews-grid">{testimonials.slice(0, 3).map(review => <figure className="nws-review-card reveal-item" key={review.author}><span className="nws-avatar" aria-hidden="true">{review.author.charAt(0)}</span><figcaption><b>{review.author}</b><small>Google Review</small></figcaption><span className="stars" aria-label="Rated 5 out of 5 stars">★★★★★</span><blockquote>“{review.quote}”</blockquote></figure>)}<figure className="nws-review-card nws-review-photo reveal-item"><img src="/assets/reference/1st-Texas-Realtors-Team2.png" alt="The 1st Texas Realtors team with happy clients" loading="lazy" /><figcaption><b>Our clients</b><small>Across Clear Lake NASA</small></figcaption><span className="stars" aria-label="Rated 5 out of 5 stars">★★★★★</span><blockquote>Real guidance from a family-owned team rated Top 3% by Texas Monthly since 2010.</blockquote></figure></div><Link className="nws-reviews-cta" href="/realtor-reviews/">Read all testimonials <span>→</span></Link></div></section>
    <section className="section reveal" id="next-move"><div className="cta-showcase"><p className="eyebrow">Your next move</p><h2>Let’s make a plan.</h2><p>Call us for immediate assistance or explore our service areas and real-time home search.</p><Link className="button button-red" href="/contact/">Contact a Realtor <span className="btn-icon">↗</span></Link></div><div className="cta-steps"><Link className="reveal-item" href="/register/"><span>01</span>Register <b>↗</b></Link><Link className="reveal-item" href="/home-search/"><span>02</span>Home search <b>↗</b></Link><Link className="reveal-item" href="/contact/"><span>03</span>Contact us <b>↗</b></Link></div></section>
    <VideoBand />
    <FeaturedStrip />
    <section className="section faq-section reveal" id="faq"><div className="section-heading"><p className="eyebrow">Common questions</p><WordReveal as="h2" className="display-section">Answers before you ask.</WordReveal><p>Everything you need to know about buying, selling, renting, and working with our team.</p></div><div className="faq-list">{faqs.map(([question, answer], index) => <details key={question}><summary><span className="faq-index">{String(index + 1).padStart(2, '0')}</span>{question}<i className="faq-chip">+</i></summary><p>{answer}</p></details>)}</div></section>
    <section className="section areas-section reveal" id="areas"><div className="section-heading"><p className="eyebrow">Areas we serve</p><WordReveal as="h2" className="display-section">Local Realtors across Clear Lake NASA.</WordReveal><p>We complete every move promptly, effectively, and with the utmost attention to detail.</p></div>
      {/* NWS-style dual sliding rows — row 1 slides left, row 2 slides right */}
      <div className="areas-slider" aria-label="Service areas carousel">
        <div className="areas-slide-row">
          <div className="areas-slide-track areas-slide-left">{areaCards.slice(0, 11).map(card => <AreaCard key={card.slug} card={card} />)}{areaCards.slice(0, 11).map(card => <AreaCard key={`dup-${card.slug}`} card={card} ariaHidden />)}</div>
        </div>
        <div className="areas-slide-row">
          <div className="areas-slide-track areas-slide-right">{areaCards.slice(11).map(card => <AreaCard key={card.slug} card={card} />)}{areaCards.slice(11).map(card => <AreaCard key={`dup-${card.slug}`} card={card} ariaHidden />)}</div>
        </div>
      </div>
    </section>
  </main><SiteFooter /><ScrollReveals /><ScrollSpy /><LeadModal /><ChatFab /></div>
}

// Area card used in the sliding rows — links to the dedicated landing page
function AreaCard({ card, ariaHidden = false }: { card: { name: string; slug: string; image: string; desc: string }; ariaHidden?: boolean }) {
  return <Link
    href={`/realtors-in-${areaSlug(card.name)}/`}
    className="nws-area-card"
    aria-hidden={ariaHidden || undefined}
    tabIndex={ariaHidden ? -1 : undefined}
  >
    <div className="nws-area-media"><img src={card.image} alt={ariaHidden ? '' : `Homes in ${card.name}`} loading="lazy" /><span className="nws-area-tag">Service area</span></div>
    <div className="nws-area-body"><h3>{card.name}, TX</h3><p>{card.desc}</p><span className="nws-area-link">Explore area <span>→</span></span></div>
  </Link>
}
