import SessionWrapper from '@/components/session-provider'
import { Noto_Sans } from 'next/font/google'
import './globals.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/utils/query-client'
import { Toaster } from '@/components/ui/toaster'
import { Metadata } from 'next'

const mainFontFamily = Noto_Sans({
  weight: ['300', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-family-main',
})

export const metadata: Metadata = {
  title: '...',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" className={mainFontFamily.variable}>
      <body>
        <SessionWrapper>
          <QueryClientProvider client={queryClient}>
            {children}
            <Toaster />
          </QueryClientProvider>
        </SessionWrapper>
        <Toaster />
      </body>
    </html>
  )
}
