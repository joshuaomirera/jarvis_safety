// components/Chatbot.tsx

'use client'

import React, { useState, useEffect, useRef } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { firestore } from '../lib/firebase'
import { v4 as uuidv4 } from 'uuid'
import { fetchServices } from '../lib/services'

type CategoryType =
  | 'greeting'
  | 'services'
  | 'pricing'
  | 'consultation'
  | 'training'
  | 'location'
  | 'businessHours'
  | 'emergency'
  | 'trainingCapacity'
  | 'virtualServices'
  | 'rescheduling'
  | 'cancellation'
  | 'certification'
  | 'customization'
  | 'default'

interface Message {
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

// Knowledge Base Categories

// Define response patterns
const botResponses: Record<CategoryType, string[]> = {
  greeting: [
    'Hello! Welcome to Jarvis Safety! How can I assist you today?',
    'Hi there! How may I help you with our safety services?',
    'Welcome! What can I help you with today?',
  ],
  services: [
    'We offer a wide range of safety services including Training, Audit, Policy, Compliance, Hazardous Material, Standardization, and Medical Services. Which area interests you?',
    'Our services cover various safety aspects. Would you like to know more about any specific service?',
  ],
  pricing: [
    'Our pricing varies depending on the service and scope. Most services range from KES 30,000 to KES 50,000. Would you like a detailed quote for a specific service?',
    'I can help you understand our pricing structure. Which service are you interested in?',
  ],
  consultation: [
    'You can book a consultation through our website. Would you like me to guide you to the booking page?',
    "I'd be happy to help you schedule a consultation. Shall I show you how to book one?",
  ],
  training: [
    'Our training services cover workplace safety, hazard identification, emergency response, and more. Would you like specific information about any training program?',
    'We offer comprehensive safety training programs. Which aspect of safety training interests you?',
  ],
  location: [
    'Our main office is located in Nairobi, Kenya. We also offer on-site services across East Africa. Would you like our specific office address?',
    "We're based in Nairobi, but we provide services throughout East Africa. Would you like directions to our office?",
  ],
  businessHours: [
    'Our office hours are Monday to Friday, 8:00 AM to 5:00 PM (EAT). Would you like to schedule a meeting during these hours?',
    'We operate from 8 AM to 5 PM on weekdays (East Africa Time). How can we assist you during these hours?',
  ],
  trainingCapacity: [
    'Our training sessions can accommodate 5-30 participants per session. For larger groups, we can arrange multiple sessions. How many participants are you planning for?',
    "We typically handle groups of 5-30 people per training session, but we can customize arrangements for larger teams. What's your group size?",
  ],
  virtualServices: [
    'Yes, we offer virtual consultations and online training sessions. Would you like to know more about our virtual services?',
    'Our virtual services include online consultations, remote safety audits, and digital training programs. Which virtual service interests you?',
  ],
  rescheduling: [
    "To reschedule your appointment, please provide your booking reference number and preferred new date/time. I'll help you with the process.",
    'I can help you reschedule your appointment. Do you have your booking reference number handy?',
  ],
  cancellation: [
    'To cancel your booking, please provide your booking reference number. Note that cancellations within 24 hours of the appointment may incur a fee.',
    'I can assist with cancelling your appointment. Please share your booking reference number for processing.',
  ],
  emergency: [
    'For immediate safety emergencies, please contact emergency services at 999 or 112. For urgent safety consultations during business hours, call our hotline at +254-XXX-XXXXXX.',
    'If this is a safety emergency, please contact emergency services immediately. Our emergency consultation line is +254-XXX-XXXXXX during business hours.',
  ],
  certification: [
    'Our training programs include internationally recognized certifications. Certificates are issued upon successful completion of the course and assessment.',
    'Yes, we provide certified safety training programs. Would you like details about specific certification courses?',
  ],
  customization: [
    'We can customize our training programs and services to match your industry-specific needs. Would you like to discuss a customized solution?',
    'Our services can be tailored to your specific industry requirements. Shall we discuss your specific needs?',
  ],
  default: [
    "I'm here to help! Could you please provide more details about your inquiry?",
    'I want to make sure I assist you properly. Could you elaborate on your question?',
    'Thank you for your message. To better assist you, could you provide more specific information?',
  ],
}

// Add specific service responses
const serviceResponses: Record<string, string> = {
  medical: `Our Medical Services include:
  - Occupational Health Assessments
  - First Aid Training and Certification
  - Emergency Medical Response Planning
  - Workplace Health Monitoring
  - Medical Emergency Preparedness
  
Would you like to schedule a consultation about any of these medical services?`,

  training: `Our Training Services include:
  - Safety Leadership Training
  - Emergency Response Training
  - Risk Assessment Training
  - OSHA Compliance Training
  - Custom Safety Training Programs
  
Would you like to learn more about a specific training program?`,

  audit: `Our Safety Audit Services include:
  - Comprehensive Workplace Safety Audits
  - Compliance Gap Analysis
  - Risk Assessment Reviews
  - Safety Management System Audits
  - Follow-up Implementation Support
  
Would you like to schedule a safety audit?`,

  hazmat: `Our Hazardous Material Services include:
  - Hazmat Handling Procedures
  - Chemical Safety Management
  - Storage and Transportation Guidelines
  - Emergency Response Planning
  - Staff Training for Hazmat Handling
  
Would you like to discuss your hazardous material safety needs?`,
}

// Enhanced response selection with context awareness
async function getBotResponse(userInput: string): Promise<string> {
  const input = userInput.toLowerCase()

  // First check for virtual consultation requests
  if (
    input.includes('virtual') ||
    input.includes('online') ||
    (input.includes('consultation') && !input.includes('book'))
  ) {
    return `
      You can start a virtual consultation right away by clicking here: 
      <a href="/virtual-consultation" class="text-blue-600 underline">Join Virtual Consultation</a>. 
      This will connect you with one of our safety experts in a video call.
    `
  }

  // Check for specific service inquiries
  if (input.includes('medical') || input.includes('health')) {
    return serviceResponses.medical
  }

  if (
    input.includes('training') ||
    input.includes('learn') ||
    input.includes('course')
  ) {
    return serviceResponses.training
  }

  if (
    input.includes('audit') ||
    input.includes('assessment') ||
    input.includes('review')
  ) {
    return serviceResponses.audit
  }

  if (
    input.includes('hazmat') ||
    input.includes('hazardous') ||
    input.includes('chemical')
  ) {
    return serviceResponses.hazmat
  }

  // Check for service details request
  if (
    input.includes('tell me more') ||
    input.includes('know more') ||
    input.includes('details')
  ) {
    for (const [service, response] of Object.entries(serviceResponses)) {
      if (input.includes(service)) {
        return response
      }
    }
  }

  try {
    const services = await fetchServices()

    // Check for price range queries
    if (input.includes('under') && input.includes('kes')) {
      const priceLimit = parseInt(input.match(/\d+/)?.[0] || '0')
      const affordableServices = services.filter((service) => {
        const price = parseInt(service.price.replace(/[^0-9]/g, ''))
        return price < priceLimit
      })

      if (affordableServices.length > 0) {
        const servicesList = affordableServices
          .map((s) => `${s.name} (${s.price})`)
          .join(', ')
        return `Here are our services under KES ${priceLimit}: ${servicesList}. Would you like more details about any of these services?`
      }
    }

    // Check for hazmat/hazardous materials queries
    if (input.includes('hazmat') || input.includes('hazardous')) {
      const hazmatServices = services.filter(
        (s) =>
          s.category.toLowerCase().includes('hazardous') ||
          s.description.toLowerCase().includes('hazardous'),
      )

      if (hazmatServices.length > 0) {
        const service = hazmatServices[0]
        return `We offer ${service.name}: ${service.description}. The price for this service is ${service.price}. Would you like to schedule a consultation?`
      }
    }

    // Check for virtual/online consultation
    if (input.includes('virtual') || input.includes('online')) {
      return `Yes, we offer virtual consultations! You can schedule one through our booking page: <a href="/contact" class="text-blue-600 underline">Schedule Virtual Consultation</a>. Would you like me to explain the process?`
    }

    // If no pattern match, check for service-specific queries
    // Check for price-related queries
    if (input.includes('least expensive') || input.includes('cheapest')) {
      const sortedServices = [...services].sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''))
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''))
        return priceA - priceB
      })
      const cheapest = sortedServices[0]
      return `Our most affordable service is ${cheapest.name} at ${cheapest.price}. ${cheapest.description}`
    }

    // Check for general services query
    if (input.includes('services') || input.includes('available')) {
      const categories = [...new Set(services.map((s) => s.category))]
      return `We offer the following types of services: ${categories.join(', ')}. Would you like to know more about any specific category?`
    }

    // Check for specific service or category mentions
    const words = input.split(' ')
    const matchingService = services.find((service) =>
      words.some(
        (word) =>
          service.name.toLowerCase().includes(word) ||
          service.category.toLowerCase().includes(word),
      ),
    )

    if (matchingService) {
      return `${matchingService.name}: ${matchingService.description}. The price for this service is ${matchingService.price}.`
    }

    // Default response if no specific match
    return botResponses.default[
      Math.floor(Math.random() * botResponses.default.length)
    ]
  } catch (error) {
    console.error('Error fetching services:', error)
    return "I'm having trouble accessing our service information right now. Please try again later or contact our support team."
  }
}

