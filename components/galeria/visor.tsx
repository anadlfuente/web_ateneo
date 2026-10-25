"use client"

import { useEffect, useRef, type MouseEvent } from "react"
import { formatearFecha, type FotoConEvento } from "@/components/galeria/tipos"

type Props = {
  fotos: FotoConEvento[]
  indice: number
  onCambiar: (indice: number) => void
  onCerrar: () => void
}

export function Visor({ fotos, indice, onCambiar, onCerrar }: Props) {
  const total = fotos.length
  const foto = fotos[indice]
  const inicioToque = useRef<number | null>(null)

  const anterior = () => onCambiar((indice - 1 + total) % total)
  const siguiente = () => onCambiar((indice + 1) % total)

  // Teclado: flechas para pasar, Esc para cerrar
  useEffect(() => {
    function alPulsar(e: KeyboardEvent) {
      if (e.key === "Escape") onCerrar()
      if (e.key === "ArrowRight") onCambiar((indice + 1) % total)
      if (e.key === "ArrowLeft") onCambiar((indice - 1 + total) % total)
    }
    window.addEventListener("keydown", alPulsar)
    return () => window.removeEventListener("keydown", alPulsar)
  }, [indice, total, onCambiar, onCerrar])

  // Bloquea el scroll de la página mientras el visor está abierto
  useEffect(() => {
    const anteriorOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = anteriorOverflow
    }
  }, [])

  // Precarga la foto siguiente y la anterior para que el paso sea instantáneo
  useEffect(() => {
    for (const vecina of [fotos[(indice + 1) % total], fotos[(indice - 1 + total) % total]]) {
      if (vecina?.tipo === "imagen") new Image().src = vecina.src
    }
  }, [indice, total, fotos])

  if (!foto) return null
  const detener = (e: MouseEvent) => e.stopPropagation()

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visor de fotos"
      onClick={onCerrar}
      onTouchStart={(e) => (inicioToque.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (inicioToque.current === null) return
        const distancia = e.changedTouches[0].clientX - inicioToque.current
        if (Math.abs(distancia) > 50) (distancia < 0 ? siguiente : anterior)()
        inicioToque.current = null
      }}
      className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white"
    >
      {/* CABECERA */}
      <div className="flex items-center justify-between p-4 text-sm" onClick={detener}>
        <span className="text-white/70">
          {indice + 1} / {total}
        </span>
        <button
          type="button"
          autoFocus
          onClick={onCerrar}
          aria-label="Cerrar"
          className="rounded-full px-3 py-1 text-2xl leading-none hover:bg-white/10"
        >
          ✕
        </button>
      </div>

      {/* FOTO O VÍDEO */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4">
        {foto.tipo === "video" ? (
          <video
            key={foto.src}
            src={foto.src}
            controls
            autoPlay
            playsInline
            onClick={detener}
            className="max-h-full max-w-full"
          />
        ) : (
          <img
            key={foto.src}
            src={foto.src}
            alt={foto.evento.titulo}
            onClick={detener}
            className="max-h-full max-w-full select-none object-contain"
          />
        )}

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                anterior()
              }}
              aria-label="Anterior"
              className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/40 px-4 py-2 text-3xl hover:bg-black/70 sm:block"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                siguiente()
              }}
              aria-label="Siguiente"
              className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/40 px-4 py-2 text-3xl hover:bg-black/70 sm:block"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* PIE: evento, fecha y autor */}
      <div className="p-4 text-center text-sm" onClick={detener}>
        <p className="font-medium">{foto.evento.titulo}</p>
        <p className="text-white/70">
          {formatearFecha(foto.evento.fecha)}
          {foto.evento.fecha && foto.autor && " · "}
          {foto.autor && (
            <>
              Foto:{" "}
              {foto.enlaceAutor ? (
                <a
                  href={foto.enlaceAutor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-white"
                >
                  {foto.autor}
                </a>
              ) : (
                foto.autor
              )}
            </>
          )}
        </p>
      </div>
    </div>
  )
}