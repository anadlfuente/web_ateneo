import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import TextoRico from "@/components/text-bold"
import Carrusel from "@/components/carrusel"
import { charanga } from "@/data/charanga"

export default function CharangaPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <section className="relative h-[35vh] min-h-[220px] md:h-[40vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${charanga.banner.imagen}')` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif leading-tight">
            {charanga.banner.titulo}
          </h1>
        </div>
      </section>

      {/* Contenido */}
      <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-20 pb-16 space-y-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif mb-6">{charanga.titulo}</h2>
          <div className="text-lg md:text-xl leading-relaxed text-muted-foreground space-y-6 md:text-justify">
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