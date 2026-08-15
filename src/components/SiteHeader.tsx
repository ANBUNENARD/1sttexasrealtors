'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { email, phone } from '@/content/site'

const menuColumns = [
  { label: 'About us', href: '/about/' },
  { label: 'Buy', href: '/home-buyers/' },
  { label: 'Sell', href: '/seller-services/' },
  { label: 'Rent', href: '/homes-for-rent/' },
  { label: 'Commercial', href: '/commercial-property-realtors/' },
]

const menuSecondary = [
  { label: 'Available Listings', href: '/home-search/' },
  { label: 'Testimonials', href: '/realtor-reviews/' },
  { label: 'Meet our agents', href: '/agents/' },
  { label: 'New Homes', href: '/new-home-construction/' },
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
        <div className="full-menu-head">
          <button className="menu-close-btn" aria-label="Close menu" onClick={closeMenu}><svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true"><path d="M1 1h16M1 7h16M1 13h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg><span className="mono-label">Close</span></button>
          <Link href="/" onClick={closeMenu} className="header-wordmark" aria-label="1st Texas Realtors"><span className="wordmark-main wordmark-menu">1st Texas</span><span className="wordmark-sub wordmark-menu">Realtors</span></Link>
          <div className="full-menu-actions">
            <a className="account-link" href="/home-search/">Available listings</a>
            <a className="account-link register-link" href="/register/">Inquire</a>
          </div>
        </div>
        <div className="full-menu-body">
          <div className="full-menu-columns">
            <nav className="full-menu-links" onClick={closeMenu}>
              {menuColumns.map(link => <Link key={link.href} href={link.href}><span className="menu-num">{String(menuColumns.indexOf(link) + 1).padStart(2, '0')}</span>{link.label}<b>↗</b></Link>)}
            </nav>
            <nav className="full-menu-links is-secondary" onClick={closeMenu}>
              {menuSecondary.map(link => <Link key={link.href} href={link.href}><span className="menu-num">{String(menuColumns.length + menuSecondary.indexOf(link) + 1).padStart(2, '0')}</span>{link.label}<b>↗</b></Link>)}
            </nav>
          </div>
          <div className="menu-promo">
            <img src="/assets/reference/1st-tx-realtors-couple-slider.png" alt="David and Simone Karstedt of 1st Texas Realtors" />
            <div className="menu-promo-box"><b>Get a free Market Analysis*</b><a href="/contact/">Claim offer <span>→</span></a></div>
          </div>
        </div>
        <div className="full-menu-foot">
          <div className="menu-contact"><span className="mono-label">Contact us</span><a href={`mailto:${email}`}>{email}</a><a className="menu-foot-phone" href="tel:+12812413121">{phone}</a></div>
          <div className="menu-contact"><span className="mono-label">Office</span><span>Monday through Saturday, 9am to 6pm</span><span>Clear Lake NASA, Texas</span></div>
          <div className="menu-lang"><span className="mono-label">Clear Lake · League City · Friendswood · Seabrook</span></div>
        </div>
      </div>
    </div>
  </>
}
