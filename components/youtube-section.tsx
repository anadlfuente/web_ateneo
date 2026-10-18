"use client"

// Bloque "Vídeos" de la portada.
// - Un reproductor grande con el vídeo seleccionado.
// - Una lista con el resto de vídeos: al pulsar uno, pasa al reproductor.
// - El reproductor usa <VideoYoutube>, que NO carga nada de YouTube
//   hasta que se aceptan las cookies de contenido de terceros.
// - Las miniaturas tampoco se piden a YouTube sin consentimiento:
//   se usa la imagen propia (`miniatura`) o un fondo neutro.

import { useState } from "react"
import { ArrowRight, Play, Youtube } from "lucide-react"
import { VideoYoutube } from "@/components/cookies/video-youtube"
import { useConsentimiento } from "@/components/cookies/consentimiento-provider"

const CANAL_YOUTUBE = "https://www.youtube.com/channel/UCurQwXp65WecwlLX-keRS0g"

interface Video {
  id: string          // lo que va después de "watch?v=" en la URL de YouTube
  titulo: string
  agrupacion: string  // aparece como etiqueta encima del título
  fecha?: string      // texto libre: "Diciembre 2025", "Santa Cecilia 2024"...
  miniatura?: string  // opcional: imagen propia en /public (p. ej. "/videos/santa-cecilia.jpg")
}

// ── Edita aquí la lista. El primero es el que aparece al cargar la página. ──
const videos: Video[] = [
  { id: "pwpK8ZQyvNo", titulo: "Star Wars (Antroxu 2026)", agrupacion: "Banda Sinfónica", fecha: "2026" },
  { id: "fuh-PHW75zs", titulo: "SKANDA (Folixa na Primavera 2024)", agrupacion: "Banda Sinfónica", fecha: "2024" },
  { id: "QEBpcIM9A1o", titulo: "Pasodoble Ateneo Musical de Mieres", agrupacion: "Banda Sinfónica", fecha: "2023" },
  { id: "KzxI5TT36v8", titulo: "At Kitty O´Shea´s (Festival de Bandas Villa de Mieres)", agrupacion: "Banda Sinfónica", fecha: "2023" },
]

export function VideosSection() {
  const [actual, setActual] = useState(videos[0])
  const { consentimiento } = useConsentimiento()
  const puedeCargarYoutube = consentimiento?.externos === true

  if (videos.length === 0) return null

  // Miniatura: primero la propia; si no hay y ya hay consentimiento, la de YouTube en alta
  const miniaturaDe = (v: Video) =>
    v.miniatura ?? (puedeCargarYoutube ? `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg` : null)

  return (
    <section id="videos" className="py-24 bg-white relative overflow-hidden z-10">
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
              <Play className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-semibold tracking-wider uppercase">Escúchanos</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
              Nuestra música <span className="text-accent">en vídeo</span>
            </h2>
          </div>
          <a
            href={CANAL_YOUTUBE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-accent text-sm font-semibold tracking-wide uppercase hover:text-accent/80 transition-colors group"
          >
            <Youtube className="w-5 h-5 mr-2" />
            Ver el canal
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Reproductor */}
          <div className="lg:col-span-2">
            {/* `key` hace que el reproductor se reinicie al cambiar de vídeo */}
            <VideoYoutube key={actual.id} id={actual.id} titulo={actual.titulo} />
            <div className="mt-4">
              <p className="text-xs font-bold tracking-wider uppercase text-primary">
                {actual.agrupacion}
                {actual.fecha && <span className="text-muted-foreground font-normal"> · {actual.fecha}</span>}
              </p>
              <h3 className="font-serif text-2xl md:text-3xl text-foreground mt-1">{actual.titulo}</h3>
            </div>
          </div>

          {/* Lista de vídeos */}
          <ul className="flex flex-col gap-3">
            {videos.map((v) => {
              const seleccionado = v.id === actual.id
              const miniatura = miniaturaDe(v)
              return (
                <li key={v.id}>
                  <button
                    type="button"
                    onClick={() => setActual(v)}
                    aria-pressed={seleccionado}
                    className={`group w-full flex gap-4 p-3 rounded-2xl text-left border transition-all ${
                      seleccionado
                        ? "border-accent bg-accent/5"
                        : "border-border bg-white hover:border-primary/30 hover-card-vibrant"
                    }`}
                  >
                    <div className="relative w-32 flex-shrink-0 aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary-blue/30 to-accent-green/40">
                      {miniatura && (
                        <img
                          src={miniatura}
                          alt=""
                          loading="lazy"
                          onLoad={(e) => {
                            // Si el vídeo no tiene versión en alta, YouTube devuelve una imagen de 120 px
                            const img = e.currentTarget
                            if (img.naturalWidth <= 120 && !img.src.includes("hqdefault")) {
                              img.src = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`
                            }
                          }}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="w-9 h-9 rounded-full bg-black/50 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <span className="text-xs font-bold tracking-wider uppercase text-primary">{v.agrupacion}</span>
                      <span className="font-serif text-lg leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {v.titulo}
                      </span>
                      {v.fecha && <span className="text-xs text-muted-foreground mt-1">{v.fecha}</span>}
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}