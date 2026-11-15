import type { Metadata } from 'next'
import { DM_Serif_Display, Lato } from 'next/font/google'
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
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      ],
      apple: '/apple-icon.png',
    },
  metadataBase: new URL('https://ateneomusicalmieres.es'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${lato.variable} ${dmSerifDisplay.variable} bg-background`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Ateneo Musical de Mieres",
              "url": "https://ateneomusicalmieres.es/",
              "logo": "https://ateneomusicalmieres.es/icon-192.png",
              "foundingDate": "2018",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Mieres",
                "addressRegion": "Asturias",
                "addressCountry": "ES"
              },
              "subOrganization": [
                { "@type": "MusicGroup", "name": "Banda Sinfónica del Ateneo Musical de Mieres", "url": "https://ateneomusicalmieres.es/banda/historia/" },
                { "@type": "MusicGroup", "name": "Coral Cantares", "url": "https://ateneomusicalmieres.es/coral/historia/" },
                { "@type": "MusicGroup", "name": "Charanga New Paentamala", "url": "https://ateneomusicalmieres.es/charanga/" },
                { "@type": "MusicGroup", "name": "Claxon Boys", "url": "https://ateneomusicalmieres.es/claxon/" }
              ],
              "sameAs": [
                "https://www.wikidata.org/wiki/Q142010590",
                "https://www.instagram.com/bandademieres/",
                "https://www.facebook.com/Bandaateneomieres/",
                "https://www.youtube.com/@BandaMusicaMieres",
              ]
            })
          }}
        />
        <ConsentimientoProvider>
          {children}
          <BannerCookies />
        </ConsentimientoProvider>
      </body>
    </html>
  )
}
