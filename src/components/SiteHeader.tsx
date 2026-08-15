'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { phone } from '@/content/site'

const menuLinks = [
  { label: 'About us', href: '/about/' },
  { label: 'About', href: '/about/', sub: true },
  { label: 'Testimonials', href: '/realtor-reviews/', sub: true },
  { label: 'Meet our agents', href: '/agents/', sub: true },
  { label: 'Privacy policy', href: '/privacy-policy/', sub: true },
  { label: 'Buy', href: '/home-buyers/' },
  { label: 'Sell', href: '/seller-services/' },
  { label: 'Rent', href: '/homes-for-rent/' },
  { label: 'Commercial', href: '/commercial-property-realtors/' },
  { label: 'Home search', href: '/home-search/' },
  { label: 'Contact', href: '/contact/' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.documentElement.classList.toggle('menu-locked', menuOpen)
    return () => document.documentElement.classList.remove('menu-locked')
  }, [menuOpen])
  const closeMenu = () => setMenuOpen(false)
  return <>
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-wrap">
        <button className="menu-btn" aria-expanded={menuOpen} aria-controls="full-menu" onClick={() => setMenuOpen(value => !value)}>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true"><path d="M1 1h16M1 7h16M1 13h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          <span className="mono-label">Menu</span>
        </button>
        <Link href="/" onClick={closeMenu} className="header-wordmark" aria-label="1st Texas Realtors"><span className="wordmark-main">1st Texas</span><span className="wordmark-sub">Realtors</span></Link>
        <div className="header-actions">
          <a className="account-link" href="/home-search/">Available listings</a>
          <a className="account-link register-link" href="/register/">Register</a>
          <a className="phone" href="tel:+12812413121">{phone}</a>
        </div>
      </div>
    </header>
    <div id="full-menu" className={`full-menu${menuOpen ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Site menu">
      <div className="full-menu-inner">
        <div className="full-menu-head"><span className="mono-label">1st Texas Realtors</span><button className="menu-close" aria-label="Close menu" onClick={closeMenu}>✕</button></div>
        <nav className="full-menu-links" onClick={closeMenu}>
          {menuLinks.map((link, i) => <Link key={`${link.href}-${link.label}`} href={link.href} className={link.sub ? 'is-sub' : ''}><span className="menu-num">{String(i + 1).padStart(2, '0')}</span>{link.label}<b>↗</b></Link>)}
        </nav>
        <div className="full-menu-foot"><span className="mono-label">Clear Lake · Friendswood · League City · NASA</span><a className="full-menu-phone" href="tel:+12812413121">{phone}</a></div>
      </div>
    </div>
  </>
}