// Update the message rendering to support HTML links
function MessageContent({ text }: { text: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: text }}
      className="message-content"
    />
  )
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatboxRef = useRef<HTMLDivElement>(null)

  // Initialize session and welcome message
  useEffect(() => {
    // Generate new session ID on each load
    setSessionId(uuidv4())

    // Add welcome message
    setMessages([
      {
        text: 'Welcome to Jarvis Safety! How can we assist you today?',
        sender: 'bot',
        timestamp: new Date(),
      },
    ])
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    const userMessage = input.trim()
    setInput('')

    // Add user message
    const newUserMessage: Message = {
      text: userMessage,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])

    try {
      // Get bot response
      const botResponse = await getBotResponse(userMessage)

      // Add bot message
      const newBotMessage: Message = {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newBotMessage])

      // Store in Firestore
      await addDoc(collection(firestore, 'chat-messages'), {
        sessionId,
        text: userMessage,
        response: botResponse,
        timestamp: serverTimestamp(),
      })
    } catch (error) {
      console.error('Error processing message:', error)
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
          sender: 'bot',
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          )}
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatboxRef}
          className="absolute bottom-16 right-0 w-96 h-[30rem] bg-white rounded-lg shadow-xl flex flex-col"
          role="dialog"
          aria-label="Chat window"
        >
          {/* Chat Header */}
          <div className="p-4 bg-blue-600 text-white rounded-t-lg">
            <h2 className="text-lg font-semibold">Jarvis Safety Chat</h2>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <MessageContent text={message.text} />
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Chatbot
