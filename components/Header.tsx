'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useAdminAuth } from 'contexts/AdminAuthContext'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const { admin, signOut } = useAdminAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        const heroSection = document.querySelector('section')
        if (heroSection) {
          const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
          setIsScrolled(window.scrollY > heroBottom - 80)
        }
      }
    }

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll)
      handleScroll() // Check initial position
      return () => window.removeEventListener('scroll', handleScroll)
    } else {
      setIsScrolled(true) // Always show solid background on other pages
    }
  }, [isHomePage])

  const isTransparent = isHomePage && !isScrolled

  const handleSignOut = async () => {
    await signOut()
    router.push('/admin/login')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
            ${isTransparent ? 'bg-transparent' : 'bg-white shadow-md'}`}
    >
      <div
        className={`container mx-auto px-6 py-4 ${isTransparent ? 'text-white' : 'text-bg'}`}
      >
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
            <span className="text-xl font-bold">Jarvis Safety</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/services"
              className="hover:opacity-80 transition-opacity"
            >
              Services
            </Link>
            <Link href="/about" className="hover:opacity-80 transition-opacity">
              About
            </Link>
            <Link
              href="/contact"
              className="hover:opacity-80 transition-opacity"
            >
              Contact
            </Link>
            <Link href="/team" className="hover:opacity-80 transition-opacity">
              Team
            </Link>
            {admin ? (
              <>
                <Link
                  href="/admin/consultations"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Admin Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-red-600 hover:text-red-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/admin/login"
                className="text-blue-600 hover:text-blue-700"
              >
                Admin Login
              </Link>
            )}
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              href="/services"
              className="block hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/about"
              className="block hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {admin ? (
              <>
                <Link
                  href="/admin/consultations"
                  className="block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left text-red-600 hover:text-red-700 px-4 py-2"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/admin/login"
                className="block hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Login
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
