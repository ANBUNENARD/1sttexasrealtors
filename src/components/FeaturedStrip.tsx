'use client'
import { useEffect, useRef, useState } from 'react'

const featured = [
  'Clear Lake Chamber of Commerce',
  'Houston Association of Realtors',
  'Texas Monthly',
  'NASA Area Community',
]

export function FeaturedStrip() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      })
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return <section className={`press-row${visible ? ' is-visible' : ''}`} ref={ref as never} aria-label="Featured in">
    <span className="press-label">Featured in</span>
    {featured.map((item, i) => (
      <span key={item} className="press-item" style={{ transitionDelay: `${0.15 + i * 0.18}s` }}>{item}</span>
    ))}
    <span className="press-mapnote" aria-hidden="true">Seabrook Quadrangle · USGS · Surveyed 1915–1920</span>
  </section>
}
