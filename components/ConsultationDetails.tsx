'use client'

import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../lib/firebase'
import { Consultation } from '../types/consultation'

interface ConsultationDetailsProps {
  consultation: Consultation
  onUpdate: () => void
}

export default function ConsultationDetails({
  consultation,
  onUpdate,
}: ConsultationDetailsProps) {
  const [notes, setNotes] = useState(consultation.notes || '')
  const [status, setStatus] = useState(consultation.status)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      const consultationRef = doc(firestore, 'consultations', consultation.id)
      await updateDoc(consultationRef, {
        notes,
        status,
        lastUpdated: new Date(),
      })
      onUpdate()
    } catch (error) {
      console.error('Error updating consultation:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Consultation Details</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Client Name
          </label>
          <p className="mt-1">{consultation.clientName}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <p className="mt-1">{consultation.clientEmail}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Topic
          </label>
          <p className="mt-1">{consultation.topic}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as Consultation['status'])
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
