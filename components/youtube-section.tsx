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
  { id: "fuh-PHW75zs", titulo: "SKANDA (Folixa na Primavera 2025)", agrupacion: "Banda Sinfónica", fecha: "2025" },
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
    <section id="videos" className="home-section bg-background text-foreground">
      <div className="home-container">
        {/* Cabecera */}
        <div className="section-intro mb-10 flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="section-eyebrow">Escúchanos</p>
            <h2 className="section-heading">Nuestra música en vídeo</h2>
          </div>
          <a
            href={CANAL_YOUTUBE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link inline-flex min-h-11 items-center font-semibold"
          >
            <Youtube className="w-5 h-5 mr-2" />
            Ver más vídeos en YouTube
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Reproductor */}
          <div className="lg:col-span-2">
            {/* `key` hace que el reproductor se reinicie al cambiar de vídeo */}
            <VideoYoutube key={actual.id} id={actual.id} titulo={actual.titulo} />
            <div className="mt-4">
              <p className="text-sm font-bold">
                {actual.agrupacion}
                {actual.fecha && <span className="font-normal"> · {actual.fecha}</span>}
              </p>
              <h3 className="mt-1 font-semibold">{actual.titulo}</h3>
            </div>
          </div>

          {/* Lista de vídeos */}
          <ul className="flex flex-col gap-3">
            {videos.filter((v) => v.id !== actual.id).map((v) => {
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
                        ? "border-primary-blue bg-primary-blue/10"
                        : "border-blue-border bg-background hover:bg-primary-blue/10"
                    }`}
                  >
                    <div className="relative aspect-video w-32 flex-shrink-0 overflow-hidden rounded-lg bg-primary-blue/20">
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
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/90">
                          <Play className="ml-0.5 h-4 w-4 fill-background text-background" />
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <span className="text-sm font-bold">{v.agrupacion}</span>
                      <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground">
                        {v.titulo}
                      </h3>
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