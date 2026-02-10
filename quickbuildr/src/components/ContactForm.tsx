import React, { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/firebase'

type FormState = {
  name: string
  email: string
  message: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })

  function update(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus({ type: null, message: '' })

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: 'error', message: 'Please fill out all required fields.' })
      return
    }

    if (!emailRegex.test(form.email)) {
      setStatus({ type: 'error', message: 'Please provide a valid email address.' })
      return
    }

    setLoading(true)
    try {
      const col = collection(db, 'contacts')
      await addDoc(col, {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        createdAt: serverTimestamp()
      })
      setStatus({ type: 'success', message: 'Thanks — your message was sent.' })
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again later.' })
      console.error(err)
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
