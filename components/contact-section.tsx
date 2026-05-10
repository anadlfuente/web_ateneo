"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export function ContactSection() {
  return (
    <section id="contacto" className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left column - Info */}
          <div>
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4">
              Contacto
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
              Hablemos
            </h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-md">
              Ya sea para unirte a nosotros o para contratar nuestros servicios, 
              estamos aqui para escucharte.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-sm tracking-[0.2em] uppercase text-foreground mb-4">
                  Informacion de Contacto
                </h3>
                <div className="space-y-4">
                  <a 
                    href="mailto:info@agrupacionx.es" 
                    className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    info@agrupacionx.es
                  </a>
                  <a 
                    href="tel:+34985000000" 
                    className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    +34 985 00 00 00
                  </a>
                  <span className="flex items-center gap-4 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    Asturias, Espana
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm tracking-[0.2em] uppercase text-foreground mb-4">
                  Servicios
                </h3>
                <div className="space-y-3">
                  <Link 
                    href="#servicios"
                    className="flex items-center gap-2 text-foreground hover:text-secondary transition-colors group"
                  >
                    Contratar para eventos
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    href="#servicios"
                    className="flex items-center gap-2 text-foreground hover:text-secondary transition-colors group"
                  >
                    Bodas y celebraciones
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    href="#servicios"
                    className="flex items-center gap-2 text-foreground hover:text-secondary transition-colors group"
                  >
                    Fiestas populares
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Form */}
          <div className="bg-white p-8 lg:p-12 border border-border">
            <h3 className="font-serif text-2xl text-foreground mb-8">
              Envianos un mensaje
            </h3>
            
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nombre</label>
                  <Input 
                    placeholder="Tu nombre"
                    className="border-border focus:border-foreground bg-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input 
                    type="email"
                    placeholder="tu@email.com"
                    className="border-border focus:border-foreground bg-transparent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Asunto</label>
                <select 
                  className="w-full px-4 py-2 bg-transparent border border-border text-foreground focus:border-foreground focus:outline-none"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="unirse">Quiero unirme a una agrupacion</option>
                  <option value="contratar">Contratar servicios</option>
                  <option value="patrocinio">Informacion sobre patrocinio</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Mensaje</label>
                <textarea 
                  rows={5}
                  placeholder="Cuentanos mas..."
                  className="w-full px-4 py-3 bg-transparent border border-border text-foreground focus:border-foreground focus:outline-none resize-none"
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-foreground text-white hover:bg-foreground/90 text-sm font-medium tracking-wide uppercase py-6 group"
              >
                Enviar mensaje
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
