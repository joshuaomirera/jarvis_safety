// types/service.ts

export type ServiceCategory =
  | 'Training Services'
  | 'Audit Services'
  | 'Policy Services'
  | 'Compliance Services'
  | 'Hazardous Material Services'
  | 'Standardization Services'
  | 'Medical Services'

export interface Service {
  id: string
  name: string
  description: string
  category: ServiceCategory
  price: string
  features?: string[]
  industry: string[]
  link?: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export type SegmentParams<T> = {
  params: T
  id: string
}
