"use client"

// Lista de eventos del mes en zigzag: imagen a la izquierda, a la derecha, a la izquierda...
// Si el evento no tiene cartel, se usa la foto estándar de su agrupación.

import Link from "next/link"
import { ArrowRight, Calendar, Clock, MapPin, Ticket } from "lucide-react"
import {
  type Evento, infoAgrupacion, imagenEvento, fechaLarga, urlMaps, aISO, TIPOS,
} from "@/lib/eventos"

type Props = {
  eventos: Evento[]
  titulo: string
}

export function EventosMes({ eventos, titulo }: Props) {
  if (eventos.length === 0) return null

  const hoy = aISO(new Date())

  return (
    <div className="mt-16 md:mt-20">
      <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-10 md:mb-14">{titulo}</h3>

      <div className="space-y-14 md:space-y-20">
        {eventos.map((ev, i) => {
          const info = infoAgrupacion(ev.agrupacion)
          const mapa = urlMaps(ev)
          const yaPasado = ev.fecha < hoy
          const fecha = fechaLarga(ev.fecha)
          const fechaBonita = fecha.charAt(0).toUpperCase() + fecha.slice(1)
          // Pares: imagen a la izquierda. Impares: imagen a la derecha.
          const lado = i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"

          return (
            <article
              key={ev.id}
              id={`evento-${ev.id}`}
              className={`flex flex-col ${lado} gap-6 md:gap-12 md:items-center`}
            >
              {/* Imagen: cartel o foto de la agrupación */}
              <Link href={`/evento?id=${ev.id}`} className="block md:w-2/5 flex-shrink-0 group">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg bg-muted">
                  <img
                    src={imagenEvento(ev)}
                    alt={ev.imagen ? `Cartel de ${ev.titulo}` : ""}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>

              {/* Información */}
              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${info.badge}`}>
                    {info.nombre}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-muted text-muted-foreground">
                    {TIPOS[ev.tipo] ?? ev.tipo}
                  </span>
                  {yaPasado && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-foreground/10">
                      Ya celebrado
                    </span>
                  )}
                </div>

                <h4 className="font-serif text-3xl md:text-4xl leading-tight text-foreground mb-5">
                  <Link href={`/evento?id=${ev.id}`} className="hover:text-primary-blue transition-colors">
                    {ev.titulo}
                  </Link>
                </h4>

                <ul className="space-y-2 text-muted-foreground mb-6">
                  <li className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary-blue flex-shrink-0" />
                    {fechaBonita}
                  </li>
                  {ev.hora && (
                    <li className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary-blue flex-shrink-0" />
                      {ev.hora}h
                    </li>
                  )}
                  {ev.lugar && (
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary-blue flex-shrink-0" />
                      {mapa ? (
                        <a href={mapa} target="_blank" rel="noopener" className="hover:text-primary-blue hover:underline">
                          {ev.lugar}
                        </a>
                      ) : (
                        ev.lugar
                      )}
                    </li>
                  )}
                </ul>

                {ev.descripcion && (
                  <p className="text-foreground/80 leading-relaxed whitespace-pre-line line-clamp-4 mb-6">
                    {ev.descripcion}
                  </p>
                )}

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/evento?id=${ev.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground/20 font-semibold hover:bg-foreground hover:text-white transition-colors"
                  >
                    Ver evento
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  {ev.enlace_entradas && !yaPasado && (
                    <a
                      href={ev.enlace_entradas}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-blue text-white font-semibold hover:bg-primary-blue/90 transition-colors"
                    >
                      <Ticket className="w-4 h-4" />
                      Entradas
                    </a>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}