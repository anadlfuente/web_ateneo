"use client"

// Página de un evento: /evento?id=12
// Es una sola página que lee el número del evento en la dirección
// y pide ese evento al PHP. Así cualquier evento nuevo tiene su página al momento.
import { PageHero } from "@/components/page-hero"
import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin, Ticket, Navigation } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  type Evento, obtenerEventos, infoAgrupacion, fechaLarga, aISO, urlMaps, rutaImagen, TIPOS, imagenEvento,
} from "@/lib/eventos"
import { RedesFlotante } from "@/components/redes-flotante"

function DetalleEvento() {
  const id = Number(useSearchParams().get("id"))
  const [evento, setEvento] = useState<Evento | null>(null)
  const [estado, setEstado] = useState<"cargando" | "ok" | "no-existe" | "error">("cargando")

  useEffect(() => {
    if (!id) {
      setEstado("no-existe")
      return
    }
    setEstado("cargando")
    obtenerEventos({ id })
      .then((datos) => {
        if (datos.length === 0) {
          setEstado("no-existe")
          return
        }
        setEvento(datos[0])
        setEstado("ok")
        document.title = `${datos[0].titulo} · Ateneo Musical de Mieres`
      })
      .catch(() => setEstado("error"))
  }, [id])

  // Cargando
  if (estado === "cargando") {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-[2fr_3fr] gap-10" aria-busy="true">
        <div className="aspect-[3/4] rounded-2xl bg-muted animate-pulse" />
        <div className="space-y-4">
          <div className="h-6 w-1/3 bg-muted rounded animate-pulse" />
          <div className="h-12 w-3/4 bg-muted rounded animate-pulse" />
          <div className="h-24 bg-muted rounded animate-pulse" />
        </div>
      </div>
    )
  }

  // Error o evento que no existe
  if (estado !== "ok" || !evento) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <h1 className="font-serif text-4xl mb-4">
          {estado === "error" ? "No hemos podido cargar el evento" : "Evento no encontrado"}
        </h1>
        <p className="text-muted-foreground mb-8">
          {estado === "error"
            ? "Inténtalo de nuevo en unos minutos."
            : "Puede que se haya cancelado o que el enlace no sea correcto."}
        </p>
        <Link href="/calendar" className="inline-flex items-center gap-2 text-primary-blue font-semibold hover:underline">
          <ArrowLeft className="w-4 h-4" /> Volver al calendario
        </Link>
      </div>
    )
  }

  const agrupacion = infoAgrupacion(evento.agrupacion)
  const cartel = rutaImagen(evento.imagen)
  const imagen = imagenEvento(evento)
  const mapa = urlMaps(evento)
  const yaPasado = evento.fecha < aISO(new Date())

  return (
    <article className="max-w-5xl mx-auto px-6 py-16 md:py-20">
      <Link
        href="/calendar"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary-blue mb-10"
      >
        <ArrowLeft className="w-4 h-4" /> Volver al calendario
      </Link>

      <div className={`grid gap-10 md:gap-14 ${imagen ? "md:grid-cols-[2fr_3fr]" : ""}`}>
        {/* Cartel, o foto de la agrupación si no hay cartel */}
        {cartel ? (
          <a href={cartel} target="_blank" rel="noopener" className="block group">
            <img
              src={cartel}
              alt={`Cartel de ${evento.titulo}`}
              className="w-full rounded-2xl shadow-xl border border-border group-hover:shadow-2xl transition-shadow"
            />
            <span className="block text-center text-xs text-muted-foreground mt-2">
              Ver cartel a tamaño completo
            </span>
          </a>
        ) : imagen ? (
          <img
            src={imagen}
            alt={agrupacion.nombre}
            className="w-full rounded-2xl shadow-xl border border-border"
          />
        ) : null}

        {/* Información */}
        <div className={cartel ? "" : "max-w-3xl"}>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${agrupacion.badge}`}>
              {agrupacion.nombre}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-muted text-muted-foreground">
              {TIPOS[evento.tipo] ?? evento.tipo}
            </span>
            {yaPasado && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-foreground/10">
                Ya celebrado
              </span>
            )}
          </div>

          <h1 className="font-serif text-4xl md:text-5xl leading-tight text-foreground mb-8">
            {evento.titulo}
          </h1>

          <dl className="space-y-4 mb-8">
            {/* Fecha */}
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 mt-0.5 text-primary-blue flex-shrink-0" />
              <div>
                <dt className="sr-only">Fecha</dt>
                <dd className="first-letter:uppercase">{fechaLarga(evento.fecha)}</dd>
              </div>
            </div>

            {/* Hora */}
            {evento.hora && (
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-0.5 text-primary-blue flex-shrink-0" />
                <div>
                  <dt className="sr-only">Hora</dt>
                  <dd>{evento.hora}h</dd>
                </div>
              </div>
            )}

            {/* Lugar + enlace a Google Maps */}
            {evento.lugar && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-primary-blue flex-shrink-0" />
                <div>
                  <dt className="sr-only">Lugar</dt>
                  <dd className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {mapa ? (
                      <a href={mapa} target="_blank" rel="noopener" className="hover:text-primary-blue hover:underline">
                        {evento.lugar}
                      </a>
                    ) : (
                      evento.lugar
                    )}
                    {mapa && (
                      <a
                        href={mapa}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-1 text-sm text-primary-blue hover:underline"
                      >
                        <Navigation className="w-3.5 h-3.5" /> Cómo llegar
                      </a>
                    )}
                  </dd>
                </div>
              </div>
            )}
          </dl>

          {/* Descripción */}
          {evento.descripcion && (
            <div className="border-t border-border pt-6 mb-8">
              <p className="text-lg leading-relaxed text-foreground/80 whitespace-pre-line">
                {evento.descripcion}
              </p>
            </div>
          )}

          {/* Entradas (solo si hay enlace y el evento no ha pasado) */}
          {evento.enlace_entradas && !yaPasado && (
            <a
              href={evento.enlace_entradas}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-blue text-white font-semibold hover:bg-primary-blue/90 transition-colors"
            >
              <Ticket className="w-5 h-5" /> Comprar entradas
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function EventoPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <PageHero imagen="/banner_2.png" altoMinimo="min-h-[40vh]">
        <p className="text-white text-5xl md:text-7xl font-serif">Calendario</p>
      </PageHero>

      {/* Suspense es necesario para que la página se pueda exportar como estática */}
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <DetalleEvento />
      </Suspense>
      <RedesFlotante />
      <Footer />
    </main>
  )
}