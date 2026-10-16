import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import TextoRico from "@/components/text-bold"
import Carrusel from "@/components/carrusel"
import { claxon } from "@/data/claxon"
import { PageHero } from "@/components/page-hero"

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
        <div>
          <h2 className="text-3xl md:text-4xl font-serif mb-6">{claxon.titulo}</h2>
          <div className="text-lg md:text-xl leading-relaxed text-muted-foreground space-y-6 text-justify hyphens-auto">
            {claxon.parrafos.map((p, i) => (
              <p key={i}>
                <TextoRico texto={p} />
              </p>
            ))}
          </div>
        </div>

        <Carrusel fotos={claxon.fotos} />
      </section>

      <Footer />
    </main>
  )
}