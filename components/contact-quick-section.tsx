import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

export function ContactQuickSection() {
  return (
    <section id="contacto" className="home-section footer-contact bg-background text-foreground">
      <div className="home-container grid gap-4 md:grid-cols-[auto_1fr] md:items-center md:gap-8">
        <div>
          <h2 className="footer-contact-heading">¿Hablamos?</h2>
          <p className="text-sm">Estamos aquí para ayudarte.</p>
        </div>
        <div>
          <address className="grid gap-x-6 gap-y-3 text-sm not-italic md:grid-cols-2 md:gap-y-2 lg:grid-cols-3">
            <a href="mailto:ateneomusicaldemieres@gmail.com" className="footer-contact-link">
              <Mail className="h-5 w-5 shrink-0" aria-hidden="true" />
              ateneomusicaldemieres@gmail.com
            </a>
            <a href="tel:+34681188519" className="footer-contact-link">
              <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
              +34 681 18 85 19
            </a>
            <a
              href="https://www.google.com/maps/place/Ateneo+Musical+de+Mieres/@43.251465,-5.7737534,566m/data=!3m2!1e3!4b1!4m6!3m5!1s0xd36f7d4f0f7e245:0x6780eb25dfba4437!8m2!3d43.251465!4d-5.7737534!16s%2Fg%2F11f9x52syn?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-link"
            >
              <MapPin className="h-5 w-5 shrink-0" aria-hidden="true" />
              Pl. del Mercado, 33600 Mieres, Asturias
            </a>
          </address>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/contacto?asunto=contratar" data-cta="pedir-presupuesto" data-cta-location="contacto" className="cta-primary">Pedir presupuesto</Link>
            <a href="mailto:ateneomusicaldemieres@gmail.com" data-cta="escribirnos" data-cta-location="contacto" className="cta-secondary">Escribirnos</a>
          </div>
        </div>
      </div>
    </section>
  )
}
