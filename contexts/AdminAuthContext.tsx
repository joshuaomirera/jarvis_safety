'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import {
  User,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { auth, firestore } from '../lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

interface AdminAuthContextType {
  admin: boolean
  loading: boolean
  user: User | null
  signOut: () => Promise<void>
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  admin: false,
  loading: true,
  user: null,
  signOut: async () => {},
})

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)

      if (user) {
        // Check if user is admin
        const adminDoc = await getDoc(doc(firestore, 'admins', user.uid))
        setAdmin(adminDoc.exists())
      } else {
        setAdmin(false)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        user,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => useContext(AdminAuthContext)
