import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { FileText, ArrowUpRight } from "lucide-react"
import { transparencia } from "@/data/transparencia"

const acentos = ["border-t-primary-blue", "border-t-accent-yellow", "border-t-accent-green"]

export default function TransparenciaPage() {
  const memorias = [...transparencia.memorias].sort((a, b) => b.year - a.year)

  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <PageHero
        imagen="/banner_2.png"
        altoMinimo="min-h-[40vh]"
        centrado
      >
        <h1 className="text-white text-4xl md:text-7xl font-serif leading-tight">
          Transparencia
        </h1>
      </PageHero>

      {/* Contenido */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-20 md:space-y-28">
        {/* Introducción */}
        <p className="text-lg md:text-xl leading-relaxed text-muted-foreground text-justify hyphens-auto">
          {transparencia.intro}
        </p>

                {/* Junta directiva */}
        <div>
          <h2 className="text-3xl md:text-4xl font-serif mb-10">Junta directiva</h2>

          {/* Presidencia */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-10 mb-12">
            <img
              src={transparencia.presidencia.foto}
              alt={`${transparencia.presidencia.nombre}, presidencia del Ateneo Musical de Mieres`}
              className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-primary-blue shrink-0"
            />
            <div>
              <p className="text-xs font-bold tracking-wider uppercase text-muted-foreground mb-2">
                {transparencia.presidencia.cargo}
              </p>
              <p className="text-3xl md:text-5xl font-serif leading-tight">
                {transparencia.presidencia.nombre}
              </p>
            </div>
          </div>

          {/* Resto de la junta */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {transparencia.junta.map((miembro, i) => (
              <div
                key={i}
                className={`rounded-xl border border-border border-t-4 ${acentos[i % acentos.length]} bg-card px-6 py-6`}
              >
                <p className="text-xs font-bold tracking-wider uppercase text-muted-foreground mb-2">
                  {miembro.cargo}
                </p>
                <p className="text-xl md:text-2xl font-serif">{miembro.nombre}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Memorias anuales */}
        <div>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Memorias anuales</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Consulta la actividad realizada por el Ateneo en cada temporada.
          </p>

          {memorias.length === 0 ? (
            <p className="text-muted-foreground italic">Próximamente publicaremos aquí las memorias.</p>
          ) : (
            <ul className="divide-y divide-border border-y border-border">
              {memorias.map((memoria) => (
                <li key={memoria.year} className="flex items-center justify-between gap-4 py-5">
                  <div className="flex items-center gap-4">
                    <FileText className="w-7 h-7 text-primary-blue shrink-0" />
                    <div>
                      <p className="text-lg md:text-xl font-semibold">Memoria {memoria.year}</p>
                      <p className="text-sm text-muted-foreground">Documento PDF</p>
                    </div>
                  </div>

                  <a href={memoria.archivo} target="_blank" rel="noopener noreferrer" className="shrink-0">
                    <Button
                      variant="outline"
                      className="group border-primary-blue text-primary-blue bg-transparent hover:bg-primary-blue hover:text-white"
                    >
                      Ver PDF
                      <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Button>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}