import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JoinSection } from "@/components/join-section"
import { PageHero } from "@/components/page-hero"
import { RedesFlotante } from "@/components/redes-flotante"
import { MigasDePan } from "@/components/migas-de-pan"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Hazte socio | Ateneo Musical de Mieres',
  description: 'Hazte socio del Ateneo Musical de Mieres por 20 € al año y apoya la actividad de la Banda Sinfónica, la Coral Cantares y el resto de agrupaciones.',
  alternates: { canonical: '/join/' },
};

export default function JoinPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <PageHero
        imagen="/banner_2.png"
        altoMinimo="min-h-[40vh]"
      >
        <h1 className="text-white text-5xl md:text-7xl font-serif leading-tight">
          Hazte Socio
        </h1>
      </PageHero>

      {/* Migas de pan */}
          <MigasDePan items={[{ nombre: "Hazte socio" }]} />

        <main>
            <JoinSection />
        </main>
      <RedesFlotante />
      <Footer />
    </main>
  )
}