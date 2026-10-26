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
    <section id="agrupaciones" className="home-section bg-background text-foreground">
      <div className="home-container">
        <div className="section-intro mb-5 flex flex-col items-start gap-2 sm:mb-6">
          <h2 className="section-heading">
            Mucho más que una <span className="title-highlight">banda</span>
          </h2>
          <p className="max-w-prose">
            Cuatro agrupaciones, cada una con su propia historia y sus músicos.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {groups.map(({ name, description, image, href, members, Icon }) => (
            <article key={name} className="group-card group relative flex flex-col overflow-visible rounded-xl bg-background transition duration-200 hover:-translate-y-1">
              <div className="relative aspect-[4/3]">
                <div className="absolute inset-0 overflow-hidden rounded-t-xl">
                  <Image
                    src={image}
                    alt={`Actuación de ${name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute -left-3 -top-3 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-accent-green text-light shadow-md" aria-hidden="true">
                  <Icon className="h-7 w-7" />
                </div>
                <p className="group-member-count absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-sm font-bold shadow-sm">
                  {members} miembros
                </p>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="mb-2 font-bold">{name}</h3>
                <p className="mb-3 flex-1 text-sm leading-relaxed">{description}</p>
                <Link href={href} className="text-link inline-flex min-h-11 items-center gap-2 font-semibold">
                  Conocer la agrupación <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
