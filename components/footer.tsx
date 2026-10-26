import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { BotonConfigurarCookies } from "@/components/cookies/boton-configurar-cookies"

const groups = [
  { name: "Banda Sinfónica", href: "/banda/historia" },
  { name: "Coral Cantares", href: "/coral/historia" },
  { name: "Claxon Boys", href: "/claxon" },
  { name: "Charanga New Paentamala", href: "/charanga" },
]

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/bandademieres/", Icon: Instagram },
  { name: "Facebook", href: "https://www.facebook.com/Bandaateneomieres/", Icon: Facebook },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCurQwXp65WecwlLX-keRS0g", Icon: Youtube },
  { name: "X", href: "https://x.com/BandaMusMieres", Icon: Twitter },
]

const linkClass = "text-link text-link-on-blue inline-flex min-h-11 items-center"

export function Footer() {
  return (
    <footer className="bg-primary-blue text-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
        <section>
          <h2 className="mb-3 font-serif text-xl">La asociación</h2>
          <p className="mb-3 text-sm">Dinamizando la vida musical mierense desde 2018.</p>
          <ul className="space-y-1 text-sm">
            <li><Link href="/historia" className={linkClass}>Quiénes somos</Link></li>
            <li><Link href="/transparencia" className={linkClass}>Transparencia</Link></li>
            <li><Link href="/galeria" className={linkClass}>Galería</Link></li>
          </ul>
          <a
            href="https://www.ayto-mieres.es"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ayuntamiento de Mieres (se abre en una pestaña nueva)"
            className="mt-4 inline-flex min-h-11 items-center"
          >
            <Image
              src="/logo-vector_ayuntamiento-de-mieres.webp"
              alt="Ayuntamiento de Mieres"
              width={160}
              height={60}
              className="h-12 w-auto"
            />
          </a>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl">Agrupaciones</h2>
          <ul className="space-y-1 text-sm">
            {groups.map((group) => (
              <li key={group.name}><Link href={group.href} className={linkClass}>{group.name}</Link></li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl">Participa</h2>
          <ul className="space-y-1 text-sm">
            <li><Link href="/join" className={linkClass}>Hazte socio</Link></li>
            <li><Link href="/unete" className={linkClass}>Únete como músico</Link></li>
            <li><Link href="/patrocinadores" className={linkClass}>Patrocina</Link></li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl">Contacto</h2>
          <ul className="space-y-1 text-sm">
            <li><a href="tel:+34681188519" className={linkClass}>+34 681 18 85 19</a></li>
            <li><a href="mailto:ateneomusicaldemieres@gmail.com" className={linkClass}>ateneomusicaldemieres@gmail.com</a></li>
            <li><Link href="/contacto" className={linkClass}>Escribirnos</Link></li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl">Redes sociales</h2>
          <ul className="flex flex-wrap gap-2">
            {socialLinks.map(({ name, href, Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} del Ateneo (se abre en una pestaña nueva)`}
                  className="flex min-h-11 min-w-11 items-center justify-center border-2 border-foreground hover:bg-foreground hover:text-primary-blue focus-visible:outline"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="border-t-2 border-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Ateneo Musical de Mieres. Todos los derechos reservados.</p>
          <nav aria-label="Avisos legales" className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/legal?section=legal" className={linkClass}>Aviso legal</Link>
            <Link href="/legal?section=privacy" className={linkClass}>Privacidad</Link>
            <Link href="/legal?section=cookies" className={linkClass}>Cookies</Link>
            <BotonConfigurarCookies className={`${linkClass} text-left`} />
          </nav>
        </div>
      </div>
    </footer>
  )
}
