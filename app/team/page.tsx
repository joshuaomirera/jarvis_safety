// components/Team.tsx

'use client'

import React from 'react'
import Image from 'next/image'

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Samuel Wanjala',
      position: 'Chief Executive Officer',
      contact: '+254703380448',
      image: '/images/team/ceo.png',
    },
    {
      name: 'Benard Naiyani',
      position: 'Safety Consultant',
      image: '/images/team/consultant.png',
    },
    {
      name: 'Team Member',
      position: 'Client Relations Manager',
      image: '/images/team/client-relations.png',
    },
    {
      name: 'Team Member',
      position: 'QSHE Training Manager',
      image: '/images/team/training-manager.png',
    },
    {
      name: 'Team Member',
      position: 'QSHE Audit Manager',
      image: '/images/team/audit-manager.png',
    },
    {
      name: 'Team Member',
      position: 'QSHE Compliance Officer',
      image: '/images/team/compliance-officer.png',
    },
    {
      name: 'Team Member',
      position: 'Human Resource Manager',
      image: '/images/team/hr-manager.png',
    },
    {
      name: 'Team Member',
      position: 'Finance Manager',
      image: '/images/team/finance-manager.png',
    },
  ]

  const jobCategories = [
    {
      title: 'Executive Team',
      positions: ['Chief Executive Officer', 'Safety Consultant'],
    },
    {
      title: 'Management',
      positions: [
        'Client Relations Manager',
        'QSHE Training Manager',
        'QSHE Audit Manager',
      ],
    },
    {
      title: 'Operations',
      positions: ['QSHE Compliance Officer'],
    },
    {
      title: 'Support',
      positions: ['Human Resource Manager', 'Finance Manager'],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 mt-20">
        <h2 className="text-4xl font-bold text-center mb-12">Our Team</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Side Section - Job Categories */}
          <div className="md:w-1/4">
            <div className="sticky top-24 bg-white rounded-lg shadow-lg p-6">
              {jobCategories.map((category, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">
                    {category.title}
                  </h3>
                  <ul className="space-y-2">
                    {category.positions.map((position, idx) => (
                      <li
                        key={idx}
                        className="text-gray-600 hover:text-blue-500 cursor-pointer"
                      >
                        {position}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Team Grid */}
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-w-1 aspect-h-1 flex justify-center items-center p-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={160}
                      height={160}
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-center">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 text-center">
                      {member.position}
                    </p>
                    {member.contact && (
                      <p className="text-blue-600 text-sm mt-2 text-center">
                        {member.contact}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamSection
