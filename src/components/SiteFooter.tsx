import Link from 'next/link'
import { areaSlug, email, phone, serviceAreas } from '@/content/site'

export function SiteFooter() {
  return <footer className="footer"><div className="footer-grid"><div><p className="eyebrow">1st Texas Realtors</p><h2>Local knowledge. Personal service.</h2><p>Family owned since 2004, serving Clear Lake NASA and the surrounding communities.</p><a className="footer-phone" href="tel:+12812413121">{phone}</a><a href={`mailto:${email}`}>{email}</a></div><div><p className="eyebrow">Explore</p><Link href="/about/">About us</Link><Link href="/realtor-reviews/">Testimonials</Link><Link href="/agents/">Meet our agents</Link><Link href="/contact/">Contact</Link><Link href="/privacy-policy/">Privacy policy</Link></div><div className="footer-areas"><p className="eyebrow">Service areas</p>{serviceAreas.map(area => <Link key={area} href={`/realtors-in-${areaSlug(area)}/`}>{area}</Link>)}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} 1st Texas Realtors</span><span>Clear Lake · Friendswood · League City · NASA</span></div></footer>
}
