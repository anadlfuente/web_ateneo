import Image from "next/image"
import Link from "next/link"
import { FaFacebookF, FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6"
import { BotonConfigurarCookies } from "@/components/cookies/boton-configurar-cookies"

const groups = [
  { name: "Banda Sinfónica", href: "/banda/historia" },
  { name: "Coral Cantares", href: "/coral/historia" },
  { name: "Claxon Boys", href: "/claxon" },
  { name: "Charanga New Paentamala", href: "/charanga" },
]

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/bandademieres/", Icon: FaInstagram },
  { name: "Facebook", href: "https://www.facebook.com/Bandaateneomieres/", Icon: FaFacebookF },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCurQwXp65WecwlLX-keRS0g", Icon: FaYoutube },
  { name: "X", href: "https://x.com/BandaMusMieres", Icon: FaXTwitter },
  { name: "TikTok", href: "https://www.tiktok.com/@bandademieres", Icon: FaTiktok },
]

const linkClass = "footer-link flex min-h-8 items-center"

export function Footer() {
  return (
    <footer className="site-footer text-foreground">
      <div className="home-container grid gap-x-6 gap-y-7 py-7 sm:gap-x-8 sm:gap-y-6 sm:py-8 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr_0.9fr]">
        <section>
          <h2 className="footer-brand-title mb-3">
            Ateneo Musical de <span>Mieres</span>
          </h2>
          <p className="mb-4 max-w-52 text-sm">
            Dinamizando la vida musical mierense desde 2018.
          </p>
          <ul className="flex gap-2">
            {socialLinks.map(({ name, href, Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} del Ateneo (se abre en una pestaña nueva)`}
                  className="footer-social-link flex h-11 w-11 items-center justify-center rounded-md"
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="footer-heading">Agrupaciones</h2>
          <ul className="footer-link-list">
            {groups.map((group) => (
              <li key={group.name}><Link href={group.href} className={linkClass}>{group.name}</Link></li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="footer-heading">Información</h2>
          <ul className="footer-link-list">
            <li><Link href="/historia" className={linkClass}>Sobre nosotros</Link></li>
            <li><Link href="/#patrocinadores" className={linkClass}>Patrocinadores</Link></li>
            <li><Link href="/noticias" className={linkClass}>Noticias</Link></li>
            <li><Link href="/contacto?asunto=contratar" data-cta="contratanos" data-cta-location="pie" className={linkClass}>Contrátanos</Link></li>
            <li><Link href="/calendar" className={linkClass}>Calendario</Link></li>
            <li><Link href="/contacto" className={linkClass}>Contacto</Link></li>
            <li><Link href="/join" data-cta="hazte-socio" data-cta-location="pie" className={linkClass}>Hazte socio</Link></li>
          </ul>
        </section>

        <section>
          <h2 className="footer-heading">Legal</h2>
          <ul className="footer-link-list">
            <li><Link href="/legal?section=legal" className={linkClass}>Aviso legal</Link></li>
            <li><Link href="/legal?section=privacy" className={linkClass}>Privacidad</Link></li>
            <li><Link href="/legal?section=cookies" className={linkClass}>Cookies</Link></li>
            <li><BotonConfigurarCookies className={`${linkClass} text-left`} /></li>
          </ul>
        </section>

        <section>
          <h2 className="footer-heading">Colabora</h2>
          <a
            href="https://www.ayto-mieres.es"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ayuntamiento de Mieres (se abre en una pestaña nueva)"
            className="footer-collaborator-logo inline-flex items-center justify-center rounded-sm p-2"
          >
            <Image
              src="/logo-vector_ayuntamiento-de-mieres.webp"
              alt="Ayuntamiento de Mieres"
              width={160}
              height={60}
              className="h-10 w-auto"
            />
          </a>
        </section>
      </div>

      <div className="footer-bottom">
        <div className="home-container flex flex-col gap-2 py-3 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ateneo Musical de Mieres. Todos los derechos reservados.</p>
          <p>Asturias, España</p>
        </div>
      </div>
    </footer>
  )
}
