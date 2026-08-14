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
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('.hero')
    const onScroll = () => setVisible(hero ? window.scrollY > hero.clientHeight * 0.6 : window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = items.map(item => document.getElementById(item.id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(entries => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting)
      if (visibleEntries.length) {
        const top = visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        setActive(top.target.id)
      }
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return <nav className={`scroll-spy ${visible ? 'visible' : ''}`} aria-label="Page sections"><div className="scroll-spy-inner">{items.map(item => <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'active' : ''}><span>{item.n}</span><b>{item.label}</b></a>)}</div></nav>
}
