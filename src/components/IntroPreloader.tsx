'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function IntroPreloader({ onDone }: { onDone?: () => void }) {
  const [phase, setPhase] = useState<'idle' | 'playing' | 'lifting' | 'done'>('idle')

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = []
    try {
      if (sessionStorage.getItem('1tx-intro-played') === 'true') {
        setPhase('done')
        return
      }
    } catch { /* sessionStorage unavailable — play anyway */ }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setPhase('playing')
    document.documentElement.classList.add('intro-locked')

    if (reduced) {
      timers.push(setTimeout(() => {
        setPhase('done')
        document.documentElement.classList.remove('intro-locked')
        try { sessionStorage.setItem('1tx-intro-played', 'true') } catch { /* noop */ }
        onDone?.()
      }, 400))
      return () => { timers.forEach(clearTimeout); document.documentElement.classList.remove('intro-locked') }
    }

    // 1. line expands + logo slides in (0.9s) → 2. glow pulse at 1.0s → 3. overlay lifts at ~1.95s
    timers.push(setTimeout(() => setPhase('lifting'), 1950))
    timers.push(setTimeout(() => {
      setPhase('done')
      document.documentElement.classList.remove('intro-locked')
      try { sessionStorage.setItem('1tx-intro-played', 'true') } catch { /* noop */ }
      onDone?.()
    }, 2750))
    return () => { timers.forEach(clearTimeout); document.documentElement.classList.remove('intro-locked') }
  }, [onDone])

  if (phase === 'done') return null

  return <div className={`intro-preloader${phase === 'lifting' ? ' is-lifting' : ''}`} role="presentation" aria-hidden="true">
    <div className="intro-logo-block">
      <div className="intro-logo-chip"><Image src="/assets/reference/1stTexasRealtors-logo.png" alt="" width={300} height={144} priority /></div>
      <div className="intro-line" />
      <div className="intro-wordmark"><span className="mono-label">1st Texas Realtors</span><span className="mono-label intro-tag">Family owned since 2004</span></div>
    </div>
  </div>
}
