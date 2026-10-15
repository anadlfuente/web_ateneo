import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Organigram from "@/components/organigram-section"
import BloqueHistoria from "@/components/text-design"
import TextoRico from "@/components/text-bold"
import { banda } from "@/data/banda.js"

export default function BandaPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <section className="relative h-[60vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${banda.banner.imagen}')` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif leading-tight">
            {banda.banner.titulo}
          </h1>
          <p className="text-white/90 text-xl md:text-2xl lg:text-3xl font-serif mt-6 max-w-4xl">
            {banda.banner.subtitulo}
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20 space-y-24">
        <div className="text-lg md:text-xl leading-relaxed text-muted-foreground space-y-6 md:text-justify">
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

      <section className="pb-10">
        <div className="max-w-5xl mx-auto py-10">
          <Organigram titulo="Organigrama" secciones={banda.organigrama} />
        </div>
      </section>

      <Footer />
    </main>
  )
}