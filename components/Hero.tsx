import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
  return (
    <section
      className="relative w-full h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/images/home-hero.jpg")',
        backgroundPosition: 'top',
        backgroundSize: 'cover',
      }}
    >
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto bg-black/50 p-8 md:p-12 rounded-lg backdrop-blur-sm w-100">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            Be safe in a healthy environment
          </h1>
          <div className="text-xl md:text-2xl text-bright mb-6">
            <p>Safety first, safety always</p>
            <p>Safety starts with me</p>
          </div>
          <p className="text-base md:text-lg mb-8 text-white leading-relaxed">
            Your trusted partner in workplace safety, offering comprehensive
            solutions for compliance, risk management, and employee training.
            With decades of experience and a commitment to excellence, we help
            businesses create safer work environments and protect their most
            valuable asset - their people.
          </p>
          <div className="text-center">
            <Link href="/services" passHref>
              <a className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 inline-block">
                Discover Our Services
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
