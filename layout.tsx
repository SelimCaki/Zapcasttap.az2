import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'ZapçastTap — Zapçast və usta axtarışı',
  description:
    'Azərbaycanda avtomobil ehtiyat hissələri və usta axtarışı. Şəklini çək, sorğu yarat, satıcılardan təklif al.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1E293B',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="az" className={`${inter.variable} bg-slate-300`}>
      <body className="font-sans antialiased">
        <div className="relative mx-auto flex min-h-dvh w-full max-w-[440px] flex-col bg-background shadow-2xl">
          {children}
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
