import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import Navbar from '@/components/Navbar'
import Providers from './Providers'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Alexy',
  description: 'this website is using a super modern web stack',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang='en'>
        <body className='dark:bg-gray-900'>
          <Navbar />
          {children}
          <Analytics />
          <Footer />
        </body>
      </html>
    </Providers>
  )
}
