import { getDatabase, ref, get } from 'firebase/database'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { firestore } from '../lib/firebase'

interface Service {
  name: string
  description: string
  price: string
  category: string
  industry: string[]
  link: string
}

async function migrateServicesToFirestore() {
  const rtdb = getDatabase()

  try {
    const servicesRef = ref(rtdb, '/services')
    const snapshot = await get(servicesRef)
    const categories = snapshot.val()

    for (const [categoryId, categoryData] of Object.entries(categories)) {
      const data = categoryData as { services: Service[]; title: string }

      for (const service of data.services) {
        const validService = {
          name: service.name,
          description: service.description,
          price: service.price,
          category: service.category,
          industry: service.industry,
          link: service.link,
          categoryId: categoryId,
          categoryTitle: data.title,
        }

        console.log('Attempting to add:', JSON.stringify(validService, null, 2))

        try {
          const docRef = await addDoc(
            collection(firestore, 'services'),
            validService,
          )
          console.log(
            `Successfully migrated service: ${validService.name} with ID: ${docRef.id}`,
          )
        } catch (e) {
          console.error('Error adding document:', e)
          console.error(
            'Failed service data:',
            JSON.stringify(validService, null, 2),
          )
        }
      }
    }

    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Error during migration:', error)
  }
}

migrateServicesToFirestore()
