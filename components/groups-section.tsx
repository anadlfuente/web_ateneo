"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

const groups = [
  {
    id: "banda-sinfonica",
    name: "Banda Sinfonica",
    description: "Mas de 60 musicos interpretando desde clasicos hasta bandas sonoras contemporaneas.",
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&q=80",
    members: "60+",
  },
  {
    id: "coral",
    name: "Coral Cantares",
    description: "Voces que armonizan para crear momentos unicos desde musica sacra hasta arreglos modernos.",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80",
    members: "30+",
  },
  {
    id: "claxon-boys",
    name: "Claxon Boys",
    description: "El alma rockera de nuestra agrupacion. Energia pura con los clasicos del rock.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    members: "8",
  },
  {
    id: "charanga",
    name: "Charanga New Paentamala",
    description: "La fiesta asegurada en fiestas populares, bodas y eventos con repertorio festivo.",
    image: "https://images.unsplash.com/photo-1504704911898-68304a7d2807?w=800&q=80",
    members: "15",
  },
]

export function GroupsSection() {
  return (
    <section id="agrupaciones" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4">
              Nuestras Agrupaciones
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
              Cuatro estilos,<br />
              una pasion
            </h2>
          </div>
          <div className="section-divider hidden md:block" />
        </div>

        {/* Groups grid - NY Phil style cards */}
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {groups.map((group) => (
            <Link
              key={group.id}
              href={`#${group.id}`}
              className="group relative bg-white overflow-hidden"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={group.image} 
                  alt={group.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-white/60 text-xs tracking-[0.2em] uppercase mb-2">
                    {group.members} Miembros
                  </p>
                  <h3 className="font-serif text-3xl text-white mb-3">
                    {group.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-4 max-w-md">
                    {group.description}
                  </p>
                  <span className="inline-flex items-center text-white text-sm font-medium tracking-wide uppercase group-hover:underline">
                    Conocer mas
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
