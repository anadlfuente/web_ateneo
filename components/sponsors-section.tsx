import Image from "next/image"
import Link from "next/link"

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

export function SponsorsSection() {
  return (
    <section id="patrocinadores" className="home-section home-section-blue sponsors-strip text-foreground">
      <div className="home-container">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="sponsor-heading">Patrocinadores</h2>
            <p className="mt-1 text-sm">
              Gracias a quienes ya apoyáis este maravilloso proyecto. ¿Te gustaría impulsar la cultura y la música en Mieres?{" "}
              <Link href="/contacto?asunto=patrocinio" className="text-link font-semibold">
                Súmate como patrocinador
              </Link>{" "}
              y ayúdanos a seguir creciendo.
            </p>
          </div>
          <Link href="/contacto?asunto=patrocinio" className="cta-secondary sponsor-cta">
            Ser patrocinador
          </Link>
        </div>
        <div
          role="region"
          aria-label="Logotipos de los patrocinadores actuales"
          className="grid grid-cols-2 gap-2 sm:grid-cols-5"
        >
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="sponsor-logo flex min-h-14 items-center justify-center rounded-md bg-background p-2 focus-visible:outline sm:min-h-16"
              aria-label={`Sitio de ${sponsor.name} (se abre en una pestaña nueva)`}
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={140}
                height={80}
                sizes="(max-width: 640px) 40vw, 140px"
                className="max-h-10 w-auto object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
