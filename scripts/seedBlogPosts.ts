import * as admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { join } from 'path'

const serviceAccount = require('../serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const samplePosts = [
  {
    title: 'Understanding Workplace Safety',
    excerpt: 'Essential tips for maintaining a safe work environment...',
    content: `
      <h2>Introduction</h2>
      <p>Workplace safety continues to be a critical concern for businesses of all sizes. In this post, we'll explore essential safety practices that can help create a safer work environment.</p>
      
      <h2>1. Regular Safety Training</h2>
      <p>Implementing regular safety training sessions ensures that all employees are up-to-date with the latest safety protocols and procedures.</p>
      
      <h2>2. Proper Equipment Maintenance</h2>
      <p>Regular equipment maintenance is crucial for preventing accidents and ensuring optimal performance.</p>
    `,
    author: 'John Smith',
    date: new Date().toISOString(),
    imageUrl: '/images/blog/workplace-safety.jpg',
    slug: 'understanding-workplace-safety',
  },
  {
    title: 'Latest Safety Regulations',
    excerpt: 'Updates on safety regulations and compliance requirements...',
    content: `
      <h2>New Safety Standards</h2>
      <p>Stay compliant with the latest safety regulations and standards in your industry.</p>
      
      <h2>1. Updated Guidelines</h2>
      <p>Recent changes in safety protocols and what they mean for your business.</p>
      
      <h2>2. Compliance Requirements</h2>
      <p>Essential steps to ensure your workplace meets all safety requirements.</p>
    `,
    author: 'Sarah Johnson',
    date: new Date().toISOString(),
    imageUrl: '/images/blog/safety-regulations.jpg',
    slug: 'latest-safety-regulations',
  },
  {
    title: 'Safety Equipment Guide',
    excerpt: 'A comprehensive guide to personal protective equipment...',
    content: `
      <h2>Essential Safety Equipment</h2>
      <p>Understanding the importance of proper safety equipment in the workplace.</p>
      
      <h2>1. Personal Protective Equipment</h2>
      <p>A detailed guide to selecting and maintaining PPE for different work environments.</p>
      
      <h2>2. Equipment Standards</h2>
      <p>Understanding safety equipment certifications and quality standards.</p>
    `,
    author: 'Mike Wilson',
    date: new Date().toISOString(),
    imageUrl: '/images/blog/safety-equipment.jpg',
    slug: 'safety-equipment-guide',
  },
]

async function seedBlogPosts() {
  try {
    const db = admin.firestore()

    for (const post of samplePosts) {
      await db.collection('blog-posts').doc(post.slug).set(post)
      console.log(`Added blog post: ${post.title}`)
    }

    console.log('Blog posts seeded successfully!')
  } catch (error) {
    console.error('Error seeding blog posts:', error)
  }
}

seedBlogPosts()
