import React from 'react'

export default function About() {
  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-4xl font-bold text-center mb-8">
          About Jarvis Safety
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-6">
            At Jarvis Safety, we are committed to providing innovative safety
            solutions that protect and empower organizations and individuals.
            Our mission is to create a safer environment through cutting-edge
            technology and expert guidance.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
          <p className="text-lg text-gray-700 mb-6">
            We specialize in comprehensive safety solutions, offering expert
            consultation, state-of-the-art equipment, and tailored training
            programs to meet the unique needs of each client.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Excellence</h3>
              <p className="text-gray-600">
                Committed to delivering the highest quality in everything we do.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Innovation</h3>
              <p className="text-gray-600">
                Continuously evolving and improving our solutions.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Integrity</h3>
              <p className="text-gray-600">
                Operating with honesty and transparency in all interactions.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
