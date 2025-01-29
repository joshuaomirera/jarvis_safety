export interface Booking {
  id: string
  name: string
  email: string
  phone: string
  service: string
  date: string
  status: 'pending' | 'confirmed' | 'cancelled'
  message?: string
  createdAt: Date
}
