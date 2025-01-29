'use client'

import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { firestore } from '../lib/firebase'
import LoadingSpinner from './LoadingSpinner'

interface ReportData {
  title: string
  type: string
  date: string
  findings: string[]
  recommendations: string[]
  attachments: File[]
}

const ReportGenerator = () => {
  const [reportData, setReportData] = useState<ReportData>({
    title: '',
    type: 'audit',
    date: new Date().toISOString().split('T')[0],
    findings: [''],
    recommendations: [''],
    attachments: [],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    setReportData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleArrayInput = (
    index: number,
    value: string,
    field: 'findings' | 'recommendations',
  ) => {
    setReportData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field: 'findings' | 'recommendations') => {
    setReportData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setReportData((prev) => ({
        ...prev,
        attachments: [...Array.from(e.target.files!)],
      }))
    }
  }

  const generateReport = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Add report to Firestore
      await addDoc(collection(firestore, 'reports'), reportData)

      // Reset form
      setReportData({
        title: '',
        type: 'audit',
        date: new Date().toISOString().split('T')[0],
        findings: [''],
        recommendations: [''],
        attachments: [],
      })
    } catch (err) {
      setError('Failed to generate report')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={generateReport}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold mb-6">Generate Report</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Report Title
          </label>
          <input
            type="text"
            name="title"
            value={reportData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Report Type
          </label>
          <select
            name="type"
            value={reportData.type}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="audit">Audit Report</option>
            <option value="inspection">Inspection Report</option>
            <option value="incident">Incident Report</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Findings
          </label>
          {reportData.findings.map((finding, index) => (
            <div key={index} className="mt-2">
              <textarea
                value={finding}
                onChange={(e) =>
                  handleArrayInput(index, e.target.value, 'findings')
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                rows={3}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('findings')}
            className="mt-2 text-sm text-blue-500"
          >
            + Add Finding
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Recommendations
          </label>
          {reportData.recommendations.map((rec, index) => (
            <div key={index} className="mt-2">
              <textarea
                value={rec}
                onChange={(e) =>
                  handleArrayInput(index, e.target.value, 'recommendations')
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                rows={3}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('recommendations')}
            className="mt-2 text-sm text-blue-500"
          >
            + Add Recommendation
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Attachments
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="mt-1 block w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? <LoadingSpinner size="small" /> : 'Generate Report'}
        </button>
      </div>
    </form>
  )
}

export default ReportGenerator
