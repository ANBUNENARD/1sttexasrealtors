'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])
  return <header className={`site-header ${scrolled ? 'scrolled' : ''}`}><div className="nav-wrap"><Link href="/" aria-label="1st Texas Realtors"><img className="logo" src="/assets/reference/1stTexasRealtors-logo.png" alt="1st Texas Realtors" /></Link><a className="phone" href="tel:(281) 241-3121">(281) 241-3121</a><nav className="nav-links"><Link href="/about/">About</Link><Link href="/home-buyers/">Buy</Link><Link href="/seller-services/">Sell</Link><Link href="/homes-for-rent/">Rent</Link><Link href="/commercial-property-realtors/">Commercial</Link><Link href="/contact/">Contact</Link></nav></div></header>
}
