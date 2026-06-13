"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin, Send, User } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contacto" className="py-24 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left column - Info */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-blue/10 rounded-full mb-6">
              <User className="w-4 h-4 text-primary-blue" /> 
              <span className="text-primary-blue text-sm font-semibold tracking-wider uppercase">Contacto</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Hablemos
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Ya sea para unirte a una de nuestras agrupaciones, contratar nuestros servicios 
              o simplemente saludarnos, estamos aquí para ayudarte.
            </p>
            
            {/* Contact info */}
            <div className="space-y-6 mb-10">
              <a 
                href="mailto:rrssateneomieres@gmail.ecom" 
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                  <Mail className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">rrssateneomieres@gmail.com</p>
                </div>
              </a>
              
              <a 
                href="tel:+34681188519" 
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                  <Phone className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Teléfono</p>
                  <p className="font-medium text-foreground">+34 681 18 85 19</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dirección</p>
                  <p className="font-medium text-foreground">Pl. del Mercado, 33600 Mieres, Asturias</p>
                </div>
              </div>
            </div>

            {/* Services list */}
            <div className="p-6 bg-muted rounded-lg">
              <h3 className="font-semibold text-foreground mb-3">Nuestros Servicios</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Ofrecemos servicios musicales para todo tipo de eventos: conciertos, 
                fiestas patronales, celebraciones, eventos corporativos y mucho más. 
                Contacta con nosotros para un presupuesto personalizado.
              </p>
            </div>
          </div>

          {/* Right column - Form */}
          <div>
            <div className="bg-muted rounded-lg p-8 lg:p-10">
              <h3 className="font-serif text-2xl text-foreground mb-6">
                Envianos un Mensaje
              </h3>
              
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input 
                    placeholder="Nombre"
                    className="bg-white border-border focus:border-accent"
                  />
                  <Input 
                    type="email"
                    placeholder="Email"
                    className="bg-white border-border focus:border-accent"
                  />
                </div>

                <select 
                  className="w-full px-4 py-3 rounded-md bg-white border border-border text-foreground focus:border-accent focus:outline-none"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="unirse">Quiero unirme a una agrupacion</option>
                  <option value="contratar">Contratar servicios</option>
                  <option value="patrocinio">Informacion sobre patrocinio</option>
                  <option value="socio">Hacerme socio</option>
                  <option value="otro">Otro</option>
                </select>

                <textarea 
                  rows={5}
                  placeholder="Tu mensaje..."
                  className="w-full px-4 py-3 rounded-md bg-white border border-border text-foreground focus:border-accent focus:outline-none resize-none"
                />

                <Button 
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-6"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Mensaje
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
