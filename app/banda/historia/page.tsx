import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Organigram from "@/components/organigram-section"
import BloqueHistoria from "@/components/text-design"
import TextoRico from "@/components/text-bold"
import { banda } from "@/data/banda.js"
import { PageHero } from "@/components/page-hero"
import { RedesFlotante } from "@/components/redes-flotante"

export default function BandaPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <PageHero
        imagen={banda.banner.imagen}
        altoMinimo="min-h-[60vh]"
        centrado
      >
        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif leading-tight">
          {banda.banner.titulo}
        </h1>
        <p className="text-white/90 text-xl md:text-2xl lg:text-3xl font-serif mt-6 max-w-4xl mx-auto">
          {banda.banner.subtitulo}
        </p>
      </PageHero>

      {/* Contenido */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:pt-20 pb-12 space-y-24">
        <div className="text-lg md:text-xl leading-relaxed text-muted-foreground space-y-6 text-justify hyphens-auto">
          {banda.introduccion.map((p, i) => (
            <p key={i}>
              <TextoRico texto={p} />
            </p>
          ))}
        </div>

        {banda.bloques.map((bloque, i) => (
          <BloqueHistoria key={bloque.titulo} {...bloque} invertido={i % 2 === 1} />
        ))}
      </section>
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <Organigram titulo="Organigrama" secciones={banda.organigrama} />
        </div>
      </section>
      <RedesFlotante />
      <Footer />
    </main>
  )
}