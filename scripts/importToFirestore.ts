// scripts/importToFirestore.ts

import * as admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { join } from 'path'

// Initialize admin SDK
const serviceAccount = require('../serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

interface Service {
  name: string
  description: string
  price: string
  category: string
  industry: string[]
  link: string
  categoryId: string
  categoryTitle: string
}

async function importToFirestore() {
  try {
    const db = admin.firestore()
    const servicesData = JSON.parse(
      readFileSync(join(__dirname, '../data/services.json'), 'utf8'),
    )

    for (const service of servicesData.services) {
      const docRef = await db.collection('services').add(service)
      console.log(
        `Successfully added service: ${service.name} with ID: ${docRef.id}`,
      )
    }

    console.log('All services imported successfully!')
  } catch (error) {
    console.error('Import failed:', error)
  }
}

importToFirestore()
