"use client"

// Aviso de cookies.
// - Aparece si la persona aún no ha elegido (o si su elección ha caducado).
// - "Aceptar" y "Rechazar" tienen el mismo peso visual, como exige la AEPD.
// - "Configurar" permite elegir por categorías.
// - Se puede volver a abrir en cualquier momento desde el footer.

import { useEffect, useState } from "react"
import Link from "next/link"
import { Cookie, X } from "lucide-react"
import { useConsentimiento } from "./consentimiento-provider"

// Cambia esta ruta por la de vuestra política de cookies
const RUTA_POLITICA = "/legal?section=cookies"

export function BannerCookies() {
  const { consentimiento, listo, configAbierta, guardar, abrirConfiguracion, cerrarConfiguracion } =
    useConsentimiento()

  const [externos, setExternos] = useState(false)

  // Al abrir la configuración, los interruptores muestran lo que ya eligió
  useEffect(() => {
    if (configAbierta) setExternos(consentimiento?.externos ?? false)
  }, [configAbierta, consentimiento])

  const pendiente = listo && !consentimiento
  if (!pendiente && !configAbierta) return null

  return (
    <div
      role="dialog"
      aria-labelledby="cookies-titulo"
      className="fixed inset-x-0 bottom-0 z-[100] p-4 md:p-6 pointer-events-none"
    >
      <div className="pointer-events-auto max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <Cookie className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 id="cookies-titulo" className="font-serif text-xl text-foreground">
              {configAbierta ? "Configurar cookies" : "Usamos cookies"}
            </h2>
          </div>
          {/* Solo se puede cerrar sin elegir si ya había una elección previa */}
          {configAbierta && consentimiento && (
            <button onClick={cerrarConfiguracion} aria-label="Cerrar" className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {!configAbierta ? (
          // ── Vista simple ──────────────────────────────────
          <>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Esta web usa cookies técnicas necesarias para funcionar. Además, algunos contenidos
              como los vídeos de YouTube son ofrecidos por terceros que pueden instalar sus propias
              cookies. Puedes aceptarlas, rechazarlas o elegir.{" "}
              <Link href={RUTA_POLITICA} className="underline hover:text-accent">
                Más información
              </Link>
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => guardar(false)}
                className="flex-1 px-5 py-3 rounded-lg bg-foreground text-white text-sm font-semibold hover:bg-foreground/90 transition-colors"
              >
                Rechazar
              </button>
              <button
                onClick={() => guardar(true)}
                className="flex-1 px-5 py-3 rounded-lg bg-foreground text-white text-sm font-semibold hover:bg-foreground/90 transition-colors"
              >
                Aceptar
              </button>
              <button
                onClick={abrirConfiguracion}
                className="flex-1 px-5 py-3 rounded-lg border border-border text-sm font-semibold hover:border-accent hover:text-accent transition-colors"
              >
                Configurar
              </button>
            </div>
          </>
        ) : (
          // ── Vista de configuración ────────────────────────
          <>
            <div className="divide-y divide-border mb-6">
              <Categoria
                titulo="Técnicas (necesarias)"
                descripcion="Imprescindibles para que la web funcione, por ejemplo para recordar esta elección. No se pueden desactivar."
                activa
                bloqueada
              />
              <Categoria
                titulo="Contenido de terceros"
                descripcion="Permiten ver vídeos de YouTube y otros contenidos incrustados. Estos servicios pueden instalar sus propias cookies."
                activa={externos}
                onChange={setExternos}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => guardar(false)}
                className="flex-1 px-5 py-3 rounded-lg border border-border text-sm font-semibold hover:border-accent hover:text-accent transition-colors"
              >
                Rechazar todas
              </button>
              <button
                onClick={() => guardar(externos)}
                className="flex-1 px-5 py-3 rounded-lg bg-foreground text-white text-sm font-semibold hover:bg-foreground/90 transition-colors"
              >
                Guardar selección
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function Categoria({
  titulo,
  descripcion,
  activa,
  bloqueada = false,
  onChange,
}: {
  titulo: string
  descripcion: string
  activa: boolean
  bloqueada?: boolean
  onChange?: (v: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-4">
      <div>
        <p className="font-medium text-foreground text-sm">{titulo}</p>
        <p className="text-sm text-muted-foreground mt-1">{descripcion}</p>
      </div>
      <button
        role="switch"
        aria-checked={activa}
        aria-label={titulo}
        disabled={bloqueada}
        onClick={() => onChange?.(!activa)}
        className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors disabled:opacity-60 ${
          activa ? "bg-accent" : "bg-muted-foreground/30"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            activa ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  )
}