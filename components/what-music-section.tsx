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
    <section className="bg-background py-14 text-foreground sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-wider">Servicios musicales</p>
          <h2 className="font-serif">¿Qué música necesitas?</h2>
        </div>

        <div className="divide-y-2 divide-blue-border/60 border-y-2 border-blue-border">
          {performances.map((performance) => (
            <article key={performance.name} className="grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6">
              <div>
                <h3 className="mb-1 font-semibold">{performance.name}</h3>
                <p className="max-w-prose text-sm">{performance.description}</p>
              </div>
              <p className="text-sm">
                <span className="rounded bg-accent-green px-2 py-1 font-semibold text-light">Formación: por definir</span>
              </p>
            </article>
          ))}
        </div>

        <Link href="/contrata" className="cta-primary mt-6">Pide presupuesto para tu evento</Link>
      </div>
    </section>
  )
}
