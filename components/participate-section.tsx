import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function ParticipateSection() {
  return (
    <section className="home-section home-section-blue text-foreground">
      <div className="home-container">
        <div className="section-intro mb-5">
          <h2 className="section-heading">
            <span className="title-highlight">Únete</span> al Ateneo
          </h2>
          <p className="mt-2 max-w-prose">
            Hay muchas formas de hacer que la música siga sonando en Mieres: súmate como{" "}
            <strong>socio</strong>, ven a tocar o ayuda a impulsar nuestras agrupaciones.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <article className="home-card flex flex-col items-start p-5 sm:p-6">
            <h3 className="mb-2 font-bold">Que la música cuente contigo</h3>
            <p className="mb-5 flex-1 text-sm leading-relaxed">
              Hazte <strong>socio</strong> y forma parte de una asociación que llena Mieres de <strong>música</strong>, encuentros
              y proyectos compartidos.
            </p>
            <Link href="/join" className="cta-primary">Quiero hacerme socio</Link>
          </article>

          <article className="home-card flex flex-col items-start p-5 sm:p-6">
            <h3 className="mb-2 font-bold">Tu instrumento tiene sitio</h3>
            <p className="mb-5 flex-1 text-sm leading-relaxed">
              Buscamos músicos de <strong>viento madera, viento metal y percusión</strong>, además de{" "}
              <strong>nuevas voces</strong>. También hay espacio para quienes disfrutan del{" "}
              <strong>folk, el pop y el rock</strong>. Cuéntanos qué tocas y encontraremos contigo
              la agrupación que mejor encaje.
            </p>
            <Link href="/contacto" className="text-link inline-flex min-h-11 items-center gap-2 font-semibold">
              Cuéntanos qué tocas <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>

          <article className="home-card flex flex-col items-start p-5 sm:p-6">
            <h3 className="mb-2 font-bold">Impulsa la próxima nota</h3>
            <p className="mb-5 flex-1 text-sm leading-relaxed">
              <strong>Montepío, Fergu Bus y Espacio Cultural 1910</strong> ya acompañan este
              proyecto. Súmate como patrocinador y ayúdanos a llevar la música más lejos.
            </p>
            <Link href="/contacto?asunto=patrocinio" className="text-link inline-flex min-h-11 items-center gap-2 font-semibold">
              Hablemos de colaborar <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
