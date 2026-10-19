import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { FileText, ArrowUpRight, Download, Scale } from "lucide-react"
import { transparencia } from "@/data/transparencia"
import { RedesFlotante } from "@/components/redes-flotante"

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

         {/* Estatutos */}
        {transparencia.estatutos && (
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-8">Estatutos</h2>

            <div className="relative overflow-hidden rounded-2xl bg-primary-blue text-white px-6 py-10 md:px-12 md:py-14">
              {/* Detalle decorativo */}
              <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/5" aria-hidden="true" />
              <div className="absolute right-24 -bottom-20 w-40 h-40 rounded-full bg-accent-yellow/20" aria-hidden="true" />

              <div className="relative flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Scale className="w-10 h-10 md:w-12 md:h-12 text-accent-yellow" />
                </div>

                <div className="flex-1">
                  <p className="text-xs font-bold tracking-wider uppercase text-white/70 mb-2">
                    Documento fundacional
                  </p>
                  <p className="text-2xl md:text-4xl font-serif leading-tight mb-4">
                    Estatutos del Ateneo Musical de Mieres
                  </p>
                  <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-2xl">
                    Recogen los fines de la asociación, su organización interna y su funcionamiento,
                    así como los derechos y deberes de sus socios y socias.
                  </p>
                  {transparencia.estatutos.actualizacion && (
                    <p className="text-sm text-white/60 mt-3">
                      Última modificación: {transparencia.estatutos.actualizacion}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <a href={transparencia.estatutos.archivo} target="_blank" rel="noopener noreferrer">
                      <Button className="group w-full sm:w-auto bg-white text-primary-blue hover:bg-accent-yellow hover:text-primary-blue">
                        <FileText className="w-4 h-4 mr-2" />
                        Ver estatutos
                        <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Button>
                    </a>
                    <a href={transparencia.estatutos.archivo} download>
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto border-white text-white bg-transparent hover:bg-white hover:text-primary-blue"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Descargar PDF
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
      <RedesFlotante />
      <Footer />
    </main>
  )
}