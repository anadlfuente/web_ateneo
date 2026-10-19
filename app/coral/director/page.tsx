import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import BloqueHistoria from "@/components/text-design"
import { coralDirector } from "@/data/director-coral"
import { PageHero } from "@/components/page-hero"
import { RedesFlotante } from "@/components/redes-flotante"

export default function CoralDirectorPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <PageHero
        imagen={coralDirector.banner.imagen}
        posicion={coralDirector.banner.posicion}
        altoMinimo="min-h-[40vh]"
        centrado
      >
        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif leading-tight">
          {coralDirector.banner.titulo}
        </h1>
        <p className="text-white/90 text-lg md:text-xl lg:text-2xl font-serif mt-4">
          {coralDirector.banner.subtitulo}
        </p>
      </PageHero>

      {/* Contenido */}
      <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-20 pb-16 space-y-24">
        {coralDirector.bloques.map((bloque, i) => (
          <BloqueHistoria key={bloque.titulo} {...bloque} invertido={i % 2 === 1} />
        ))}
      </section>
      <RedesFlotante agrupacion="coral"/>
      <Footer />
    </main>
  )
}