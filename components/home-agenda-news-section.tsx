"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { aISO, fechaLarga, obtenerEventos, TIPOS_PUBLICOS, type Evento } from "@/lib/eventos"
import { formatearFecha, getNoticias } from "@/lib/noticias"

function resumenPorPalabras(resumen: string) {
  const palabras = resumen.trim().split(/\s+/)
  return palabras.length > 18 ? `${palabras.slice(0, 18).join(" ")}…` : resumen
}

export function HomeAgendaNewsSection() {
  const [eventos, setEventos] = useState<Evento[] | null>(null)
  const [error, setError] = useState(false)
  const noticias = getNoticias().slice(0, 3)

  useEffect(() => {
    obtenerEventos({ limite: 20, tipos: TIPOS_PUBLICOS })
      .then((items) => {
        const hoy = aISO(new Date())
        setEventos(items
          .filter((evento) => evento.fecha >= hoy)
          .sort((a, b) => a.fecha.localeCompare(b.fecha))
          .slice(0, 3))
      })
      .catch(() => setError(true))
  }, [])

  return (
    <section className="home-section bg-background text-foreground">
      <div className="home-container">
        <div className="section-intro mb-5">
          <h2 className="section-heading">
            Agenda y <span className="title-highlight">noticias</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="mb-4 font-semibold">Próximos eventos</p>
            {eventos === null && !error && (
              <p role="status" aria-live="polite">Cargando eventos…</p>
            )}
            {error && (
              <p role="alert" className="home-card p-4">
                No hemos podido cargar el calendario. Inténtalo de nuevo más tarde.
              </p>
            )}
            {eventos?.length === 0 && (
              <p className="home-card p-4">No hay próximos eventos publicados.</p>
            )}
            {eventos && eventos.length > 0 && (
              <ul className="space-y-3">
                {eventos.map((evento) => (
                  <li key={evento.id}>
                    <Link href={`/evento?id=${evento.id}`} className="home-card home-card-link block p-4">
                      <p className="mb-1 text-sm font-semibold">{fechaLarga(evento.fecha)}{evento.hora ? ` · ${evento.hora} h` : ""}</p>
                      <h3 className="mb-1 font-semibold">{evento.titulo}</h3>
                      {evento.lugar && <p className="text-sm">{evento.lugar}</p>}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Link href="/calendar" className="text-link mt-4 inline-flex min-h-11 items-center gap-2 font-semibold">
              Ver calendario completo <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div>
            <p className="mb-4 font-semibold">Últimas noticias</p>
            {noticias.length > 0 ? (
              <ul className="space-y-3">
                {noticias.map((noticia) => (
                  <li key={noticia.slug}>
                    <Link href={`/noticias/${noticia.slug}`} className="home-card home-card-link grid grid-cols-[5.5rem_1fr] gap-3 p-3 sm:grid-cols-[7rem_1fr]">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={noticia.imagen}
                          alt={noticia.tieneImagenPropia ? `Imagen de la noticia: ${noticia.titulo}` : ""}
                          fill
                          sizes="112px"
                          loading="lazy"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="mb-1 text-sm">{formatearFecha(noticia.fecha)}</p>
                        <h3 className="mb-1 font-semibold">{noticia.titulo}</h3>
                        <p className="text-sm">{resumenPorPalabras(noticia.resumen)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="home-card p-4">No hay noticias publicadas.</p>
            )}
            <Link href="/noticias" className="text-link mt-4 inline-flex min-h-11 items-center gap-2 font-semibold">
              Ver todas las noticias <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
