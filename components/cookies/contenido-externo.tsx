"use client"

// Envuelve cualquier contenido de terceros (vídeo, mapa...).
// Si la persona no ha aceptado ese tipo de cookies, NO se carga:
// en su lugar aparece un aviso con un botón para aceptar y verlo.
//
// El contenedor padre debe tener `relative` y un tamaño (p. ej. aspect-video).

import type { ReactNode } from "react"
import { useConsentimiento } from "./consentimiento-provider"

export function ContenidoExterno({ servicio, children }: { servicio: string; children: ReactNode }) {
  const { consentimiento, listo, guardar, abrirConfiguracion } = useConsentimiento()

  if (listo && consentimiento?.externos) return <>{children}</>

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-4 p-6 bg-muted">
      <p className="text-sm text-muted-foreground max-w-sm">
        Este contenido lo ofrece <strong className="text-foreground">{servicio}</strong>, que puede
        instalar cookies en tu navegador.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => guardar(true)}
          className="cta-primary"
        >
          Aceptar y ver
        </button>
        <button
          onClick={abrirConfiguracion}
          className="cta-secondary"
        >
          Configurar cookies
        </button>
      </div>
    </div>
  )
}