const { db } = require('../lib/firebase')
const { collection, addDoc } = require('firebase/firestore')

const serviceCategories = [
  {
    title: 'Manufacturing',
    services: [
      {
        name: 'Safety Audits',
        description: 'Comprehensive safety audits for manufacturing facilities',
        price: 'KES 50,000',
        link: '/services/audits',
      },
      {
        name: 'Risk Assessment',
        description: 'Detailed risk assessment and mitigation strategies',
        price: 'KES 35,000',
        link: '/services/risk-assessment',
      },
      {
        name: 'Employee Training',
        description: 'Manufacturing safety training programs',
        price: 'KES 25,000',
        link: '/services/training',
      },
      {
        name: 'Compliance Management',
        description: 'Ongoing compliance monitoring and management',
        price: 'KES 40,000',
        link: '/services/compliance',
      },
    ],
  },
  {
    title: 'Construction',
    services: [
      {
        name: 'Site Safety Management',
        description: 'Comprehensive construction site safety management',
        price: 'KES 60,000',
        link: '/services/site-safety',
      },
      {
        name: 'Worker Safety Training',
        description: 'Construction worker safety training programs',
        price: 'KES 30,000',
        link: '/services/worker-training',
      },
      {
        name: 'Equipment Safety',
        description: 'Construction equipment safety inspections',
        price: 'KES 45,000',
        link: '/services/equipment-safety',
      },
      {
        name: 'Compliance Audits',
        description: 'Construction safety compliance audits',
        price: 'KES 55,000',
        link: '/services/compliance-audits',
      },
    ],
  },
  {
    title: 'Healthcare',
    services: [
      {
        name: 'Medical Safety Protocols',
        description: 'Healthcare facility safety protocols',
        price: 'KES 45,000',
        link: '/services/medical-safety',
      },
      {
        name: 'Infection Control',
        description: 'Infection prevention and control programs',
        price: 'KES 40,000',
        link: '/services/infection-control',
      },
      {
        name: 'Staff Safety Training',
        description: 'Healthcare staff safety training',
        price: 'KES 35,000',
        link: '/services/staff-training',
      },
      {
        name: 'Facility Safety Audits',
        description: 'Healthcare facility safety audits',
        price: 'KES 50,000',
        link: '/services/facility-audits',
      },
    ],
  },
  {
    title: 'Agriculture',
    services: [
      {
        name: 'Farm Safety Programs',
        description: 'Comprehensive farm safety management',
        price: 'KES 40,000',
        link: '/services/farm-safety',
      },
      {
        name: 'Equipment Safety',
        description: 'Agricultural equipment safety inspections',
        price: 'KES 35,000',
        link: '/services/ag-equipment',
      },
      {
        name: 'Chemical Safety',
        description: 'Agricultural chemical safety management',
        price: 'KES 45,000',
        link: '/services/chemical-safety',
      },
      {
        name: 'Worker Protection',
        description: 'Farm worker safety programs',
        price: 'KES 30,000',
        link: '/services/worker-protection',
      },
    ],
  },
  {
    title: 'Machines/Equipment',
    services: [
      {
        name: 'Machinery Safety Audits',
        description: 'Comprehensive machinery safety inspections',
        price: 'KES 55,000',
        link: '/services/machinery-audits',
      },
      {
        name: 'Operator Training',
        description: 'Machine operator safety training',
        price: 'KES 40,000',
        link: '/services/operator-training',
      },
      {
        name: 'Maintenance Safety',
        description: 'Equipment maintenance safety protocols',
        price: 'KES 45,000',
        link: '/services/maintenance-safety',
      },
      {
        name: 'Compliance Certification',
        description: 'Equipment compliance certification',
        price: 'KES 50,000',
        link: '/services/compliance-cert',
      },
    ],
  },
]

const seedServices = async () => {
  try {
    const servicesRef = collection(db, 'services')

    for (const category of serviceCategories) {
      console.log(`Seeding ${category.title} services...`)
      for (const service of category.services) {
        await addDoc(servicesRef, {
          title: service.name,
          description: service.description,
          price: service.price,
          link: service.link,
          industry: [category.title],
          category: determineCategory(service.name),
        })
        console.log(`Added service: ${service.name}`)
      }
    }
    console.log('All services seeded successfully!')
  } catch (error) {
    console.error('Error seeding services:', error)
  }
}

const determineCategory = (serviceName: string): string => {
  if (serviceName.includes('Training')) return 'Training Services'
  if (serviceName.includes('Audit')) return 'Audit Services'
  if (serviceName.includes('Compliance')) return 'Compliance Services'
  if (serviceName.includes('Safety')) return 'Safety Services'
  if (serviceName.includes('Medical')) return 'Medical Services'
  return 'Other Services'
}

seedServices()
