'use client'

import { FormEvent, useState } from 'react'

export function ContactForm({ type = 'contact' }: { type?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    const form = new FormData(event.currentTarget)
    const payload = Object.fromEntries(form.entries())
    try {
      const response = await fetch('/api/submit', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...payload, type }) })
      if (!response.ok) throw new Error('Request failed')
      event.currentTarget.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return <form className="contact-form" onSubmit={submit}>
    <div className="form-row"><label>Name<input required name="name" autoComplete="name" /></label><label>Email<input required type="email" name="email" autoComplete="email" /></label></div>
    <label>How can we help?<select name="interest" defaultValue="general"><option value="general">General question</option><option value="buying">Buying a home</option><option value="selling">Selling a home</option><option value="renting">Renting or property management</option><option value="commercial">Commercial property</option></select></label>
    <label>Message<textarea required name="message" rows={5} /></label>
    <button className="button button-dark" disabled={status === 'sending'} type="submit">{status === 'sending' ? 'Sending…' : 'Send inquiry'} <span>↗</span></button>
    {status === 'success' && <p className="form-status success">Thanks—your message is on its way to the 1st Texas Realtors team.</p>}
    {status === 'error' && <p className="form-status error">We could not send your message. Please call (281) 241-3121.</p>}
  </form>
}
