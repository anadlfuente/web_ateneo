import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import TextoRico from "@/components/text-bold"
import Carrusel from "@/components/carrusel"
import { claxon } from "@/data/claxon"
import { PageHero } from "@/components/page-hero"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import { MigasDePan } from "@/components/migas-de-pan"

export const metadata: Metadata = {
  title: "Claxon Boys",
}

export default function ClaxonPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <PageHero imagen={claxon.banner.imagen} altoMinimo="min-h-[40vh]">
        <h1 className="text-white">Claxon Boys</h1>
      </PageHero>

      {/* Migas de pan */}
            <MigasDePan items={[{ nombre: "Claxon Boys" }]} />

      {/* Contenido */}
      <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-20 pb-16 space-y-12">
        <div className="flow-root">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">{claxon.titulo}</h2>

          <div className="text-lg md:text-xl leading-relaxed text-muted-foreground text-justify hyphens-auto">
            {/* Logo flotante */}
            <Image
              src={claxon.logo.imagen}
              alt={claxon.logo.alt}
              width={600}
              height={600}
              className="block mx-auto mb-8 w-2/3 max-w-xs h-auto md:float-right md:w-[38%] md:max-w-sm md:ml-10 md:mb-6 md:mt-1"
            />

            {claxon.parrafos.map((p, i) => (
              <p key={i} className="mb-6 last:mb-0">
                <TextoRico texto={p} />
              </p>
            ))}
          </div>
        </div>

        <Carrusel fotos={claxon.fotos} />
      </section>

      {/* Llamada a la acción final */}
      <section className="home-section" aria-labelledby="contratar-final">
        <div className="home-container">
          <div className="flex flex-col gap-6 rounded-2xl bg-primary-blue/15 p-6 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="max-w-[60ch]">
              <h2 id="contratar-final" className="mb-2">
                ¿Quieres contar con los Claxon Boys en tu evento?
              </h2>
              <p>Cuéntanos qué necesitas y te respondemos por correo.</p>
            </div>
            <Link
              href="/contacto?asunto=contratar&agrupacion=claxon#formulario"
              className="cta-primary shrink-0"
            >
              Contacta con los Claxon Boys
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}