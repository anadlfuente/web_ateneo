import type { Metadata } from 'next'
import { Inter, DM_Serif_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ConsentimientoProvider } from "@/components/cookies/consentimiento-provider"
import { BannerCookies } from "@/components/cookies/banner-cookies"
import { RedesFlotante } from "@/components/redes-flotante"

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
        <ConsentimientoProvider>
          {children}
          <BannerCookies />
        </ConsentimientoProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
