// Cabecera con imagen de fondo para las páginas interiores.
// La imagen empieza arriba del todo (detrás del header), pero el texto
// siempre empieza DEBAJO del header, con aire extra por encima.
// Si el contenido es largo, la sección crece hacia abajo en vez de taparse.

import type { ReactNode } from "react"

interface PageHeroProps {
  imagen: string
  alt?: string
  altoMinimo?: string // clase de Tailwind, p. ej. "min-h-[50vh]"
  children: ReactNode
}

// Alto del header (si no está definido en globals.css, se usa 6rem)
// + espacio extra para que el contenido "respire".
const ESPACIO_SUPERIOR = "calc(var(--header-h, 6rem) + 3.5rem)"

export function PageHero({ imagen, alt = "", altoMinimo = "min-h-[50vh]", children }: PageHeroProps) {
  return (
    <section className={`relative w-full ${altoMinimo} flex flex-col justify-end`}>
      {/* Imagen y degradado: ocupan toda la sección, incluida la zona del header */}
      <img src={imagen} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/40" />

      {/* Contenido: reserva arriba el alto del header + aire */}
      <div
        className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-12 md:pb-16"
        style={{ paddingTop: ESPACIO_SUPERIOR }}
      >
        {children}
      </div>
    </section>
  )
}