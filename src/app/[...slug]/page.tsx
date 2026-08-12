import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/SiteHeader'
import { ScrollReveals } from '@/components/Motion'

const pages: Record<string, { title: string; intro: string; body: string }> = {
  about: { title: 'About', intro: 'Since 2004, 1st Texas Realtors has operated as a full-service real estate brokerage led by David & Simone Karstedt.', body: 'When you hire one, you get the experience and knowledge of all. We know the Clear Lake NASA area, its neighborhoods, schools, grocery stores, commutes, and many people.' },
  'home-buyers': { title: 'Home Buying', intro: 'The first step to buying a home is getting pre-approved by a mortgage banker for the desired amount.', body: 'Our Home Buyer Services include representation, negotiation, mortgage guidance, school and community information, relocation assistance, real-time MLS search, email alerts, and support through closing and beyond.' },
  'seller-services': { title: 'Home Selling', intro: 'Our Home Selling services begin with a Market Analysis to determine the best price for your home.', body: 'We guide marketing and sales, staging, MLS and major listing sites, red-flag review, status updates, negotiation, and closing support.' },
  'homes-for-rent': { title: 'Homes for Rent | Home Leasing', intro: 'View homes for rent using our real-time Home Search.', body: 'We provide professional leasing and property management service including MLS listings, prospective-tenant interviews, background checks, leases, deposits, and rental market analysis.' },
  'commercial-property-realtors': { title: 'Commercial Property Realtors', intro: 'Contact 1st Texas Realtors for expert local real estate service on commercial property for rent and sale.', body: 'Our team provides local market guidance and professional support for commercial property transactions.' },
  contact: { title: 'Contact', intro: 'Contact the 1st Texas Realtors for expert and local real estate service on homes, land, and commercial property for rent and sale.', body: 'Hours: Monday through Saturday from 9am to 6pm. Phone: 281-241-3121. Email: info@1sttexasrealtors.com.' },
}

export function generateStaticParams() { return Object.keys(pages).map(slug => ({ slug: [slug] })) }

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const key = slug.join('/')
  const page = pages[key]
  if (!page) notFound()
  return <div className="site-shell"><SiteHeader /><main className="section"><div className="section-heading"><p className="eyebrow">1st Texas Realtors</p><h1>{page.title}</h1><p>{page.intro}</p></div><div className="service-card reveal"><p>{page.body}</p><p>For immediate assistance, call <strong>(281) 241-3121</strong>.</p><Link className="button" href="/contact/">Contact a Realtor <span>↗</span></Link></div></main><ScrollReveals /></div>
}
