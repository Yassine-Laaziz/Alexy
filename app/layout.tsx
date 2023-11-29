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
    <html lang='en'>
      <body className='bg-gradient-to-tl from-cyan-300 via-pink-300 to-cyan-300'>
        <Providers>
          <Navbar />
          {children}
          <Analytics />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
