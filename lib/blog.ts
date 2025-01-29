import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { firestore } from '../lib/firebase'

export async function fetchBlogPosts() {
  const blogRef = collection(firestore, 'blog-posts')
  const q = query(blogRef, orderBy('date', 'desc'))
  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}
