"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  type Evento, obtenerEventos, partesFecha, infoAgrupacion, imagenEvento, TIPOS_PUBLICOS,
} from "@/lib/eventos"

const N_PRINCIPALES = 3
const N_LATERAL = 4

// Tarjetas grandes: primero los destacados y, si no hay suficientes,
// se completan con los más próximos. El resto va a la columna lateral.
function repartirEventos(eventos: Evento[]) {
  const destacados = eventos.filter((e) => e.destacado)
  const resto = eventos.filter((e) => !e.destacado)
  const principales = [...destacados, ...resto]
    .slice(0, N_PRINCIPALES)
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
  const ids = new Set(principales.map((e) => e.id))
  const lateral = eventos.filter((e) => !ids.has(e.id)).slice(0, N_LATERAL)
  return { principales, lateral }
}

export function CalendarSection() {
  const [eventos, setEventos] = useState<Evento[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    obtenerEventos({ limite: 20, tipos: TIPOS_PUBLICOS })
      .then(setEventos)
      .catch(() => setError(true))
  }, [])

  const { principales, lateral } = repartirEventos(eventos ?? [])
  const cargando = eventos === null && !error

  return (
    <section id="calendario" className="py-24 bg-gradient-to-br from-muted via-white to-primary/5 relative overflow-hidden z-10">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-blue/10 rounded-full mb-6">
              <Calendar className="w-4 h-4 text-primary-blue" />
              <span className="text-primary-blue text-sm font-semibold tracking-wider uppercase">Calendario</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
              Próximos <span className="text-primary">Conciertos</span>
            </h2>
          </div>
          <Link
            href="/calendar"
            className="inline-flex items-center text-primary text-sm font-semibold tracking-wide uppercase hover:text-primary/80 transition-colors group"
          >
            Ver Calendario Completo
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Cargando */}
        {cargando && (
          <div className="grid lg:grid-cols-3 gap-6" aria-busy="true">
            <div className="lg:col-span-2 space-y-4">
              {Array.from({ length: N_PRINCIPALES }).map((_, i) => (
                <div key={i} className="h-32 bg-white/70 rounded-2xl animate-pulse" />
              ))}
            </div>
            <div className="h-80 bg-primary/20 rounded-2xl animate-pulse" />
          </div>
        )}

        {/* Error o sin eventos */}
        {(error || (eventos && eventos.length === 0)) && (
          <div className="bg-white rounded-2xl p-10 text-center">
            <p className="font-serif text-2xl text-foreground mb-2">
              {error ? "No hemos podido cargar el calendario" : "Pronto anunciaremos nuevas fechas"}
            </p>
            <p className="text-muted-foreground">
              {error
                ? "Inténtalo de nuevo en unos minutos."
                : "Mientras tanto, puedes repasar nuestros conciertos anteriores en el calendario completo."}
            </p>
          </div>
        )}

        {/* Eventos */}
        {eventos && eventos.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Featured events */}
            <div className={`${lateral.length ? "lg:col-span-2" : "lg:col-span-3"} space-y-4`}>
              {principales.map((evento) => {
                const { dia, mes } = partesFecha(evento.fecha)
                const agrupacion = infoAgrupacion(evento.agrupacion)
                return (
                  <Link
                    key={evento.id}
                    href={`/evento?id=${evento.id}`}
                    className="home-card-shadow group flex md:h-40 bg-white rounded-2xl overflow-hidden transition-all hover-card-vibrant"
                  >
                    {/* Date badge */}
                    <div className={`w-24 md:w-28 flex-shrink-0 ${agrupacion.badge} flex flex-col items-center justify-center py-6`}>
                      <span className="text-4xl md:text-5xl font-bold">{dia}</span>
                      <span className="text-sm font-semibold tracking-wider uppercase opacity-80">{mes}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-grow py-6 px-6 flex flex-col justify-center">
                      <span className="text-xs font-semibold tracking-wider uppercase text-primary mb-1">
                        {agrupacion.nombre}
                      </span>
                      <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
                        {evento.titulo}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        {evento.lugar && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {evento.lugar}
                          </span>
                        )}
                        {evento.hora && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {evento.hora}h
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Image */}
                    <div className="w-32 md:w-40 flex-shrink-0 hidden md:block relative overflow-hidden">
                      <img
                        src={imagenEvento(evento)}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Sidebar - More events */}
            {lateral.length > 0 && (
              <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-6 text-white">
                <h3 className="font-serif text-2xl mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  Más Eventos
                </h3>

                <div className="space-y-4">
                  {lateral.map((evento) => {
                    const { dia, mes } = partesFecha(evento.fecha)
                    return (
                      <Link
                        key={evento.id}
                        href={`/evento?id=${evento.id}`}
                        className="block group pb-4 border-b border-white/20 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <span className="px-2 py-0.5 bg-white/20 rounded text-xs font-bold">
                            {dia} {mes}
                          </span>
                          <span className="text-xs text-white/60 uppercase tracking-wider">
                            {infoAgrupacion(evento.agrupacion).nombre}
                          </span>
                        </div>
                        <h4 className="text-lg font-medium text-white group-hover:text-secondary transition-colors">
                          {evento.titulo}
                        </h4>
                      </Link>
                    )
                  })}
                </div>

                <Button
                  asChild
                  className="w-full mt-6 bg-white text-primary hover:bg-secondary hover:text-foreground font-semibold rounded-lg"
                >
                  <Link href="/calendar">
                    Ver Todos los Eventos
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}