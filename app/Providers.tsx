'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { ThemeProvider } from '../lib/contexts/ThemeContext'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider session={undefined}>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  )
}
