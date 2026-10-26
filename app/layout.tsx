import type { Metadata } from 'next'
import { DM_Serif_Display, Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ConsentimientoProvider } from "@/components/cookies/consentimiento-provider"
import { BannerCookies } from "@/components/cookies/banner-cookies"

const lato = Lato({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: '--font-lato',
})

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ["latin"],
  variable: '--font-dm-serif-display',
})

export const metadata: Metadata = {
  title: {
    default: 'Ateneo Musical de Mieres | Web Oficial',
    template: '%s | Ateneo Musical de Mieres',
  },
  description: 'Ateneo Musical de Mieres: Banda Sinfónica, Coral Cantares, Claxon Boys y Charanga New Paentamala. Música para conciertos, procesiones y fiestas en Asturias. Fundada en 2018.',
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
    <html lang="es" className={`${lato.variable} ${dmSerifDisplay.variable} bg-background`} data-scroll-behavior="smooth">
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
