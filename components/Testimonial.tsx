// components/Testimonial.tsx

import React from 'react'

const TestimonialSection = () => {
  const testimonials = [
    {
      name: 'John Doe',
      feedback:
        'The team at Jarvis Safety exceeded our expectations. Highly recommend!',
      company: 'ABC Corp',
    },
    {
      name: 'Jane Smith',
      feedback:
        'Professional and thorough. Their audits helped us improve compliance significantly.',
      company: 'XYZ Ltd',
    },
  ]

  return (
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold mb-8">What Our Clients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-6 border rounded-lg shadow-lg bg-white">
            <p className="text-lg italic mb-4">
              &quot;{testimonial.feedback}&quot;
            </p>
            <h4 className="font-bold">{testimonial.name}</h4>
            <p className="text-gray-500">{testimonial.company}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialSection
