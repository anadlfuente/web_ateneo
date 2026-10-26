import Link from "next/link"
import { Mail, Phone } from "lucide-react"

export function ContactQuickSection() {
  return (
    <section id="contacto" className="bg-background py-14 text-foreground sm:py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-7 px-4 sm:px-6 lg:px-8">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-wider">Contacto</p>
          <h2 className="font-serif">¿Hablamos?</h2>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <a href="mailto:ateneomusicaldemieres@gmail.com" className="text-link inline-flex min-h-11 items-center gap-2">
            <Mail className="h-5 w-5" aria-hidden="true" />
            ateneomusicaldemieres@gmail.com
          </a>
          <a href="tel:+34681188519" className="text-link inline-flex min-h-11 items-center gap-2">
            <Phone className="h-5 w-5" aria-hidden="true" />
            +34 681 18 85 19
          </a>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/contrata" className="cta-primary">Pedir presupuesto</Link>
          <Link href="/contacto" className="cta-secondary">Escribirnos</Link>
        </div>
      </div>
    </section>
  )
}
