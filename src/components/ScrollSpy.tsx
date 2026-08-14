'use client'
import { useEffect, useState } from 'react'

const items = [
  { id: 'welcome', n: '01', label: 'Welcome' },
  { id: 'services', n: '02', label: 'How we help' },
  { id: 'team', n: '03', label: 'Our team' },
  { id: 'reviews', n: '04', label: 'Reviews' },
  { id: 'faq', n: '05', label: 'Questions' },
  { id: 'areas', n: '06', label: 'Service areas' },
]

export function ScrollSpy() {
  const [active, setActive] = useState('welcome')

  useEffect(() => {
    const sections = items.map(item => document.getElementById(item.id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
      if (visible.length) {
        const top = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        setActive(top.target.id)
      }
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return <nav className="scroll-spy" aria-label="Page sections"><div className="scroll-spy-inner">{items.map(item => <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'active' : ''}><span>{item.n}</span><b>{item.label}</b></a>)}</div></nav>
}
