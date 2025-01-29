// app/services/page.tsx

'use client'

import React, { useState, useMemo } from 'react'
import { fetchServices, Service } from 'lib/services'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import ServicesSkeleton from '../../components/ServicesSkeleton'

const categories = [
  'all',
  'Training Services',
  'Audit Services',
  'Policy Services',
  'Compliance Services',
  'Hazardous Material Services',
  'Standardization Services',
  'Medical Services',
]

const industries = [
  'all',
  'Manufacturing',
  'Construction',
  'Healthcare',
  'Agriculture',
  'Mining',
  'Oil & Gas',
  'Transportation',
]

const priceRanges = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under KES 30,000', value: '0-30000' },
  { label: 'KES 30,000 - 50,000', value: '30000-50000' },
  { label: 'Over KES 50,000', value: '50000+' },
]

function ServicesList({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <Link key={service.id} href={`services/${service.id}`} className="group">
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 group-hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
              {service.name}
            </h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-blue-600 font-semibold">
                {service.price}
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {service.category}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<string>('all')

  const {
    data: services = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
    staleTime: 1000 * 60 * 5, // Data considered fresh for 5 minutes
    gcTime: 1000 * 60 * 30, // Cached for 30 minutes
    refetchOnWindowFocus: false,
  })

  const parsedServices = useMemo(() => {
    return services.map((service) => ({
      ...service,
      parsedPrice: parseInt(service.price.replace(/[^0-9]/g, '')),
    }))
  }, [services])

  const filteredServices = useMemo(() => {
    return parsedServices.filter((service) => {
      const matchesCategory =
        selectedCategory === 'all' || service.category === selectedCategory
      const matchesIndustry =
        selectedIndustry === 'all' ||
        service.industry.includes(selectedIndustry)

      let matchesPrice = true
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number)
        if (max) {
          matchesPrice = service.parsedPrice >= min && service.parsedPrice <= max
        } else {
          matchesPrice = service.parsedPrice >= min
        }
      }

      return matchesCategory && matchesIndustry && matchesPrice
    })
  }, [parsedServices, selectedCategory, selectedIndustry, priceRange])

  if (isLoading) return <ServicesSkeleton />
  if (error) return <div className="text-red-500">Failed to load services</div>
  if (!filteredServices.length)
    return <div>No services match your filters. Please adjust your selection.</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 mt-12">
        <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Categories</h3>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border rounded-md"
                aria-label="Select a category"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Industries */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Industries</h3>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full p-2 border rounded-md"
                aria-label="Select an industry"
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry === 'all' ? 'All Industries' : industry}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Price Range</h3>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full p-2 border rounded-md"
                aria-label="Select a price range"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Services Grid */}
          <div className="flex-1">
            <ServicesList services={filteredServices} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
