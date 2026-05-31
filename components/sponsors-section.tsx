"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const sponsors = [
  { name: "Espacio Cultura 1910", tier: "principal", logo: "/sponsors/espacio-cultura.jfif", link: "https://www.instagram.com/1910mieres/"},
  { name: "RTVE", tier: "principal", logo: "/sponsors/rtve.png", link: "https://www.rtve.es/" },
  { name: "La Nueva España", tier: "principal", logo: "/sponsors/La nueva España.png", link: "https://www.lne.es/" },
  { name: "Montepío", tier: "colaborador", logo: "/sponsors/montepio-horizontal.png", link: "https://www.montepio.es/" },
  { name: "Iberia Cargo", tier: "colaborador", logo: "/sponsors/iberiacargo.png", link: "https://grupo.iberia.es/pressrelease/details/12990" },
  { name: "Viajes Mythos", tier: "colaborador", logo: "/sponsors/logo_mythos.png", link: "https://viajesmythos.com/" },
  { name: "DrinkVar", tier: "colaborador", logo: "/sponsors/DrinkVar.jpeg", link: "https://www.instagram.com/drinkvar/" },
  { name: "Madreselva", tier: "colaborador", logo: "/sponsors/madreselva.jpg", link: "https://www.facebook.com/madreselvamieres/" },
  { name: "Fergu Bus", tier: "colaborador", logo: "/sponsors/fergubus.png", link: "https://fergubus.com/" },
  { name: "Asoc. Cultural Santa Barbara", tier: "colaborador", logo: "/sponsors/santabarbara.jpg", link: "https://asociacionsantabarbara.com/" },
]


export function SponsorsSection() {
  return (
    <section id="patrocinadores" className="py-20 bg-muted relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Simple header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-blue/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-primary-blue rounded-full animate-pulse" />
            <span className="text-primary-blue text-sm font-semibold tracking-wider uppercase">Nuestros Patrocinadores</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            Gracias por apoyarnos en este maravilloso proyecto
          </h2>
        </div>

        {/* Sponsors grid - simple and clean */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="group bg-white rounded-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >{/*Logo click*/}
              <a
                href={sponsor.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={140}
                  height={80}
                  className="max-h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </a>
              {/* Sponsor name */}
              <span
                className={`text-center font-medium text-sm tracking-wide ${
                  sponsor.tier === "principal"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {sponsor.name}
              </span>
            </div>
          ))}
        </div>

        {/* CTA - Become a sponsor */}
        <div className="text-center bg-accent rounded-xl p-8 md:p-12">
          <h3 className="font-serif text-2xl md:text-3xl text-white mb-3">
            Apoya la cultura musical en Mieres
          </h3>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Unete a nuestra familia de colaboradores y ayúdanos a llevar nuestra música a más gente.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-white text-accent hover:bg-white/90 font-semibold px-8"
          >
            <Link href="/contacto">
              Quiero ser patrocinador
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}