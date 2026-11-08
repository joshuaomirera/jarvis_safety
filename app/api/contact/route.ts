import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { FieldValue, getFirestore } from 'firebase-admin/firestore'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const adminAppName = 'jarvis-safety-contact-api'
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getAdminFirestore() {
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Firebase Admin credentials are not configured')
  }

  const app =
    getApps().find((candidate) => candidate.name === adminAppName) ||
    initializeApp(
      {
        credential: cert({ projectId, clientEmail, privateKey }),
        projectId,
      },
      adminAppName,
    )

  return getFirestore(app)
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 })
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Invalid form submission.' }, { status: 400 })
  }

  const values = body as Record<string, unknown>
  const { name, email, message, website } = values

  // Silently accept automated submissions caught by the hidden honeypot.
  if (typeof website === 'string' && website.trim()) {
    return NextResponse.json({ ok: true })
  }

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
  }

  const cleanName = name.trim()
  const cleanEmail = email.trim().toLowerCase()
  const cleanMessage = message.trim()

  if (!cleanName || cleanName.length > 100) {
    return NextResponse.json({ error: 'Name must be between 1 and 100 characters.' }, { status: 400 })
  }
  if (!cleanEmail || cleanEmail.length > 254 || !emailPattern.test(cleanEmail)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }
  if (!cleanMessage || cleanMessage.length > 5000) {
    return NextResponse.json({ error: 'Message must be between 1 and 5000 characters.' }, { status: 400 })
  }

  try {
    const firestore = getAdminFirestore()
    await firestore.collection('contact-messages').add({
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
      status: 'new',
      createdAt: FieldValue.serverTimestamp(),
    })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    console.error('Contact form submission failed:', error)
    return NextResponse.json(
      { error: 'We could not send your message right now. Please try again later.' },
      { status: 500 },
    )
  }
}
