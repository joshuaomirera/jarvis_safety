// app/admin/dashboard/page.tsx

'use client'

import { useState, useEffect } from 'react'
import { collection, query, getDocs, where } from 'firebase/firestore'
import { firestore } from 'lib/firebase'; // Corrected import
import { useAdminAuth } from 'contexts/AdminAuthContext'; // Corrected import
import { useRouter } from 'next/navigation'

interface DashboardStats {
  bookings: number
  consultations: number
  services: number
  'chat-messages': number
  pendingConsultations: number
}

export default function DashboardPage() {
  const router = useRouter()
  const { admin, loading: authLoading } = useAdminAuth()
  const [stats, setStats] = useState<DashboardStats>({
    bookings: 0,
    consultations: 0,
    services: 0,
    'chat-messages': 0,
    pendingConsultations: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Redirect if not authenticated
    if (!authLoading && !admin) {
      router.push('/admin/login')
      return
    }

    const fetchStats = async () => {
      if (!admin) return

      try {
        setLoading(true)
        setError(null)

        const collections = ['bookings', 'services', 'chat-messages']

        const results = await Promise.all([
          ...collections.map(async (collectionName) => {
            const q = query(collection(firestore, collectionName))
            const snapshot = await getDocs(q)
            return { [collectionName]: snapshot.size }
          }),
          getDocs(
            query(
              collection(firestore, 'consultations'),
              where('status', '==', 'pending'),
            ),
          ).then((snapshot) => ({ pendingConsultations: snapshot.size })),
        ])

        const newStats = results.reduce(
          (acc, curr) => ({ ...acc, ...curr }),
          {},
        )
        setStats(newStats as DashboardStats)
      } catch (error) {
        console.error('Error fetching stats:', error)
        setError(
          'Failed to fetch dashboard statistics. Please try again later.',
        )
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [admin, authLoading, router])

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-gray-500">Verifying authentication...</div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-gray-500">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Bookings</h3>
          <p className="text-3xl font-bold">{stats.bookings}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Services</h3>
          <p className="text-3xl font-bold">{stats.services}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Pending Consultations</h3>
          <p className="text-3xl font-bold">{stats.pendingConsultations}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Recent Messages</h3>
          <p className="text-3xl font-bold">{stats['chat-messages']}</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Add recent activity list here */}
        </div>
      </div>
    </div>
  )
}
