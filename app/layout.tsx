import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import Navbar from '@/components/Navbar'
import Providers from './Providers'
import Footer from '@/components/Footer'
import { merienda } from '@/lib/fonts'

export const metadata = {
  title: 'Alexy',
  description: 'Health & Beauty',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang='en' className={merienda.className}>
        <body className='bg-gradient-to-bl from-fuchsia-200 to-cyan-200 transition-all dark:bg-gray-900 dark:bg-none'>
          <Navbar />
          {children}
          <Analytics />
          <Footer />
        </body>
      </html>
    </Providers>
  )
}
