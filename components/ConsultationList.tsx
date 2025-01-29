'use client'

import { useQuery } from '@tanstack/react-query'
import { consultationService } from '../lib/services/consultation'
import LoadingSpinner from './LoadingSpinner'
import type { ConsultationRoom } from '../types/consultation'

export default function ConsultationList() {
  const {
    data: consultations = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['consultations'],
    queryFn: consultationService.getPendingConsultations,
  })

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>Error loading consultations</div>

  const getStatusStyle = (status: ConsultationRoom['status']) => {
    switch (status) {
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800'
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'ended':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-red-100 text-red-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Consultations</h2>
      </div>
      <div className="divide-y">
        {consultations.map((consultation) => (
          <div
            key={consultation.id}
            className="p-4 hover:bg-gray-50 cursor-pointer"
          >
            <h3 className="font-medium">{consultation.clientName}</h3>
            <p className="text-sm text-gray-600">{consultation.topic}</p>
            <div className="mt-2 flex justify-between items-center">
              <span
                className={`text-sm px-2 py-1 rounded ${getStatusStyle(consultation.status)}`}
              >
                {consultation.status}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(consultation.startTime).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
