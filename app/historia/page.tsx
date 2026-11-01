import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import TextoRico from "@/components/text-bold"
import BloqueHistoria from "@/components/text-design"
import { historia } from "@/data/historia"
import { PageHero } from "@/components/page-hero"
import { RedesFlotante } from "@/components/redes-flotante"
import { MigasDePan } from "@/components/migas-de-pan"

 // Alterna fondo claro y azul suave para separar visualmente los bloques.
const fondoSeccion = (i: number) =>
  i % 2 === 0 ? "home-section home-section-blue" : "home-section"

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

      {/* Migas de pan */}
          <MigasDePan items={[{ nombre: "Quiénes somos" }]} />

      {/* Contenido */}
            {/* Introducción */}
      <section className="home-section">
        <div className="home-container text-lg md:text-xl leading-relaxed text-muted-foreground space-y-6 md:text-justify">
          {historia.introduccion.map((p, i) => (
            <p key={i}>
              <TextoRico texto={p} />
            </p>
          ))}
        </div>
      </section>

      {/* Bloques de historia, con fondos alternos */}
      {historia.bloques.map((bloque, i) => (
        <section key={bloque.titulo} className={fondoSeccion(i)}>
          <div className="home-container">
            <BloqueHistoria {...bloque} invertido={i % 2 === 1} />
          </div>
        </section>
      ))}

      {/* Cierre: sigue la alternancia de colores */}
      <section className={fondoSeccion(historia.bloques.length)}>
        <div className="home-container text-center py-12">
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            {historia.cierre.texto}
          </p>
          <p className="text-3xl md:text-5xl font-[family-name:var(--font-dm-serif-display)] text-secondary leading-tight text-center">
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