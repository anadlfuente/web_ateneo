import Link from "next/link"

const performances = [
  {
    name: "Concierto sinfónico y bandas sonoras",
    description: "Música sinfónica para conciertos y encuentros culturales.",
  },
  {
    name: "Procesiones y actos solemnes",
    description: "Acompañamiento musical para actos y celebraciones solemnes.",
  },
  {
    name: "Música asturiana y cantares de chigre",
    description: "Canciones vinculadas a la tradición musical asturiana.",
  },
  {
    name: "Folk-rock, pop y rock",
    description: "Un repertorio actual para disfrutar de la música en directo.",
  },
  {
    name: "Fiestas populares y bodas",
    description: "Música para celebraciones y fiestas populares.",
  },
]

export function WhatMusicSection() {
  return (
    <section className="home-section bg-background text-foreground">
      <div className="home-container">
        <div className="section-intro mb-5">
          <p className="section-eyebrow">Servicios musicales</p>
          <h2 className="section-heading">
            ¿Qué música necesitas para tu evento?
          </h2>
        </div>

        <div className="border-y border-blue-border">
          {performances.map((performance) => (
            <article key={performance.name} className="grid gap-2 border-b border-blue-border/60 py-5 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6">
              <div>
                <h3 className="mb-1 font-semibold">{performance.name}</h3>
                <p className="max-w-prose text-sm">{performance.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 text-left">
          <Link href="/contacto?asunto=contratar" className="cta-primary">Pedir presupuesto</Link>
        </div>
      </div>
    </section>
  )
}
