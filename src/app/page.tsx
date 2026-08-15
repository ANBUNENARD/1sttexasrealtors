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
    <section className="section section-tint reveal" id="services"><div className="section-heading"><p className="eyebrow">How we help</p><WordReveal as="h2" className="display-section">A better way forward.</WordReveal></div><div className="service-grid">{services.map(([title, body, href, image], index) => <article className="service-card" key={title}><span className="step-badge">{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{body}</p><Link href={href}>Explore service <span className="btn-icon">↗</span></Link><div className="service-card-img" style={{ backgroundImage: `url('${image}')` }} aria-hidden="true" /></article>)}</div></section>
    <section className="section split-section reveal" id="team"><div><p className="eyebrow">Local knowledge</p><WordReveal as="h2" className="display-section">People who know the place.</WordReveal><p>From Clear Lake City and Friendswood to League City, Kemah, Seabrook, and Galveston, we know the neighborhoods, schools, grocery stores, commutes, and local people.</p><Link className="button button-navy" href="/agents/">Meet our Realtors <span className="btn-icon">↗</span></Link></div><img src="/assets/reference/1st-Texas-Realtors-Team2.png" alt="The 1st Texas Realtors team" /></section>
    <section className="section section-dark reveal" id="reviews"><div className="section-heading"><p className="eyebrow">Great reviews &amp; testimonials</p><WordReveal as="h2" className="display-section">Service people remember.</WordReveal></div><div className="testimonial-grid">{testimonials.slice(0, 3).map(review => <blockquote key={review.author}><span className="stars" aria-label="Rated 5 out of 5 stars">★★★★★</span><p>“{review.quote}”</p><cite>{review.author}</cite></blockquote>)}</div><Link className="button button-light" href="/realtor-reviews/">Read all testimonials <span className="btn-icon">↗</span></Link></section>
    <section className="section reveal" id="next-move"><div className="cta-showcase"><p className="eyebrow">Your next move</p><h2>Let’s make a plan.</h2><p>Call us for immediate assistance or explore our service areas and real-time home search.</p><Link className="button button-red" href="/contact/">Contact a Realtor <span className="btn-icon">↗</span></Link></div><div className="cta-steps"><Link href="/register/"><span>01</span>Register <b>↗</b></Link><Link href="/home-search/"><span>02</span>Home search <b>↗</b></Link><Link href="/contact/"><span>03</span>Contact us <b>↗</b></Link></div></section>
    <VideoBand />
    <FeaturedStrip />
    <section className="section faq-section reveal" id="faq"><div className="section-heading"><p className="eyebrow">Common questions</p><WordReveal as="h2" className="display-section">Answers before you ask.</WordReveal><p>Everything you need to know about buying, selling, renting, and working with our team.</p></div><div className="faq-list">{faqs.map(([question, answer], index) => <details key={question}><summary><span className="faq-index">{String(index + 1).padStart(2, '0')}</span>{question}<i className="faq-chip">+</i></summary><p>{answer}</p></details>)}</div></section>
    <section className="section areas-section reveal" id="areas"><div className="section-heading"><p className="eyebrow">Serving the region</p><WordReveal as="h2" className="display-section">Local Realtors across Clear Lake NASA.</WordReveal></div><div className="area-grid">{serviceAreas.map((area, index) => <Link key={area} href={`/realtors-in-${areaSlug(area)}/`}><span className="area-num">{String(index + 1).padStart(2, '0')}</span>{area}<span>↗</span></Link>)}</div></section>
  </main><SiteFooter /><ScrollReveals /><ScrollSpy /><LeadModal /><ChatFab /></div>
}
