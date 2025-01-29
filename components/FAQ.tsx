'use client'

const FAQSection = () => {
  const faqs = [
    {
      question: 'What services do you offer?',
      answer:
        'We specialize in compliance audits, hazard management, and employee training.',
    },
    {
      question: 'How can I get started?',
      answer:
        'Contact us through our website or give us a call to discuss your needs.',
    },
  ]

  return (
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold mb-8">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="mb-4 p-4 border rounded-lg shadow-md bg-gray-50 text-left"
        >
          <h3 className="font-bold">{faq.question}</h3>
          <p className="text-gray-600 mt-2">{faq.answer}</p>
        </div>
      ))}
    </div>
  )
}

export default FAQSection
