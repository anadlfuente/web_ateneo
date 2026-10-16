import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import TextoRico from "@/components/text-bold"
import Carrusel from "@/components/carrusel"
import { charanga } from "@/data/charanga"
import { PageHero } from "@/components/page-hero"

export default function CharangaPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <PageHero
        imagen={charanga.banner.imagen}
        altoMinimo="min-h-[40vh]"
        centrado
      >
        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif leading-tight">
          {charanga.banner.titulo}
        </h1>
      </PageHero>

      {/* Contenido */}
      <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-20 pb-16 space-y-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif mb-6">{charanga.titulo}</h2>
          <div className="text-lg md:text-xl leading-relaxed text-muted-foreground space-y-6 text-justify hyphens-auto">
            {charanga.parrafos.map((p, i) => (
              <p key={i}>
                <TextoRico texto={p} />
              </p>
            ))}
          </div>
        </div>

        <Carrusel fotos={charanga.fotos} />
      </section>

      <Footer />
    </main>
  )
}