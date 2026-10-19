"use client"

import { useState, useEffect } from "react"
import { X, Music2, Instagram, Facebook, Youtube, Music } from "lucide-react"
import { redes } from "@/data/redes"

const SEGUNDOS_BOCADILLO = 4

const iconos = {
  instagram: { icono: Instagram, etiqueta: "Instagram" },
  facebook: { icono: Facebook, etiqueta: "Facebook" },
  youtube: { icono: Youtube, etiqueta: "YouTube" },
  tiktok: { icono: Music, etiqueta: "TikTok" },
}

export function RedesFlotante({ agrupacion = "ateneo" }) {
  const datos = redes[agrupacion] ?? redes.ateneo
  const claveVisto = `redes-vistas-${agrupacion}`

  const [abierto, setAbierto] = useState(false)
  const [visto, setVisto] = useState(false)
  const [bocadillo, setBocadillo] = useState(false)

  // Mostrar el bocadillo una vez por visita y por agrupación
  useEffect(() => {
    setAbierto(false)
    setBocadillo(false)
    let yaVisto = false
    try {
      yaVisto = sessionStorage.getItem(claveVisto) === "1"
    } catch {}
    setVisto(yaVisto)
    if (yaVisto) return
    const t = setTimeout(() => setBocadillo(true), SEGUNDOS_BOCADILLO * 1000)
    return () => clearTimeout(t)
  }, [claveVisto])

  // Cerrar con Escape
  useEffect(() => {
    const cerrar = (e) => e.key === "Escape" && setAbierto(false)
    window.addEventListener("keydown", cerrar)
    return () => window.removeEventListener("keydown", cerrar)
  }, [])

  const marcarVisto = () => {
    setVisto(true)
    setBocadillo(false)
    try {
      sessionStorage.setItem(claveVisto, "1")
    } catch {}
  }

  const alternar = () => {
    setAbierto(!abierto)
    marcarVisto()
  }

  if (!datos.enlaces.length) return null

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Iconos de redes */}
      <ul
        className={`flex flex-col items-end gap-3 transition-all duration-300 ${
          abierto ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {datos.enlaces.map(({ tipo, url }) => {
          const { icono: Icono, etiqueta } = iconos[tipo]
          return (
            <li key={tipo}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${etiqueta} de ${datos.nombre}`}
                tabIndex={abierto ? 0 : -1}
                className="flex items-center gap-3 pl-4 pr-2 py-1.5 rounded-full bg-white text-primary-blue border border-border shadow-lg hover:bg-accent-yellow transition-colors"
              >
                <span className="text-sm font-semibold">{etiqueta}</span>
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-blue text-white">
                  <Icono className="w-4 h-4" />
                </span>
              </a>
            </li>
          )
        })}
      </ul>

      {/* Bocadillo de aviso */}
      {bocadillo && !abierto && (
        <div className="relative max-w-[220px] rounded-2xl bg-white border border-border shadow-xl px-4 py-3 pr-9 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2">
          <p className="text-sm font-semibold text-primary-blue leading-snug">
            ¡Sigue a {datos.nombre} en redes!
          </p>
          <p className="text-xs text-muted-foreground mt-1">Conciertos, ensayos y novedades.</p>
          <button
            type="button"
            onClick={marcarVisto}
            aria-label="Cerrar aviso"
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
          <span className="absolute -bottom-2 right-8 w-4 h-4 rotate-45 bg-white border-r border-b border-border" />
        </div>
      )}

      {/* Botón principal */}
      <div className="relative">
        {!visto && (
          <span className="absolute inset-0 rounded-full bg-primary-blue motion-safe:animate-ping opacity-40" />
        )}
        <button
          type="button"
          onClick={alternar}
          aria-expanded={abierto}
          aria-label={abierto ? "Cerrar redes sociales" : `Ver redes sociales de ${datos.nombre}`}
          className={`relative flex items-center justify-center gap-1.5 h-10 rounded-full bg-primary-blue text-white shadow-lg hover:scale-105 transition-all ${
            abierto ? "w-10" : "px-4"
          }`}
        >
          {abierto ? (
            <X className="w-5 h-5" />
          ) : (
            <>
              <Music2 className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold">Síguenos</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}