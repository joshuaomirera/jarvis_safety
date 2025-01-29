'use client'

import { useState } from 'react'
import type { Service, ServiceCategory } from '../types/service'

interface Props {
  service?: Service
  onSave: (service: Service) => void
  onClose: () => void
}

const CATEGORIES: ServiceCategory[] = [
  'Training Services',
  'Audit Services',
  'Policy Services',
  'Compliance Services',
  'Hazardous Material Services',
  'Standardization Services',
  'Medical Services',
]

export default function ServiceEditForm({ service, onSave, onClose }: Props) {
  const [formData, setFormData] = useState<Partial<Service>>(
    service || {
      name: '',
      description: '',
      category: 'Training Services',
      price: '',
      features: [],
      industry: [],
    },
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validation logic here
      onSave(formData as Service)
      onClose()
    } catch (error) {
      setError('Failed to save service')
      console.error('Error saving service:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Service Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              category: e.target.value as ServiceCategory,
            }))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Price (KES)
        </label>
        <input
          type="text"
          value={formData.price}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, price: e.target.value }))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Features
        </label>
        {formData.features?.map((feature: string, index: number) => (
          <div key={index} className="flex mt-2">
            <input
              type="text"
              value={feature}
              onChange={(e) => {
                const newFeatures = [...(formData.features || [])]
                newFeatures[index] = e.target.value
                setFormData((prev) => ({ ...prev, features: newFeatures }))
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => {
                const newFeatures = formData.features?.filter(
                  (_: string, i: number) => i !== index,
                )
                setFormData((prev) => ({ ...prev, features: newFeatures }))
              }}
              className="ml-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              features: [...(prev.features || []), ''],
            }))
          }
          className="mt-2 text-blue-600 hover:text-blue-800"
        >
          Add Feature
        </button>
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 hover:text-gray-900"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Service'}
        </button>
      </div>
    </form>
  )
}
