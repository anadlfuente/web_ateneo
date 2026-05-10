"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export function JoinSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="hazte-socio" className="py-24 bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Content */}
          <div>
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4">
              Hazte Socio
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Apoya Tu<br />
              Orquesta
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-md">
              Transforma tu experiencia y ayudanos a transformar la musica sinfonica 
              en nuestra comunidad haciendote socio.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-white/80">Acceso prioritario a entradas</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-white/80">Descuentos exclusivos en conciertos</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-white/80">Pases para ensayos abiertos</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-white/80">Reconocimiento en programas</span>
              </div>
            </div>
          </div>

          {/* Right column - Form */}
          <div className="bg-white text-foreground p-8 lg:p-12">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-secondary mx-auto mb-6" />
                <h3 className="font-serif text-2xl text-foreground mb-3">Gracias por tu interes</h3>
                <p className="text-muted-foreground">Nos pondremos en contacto contigo muy pronto.</p>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-2xl text-foreground mb-8">
                  Solicita informacion
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Nombre completo *</label>
                    <Input 
                      required
                      placeholder="Tu nombre y apellidos"
                      className="border-border focus:border-foreground bg-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Correo electronico *</label>
                    <Input 
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className="border-border focus:border-foreground bg-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Telefono</label>
                    <Input 
                      type="tel"
                      placeholder="+34 600 000 000"
                      className="border-border focus:border-foreground bg-transparent"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      required
                      className="mt-1 w-4 h-4 border-border text-foreground focus:ring-foreground"
                    />
                    <p className="text-sm text-muted-foreground">
                      Acepto la politica de privacidad y el tratamiento de datos personales.
                    </p>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-foreground text-white hover:bg-foreground/90 text-sm font-medium tracking-wide uppercase py-6 group"
                  >
                    Enviar solicitud
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
