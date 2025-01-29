'use client'

import { redirect } from 'next/navigation'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import { useRouter } from 'next/navigation'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { admin, loading, signOut } = useAdminAuth()
  const router = useRouter()

  // Don't redirect while loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    )
  }

  // Only redirect after loading is complete and we know user is not admin
  if (!admin) {
    redirect('/admin/login')
  }

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/admin/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="mt-4">
          <a
            href="/admin/dashboard"
            className="block px-4 py-2 hover:bg-gray-50"
          >
            Dashboard Overview
          </a>
          <a
            href="/admin/bookings"
            className="block px-4 py-2 hover:bg-gray-50"
          >
            Bookings
          </a>
          <a
            href="/admin/services"
            className="block px-4 py-2 hover:bg-gray-50"
          >
            Services
          </a>
          <a
            href="/admin/messages"
            className="block px-4 py-2 hover:bg-gray-50"
          >
            Chat Messages
          </a>
        </nav>
        {admin && (
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 mt-auto"
          >
            Logout
          </button>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}

export default AdminLayout
