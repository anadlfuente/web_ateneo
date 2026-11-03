import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import TextoRico from "@/components/text-bold"
import Carrusel from "@/components/carrusel"
import { charanga } from "@/data/charanga"
import { PageHero } from "@/components/page-hero"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { RedesFlotante } from "@/components/redes-flotante"
import Image from "next/image"
import type { Metadata } from "next"
import { MigasDePan } from "@/components/migas-de-pan"

export const metadata: Metadata = {
  title: "Charanga New Paentamala",
}

export default function CharangaPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <PageHero imagen={charanga.banner.imagen} altoMinimo="min-h-[40vh]">
        <h1 className="text-white">Charanga New Paentamala</h1>
      </PageHero>
      {/* Migas de pan */}
            <MigasDePan items={[{ nombre: "Charanga New Paentamala" }]} />

      {/* Contenido */}
      <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-20 pb-16 space-y-12">
        <div className="flow-root">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">{charanga.titulo}</h2>

          <div className="text-lg md:text-xl leading-relaxed text-muted-foreground text-justify hyphens-auto">
            {/* Logo flotante */}
            <Image
              src={charanga.logo.imagen}
              alt={charanga.logo.alt}
              width={600}
              height={600}
              className="block mx-auto mb-8 w-2/3 max-w-xs h-auto md:float-right md:w-[38%] md:max-w-sm md:ml-10 md:mb-6 md:mt-1"
            />

            {charanga.parrafos.map((p, i) => (
              <p key={i} className="mb-6 last:mb-0">
                <TextoRico texto={p} />
              </p>
            ))}
          </div>
        </div>
        {/* Contratación */}
        <div className="flex flex-col gap-6 rounded-2xl bg-primary-blue/15 p-6 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-[60ch]">
            <h2 className="mb-2">
              ¿Quieres llevar la charanga a tu evento?
            </h2>
            <p>
              Ponemos música y ambiente en fiestas, celebraciones y todo tipo de eventos.
              Escríbenos por instagram y cuéntanos qué tienes en mente, nosotros te ayudamos.
            </p>
          </div>
          <a
            href="https://ig.me/m/charanganewpaentamala"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary shrink-0"
          >
            Contacta con nosotros
            <span className="sr-only"> (se abre Instagram en una pestaña nueva)</span>
          </a>
        </div>
        <Carrusel fotos={charanga.fotos} />
      </section>
      <RedesFlotante agrupacion="charanga" />

      <Footer />
    </main>
  )
}