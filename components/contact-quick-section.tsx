import Link from "next/link"
import { Mail, Phone } from "lucide-react"

export function ContactQuickSection() {
  return (
    <section id="contacto" className="home-section bg-background text-foreground">
      <div className="home-container flex flex-col items-center gap-7 text-center">
        <div>
          <p className="section-eyebrow">Contacto</p>
          <h2 className="section-heading">¿Hablamos?</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          <a href="mailto:ateneomusicaldemieres@gmail.com" className="text-link inline-flex min-h-11 items-center gap-2">
            <Mail className="h-5 w-5" aria-hidden="true" />
            ateneomusicaldemieres@gmail.com
          </a>
          <a href="tel:+34681188519" className="text-link inline-flex min-h-11 items-center gap-2">
            <Phone className="h-5 w-5" aria-hidden="true" />
            +34 681 18 85 19
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contrata" className="cta-primary">Pedir presupuesto</Link>
          <Link href="/contacto" className="cta-secondary">Escribirnos</Link>
        </div>
      </div>
    </section>
  )
}
