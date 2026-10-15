import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import BloqueHistoria from "@/components/text-design"
import { directores } from "@/data/directores-banda"

export default function DirectoresPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <section className="relative h-[35vh] min-h-[220px] md:h-[40vh] w-full">
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: `url('${directores.banner.imagen}')`,
            backgroundPosition: directores.banner.posicion,
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif leading-tight">
            {directores.banner.titulo}
          </h1>
        </div>
      </section>

      {/* Contenido */}
      <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-20 pb-16 space-y-24">
        {directores.bloques.map((bloque, i) => (
          <BloqueHistoria key={bloque.titulo} {...bloque} invertido={i % 2 === 1} />
        ))}
      </section>

      <Footer />
    </main>
  )
}