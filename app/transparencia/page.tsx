import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { ArrowUpRight, Download, Scale } from "lucide-react"
import { transparencia } from "@/data/transparencia"
import { RedesFlotante } from "@/components/redes-flotante"
import { MigasDePan } from "@/components/migas-de-pan"

export default function TransparenciaPage() {
  const memorias = [...transparencia.memorias].sort((a, b) => b.year - a.year)

  return (
    <main id="contenido" className="min-h-screen">
      <Header />

      {/* Banner */}
      <PageHero imagen="/banner_2.png" altoMinimo="min-h-[40vh]">
        <h1 className="text-white">Transparencia</h1>
      </PageHero>

      {/* Migas de pan */}
          <MigasDePan items={[{ nombre: "Transparencia" }]} />

      {/* Introducción */}
      <section className="home-section">
        <div className="home-container">
          <p className="max-w-[68ch] text-lg md:text-xl leading-relaxed">{transparencia.intro}</p>
        </div>
      </section>

      {/* Junta directiva */}
      <section className="home-section home-section-blue" aria-labelledby="junta-titulo">
        <div className="home-container">
          <h2 id="junta-titulo" className="mb-2">Junta directiva</h2>
          {/* Presidencia */}
          <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center md:gap-8">
            <img
              src={transparencia.presidencia.foto}
              alt={`${transparencia.presidencia.nombre}, presidente del Ateneo Musical de Mieres`}
              className="h-36 w-36 shrink-0 rounded-full border-4 border-blue-border object-cover md:h-40 md:w-40"
            />
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {transparencia.presidencia.cargo}
              </p>
              <p className="text-3xl font-bold leading-tight md:text-4xl">{transparencia.presidencia.nombre}</p>
            </div>
          </div>

          {/* Resto de la junta */}
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {transparencia.junta.map((miembro) => (
              <li key={miembro.nombre} className="rounded-xl border-t-[5px] border-blue-border bg-white px-5 py-4 shadow-sm">
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">{miembro.cargo}</p>
                <p className="text-xl font-semibold">{miembro.nombre}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Estatutos */}
      {transparencia.estatutos && (
        <section className="home-section" aria-labelledby="estatutos-titulo">
          <div className="home-container">
            <h2 id="estatutos-titulo" className="mb-2">Estatutos</h2>
            <p className="mb-8 text-muted-foreground">El documento que regula el funcionamiento de la asociación.</p>

            <div className="flex flex-col gap-6 rounded-2xl border-l-[6px] border-blue-border bg-white p-6 shadow-sm md:flex-row md:items-center md:gap-8 md:p-10">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary-blue/15" aria-hidden="true">
                <Scale className="h-9 w-9 text-foreground" />
              </div>

              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Documento fundacional
                  {transparencia.estatutos.actualizacion && ` · Última modificación: ${transparencia.estatutos.actualizacion}`}
                </p>
                <p className="mb-3 text-2xl font-bold leading-tight md:text-3xl">Estatutos del Ateneo Musical de Mieres</p>
                <p className="max-w-[60ch] text-muted-foreground">
                  Recogen los fines de la asociación, su organización interna y su funcionamiento,
                  así como los derechos y deberes de sus socios y socias.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a href={transparencia.estatutos.archivo} target="_blank" rel="noopener noreferrer" className="cta-primary">
                    Ver estatutos
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">(se abre en una pestaña nueva)</span>
                  </a>
                  <a href={transparencia.estatutos.archivo} download className="cta-secondary gap-2">
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Descargar PDF
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Memorias anuales */}
      <section className="home-section home-section-blue" aria-labelledby="memorias-titulo">
        <div className="home-container">
          <h2 id="memorias-titulo" className="mb-2">Memorias anuales</h2>
          <p className="mb-8 text-muted-foreground">La actividad realizada por el Ateneo en cada temporada.</p>

          {memorias.length === 0 ? (
            <p className="italic text-muted-foreground">Próximamente se publicarán aquí las memorias.</p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {memorias.map((memoria, i) => (
                <li key={memoria.year}>
                  {/* Toda la tarjeta es un único enlace */}
                  <a
                    href={memoria.archivo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Memoria ${memoria.year} (PDF, se abre en una pestaña nueva)`}
                    className="group relative flex h-full flex-col gap-1 rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-foreground"
                  >
                    {i === 0 && (
                      <span className="absolute right-4 top-4 rounded-full bg-primary-blue px-2.5 text-xs font-extrabold text-foreground">
                        Última
                      </span>
                    )}
                    <span className="text-4xl font-bold">{memoria.year}</span>
                    <span className="text-sm text-muted-foreground">Memoria anual · PDF</span>
                    <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-bold underline decoration-blue-border decoration-2 underline-offset-4 group-hover:decoration-foreground">
                      Ver memoria
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
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