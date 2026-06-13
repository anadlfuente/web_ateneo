"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle2, Pencil } from "lucide-react"
import Link from "next/link"

export function JoinSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="hazte-socio" className="py-24 bg-accent-green relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Content */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-yellow/10 rounded-full mb-6">
              <Pencil className="w-4 h-4 text-accent-yellow" /> 
              <span className="text-accent-yellow text-sm font-semibold tracking-wider uppercase">Hazte socio</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
              Apoya tu Orchestra,<br />
              <span className="text-accent-yellow">Transforma la Musica</span>
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Conviértete en socio del Ateneo Musical de Mieres y ayúdanos a transformar 
              la música en nuestro concejo. Te lo agradeceremos con beneficios exclusivos 
               para socios.
            </p>
            
            {/* Benefits list */}
            <div className="space-y-4 mb-8">
              {[
                "Acceso prioritario a conciertos",
                "Descuentos exclusivos en eventos especiales",
                "Pases para ensayos abiertos",
                "Reconocimiento en programas de conciertos"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent-yellow flex-shrink-0" />
                  <span className="text-white/90">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Donation amounts like NY Phil */}
            {/* <div className="flex flex-wrap gap-3">
              {["30€", "50€", "100€", "Otra cantidad"].map((amount, index) => (
                <button
                  key={index}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    index === 1 
                      ? "bg-secondary text-foreground" 
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div> */}
          </div>

          {/* Right column - Form */}
          <div className="bg-white rounded-lg p-8 lg:p-10 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-3">Gracias por tu Interes</h3>
                <p className="text-muted-foreground">Nos pondremos en contacto contigo muy pronto.</p>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-2xl text-foreground mb-2">
                  Solicita tu Alta
                </h3>
                <p className="text-muted-foreground mb-6">Completa el formulario y te contactaremos</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input 
                      required
                      placeholder="Nombre *"
                      className="border-border focus:border-accent"
                    />
                    <Input 
                      required
                      placeholder="Apellidos *"
                      className="border-border focus:border-accent"
                    />
                  </div>

                  <Input 
                    type="email"
                    required
                    placeholder="Email *"
                    className="border-border focus:border-accent"
                  />

                  <Input 
                    type="tel"
                    placeholder="Telefono"
                    className="border-border focus:border-accent"
                  />

                  <div className="flex items-start gap-3 pt-2">
                    <input 
                      type="checkbox" 
                      required
                      className="mt-1 w-4 h-4 rounded border-border text-accent focus:ring-accent"
                    />
                    <p className="text-sm text-muted-foreground">
                        Acepto la{" "}
                        <Link
                          href="/legal?section=privacy"
                          className="text-accent hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          política de privacidad
                        </Link>{" "}
                        y el tratamiento de datos personales.
                      </p>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-accent-green hover:bg-accent-green/90 text-white font-semibold py-6"
                  >
                    Enviar Solicitud
                    <ArrowRight className="w-4 h-4 ml-2" />
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
