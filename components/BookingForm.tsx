// components/BookingForm.tsx

'use client'

import React, { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { firestore } from '../lib/firebase'
import LoadingSpinner from './LoadingSpinner'

interface FormData {
  name: string
  email: string
  phone: string
  date: string
  message: string
  service?: string
  status: string
  createdAt: null | import('firebase/firestore').Timestamp
}

interface FormErrors {
  [key: string]: string
}

interface BookingFormProps {
  serviceId: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ serviceId }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
    service: serviceId,
    status: 'pending',
    createdAt: null,
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const errors: FormErrors = {}
    if (!formData.name) errors.name = 'Name is required'
    if (!formData.email) errors.email = 'Email is required'
    if (!formData.phone) errors.phone = 'Phone is required'
    if (!formData.date) errors.date = 'Date is required'

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setLoading(true)
      setError(null)

      const bookingData = {
        ...formData,
        createdAt: serverTimestamp(),
      }

      await addDoc(collection(firestore, 'bookings'), bookingData)

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        message: '',
        service: serviceId,
        status: 'pending',
        createdAt: null,
      })
    } catch (err) {
      console.error('Error submitting booking:', err)
      setError('Failed to submit booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      {success && (
        <div className="text-green-500 mb-4">
          Booking submitted successfully! We&apos;ll contact you soon.
        </div>
      )}

      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className={`w-full p-2 border rounded ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {formErrors.name && (
          <p className="text-red-500 text-sm">{formErrors.name}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className={`w-full p-2 border rounded ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {formErrors.email && (
          <p className="text-red-500 text-sm">{formErrors.email}</p>
        )}
      </div>

      <div>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className={`w-full p-2 border rounded ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
        />
        {formErrors.phone && (
          <p className="text-red-500 text-sm">{formErrors.phone}</p>
        )}
      </div>

      <div>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${formErrors.date ? 'border-red-500' : 'border-gray-300'}`}
        />
        {formErrors.date && (
          <p className="text-red-500 text-sm">{formErrors.date}</p>
        )}
      </div>

      <div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Additional Message"
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Book Now'}
      </button>
    </form>
  )
}

export default BookingForm
