'use client'

import React, { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { firestore } from '../lib/firebase'

export default function VirtualConsultation() {
  const [isJoining, setIsJoining] = useState(false)
  const [topic, setTopic] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [showMeeting, setShowMeeting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isZegoLoaded, setIsZegoLoaded] = useState(false)

  async function handleJoinConsultation(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !topic) return

    setIsJoining(true)
    setError(null)

    try {
      // Create consultation room in Firestore
      const roomRef = await addDoc(
        collection(firestore, 'consultation-rooms'),
        {
          topic,
          clientName: name,
          clientEmail: email,
          status: 'waiting',
          startTime: serverTimestamp(),
        },
      )

      const { ZegoUIKitPrebuilt } = await import(
        '@zegocloud/zego-uikit-prebuilt'
      )
      setIsZegoLoaded(true)
      const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID || '0')
      const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET || ''

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomRef.id,
        name,
        name,
      )

      const zp = ZegoUIKitPrebuilt.create(kitToken)

      // Join the room
      const container = document.getElementById('meeting-container')
      if (container) {
        zp.joinRoom({
          container,
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
          showPreJoinView: false,
          turnOnMicrophoneWhenJoining: true,
          turnOnCameraWhenJoining: true,
          showMyCameraToggleButton: true,
          showMyMicrophoneToggleButton: true,
          showAudioVideoSettingsButton: true,
          showScreenSharingButton: true,
          showTextChat: true,
          showUserList: true,
          maxUsers: 2,
          layout: 'Auto',
          showLayoutButton: false,
        })
        setShowMeeting(true)
      }
    } catch (error) {
      console.error('Error creating consultation:', error)
      setError(
        error instanceof Error ? error.message : 'Failed to start consultation',
      )
    } finally {
      setIsJoining(false)
    }
  }

  if (!isZegoLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mt-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Virtual Consultation
            </h1>
            <p className="text-gray-600">
              Connect with our safety experts in real-time
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {!showMeeting ? (
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <form onSubmit={handleJoinConsultation} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Consultation Topic
                  </label>
                  <input
                    type="text"
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder="e.g., Workplace Safety Assessment"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isJoining}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 
                  disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isJoining ? 'Joining...' : 'Start Consultation'}
                </button>
              </form>
            </div>
          ) : (
            <div
              id="meeting-container"
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              style={{ height: '600px' }}
            />
          )}
        </div>
      </div>
    )
  }
}
