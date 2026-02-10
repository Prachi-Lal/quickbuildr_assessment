import React, { useState } from 'react'

// Logger utility for frontend
const log = {
  info: (msg: string, data?: any) => console.log(`[INFO] ${msg}`, data || ''),
  debug: (msg: string, data?: any) => console.debug(`[DEBUG] ${msg}`, data || ''),
  error: (msg: string, data?: any) => console.error(`[ERROR] ${msg}`, data || ''),
  warn: (msg: string, data?: any) => console.warn(`[WARN] ${msg}`, data || '')
}

type FormState = {
  name: string
  email: string
  message: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const API_BASE_URL = 'http://127.0.0.1:8000'

log.info('ContactForm component initialized')

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })

  function update(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }))
      log.debug(`Field updated: ${field}`, { value: e.currentTarget.value.substring(0, 20) })
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    log.info('Form submission started')
    setStatus({ type: null, message: '' })

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      log.warn('Validation failed: missing required fields')
      setStatus({ type: 'error', message: 'Please fill out all required fields.' })
      return
    }

    if (!emailRegex.test(form.email)) {
      log.warn('Validation failed: invalid email', { email: form.email })
      setStatus({ type: 'error', message: 'Please provide a valid email address.' })
      return
    }

    log.info('Form validation passed', { name: form.name, email: form.email })
    setLoading(true)

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim()
      }

      log.info('Sending request to backend', { url: `${API_BASE_URL}/contact` })
      log.debug('Request payload', payload)

      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      log.debug('Response received', { status: response.status, statusText: response.statusText })

      if (!response.ok) {
        const errorData = await response.text()
        log.error('Backend error', { status: response.status, error: errorData })
        throw new Error(`Backend returned ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      log.info('Email sent successfully', data)
      setStatus({ type: 'success', message: 'Thanks — your message was sent.' })
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      log.error('Form submission failed', { error: errorMsg })
      setStatus({ type: 'error', message: 'Something went wrong. Please try again later.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
        <div>
          <label className="block text-sm font-medium text-neutral-700">Name</label>
          <input
            className="mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
            value={form.name}
            onChange={update('name')}
            required
            aria-required
            aria-label="Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700">Email</label>
          <input
            type="email"
            className="mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
            value={form.email}
            onChange={update('email')}
            required
            aria-required
            aria-label="Email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700">Message</label>
          <textarea
            rows={6}
            className="mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
            value={form.message}
            onChange={update('message')}
            required
            aria-required
            aria-label="Message"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
          {status.type === 'success' && (
            <p className="text-sm text-green-600" role="status">{status.message}</p>
          )}
          {status.type === 'error' && (
            <p className="text-sm text-red-600" role="alert">{status.message}</p>
          )}
        </div>
      </form>
    </section>
  )
}
