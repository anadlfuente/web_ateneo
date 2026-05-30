"use client"

import { ArrowRight, Music, Mic2, Guitar, PartyPopper } from "lucide-react"
import Link from "next/link"

const groups = [
  {
    id: "banda-sinfonica",
    name: "Banda Sinfonica",
    description: "Mas de 60 músicos interpretando desde clasicos hasta bandas sonoras contemporáneas.",
    image: "pasacalles.JPG",
    href: "/banda",
    color: "primary",
    members: "60+",
    icon: Music,
  },
  {
    id: "coral",
    name: "Coral Cantares",
    description: "Voces que armonizan para crear momentos unicos desde musica sacra hasta arreglos modernos.",
    image: "coral_cantares.jpg",
    href: "/coral",
    color: "secondary",
    members: "20+",
    icon: Mic2,
  },
  {
    id: "claxon-boys",
    name: "Claxon Boys",
    description: "El alma rockera de nuestra agrupacion. Energia pura con los clasicos del rock.",
    image: "claxon_boys.jpg",
    href: "/claxon",
    color: "accent",
    members: "4",
    icon: Guitar,
  },
  {
    id: "charanga",
    name: "Charanga New Paentamala",
    description: "La fiesta asegurada en fiestas populares, bodas y eventos con repertorio festivo.",
    image: "charanga.jpeg",
    href: "/charanga",
    color: "primary",
    members: "15+",
    icon: PartyPopper,
  },
]

const getColorClasses = (color: string) => {
  switch(color) {
    case "primary": return { bg: "bg-primary-blue", text: "text-primary-blue", border: "border-primary-blue", hover: "group-hover:bg-primary-blue" }
    case "secondary": return { bg: "bg-accent-yellow", text: "text-accent-yellow", border: "border-accent-yellow", hover: "group-hover:bg-accent-yellow" }
    case "accent": return { bg: "bg-accent-green", text: "text-accent-green", border: "border-accent-green", hover: "group-hover:bg-accent-green" }
    default: return { bg: "bg-primary-blue", text: "text-primary-blue", border: "border-primary-blue", hover: "group-hover:bg-primary-blue" }
  }
}


export function GroupsSection() {
  return (
    <section id="agrupaciones" className="py-24 bg-white relative overflow-hidden z-10">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-blue/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-primary-blue rounded-full animate-pulse" />
            <span className="text-primary-blue text-sm font-semibold tracking-wider uppercase">Nuestras Agrupaciones</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-4">
            Cuatro estilos, <span className="text-gradient-animated">una pasion</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Desde la solemnidad de la banda sinfonica hasta la energia del rock, tenemos algo para cada momento.
          </p>
        </div>

        {/* Groups grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {groups.map((group) => {
            const colors = getColorClasses(group.color)
            const Icon = group.icon
            
            return (
              <Link
                key={group.id}
                href={`#${group.id}`}
                className="group relative bg-white rounded-2xl overflow-hidden border border-border hover:border-transparent transition-all duration-300 hover-card-vibrant"
              >
                {/* Image */}
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img 
                    src={group.image} 
                    alt={group.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent ${colors.hover}/20 transition-colors`} />
                  
                  {/* Icon badge */}
                  <div className={`absolute top-4 left-4 w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Members badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                    <span className="text-sm font-bold text-foreground">{group.members} miembros</span>
                  </div>
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-2xl md:text-3xl text-white mb-2 group-hover:text-secondary transition-colors">
                      {group.name}
                    </h3>
                    <p className="text-white/80 text-sm mb-4 max-w-md line-clamp-2">
                      {group.description}
                    </p>
                    <span className={`inline-flex items-center text-sm font-semibold tracking-wide uppercase ${colors.text} group-hover:text-white transition-colors`}>
                      Conocer más
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}


