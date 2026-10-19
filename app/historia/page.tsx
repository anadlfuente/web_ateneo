import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import TextoRico from "@/components/text-bold"
import BloqueHistoria from "@/components/text-design"
import { historia } from "@/data/historia"
import { PageHero } from "@/components/page-hero"
import { RedesFlotante } from "@/components/redes-flotante"

export default function HistoriaPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <PageHero
        imagen={historia.banner.imagen}
        altoMinimo="min-h-[40vh]"
        centrado
      >
        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif leading-tight">
          {historia.banner.titulo}
        </h1>
        <p className="text-white/90 text-lg md:text-xl lg:text-2xl font-serif mt-4 max-w-4xl mx-auto">
          {historia.banner.subtitulo}
        </p>
      </PageHero>

      {/* Contenido */}
      <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-20 pb-16 space-y-24">
        <div className="text-lg md:text-xl leading-relaxed text-muted-foreground space-y-6 md:text-justify">
          {historia.introduccion.map((p, i) => (
            <p key={i}>
              <TextoRico texto={p} />
            </p>
          ))}
        </div>

        {historia.bloques.map((bloque, i) => (
          <BloqueHistoria key={bloque.titulo} {...bloque} invertido={i % 2 === 1} />
        ))}

        {/* Cierre */}
        <div className="text-center border-t border-b py-12">
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            {historia.cierre.texto}
          </p>
          <p className="text-3xl md:text-5xl font-serif text-secondary leading-tight">
            {historia.cierre.grito.map((linea, i) => (
              <span key={i} className="block">{linea}</span>
            ))}
          </p>
        </div>
      </section>
      <RedesFlotante />
      <Footer />
    </main>
  )
}