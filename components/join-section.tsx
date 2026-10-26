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
    <section id="hazte-socio" className="bg-background py-14 text-foreground sm:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Content */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 border-b-2 border-primary-blue pb-2">
              <Pencil className="h-4 w-4 text-foreground" />
              <span className="text-sm font-semibold uppercase tracking-wider">Hazte socio</span>
            </div>
            <h2 className="mb-5 font-serif">
              Apoya a la asociación
            </h2>
            <p className="max-w-prose leading-relaxed">
              Conviértete en socio del Ateneo Musical de Mieres y apoya su actividad.
              Cuota, beneficios y forma de pago: por definir.
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
          <div className="rounded-lg bg-background p-5 sm:p-8 lg:p-10">
            {estado === "enviado" ? (
              <div className="text-center py-12" role="status">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-accent" />
                </div>
                <h3 className="mb-3 font-serif">Gracias por tu interés</h3>
                <p className="text-muted-foreground">Nos pondremos en contacto contigo muy pronto.</p>
              </div>
            ) : (
              <>
                <h3 className="mb-2 font-serif">
                  Solicita tu Alta
                </h3>
                <p className="text-muted-foreground mb-6">Completa el formulario y te contactaremos</p>

                <form onSubmit={enviar} className="space-y-4 relative">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="grid gap-1 text-sm font-medium" htmlFor="socio-nombre">
                      Nombre *
                      <Input
                        id="socio-nombre"
                        name="nombre"
                        value={form.nombre}
                        onChange={cambiar}
                        required
                        maxLength={100}
                        autoComplete="given-name"
                        className="border-blue-border text-base focus:border-foreground"
                      />
                    </label>
                    <label className="grid gap-1 text-sm font-medium" htmlFor="socio-apellidos">
                      Apellidos *
                      <Input
                        id="socio-apellidos"
                        name="apellidos"
                        value={form.apellidos}
                        onChange={cambiar}
                        required
                        maxLength={150}
                        autoComplete="family-name"
                        className="border-blue-border text-base focus:border-foreground"
                      />
                    </label>
                  </div>

                  <label className="grid gap-1 text-sm font-medium" htmlFor="socio-email">
                    Correo electrónico *
                    <Input
                      id="socio-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={cambiar}
                      required
                      autoComplete="email"
                      className="border-blue-border text-base focus:border-foreground"
                    />
                  </label>

                  <label className="grid gap-1 text-sm font-medium" htmlFor="socio-telefono">
                    Teléfono
                    <Input
                      id="socio-telefono"
                      name="telefono"
                      type="tel"
                      value={form.telefono}
                      onChange={cambiar}
                      maxLength={20}
                      autoComplete="tel"
                      className="border-blue-border text-base focus:border-foreground"
                    />
                  </label>

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
                      className="mt-1 h-4 w-4 rounded border-blue-border text-foreground focus:ring-foreground"
                    />
                    <span className="text-sm text-muted-foreground">
                        Acepto la{" "}
                        <Link
                          href="/legal?section=privacy"
                          className="text-link"
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
                    className="cta-primary w-full"
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
                    <div className="flex items-start gap-3 rounded-md border-2 border-blue-border p-4 text-sm text-foreground" role="alert">
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