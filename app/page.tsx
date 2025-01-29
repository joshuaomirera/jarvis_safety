// app/page.tsx

import WhyChooseUsSection from 'components/WhyChooseUs'
import ContactSection from '../components/Contact'
import TestimonialSection from '../components/Testimonial'
import Link from 'next/link'
import HeroCarousel from '../components/HeroCarousel'

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[100vh] bg-gradient-to-r from-blue-800 to-blue-600 overflow-hidden">
        {/* Background Carousel */}
        <HeroCarousel />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-blue-800/90 via-blue-600/70 to-transparent" />

        {/* Content */}
        <div className="relative z-20 container w-1/2 ml-10 px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Be safe in a healthy environment
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100">
              Your trusted partner in workplace safety, offering comprehensive
              solutions for compliance, risk management, and employee training.
              With decades of experience and a commitment to excellence, we help
              businesses create safer work environments and protect their most
              valuable asset - their people.
            </p>
            <Link
              href="/services"
              className="inline-block bg-white text-blue-800 px-8 py-3 rounded-lg 
                font-semibold hover:bg-gray-100 transition-colors"
            >
              Discover Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <WhyChooseUsSection />
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <TestimonialSection />
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <ContactSection />
      </section>
    </main>
  )
}
