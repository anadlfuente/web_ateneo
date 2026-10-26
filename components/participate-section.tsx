import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function ParticipateSection() {
  return (
    <section className="home-section bg-primary-blue text-foreground">
      <div className="home-container">
        <div className="section-intro mb-8 text-center">
          <p className="section-eyebrow">Participa</p>
          <h2 className="section-heading">Forma parte de la música en Mieres</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-xl border border-light/70 bg-accent-green p-5 text-light shadow-sm sm:p-6 lg:col-span-1">
            <h3 className="mb-3 text-center font-bold">Hazte socio</h3>
            <ol className="mb-4 list-inside list-decimal space-y-1 text-center text-sm">
              <li>Envía tu solicitud.</li>
              <li>Nos ponemos en contacto contigo.</li>
              <li>Tramitamos el alta.</li>
            </ol>
            <p className="mb-2 text-center text-sm">Cuota, beneficios y forma de pago: por definir.</p>
            <p className="mb-5 text-center text-sm">El mecenazgo y las donaciones llegarán próximamente.</p>
            <Link href="/join" className="cta-primary">Solicitar mi alta</Link>
          </article>

          <article className="home-card p-5 text-center sm:p-6">
            <h3 className="mb-2 font-bold">Únete como músico</h3>
            <p className="mb-4 text-sm">Instrumentos o voces que se buscan: por definir.</p>
            <Link href="/unete" className="text-link inline-flex min-h-11 items-center gap-2 font-semibold">
              Descubre cómo unirte <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>

          <article className="home-card p-5 text-center sm:p-6">
            <h3 className="mb-2 font-bold">Patrocina</h3>
            <p className="mb-4 text-sm">Apoya la actividad musical del Ateneo y sus agrupaciones.</p>
            <Link href="/patrocinadores" className="text-link inline-flex min-h-11 items-center gap-2 font-semibold">
              Conoce el patrocinio <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
