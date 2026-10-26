import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function ParticipateSection() {
  return (
    <section className="bg-primary-blue py-14 text-foreground sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-wider">Participa</p>
          <h2 className="font-serif">Forma parte de la música en Mieres</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-lg border-2 border-foreground bg-accent-green p-5 text-light sm:p-6 lg:col-span-1">
            <h3 className="mb-3 font-serif">Hazte socio</h3>
            <ol className="mb-4 list-inside list-decimal space-y-1 text-sm">
              <li>Envía tu solicitud.</li>
              <li>Nos ponemos en contacto contigo.</li>
              <li>Tramitamos el alta.</li>
            </ol>
            <p className="mb-2 text-sm">Cuota, beneficios y forma de pago: por definir.</p>
            <p className="mb-5 text-sm">El mecenazgo y las donaciones llegarán próximamente.</p>
            <Link href="/join" className="cta-primary">Solicitar mi alta</Link>
          </article>

          <article className="rounded-lg border-2 border-foreground bg-background p-5 sm:p-6">
            <h3 className="mb-2 font-serif">Únete como músico</h3>
            <p className="mb-4 text-sm">Instrumentos o voces que se buscan: por definir.</p>
            <Link href="/unete" className="text-link inline-flex min-h-11 items-center gap-2 font-semibold">
              Descubre cómo unirte <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>

          <article className="rounded-lg border-2 border-foreground bg-background p-5 sm:p-6">
            <h3 className="mb-2 font-serif">Patrocina</h3>
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
