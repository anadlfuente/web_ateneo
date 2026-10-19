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

export default function ClaxonPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <PageHero
        imagen={claxon.banner.imagen}
        altoMinimo="min-h-[40vh]"
        centrado
      >
        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif leading-tight">
          {claxon.banner.titulo}
        </h1>
      </PageHero>

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

          <div className="clear-both flex justify-center pt-8">
            <Link href="/#contacto">
              <Button
                variant="outline"
                size="lg"
                className="px-6 py-5 text-base font-semibold group border-primary-blue text-primary-blue bg-transparent hover:bg-primary-blue hover:text-white"
              >
                Contactar
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        <Carrusel fotos={claxon.fotos} />
      </section>

      <Footer />
    </main>
  )
}