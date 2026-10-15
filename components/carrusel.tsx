"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

type Foto = {
  src: string
  alt: string
}

type Props = {
  fotos: Foto[]
}

export default function Carrusel({ fotos }: Props) {
  const [actual, setActual] = useState(0)
  const [ampliada, setAmpliada] = useState(false)
  const inicioX = useRef<number | null>(null)
  const total = fotos.length

  // Al llegar al final vuelve a la primera, y al revés
  const siguiente = () => setActual((a) => (a + 1) % total)
  const anterior = () => setActual((a) => (a - 1 + total) % total)

  // Deslizar con el dedo en móvil (carrusel y vista ampliada)
  const alTocar = (e: React.TouchEvent) => {
    inicioX.current = e.touches[0].clientX
  }
  const alSoltar = (e: React.TouchEvent) => {
    if (inicioX.current === null) return
    const diferencia = e.changedTouches[0].clientX - inicioX.current
    if (diferencia < -50) siguiente()
    if (diferencia > 50) anterior()
    inicioX.current = null
  }

  // Vista ampliada: teclado (flechas y Escape) y bloquear el scroll de la página
  useEffect(() => {
    if (!ampliada) return
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAmpliada(false)
      if (e.key === "ArrowRight") siguiente()
      if (e.key === "ArrowLeft") anterior()
    }
    document.addEventListener("keydown", alPulsar)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", alPulsar)
      document.body.style.overflow = ""
    }
  }, [ampliada])

  if (total === 0) return null

  return (
    <div>
      {/* Carrusel */}
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${actual * 100}%)` }}
            onTouchStart={alTocar}
            onTouchEnd={alSoltar}
          >
            {fotos.map((foto) => (
              <div
                key={foto.src}
                className="w-full shrink-0 flex items-center justify-center h-64 md:h-[500px] px-12 md:px-16"
              >
                <img
                  src={foto.src}
                  alt={foto.alt}
                  draggable={false}
                  onClick={() => setAmpliada(true)}
                  className="w-auto h-auto max-w-full max-h-full rounded-md shadow-md cursor-zoom-in select-none"
                />
              </div>
            ))}
          </div>
        </div>

        {total > 1 && (
          <>
            <button
              onClick={anterior}
              aria-label="Foto anterior"
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-secondary text-white rounded-full p-2 shadow-md hover:opacity-90"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={siguiente}
              aria-label="Foto siguiente"
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-secondary text-white rounded-full p-2 shadow-md hover:opacity-90"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Puntos indicadores */}
      {total > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {fotos.map((foto, i) => (
            <button
              key={foto.src}
              onClick={() => setActual(i)}
              aria-label={`Ir a la foto ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                i === actual ? "w-6 bg-secondary" : "w-2.5 bg-secondary/30 hover:bg-secondary/50"
              }`}
            />
          ))}
        </div>
      )}

      {/* Vista ampliada (lightbox) */}
      {ampliada && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setAmpliada(false)}
          onTouchStart={alTocar}
          onTouchEnd={alSoltar}
        >
          <img
            src={fotos[actual].src}
            alt={fotos[actual].alt}
            draggable={false}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain select-none"
          />

          <button
            onClick={(e) => {
              e.stopPropagation()
              setAmpliada(false)
            }}
            aria-label="Cerrar"
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
          >
            <X className="w-8 h-8" />
          </button>

          {total > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  anterior()
                }}
                aria-label="Foto anterior"
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  siguiente()
                }}
                aria-label="Foto siguiente"
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
              >
                <ChevronRight className="w-10 h-10" />
              </button>

              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
                {actual + 1} / {total}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}