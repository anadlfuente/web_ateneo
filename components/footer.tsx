import Link from "next/link"
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react"

const footerLinks = {
  agrupaciones: [
    { name: "Banda Sinfonica", href: "#banda-sinfonica" },
    { name: "Coral Cantares", href: "#coral" },
    { name: "Claxon Boys", href: "#claxon-boys" },
    { name: "Charanga", href: "#charanga" },
  ],
  informacion: [
    { name: "Sobre Nosotros", href: "#sobre-nosotros" },
    { name: "Patrocinadores", href: "#patrocinadores" },
    { name: "Prensa", href: "#prensa" },
    { name: "Contacto", href: "#contacto" },
  ],
  legal: [
    { name: "Privacidad", href: "#privacidad" },
    { name: "Aviso Legal", href: "#aviso-legal" },
    { name: "Cookies", href: "#cookies" },
  ],
}

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      {/* Newsletter section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl text-white mb-2">
                Mantente Informado
              </h3>
              <p className="text-white/60 text-sm">
                Recibe noticias, ofertas especiales y contenido exclusivo.
              </p>
            </div>
            <form className="flex gap-0">
              <input 
                type="email"
                placeholder="Tu email"
                className="px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 w-64"
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-secondary text-foreground font-medium text-sm tracking-wide uppercase hover:bg-secondary/90 transition-colors"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-2xl text-white">
                Ateneo Musical de <span className="text-secondary"> Mieres</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm mb-8">
              Dinamizando la vida musical mierense desde 2018
            </p>
            
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-white/50 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/50 mb-4">Agrupaciones</h4>
            <ul className="space-y-3">
              {footerLinks.agrupaciones.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/50 mb-4">Informacion</h4>
            <ul className="space-y-3">
              {footerLinks.informacion.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/50 mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>
              © {new Date().getFullYear()} Ateneo Musical de Mieres. Todos los derechos reservados.
            </p>
            <p>
              Asturias, España
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
