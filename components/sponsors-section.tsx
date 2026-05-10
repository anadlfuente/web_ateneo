"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const sponsors = [
  { name: "Espacio Cultura 1910", tier: "principal" },
  { name: "RTVE", tier: "principal" },
  { name: "La Nueva Espana", tier: "principal" },
  { name: "Montepio", tier: "colaborador" },
  { name: "Iberia Cargo", tier: "colaborador" },
  { name: "Viajes Mythos", tier: "colaborador" },
  { name: "DrinkVar", tier: "colaborador" },
  { name: "Madreselva", tier: "colaborador" },
  { name: "Fergu Bus", tier: "colaborador" },
  { name: "Asoc. Cultural Santa Barbara", tier: "colaborador" },
]

export function SponsorsSection() {
  return (
    <section id="patrocinadores" className="py-24 bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4">
              Patrocinadores
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
              Gracias a Ellos
            </h2>
          </div>
          <div className="section-divider hidden md:block" />
        </div>

        {/* Sponsors grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-border mb-16">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className={`flex items-center justify-center p-8 bg-white hover:bg-muted transition-colors ${
                sponsor.tier === 'principal' ? 'md:col-span-1' : ''
              }`}
            >
              <span className={`text-center font-medium text-sm tracking-wide ${
                sponsor.tier === 'principal'
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }`}>
                {sponsor.name}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 bg-muted">
          <div>
            <h3 className="font-serif text-2xl text-foreground mb-2">Conviertete en Patrocinador</h3>
            <p className="text-muted-foreground">Unete a nuestra familia de colaboradores y apoya la musica.</p>
          </div>
          <Button className="bg-foreground text-white hover:bg-foreground/90 text-sm font-medium tracking-wide uppercase group">
            Contactanos
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
