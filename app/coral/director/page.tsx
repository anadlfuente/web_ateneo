import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import BloqueHistoria from "@/components/text-design"
import { coralDirector } from "@/data/director-coral"

export default function CoralDirectorPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <section className="relative h-[35vh] min-h-[220px] md:h-[40vh] w-full">
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: `url('${coralDirector.banner.imagen}')`,
            backgroundPosition: coralDirector.banner.posicion,
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif leading-tight">
            {coralDirector.banner.titulo}
          </h1>
          <p className="text-white/90 text-lg md:text-xl lg:text-2xl font-serif mt-4">
            {coralDirector.banner.subtitulo}
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-20 pb-16 space-y-24">
        {coralDirector.bloques.map((bloque, i) => (
          <BloqueHistoria key={bloque.titulo} {...bloque} invertido={i % 2 === 1} />
        ))}
      </section>

      <Footer />
    </main>
  )
}