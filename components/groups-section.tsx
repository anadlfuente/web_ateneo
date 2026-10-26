import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Guitar, Mic2, Music, PartyPopper } from "lucide-react"

const groups = [
  {
    name: "Banda Sinfónica",
    description: "Más de 60 músicos interpretan un repertorio que incluye clásicos y bandas sonoras.",
    image: "/banda/pasacalles.JPG",
    href: "/banda/historia",
    members: "60+",
    Icon: Music,
  },
  {
    name: "Coral Cantares",
    description: "Voces unidas por la música y por nuestros cantares de chigre.",
    image: "/coral/coral_cantares.jpg",
    href: "/coral/historia",
    members: "20+",
    Icon: Mic2,
  },
  {
    name: "Claxon Boys",
    description: "Cuatro amigos unidos por la música y las ganas de disfrutar.",
    image: "/claxon/claxon1.jpg",
    href: "/claxon",
    members: "4",
    Icon: Guitar,
  },
  {
    name: "Charanga New Paentamala",
    description: "La charanga del Ateneo para animar fiestas populares y celebraciones.",
    image: "/charanga/charanga2.jpeg",
    href: "/charanga",
    members: "15+",
    Icon: PartyPopper,
  },
]

export function GroupsSection() {
  return (
    <section id="agrupaciones" className="home-section bg-primary-blue text-foreground">
      <div className="home-container">
        <div className="section-intro mb-8 flex flex-col items-center gap-3 text-center sm:mb-10">
          <p className="section-eyebrow">Nuestras agrupaciones</p>
          <h2 className="section-heading">Mucho más que una banda</h2>
          <p className="max-w-prose">
            Cuatro agrupaciones, cada una con su propia historia y sus músicos.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {groups.map(({ name, description, image, href, members, Icon }) => (
            <article key={name} className="image-overlay group relative min-h-72 overflow-hidden rounded-xl border border-foreground/70 shadow-sm">
              <Image
                src={image}
                alt={`Actuación de ${name}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#01020a]/95 via-[#01020a]/55 to-transparent" />
              <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent-green text-light" aria-hidden="true">
                <Icon className="h-5 w-5" />
              </div>
              <p className="absolute right-4 top-4 rounded-full bg-light px-3 py-1 text-sm font-semibold text-foreground">
                {members} miembros
              </p>
              <div className="absolute inset-x-0 bottom-0 p-5 text-light sm:p-6">
                <h3 className="mb-2 font-bold">{name}</h3>
                <p className="mb-3 max-w-prose text-sm leading-relaxed">{description}</p>
                <Link href={href} className="text-link text-link-on-dark inline-flex min-h-11 items-center gap-2 font-semibold">
                  Conocer más <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link href="/agrupaciones" className="cta-secondary rounded-md">Ver todas las agrupaciones</Link>
        </div>
      </div>
    </section>
  )
}
