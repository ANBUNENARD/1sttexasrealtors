'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { areaInfo } from '@/content/area-info'

// Area info landing section — the About landing-page pattern applied to a
// service area: ONE photo pinned/sticky on the LEFT (stationary). As you
// scroll through the text on the RIGHT, the photo CHANGES — cycling through
// ALL of the area's photos (crossfade), finishing exactly when the text
// finishes. The FIRST photo is the Realtor assigned to that area.
// The text is 100% the original site's content for that area.

export function AreaInfoSection({ area }: { area: string }) {
  const info = areaInfo[area]
  const [active, setActive] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  const images = info.images.length ? info.images : ['/assets/reference/clearlaketxhomesforsale.jpg']

  // scroll progress through the right-hand text drives the photo: 0 → first
  // photo (the Realtor), scrolling down advances through EVERY photo, and the
  // last photo shows exactly when the text reaches its end
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      // progress 0 when the text starts entering, 1 when it has fully scrolled
      const total = rect.height + vh
      const scrolled = vh - rect.top
      const progress = Math.min(1, Math.max(0, scrolled / total))
      const idx = Math.min(images.length - 1, Math.floor(progress * images.length))
      setActive(idx)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [images.length])

  const sections = [
    { id: `${area}-intro`, label: `01 · Realtors in ${info.name}` },
    { id: `${area}-strategy`, label: '02 · Strategy of our Realtors' },
    { id: `${area}-services`, label: '03 · Home Buyer Services' },
  ]

  return <div className="area-info-layout">
    {/* LEFT — ONE stationary (sticky) photo; changes as you scroll through the text */}
    <div className="area-info-media">
      <div className="area-info-panel">
        {images.map((src, i) => (
          <div key={src} className={`area-info-img${active === i ? ' is-active' : ''}`} aria-hidden={active === i || undefined}>
            <Image src={src} alt={active === i ? `${info.name} — 1st Texas Realtors` : ''} fill sizes="(max-width: 900px) 100vw, 42vw" className="area-info-photo" priority={i === 0} />
          </div>
        ))}
        <span className="area-info-label">{String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')} · {info.name}</span>
      </div>
    </div>

    {/* RIGHT — the text scrolls; when each section's text finishes, the photo changes */}
    <div className="area-info-content" ref={contentRef}>
      <section id={`${area}-intro`} className="area-info-section">
        <p className="eyebrow">Local service area</p>
        <h2 className="display-section">{info.heroTitle}</h2>
        {info.intro.map((p, i) => <p key={i}>{p}</p>)}
        {info.area.length > 0 && info.area.map((p, i) => <p key={`a${i}`}>{p}</p>)}
      </section>

      <section id={`${area}-strategy`} className="area-info-section">
        <p className="eyebrow">How we work</p>
        <h2 className="display-section">Strategy of our Realtors</h2>
        {info.strategy.map((p, i) => <p key={i}>{p}</p>)}
      </section>

      <section id={`${area}-services`} className="area-info-section">
        <p className="eyebrow">Buying guidance</p>
        <h2 className="display-section">{info.name} Home Buyer Services</h2>
        <ul className="about-bullets">
          {info.services.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
        {info.closing.map((p, i) => <p key={`c${i}`}>{p}</p>)}
      </section>

      <div className="area-info-ctas">
        <div><Link className="button button-dark" href="/home-search/">Home Search <span>↗</span></Link><p>Use our free MLS Home Search to browse homes for sale.</p></div>
        <div><Link className="button button-dark" href="/contact/">Contact Us <span>↗</span></Link><p>Send us an email with any questions you have about Realtors and services.</p></div>
      </div>
    </div>
  </div>
}
