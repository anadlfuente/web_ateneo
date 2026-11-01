"use client"

import { PageHero } from "@/components/page-hero"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Music, Mic2, MapPin, Clock, Calendar, Ticket } from "lucide-react"
import { MiniCalendario } from "@/components/mini-calendario"
import { RehearsalSection, type Ensayo } from "@/components/rehearsal-schedule"
import {
  type Evento, type AgrupacionId,
  AGRUPACIONES, TIPOS, obtenerEventos, infoAgrupacion, imagenEvento, aISO, fechaLarga, urlMaps,
} from "@/lib/eventos"
import {RedesFlotante} from "@/components/redes-flotante"

// Horario fijo de ensayos (cambia poco, así que sigue aquí).
// Los ensayos puntuales (ensayo general, etc.) se meten como eventos de tipo "Ensayo".
const ensayos: Ensayo[] = [
  { agrupacion: "banda", dias: "Sábado", hora: "11:00 – 13:30", icon: Music, href: "/banda/historia" },
  { agrupacion: "coral", dias: "Lunes",   hora: "20:00 – 21:30", icon: Mic2,  href: "/coral/historia" },
]

// Lugar del evento como enlace a Google Maps (o texto, si no hay lugar)
function LugarMaps({ evento, className = "" }: { evento: Evento; className?: string }) {
  if (!evento.lugar) return null
  const url = urlMaps(evento)
  return (
    <a
      href={url ?? "#"}
      target="_blank"
      rel="noopener"
      title="Ver en Google Maps"
      className={`flex items-center gap-1 hover:underline ${className}`}
    >
      <MapPin className="w-3 h-3 shrink-0" />
      <span className="truncate">{evento.lugar}</span>
    </a>
  )
}

