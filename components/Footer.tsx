// components/Footer.tsx

'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  const socialLinks = [
    {
      name: 'Email',
      url: 'mailto:contact@jarvissafety.com',
      icon: '/images/icons/mail.png',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/jarvissafety',
      icon: '/images/icons/instagram.png',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/jarvissafety',
      icon: '/images/icons/twitter.png',
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/jarvissafety',
      icon: '/images/icons/facebook.png',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/jarvis-safety',
      icon: '/images/icons/linkedin.png',
    },
  ]

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p>Email: contact@jarvissafety.com</p>
            <p>Phone: +254703380448</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <span className="sr-only">{link.name}</span>
                  <Image
                    src={link.icon}
                    alt={link.name}
                    width={24}
                    height={24}
                    style={{
                      filter: 'invert(1)',
                      padding: '8px',
                      borderRadius: '20%',
                    }}
                    className="w-auto h-auto"
                  />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/virtual-consultation"
                  className="hover:text-primary transition-colors"
                >
                  Virtual Consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Jarvis Safety. All rights
            reserved.
          </p>
          <p className="mt-2">Be safe in a healthy environment</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
