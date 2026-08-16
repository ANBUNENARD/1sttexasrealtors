'use client'
import Image from 'next/image'
import Link from 'next/link'

// About page — three rows. Each row has its OWN image pinned on the left
// (sticky in its exact place) while the text scrolls alongside on the right.
const rows = [
  {
    id: 'about-story',
    image: '/assets/client/Team-239.jpg',
    alt: 'The 1st Texas Realtors team',
    label: '01 · Our story',
  },
  {
    id: 'about-services',
    image: '/assets/client/Karstedt-e1780697422281.jpg',
    alt: 'The Karstedt family celebrating with clients',
    label: '02 · A full-service brokerage',
  },
  {
    id: 'about-buy-sell',
    image: '/assets/client/David-Simone-239.jpg',
    alt: 'David and Simone Karstedt',
    label: '03 · Buying & selling',
  },
]

export function StickyAbout() {
  return <div className="about-sticky-layout">
    <section id="about-story" className="about-row">
      <div className="about-row-media">
        <div className="about-row-img">
          <Image src={rows[0].image} alt={rows[0].alt} fill sizes="(max-width: 900px) 100vw, 42vw" className="about-row-photo" priority />
          <span className="about-sticky-label">{rows[0].label}</span>
        </div>
      </div>
      <div className="about-row-text">
        <p className="eyebrow">Since 2004</p>
        <h2 className="display-section">We get it right the first time.</h2>
        <p><strong>1st Texas Realtors</strong> for a full service real estate brokerage operated by husband and wife, <strong>David &amp; Simone Karstedt</strong>, and a host of expert Realtors totaling over <strong>100-years combined experience</strong>. When you hire one, you get the experience and knowledge of all. If you’re looking for a Realtor in the Clear Lake NASA area, we’re glad you came to our website. Every year since 2010, we have been named by <strong>Texas Monthly Magazine</strong> as Top 3% Realtors in the NASA Clear Lake area. Real estate, or your home, might be the biggest transaction of your life so having a great relationship with clients is our priority.</p>
        <p>As life long residents of the Clear Lake area, <strong>we know the neighborhoods, schools, grocery stores, commutes and many people.</strong></p>
      </div>
    </section>

    <section id="about-services" className="about-row">
      <div className="about-row-media">
        <div className="about-row-img">
          <Image src={rows[1].image} alt={rows[1].alt} fill sizes="(max-width: 900px) 100vw, 42vw" className="about-row-photo" />
          <span className="about-sticky-label">{rows[1].label}</span>
        </div>
      </div>
      <div className="about-row-text">
        <p className="eyebrow">Broker &amp; expert Realtors</p>
        <h2 className="display-section">A full-service brokerage.</h2>
        <ul className="about-bullets">
          <li>Broker and expert Realtors.</li>
          <li>Real-time MLS Home Search and property listings.</li>
          <li>Full Service Real Estate Brokerage.</li>
          <li>Represent Home Buyers and Sellers.</li>
          <li>REO Broker, Foreclosure, Asset Companies.</li>
          <li>Negotiation and Transaction Coordination.</li>
          <li>Commercial Real Estate.</li>
          <li>New Home Construction and Builders.</li>
          <li>Home Renting, Property Management and Leasing.</li>
        </ul>
      </div>
    </section>

    <section id="about-buy-sell" className="about-row">
      <div className="about-row-media">
        <div className="about-row-img">
          <Image src={rows[2].image} alt={rows[2].alt} fill sizes="(max-width: 900px) 100vw, 42vw" className="about-row-photo" />
          <span className="about-sticky-label">{rows[2].label}</span>
        </div>
      </div>
      <div className="about-row-text">
        <p className="eyebrow">Buying · Selling · Renting</p>
        <h2 className="display-section">Guidance at every step.</h2>
        <p>If you are interested in buying or renting a home, use our <Link className="text-link" href="/home-search/">Home Search <span>↗</span></Link> to view real-time home listings. If you’re selling, we’ll complete a <strong>no-obligation Market Analysis</strong> to determine the most accurate price for your home using comparable home sales, current listings and comparing all amenities.</p>
        <p><Link className="text-link" href="/contact/">Click here to Contact a Realtor <span>↗</span></Link>. Our team of talented Realtors provide you with the critical elements of success; local experience, dedication to customer service and real-time property listings. Every year since 2010, we have been recognized by <strong>Texas Monthly</strong> as Top 3% Realtors in the NASA – Clear Lake area.</p>
        <p className="about-callout">For immediate assistance, please call <a href="tel:+12812413121"><strong>(281) 241-3121</strong></a>.</p>
        <div className="about-side-ctas">
          <div><Link className="button button-dark" href="/home-search/">Home Search <span>↗</span></Link><p>Use our free MLS Home Search to browse homes for sale.</p></div>
          <div><Link className="button button-dark" href="/contact/">Contact Us <span>↗</span></Link><p>Send us an email with any questions you have about Realtors and services.</p></div>
        </div>
      </div>
    </section>
  </div>
}