// Ficha de un evento: cartel completo a la izquierda e información a la derecha
function TarjetaEvento({ evento }: { evento: Evento }) {
  const info = infoAgrupacion(evento.agrupacion)
  const yaPasado = evento.fecha < aISO(new Date())
  const fecha = fechaLarga(evento.fecha)

  return (
    <article className="flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden shadow-sm border border-border">
      {/* Cartel pegado al borde de la ficha. El enlace se oculta al lector de pantalla
          y al tabulador porque el título ya lleva al mismo sitio */}
      <Link
        href={`/evento?id=${evento.id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="block shrink-0 sm:w-48 bg-muted"
      >
        <img src={imagenEvento(evento)} alt="" loading="lazy" className="block w-full h-full object-cover" />
      </Link>

      <div className="min-w-0 flex-grow">
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${info.badge}`}>
              {info.nombre}
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

          <h4 className="font-serif text-2xl leading-tight mb-3">
            <Link href={`/evento?id=${evento.id}`} className="hover:text-primary-blue transition-colors">
              {evento.titulo}
            </Link>
          </h4>

          <ul className="space-y-1 text-sm text-muted-foreground mb-3">
            <li className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-blue shrink-0" aria-hidden="true" />
              <span className="first-letter:uppercase">{fecha}</span>
            </li>
            {evento.hora && (
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-blue shrink-0" aria-hidden="true" />
                {evento.hora}h
              </li>
            )}
            {evento.lugar && (
              <li>
                <LugarMaps evento={evento} />
              </li>
            )}
          </ul>
          {evento.enlace_entradas && !yaPasado && (
            <a
              href={evento.enlace_entradas}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-blue text-white text-sm font-semibold hover:bg-primary-blue/90 transition-colors"
            >
              <Ticket className="w-4 h-4" aria-hidden="true" />
              Entradas
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function CalendarPage() {
  // Mes que se está viendo (empieza en el mes actual)
  const [currentDate, setCurrentDate] = useState(() => {
    const hoy = new Date()
    return new Date(hoy.getFullYear(), hoy.getMonth(), 1)
  })
  const [eventos, setEventos] = useState<Evento[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)
  const [filtro, setFiltro] = useState<AgrupacionId | null>(null)
  // Día en el que se ha hecho clic ("2026-11-21"); null = ninguno todavía
  const [seleccionado, setSeleccionado] = useState<string | null>(null)

  // Guarda los meses ya cargados para no pedirlos otra vez al volver
  const cache = useRef(new Map<string, Evento[]>())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const claveMes = `${year}-${month}`

  // Pide al PHP los eventos del mes que se está viendo
  useEffect(() => {
    const guardado = cache.current.get(claveMes)
    if (guardado) {
      setEventos(guardado)
      setCargando(false)
      return
    }
    let cancelado = false
    setCargando(true)
    setError(false)
    obtenerEventos({
      desde: aISO(new Date(year, month, 1)),
      hasta: aISO(new Date(year, month, daysInMonth)),
    })
      .then((datos) => {
        cache.current.set(claveMes, datos)
        if (!cancelado) setEventos(datos)
      })
      .catch(() => { if (!cancelado) setError(true) })
      .finally(() => { if (!cancelado) setCargando(false) })
    return () => { cancelado = true }
  }, [claveMes, year, month, daysInMonth])

  // Eventos que se muestran según el filtro de agrupación
  const visibles = useMemo(
    () => eventos.filter((e) => !filtro || e.agrupacion === filtro),
    [eventos, filtro]
  )

  // Solo se muestran los filtros de agrupaciones que tienen algo este mes
  const agrupacionesDelMes = useMemo(
    () => (Object.keys(AGRUPACIONES) as AgrupacionId[]).filter((a) => eventos.some((e) => e.agrupacion === a)),
    [eventos]
  )

  const hoyISO = aISO(new Date())

  // Sin día elegido se ven todos los eventos del mes; con día, solo los de ese día
  const lista = seleccionado ? visibles.filter((e) => e.fecha === seleccionado) : visibles
  const tituloLista = seleccionado
    ? `Eventos del ${fechaLarga(seleccionado)}`
    : `Eventos de ${currentDate.toLocaleString("es-ES", { month: "long" })} ${year}`

  // Clic en un día: lo selecciona; clic otra vez en el mismo día: vuelve al mes entero
  const elegirDia = (fecha: string) => setSeleccionado(seleccionado === fecha ? null : fecha)

  // Al cambiar de mes se olvida el día seleccionado
  const irAMes = (fecha: Date) => {
    setCurrentDate(fecha)
    setSeleccionado(null)
  }
  const nextMonth = () => irAMes(new Date(year, month + 1, 1))
  const prevMonth = () => irAMes(new Date(year, month - 1, 1))
  const goToday = () => {
    const hoy = new Date()
    irAMes(new Date(hoy.getFullYear(), hoy.getMonth(), 1))
    setSeleccionado(hoyISO)
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <PageHero imagen="/banner_2.png" altoMinimo="min-h-[40vh]">
        <p className="text-white text-5xl md:text-7xl font-serif">Calendario</p>
      </PageHero>

      {/* Contenido */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-serif mb-10">¡No te pierdas ninguno de nuestros conciertos!</h2>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setFiltro(null)}
            className={`px-4 py-1.5 rounded-full border text-sm transition-colors ${
              filtro === null ? "bg-foreground text-white border-foreground" : "bg-white border-border hover:border-foreground"
            }`}
          >
            Todas
          </button>
          {agrupacionesDelMes.map((a) => (
            <button
              key={a}
              onClick={() => setFiltro(filtro === a ? null : a)}
              className={`px-4 py-1.5 rounded-full border text-sm flex items-center gap-2 transition-colors ${
                filtro === a ? "bg-foreground text-white border-foreground" : "bg-white border-border hover:border-foreground"
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${AGRUPACIONES[a].punto}`} />
              {AGRUPACIONES[a].nombre}
            </button>
          ))}
        </div>

        {error && (
          <p className="mb-6 p-4 rounded-2xl bg-red-50 text-red-700 text-sm">
            No hemos podido cargar los eventos. Inténtalo de nuevo en unos minutos.
          </p>
        )}

        {/* Calendario pequeño a la izquierda + eventos del día a la derecha */}
        <div className="grid md:grid-cols-[18rem_1fr] lg:grid-cols-[20rem_1fr] gap-8 lg:gap-12 items-start">
  <div className="w-full max-w-xs mx-auto md:mx-0 md:sticky md:top-28">
            <MiniCalendario
              year={year}
              month={month}
              eventos={visibles}
              seleccionado={seleccionado}
              onSeleccionar={elegirDia}
              onPrev={prevMonth}
              onNext={nextMonth}
              onHoy={goToday}
              cargando={cargando}
            />
          </div>

                    <div aria-live="polite">
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
              <h3 className="font-serif text-2xl md:text-3xl">{tituloLista}</h3>
              {seleccionado && (
                <button onClick={() => setSeleccionado(null)} className="text-sm text-primary-blue hover:underline">
                  Ver todo el mes
                </button>
              )}
            </div>

            {lista.length > 0 ? (
              <ul className="space-y-4">
                {lista.map((ev) => (
                  <li key={ev.id}><TarjetaEvento evento={ev} /></li>
                ))}
              </ul>
            ) : (
              !cargando && !error && (
                <p className="text-muted-foreground">
                  {seleccionado
                    ? "No hay eventos este día."
                    : `No hay eventos este mes${filtro ? ` para ${AGRUPACIONES[filtro].nombre}` : ""}.`}
                </p>
              )
            )}
          </div>
        </div>
      </section>

      <section className="mb-20">
        <RehearsalSection ensayos={ensayos} />
      </section>
      <RedesFlotante />
      <Footer />
    </main>
  )
}