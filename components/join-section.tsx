"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle2, AlertCircle, Loader2, Pencil } from "lucide-react"
import Link from "next/link"

// En local usa la dirección de .env.development.local; en el hosting, /api/socios.php
const URL_SOCIOS = process.env.NEXT_PUBLIC_SOCIOS_URL || "/api/socios.php"

const formularioVacio = { nombre: "", apellidos: "", email: "", telefono: "", web: "" }

export function JoinSection() {
  const [form, setForm] = useState(formularioVacio)
  const [privacidad, setPrivacidad] = useState(false)
  const [estado, setEstado] = useState<"inicial" | "enviando" | "enviado" | "error">("inicial")
  const [mensajeError, setMensajeError] = useState("")

  // Guarda lo que se escribe en cada campo
  function cambiar(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Envía los datos al PHP
  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setEstado("enviando")
    setMensajeError("")

    try {
      const respuesta = await fetch(URL_SOCIOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const datos = await respuesta.json().catch(() => null)

      if (respuesta.ok && datos?.ok) {
        setEstado("enviado")
        setForm(formularioVacio)
        setPrivacidad(false)
      } else {
        setEstado("error")
        setMensajeError(datos?.error || "No se ha podido enviar la solicitud. Inténtalo más tarde.")
      }
    } catch {
      setEstado("error")
      setMensajeError("No se ha podido conectar. Comprueba tu conexión e inténtalo de nuevo.")
    }
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
              Apoya a la asociación,<br />
              <span className="text-accent-yellow">transforma la música</span>
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Conviértete en socio del Ateneo Musical de Mieres y ayúdanos a transformar
              la música en nuestro concejo. Te lo agradeceremos con beneficios exclusivos
              para socios.
            </p>

            {/* Benefits list */}
            {/* <div className="space-y-4 mb-8">
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
            </div> */}

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
            {estado === "enviado" ? (
              <div className="text-center py-12" role="status">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-3">Gracias por tu interés</h3>
                <p className="text-muted-foreground">Nos pondremos en contacto contigo muy pronto.</p>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-2xl text-foreground mb-2">
                  Solicita tu Alta
                </h3>
                <p className="text-muted-foreground mb-6">Completa el formulario y te contactaremos</p>

                <form onSubmit={enviar} className="space-y-4 relative">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      name="nombre"
                      value={form.nombre}
                      onChange={cambiar}
                      required
                      maxLength={100}
                      placeholder="Nombre *"
                      className="border-border focus:border-accent"
                    />
                    <Input
                      name="apellidos"
                      value={form.apellidos}
                      onChange={cambiar}
                      required
                      maxLength={150}
                      placeholder="Apellidos *"
                      className="border-border focus:border-accent"
                    />
                  </div>

                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={cambiar}
                    required
                    placeholder="Email *"
                    className="border-border focus:border-accent"
                  />

                  <Input
                    name="telefono"
                    type="tel"
                    value={form.telefono}
                    onChange={cambiar}
                    maxLength={20}
                    placeholder="Teléfono"
                    className="border-border focus:border-accent"
                  />

                  {/* Campo trampa antispam: invisible para las personas, los robots lo rellenan */}
                  <input
                    type="text"
                    name="web"
                    value={form.web}
                    onChange={cambiar}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-2499.75 w-px h-px opacity-0"
                  />

                  <label className="flex items-start gap-3 pt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacidad}
                      onChange={(e) => setPrivacidad(e.target.checked)}
                      required
                      className="mt-1 w-4 h-4 rounded border-border text-accent focus:ring-accent"
                    />
                    <span className="text-sm text-muted-foreground">
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
                      </span>
                  </label>

                  <Button
                    type="submit"
                    disabled={estado === "enviando"}
                    className="w-full bg-accent-green hover:bg-accent-green/90 text-white font-semibold py-6"
                  >
                    {estado === "enviando" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Solicitud
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>

                  {estado === "error" && (
                    <div className="flex items-start gap-3 p-4 rounded-md bg-red-50 text-red-800 text-sm" role="alert">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p>{mensajeError}</p>
                    </div>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}