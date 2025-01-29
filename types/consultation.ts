export interface Consultation {
  id: string
  clientName: string
  clientEmail: string
  topic: string
  status: 'pending' | 'active' | 'completed' | 'cancelled'
  startTime: Date
  endTime?: Date
  notes?: string
  assignedTo?: string
}

export interface ConsultationRoom {
  id: string
  clientName: string
  clientEmail: string
  topic: string
  status: 'waiting' | 'active' | 'ended'
  startTime: Date
  endTime?: Date
  notes?: string
  consultantId?: string
}

export interface ConsultationFormData {
  name: string
  email: string
  topic: string
  notes?: string
}
