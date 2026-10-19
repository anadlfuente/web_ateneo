import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import BloqueHistoria from "@/components/text-design"
import { directores } from "@/data/directores-banda"
import { PageHero } from "@/components/page-hero"
import { RedesFlotante } from "@/components/redes-flotante"

export default function DirectoresPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <PageHero
        imagen={directores.banner.imagen}
        posicion={directores.banner.posicion}
        altoMinimo="min-h-[40vh]"
        centrado
      >
        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif leading-tight">
          {directores.banner.titulo}
        </h1>
      </PageHero>

      {/* Contenido */}
      <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-20 pb-16 space-y-24">
        {directores.bloques.map((bloque, i) => (
          <BloqueHistoria key={bloque.titulo} {...bloque} invertido={i % 2 === 1} />
        ))}
      </section>
      <RedesFlotante />

      <Footer />
    </main>
  )
}