"use client"

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Mail, Phone, MapPin, Send, User, CheckCircle2, AlertCircle, Loader2,
  Instagram, Facebook, Youtube, Twitter, Music2,
} from "lucide-react"

// En local usa la dirección de .env.development.local; en el hosting, /api/contacto.php
const URL_CONTACTO = process.env.NEXT_PUBLIC_CONTACT_URL || "/api/contacto.php"

// Redes sociales (las mismas que en el pie de página)
const redesSociales = [
  { nombre: "Instagram", icono: Instagram, url: "https://www.instagram.com/bandademieres/" },
  { nombre: "Facebook", icono: Facebook, url: "https://www.facebook.com/Bandaateneomieres/" },
  { nombre: "YouTube", icono: Youtube, url: "https://www.youtube.com/channel/UCurQwXp65WecwlLX-keRS0g" },
  { nombre: "X (Twitter)", icono: Twitter, url: "https://x.com/BandaMusMieres" },
  { nombre: "TikTok", icono: Music2, url: "https://www.tiktok.com/@bandademieres" },
]

const formularioVacio = (asunto = "") => ({ nombre: "", email: "", asunto, asuntoOtro: "", mensaje: "", web: "" })
export function ContactSection({ defaultSubject = "" }: { defaultSubject?: string }) {
  const [subjectOnEntry, setSubjectOnEntry] = useState(defaultSubject)
  const [form, setForm] = useState(() => formularioVacio(defaultSubject))
  const [privacidad, setPrivacidad] = useState(false)
  const [estado, setEstado] = useState<"inicial" | "enviando" | "enviado" | "error">("inicial")
  const [mensajeError, setMensajeError] = useState("")

  useEffect(() => {
    const requestedSubject = new URLSearchParams(window.location.search).get("asunto")
    if (requestedSubject === "patrocinio" || requestedSubject === "contratar") {
      setSubjectOnEntry(requestedSubject)
      setForm((currentForm) => ({ ...currentForm, asunto: requestedSubject }))
    }
  }, [])

  // Guarda lo que se escribe en cada campo
  function cambiar(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Envía los datos al PHP
  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setEstado("enviando")
    setMensajeError("")

    try {
      const respuesta = await fetch(URL_CONTACTO, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const datos = await respuesta.json().catch(() => null)

      if (respuesta.ok && datos?.ok) {
        setEstado("enviado")
        setForm(formularioVacio(subjectOnEntry))
        setPrivacidad(false)
      } else {
        setEstado("error")
        setMensajeError(datos?.error || "No se ha podido enviar el mensaje. Inténtalo más tarde.")
      }
    } catch {
      setEstado("error")
      setMensajeError("No se ha podido conectar. Comprueba tu conexión e inténtalo de nuevo.")
    }
  }

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
            <h2 className="mb-6 font-serif">
            ¿Hablamos?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Ya sea para unirte a la banda o la coral, contratar nuestros servicios
              o simplemente saludarnos, estamos aquí para ayudarte.
            </p>

            {/* Contact info */}
            <div className="space-y-6 mb-10">
              <a href="mailto:ateneomusicaldemieres@gmail.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                  <Mail className="w-5 h-5 text-accent group-hover:text-foreground transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">ateneomusicaldemieres@gmail.com</p>
                </div>
              </a>

              <a href="tel:+34681188519" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                  <Phone className="w-5 h-5 text-accent group-hover:text-foreground transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Teléfono</p>
                  <p className="font-medium text-foreground">+34 681 18 85 19</p>
                </div>
              </a>

              <a
                href="https://www.google.com/maps/place/Ateneo+Musical+de+Mieres/@43.251465,-5.7737534,566m/data=!3m2!1e3!4b1!4m6!3m5!1s0xd36f7d4f0f7e245:0x6780eb25dfba4437!8m2!3d43.251465!4d-5.7737534!16s%2Fg%2F11f9x52syn?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                  <MapPin className="w-5 h-5 text-accent group-hover:text-foreground transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dirección</p>
                  <p className="font-medium text-foreground">Pl. del Mercado, 33600 Mieres, Asturias</p>
                </div>
              </a>
            </div>

            {/* Redes sociales */}
            <div>
              <p className="mb-4 text-lg font-bold text-foreground">¡Síguenos en redes sociales!</p>
              <ul className="flex flex-wrap gap-3">
                {redesSociales.map(({ nombre, icono: Icono, url }) => (
                  <li key={nombre}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={nombre}
                      title={nombre}
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 transition-colors hover:bg-accent"
                    >
                      <Icono className="w-5 h-5 text-accent group-hover:text-foreground transition-colors" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column - Form */}
          <div>
            <div className="bg-muted rounded-lg p-8 lg:p-10">
              <h3 className="mb-6 font-serif">
                Envíanos un mensaje
              </h3>

              <form onSubmit={enviar} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label htmlFor="contacto-nombre" className="grid gap-1 text-sm font-medium">
                    Nombre *
                    <Input
                      id="contacto-nombre"
                      name="nombre"
                      value={form.nombre}
                      onChange={cambiar}
                      required
                      maxLength={100}
                      autoComplete="name"
                      className="border-blue-border text-base focus:border-foreground"
                    />
                  </label>
                  <label htmlFor="contacto-email" className="grid gap-1 text-sm font-medium">
                    Correo electrónico *
                    <Input
                      id="contacto-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={cambiar}
                      required
                      autoComplete="email"
                      className="border-blue-border text-base focus:border-foreground"
                    />
                  </label>
                </div>

                <label htmlFor="contacto-asunto" className="grid gap-1 text-sm font-medium">
                  Asunto
                  <select
                    id="contacto-asunto"
                    name="asunto"
                    value={form.asunto}
                    onChange={cambiar}
                    className="w-full rounded-md border-2 border-blue-border bg-background px-4 py-3 text-base text-foreground focus:border-foreground focus:outline-none"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="banda">Quiero unirme a la banda</option>
                    <option value="coral">Quiero unirme a la coral</option>
                    <option value="contratar">Contratar servicios</option>
                    <option value="patrocinio">Información sobre patrocinio</option>
                    <option value="socio">Hacerme socio</option>
                    <option value="otro">Otro</option>
                  </select>
                </label>

                {/* Si elige "Otro", puede escribir su propio asunto */}
                {form.asunto === "otro" && (
                  <label htmlFor="contacto-asunto-otro" className="grid gap-1 text-sm font-medium">
                    Especifica el asunto
                    <Input
                      id="contacto-asunto-otro"
                      name="asuntoOtro"
                      value={form.asuntoOtro}
                      onChange={cambiar}
                      required
                      maxLength={150}
                      autoFocus
                      className="border-blue-border text-base focus:border-foreground"
                    />
                  </label>
                )}

                <label htmlFor="contacto-mensaje" className="grid gap-1 text-sm font-medium">
                  Mensaje *
                  <textarea
                    id="contacto-mensaje"
                    name="mensaje"
                    value={form.mensaje}
                    onChange={cambiar}
                    rows={5}
                    required
                    maxLength={5000}
                    className="w-full resize-none rounded-md border-2 border-blue-border bg-background px-4 py-3 text-base text-foreground focus:border-foreground focus:outline-none"
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

                {/* Aceptación de la política de privacidad */}
                <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacidad}
                    onChange={(e) => setPrivacidad(e.target.checked)}
                    required
                    className="mt-1 h-4 w-4 accent-foreground"
                  />
                  <span>
                    He leído y acepto la{" "}
                    <a href="/legal/" target="_blank" rel="noopener noreferrer" className="text-link">
                      política de privacidad
                    </a>
                    .
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
                      <Send className="w-4 h-4 mr-2" />
                      Enviar mensaje
                    </>
                  )}
                </Button>

                {/* Mensajes de resultado */}
                {estado === "enviado" && (
                  <div className="flex items-start gap-3 rounded-md border-2 border-blue-border p-4 text-sm text-foreground" role="status">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <p>¡Gracias! Hemos recibido tu mensaje y te responderemos lo antes posible.</p>
                  </div>
                )}
                {estado === "error" && (
                  <div className="flex items-start gap-3 rounded-md border-2 border-blue-border p-4 text-sm text-foreground" role="alert">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p>{mensajeError}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}