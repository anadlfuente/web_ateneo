import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
export default function HistoriaPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <section className="relative h-[60vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/banner.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-serif">
            Nuestra Historia
          </h1>
        </div>
      </section>

      {/* Contenido */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-serif mb-6">Quiénes somos</h2>

        <p className="text-muted-foreground leading-relaxed">
          Aquí iría el texto de la historia del Ateneo Musical de Mieres...
        </p>
      </section>
      <Footer />
    </main>
  )
}