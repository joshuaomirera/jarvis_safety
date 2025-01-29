'use client'

import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
)

interface PaymentProps {
  amount: number
  serviceId: string
  serviceName: string
}

const Payment: React.FC<PaymentProps> = ({
  amount,
  serviceId,
  serviceName,
}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePayment = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          serviceId,
          serviceName,
        }),
      })

      const session = await response.json()

      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe failed to load')

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      })

      if (result.error) {
        throw new Error(result.error.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
      <p className="mb-4">Service: {serviceName}</p>
      <p className="mb-6">Amount: ${amount}</p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <button
        onClick={handlePayment}
        disabled={loading}
        className={`w-full py-2 px-4 rounded bg-primary text-white ${
          loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'
        }`}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  )
}

export default Payment
