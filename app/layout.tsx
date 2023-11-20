import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import Navbar from '@/components/Navbar'
import Providers from './Providers'
import Newsletter from '@/components/Newsletter'

export const metadata = {
  title: 'Alexy',
  description: 'this website is using a super modern web stack',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <Navbar />
          {children}
          <Newsletter />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
