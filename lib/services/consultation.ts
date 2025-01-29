import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
  orderBy,
} from 'firebase/firestore'
import { firestore } from '../../lib/firebase'
import { ConsultationRoom, ConsultationFormData } from '../../types/consultation'

const COLLECTION_NAME = 'consultation-rooms'

export const consultationService = {
  async createRoom(data: ConsultationFormData): Promise<string> {
    const docRef = await addDoc(collection(firestore, COLLECTION_NAME), {
      clientName: data.name,
      clientEmail: data.email,
      topic: data.topic,
      notes: data.notes,
      status: 'waiting',
      startTime: new Date(),
    })
    return docRef.id
  },

  async getRoom(roomId: string): Promise<ConsultationRoom | null> {
    const docRef = doc(firestore, COLLECTION_NAME, roomId)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) return null

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as ConsultationRoom
  },

  async updateRoomStatus(
    roomId: string,
    status: ConsultationRoom['status'],
    endTime?: Date,
  ) {
    const docRef = doc(firestore, COLLECTION_NAME, roomId)
    const updateData: Partial<ConsultationRoom> = { status }

    if (endTime) {
      updateData.endTime = endTime
    }

    await updateDoc(docRef, updateData)
  },

  async getPendingConsultations(): Promise<ConsultationRoom[]> {
    const q = query(
      collection(firestore, COLLECTION_NAME),
      where('status', '==', 'waiting'),
      orderBy('startTime', 'desc'),
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ConsultationRoom[]
  },

  async getConsultationHistory(): Promise<ConsultationRoom[]> {
    const q = query(
      collection(firestore, COLLECTION_NAME),
      where('status', '==', 'ended'),
      orderBy('endTime', 'desc'),
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ConsultationRoom[]
  },
}
