'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { areaInfo } from '@/content/area-info'

// Area info landing section — the About landing-page pattern applied to a
// service area: ONE photo pinned/sticky on the LEFT (stationary), the text
// scrolls on the RIGHT. As each text section finishes, the pinned photo
// transitions (crossfade + zoom) to the next photo.
// The text is 100% the original site's content for that area.

export function AreaInfoSection({ area }: { area: string }) {
  const info = areaInfo[area]
  const [active, setActive] = useState(0)

  // sections: intro (hero copy) → strategy → buyer services + closing
  const sections = [
    { id: `${area}-intro`, label: `01 · Realtors in ${info.name}` },
    { id: `${area}-strategy`, label: '02 · Strategy of our Realtors' },
    { id: `${area}-services`, label: '03 · Home Buyer Services' },
  ]

  // scroll-spy: the active section drives which photo shows in the pinned panel
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length) {
          const top = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
          const idx = sections.findIndex(s => s.id === top.target.id)
          if (idx >= 0) setActive(idx)
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
    )
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [area])

  const images = info.images.length ? info.images : ['/assets/reference/clearlaketxhomesforsale.jpg']

  return <div className="area-info-layout">
    {/* LEFT — the stationary (sticky) photo panel; changes as sections finish */}
    <div className="area-info-media">
      <div className="area-info-panel">
        {images.map((src, i) => (
          <div key={src} className={`area-info-img${active === i ? ' is-active' : ''}`} aria-hidden={active !== i || undefined}>
            <Image src={src} alt={`${info.name} — 1st Texas Realtors`} fill sizes="(max-width: 900px) 100vw, 42vw" className="area-info-photo" priority={i === 0} />
          </div>
        ))}
        <span className="area-info-label">{sections[Math.min(active, sections.length - 1)].label}</span>
      </div>
    </div>

    {/* RIGHT — the text scrolls; when each section's text finishes, the photo changes */}
    <div className="area-info-content">
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
