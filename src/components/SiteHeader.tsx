'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { phone } from '@/content/site'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])
  const closeMenu = () => setMenuOpen(false)
  return <header className={`site-header ${scrolled ? 'scrolled' : ''}`}><div className="nav-wrap"><Link href="/" onClick={closeMenu} aria-label="1st Texas Realtors"><img className="logo" src="/assets/reference/1stTexasRealtors-logo.png" alt="1st Texas Realtors" /></Link><div className="header-actions"><a className="account-link" href="/login/">Login</a><a className="account-link register-link" href="/register/">Register</a><a className="phone" href="tel:+12812413121">{phone}</a><button className="menu-toggle" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(value => !value)}><span /><span /><span /><b className="sr-only">Toggle navigation</b></button></div><nav id="primary-navigation" className={`nav-links ${menuOpen ? 'open' : ''}`}><div className="about-nav"><Link href="/about/" onClick={closeMenu}>About</Link><div className="about-menu"><Link href="/about/">About us</Link><Link href="/realtor-reviews/">Testimonials</Link><Link href="/agents/">Meet our agents</Link><Link href="/privacy-policy/">Privacy policy</Link></div></div><Link href="/home-buyers/" onClick={closeMenu}>Buy</Link><Link href="/seller-services/" onClick={closeMenu}>Sell</Link><Link href="/homes-for-rent/" onClick={closeMenu}>Rent</Link><Link href="/commercial-property-realtors/" onClick={closeMenu}>Commercial</Link><Link href="/contact/" onClick={closeMenu}>Contact</Link></nav></div></header>
}
