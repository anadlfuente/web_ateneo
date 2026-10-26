import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

const sponsors = [
  { name: "Espacio Cultural 1910", logo: "/sponsors/espacio-cultura.jfif", link: "https://www.instagram.com/1910mieres/" },
  { name: "RTVE", logo: "/sponsors/rtve.png", link: "https://www.rtve.es/" },
  { name: "La Nueva España", logo: "/sponsors/La nueva España.png", link: "https://www.lne.es/" },
  { name: "Montepío", logo: "/sponsors/montepio-horizontal.png", link: "https://www.montepio.es/" },
  { name: "Iberia Cargo", logo: "/sponsors/iberiacargo.png", link: "https://grupo.iberia.es/pressrelease/details/12990" },
  { name: "Viajes Mythos", logo: "/sponsors/logo_mythos.png", link: "https://viajesmythos.com/" },
  { name: "DrinkVar", logo: "/sponsors/DrinkVar.jpeg", link: "https://www.instagram.com/drinkvar/" },
  { name: "Madreselva", logo: "/sponsors/madreselva.jpg", link: "https://www.facebook.com/madreselvamieres/" },
  { name: "Fergu Bus", logo: "/sponsors/fergubus.png", link: "https://fergubus.com/" },
  { name: "Asoc. Cultural Santa Barbara", logo: "/sponsors/santabarbara.jpg", link: "https://asociacionsantabarbara.com/" },
]

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/bandademieres/", Icon: Instagram },
  { name: "Facebook", href: "https://www.facebook.com/Bandaateneomieres/", Icon: Facebook },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCurQwXp65WecwlLX-keRS0g", Icon: Youtube },
  { name: "X", href: "https://x.com/BandaMusMieres", Icon: Twitter },
]

export function SponsorsSection() {
  return (
    <section id="patrocinadores" className="bg-primary-blue py-14 text-foreground sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7">
          <p className="mb-2 text-sm font-bold uppercase tracking-wider">Con el apoyo de</p>
          <h2 className="font-serif">Patrocinadores</h2>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-lg bg-background p-4 sm:grid-cols-3 sm:gap-4 sm:p-6 lg:grid-cols-5">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-24 items-center justify-center rounded border-2 border-blue-border bg-background p-4 focus-visible:outline"
              aria-label={`Sitio de ${sponsor.name} (se abre en una pestaña nueva)`}
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={140}
                height={80}
                sizes="(max-width: 640px) 40vw, 140px"
                className="max-h-16 w-auto object-contain"
              />
            </a>
          ))}
        </div>

        <div className="mt-8 border-t-2 border-foreground pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="mb-1 font-serif">Síguenos</h3>
              <p className="max-w-prose text-sm">Cada agrupación tiene su propio perfil en redes; encontrarás sus enlaces en sus fichas.</p>
            </div>
            <nav aria-label="Redes sociales del Ateneo" className="flex flex-wrap gap-2">
              {socialLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-secondary min-w-11 gap-2"
                  aria-label={`${name} del Ateneo (se abre en una pestaña nueva)`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{name}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>

        <Link href="/patrocinadores" className="text-link mt-5 inline-flex min-h-11 items-center font-semibold">
          Ver patrocinadores
        </Link>
      </div>
    </section>
  )
}
