// components/DataManagement.tsx

'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  collection,
  query,
  getDocs,
  deleteDoc,
  doc,
  where,
} from 'firebase/firestore'
import { firestore } from '../lib/firebase'
import LoadingSpinner from './LoadingSpinner'

interface Report {
  id: string
  title: string
  type: string
  date: string
  status: string
  findings: string[]
  recommendations: string[]
}

const DataManagement = () => {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filterType, setFilterType] = useState('all')

  // Memoized fetchReports function
  const fetchReports = useCallback(async () => {
    try {
      setLoading(true)
      const reportsRef = collection(firestore, 'reports')
      const q =
        filterType !== 'all'
          ? query(reportsRef, where('type', '==', filterType))
          : query(reportsRef)

      const querySnapshot = await getDocs(q)
      const reportsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Report[]

      setReports(reportsList)
    } catch (err) {
      setError('Failed to fetch reports')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [filterType]) // Include filterType as a dependency

  const deleteReport = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, 'reports', id))
      setReports((prev) => prev.filter((report) => report.id !== id))
    } catch (err) {
      setError('Failed to delete report')
      console.error(err)
    }
  }

  // Use the memoized fetchReports in useEffect
  useEffect(() => {
    fetchReports()
  }, [fetchReports])

  if (loading) return <LoadingSpinner size="large" />

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Reports Management</h2>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All Reports</option>
          <option value="audit">Audit Reports</option>
          <option value="inspection">Inspection Reports</option>
          <option value="incident">Incident Reports</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{report.title}</h3>
            <p className="text-gray-600 mb-4">Type: {report.type}</p>
            <p className="text-gray-600 mb-4">Date: {report.date}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => deleteReport(report.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DataManagement
