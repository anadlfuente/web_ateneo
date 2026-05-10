import type { Metadata } from 'next'
import { Inter, DM_Serif_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const dmSerif = DM_Serif_Display({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-dm-serif'
})

export const metadata: Metadata = {
  title: 'Ateneo Musical de Mieres',
  description: 'Somos una agrupación musical que engloba banda sinfónica, coros, banda de rock y charanga. Únete a nosotros y forma parte de la música.',
  //generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/logo_ateneo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/logo_ateneo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/logo_ateneo.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/logo_ateneo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${dmSerif.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
