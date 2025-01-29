import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { doc, onSnapshot } from 'firebase/firestore'
import { firestore } from '../lib/firebase'
import { ConsultationRoom } from '../types/consultation'
import { consultationService } from '../lib/services/consultation'

export function useConsultationRoom(roomId: string, isAdmin: boolean = false) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [roomInfo, setRoomInfo] = useState<ConsultationRoom | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(firestore, 'consultation-rooms', roomId),
      (doc) => {
        if (doc.exists()) {
          setRoomInfo({ id: doc.id, ...doc.data() } as ConsultationRoom)
          setLoading(false)
        } else {
          setError('Consultation room not found')
          setLoading(false)
        }
      },
      (error) => {
        console.error('Error fetching room:', error)
        setError('Failed to load consultation room')
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [roomId])

  useEffect(() => {
    if (roomInfo?.status === 'ended') {
      router.push(isAdmin ? '/admin/consultations' : '/consultations')
    }
  }, [roomInfo?.status, router, isAdmin])

  const handleEndConsultation = async () => {
    try {
      await consultationService.updateRoomStatus(roomId, 'ended', new Date())
    } catch (error) {
      console.error('Error ending consultation:', error)
    }
  }

  return {
    loading,
    error,
    roomInfo,
    handleEndConsultation,
  }
}
