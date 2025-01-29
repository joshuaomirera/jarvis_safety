import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ErrorBoundary from '../components/ErrorBoundary'
import Chatbot from '../components/Chatbot'
import Providers from './providers'
import { AdminAuthProvider } from '../contexts/AdminAuthContext'

export const metadata = {
  title: 'Jarvis Safety Consultancy',
  description:
    'Professional health and safety consultancy services including audits, training, and compliance solutions',
  keywords:
    'safety consultancy, health and safety, workplace safety, safety training, safety audits',
  authors: [{ name: 'Jarvis Safety' }],
  openGraph: {
    title: 'Jarvis Safety Consultancy',
    description: 'Professional health and safety consultancy services',
    url: 'https://jarvis-safety.com',
    siteName: 'Jarvis Safety',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://your-production-domain.com'),
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ErrorBoundary>
            <AdminAuthProvider>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-grow">{children}</main>
                  <Footer />
                  <Chatbot />
                </div>
            </AdminAuthProvider>
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
