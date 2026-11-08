'use client'

import { useState } from 'react'

interface ContactFormData {
  name: string
  email: string
  message: string
  website: string
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  message: '',
  website: '',
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setSuccess(false)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your message. Please try again.')
      }

      setFormData(initialFormData)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send your message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((current) => ({ ...current, [name]: value }))
    setSuccess(false)
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {success && (
            <p className="text-green-700" role="status">
              Your message has been sent. We&apos;ll be in touch soon.
            </p>
          )}
          {error && (
            <p className="text-red-600" role="alert">
              {error}
            </p>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              maxLength={100}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              maxLength={254}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              maxLength={5000}
              required
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <div className="absolute -left-[10000px]" aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  )
}
