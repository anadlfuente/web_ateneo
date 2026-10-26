"use client"

import { EventosMes } from "@/components/eventos-mes"
import { PageHero } from "@/components/page-hero"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Music, Mic2, MapPin, Clock } from "lucide-react"
import { RehearsalSection, type Ensayo } from "@/components/rehearsal-schedule"
import {
  type Evento, type AgrupacionId,
  AGRUPACIONES, TIPOS, obtenerEventos, infoAgrupacion, aISO, fechaLarga, urlMaps,
} from "@/lib/eventos"
import {RedesFlotante} from "@/components/redes-flotante"

// Horario fijo de ensayos (cambia poco, así que sigue aquí).
// Los ensayos puntuales (ensayo general, etc.) se meten como eventos de tipo "Ensayo".
const ensayos: Ensayo[] = [
  { agrupacion: "banda", dias: "Sábado", hora: "11:00 – 13:30", icon: Music, href: "/banda/historia" },
  { agrupacion: "coral", dias: "Lunes",   hora: "20:00 – 21:30", icon: Mic2,  href: "/coral/historia" },
]

const navButton = `
  w-10 h-10 flex items-center justify-center rounded-full border border-border bg-white
  hover:bg-primary-blue hover:text-white transition-all duration-200 shadow-sm
`

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
  const [verEnsayos, setVerEnsayos] = useState(true)

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

  // Eventos que se muestran según los filtros
  const visibles = useMemo(
    () => eventos.filter((e) =>
      (!filtro || e.agrupacion === filtro) && (verEnsayos || e.tipo !== "ensayo")
    ),
    [eventos, filtro, verEnsayos]
  )

  // Solo se muestran los filtros de agrupaciones que tienen algo este mes
  const agrupacionesDelMes = useMemo(
    () => (Object.keys(AGRUPACIONES) as AgrupacionId[]).filter((a) => eventos.some((e) => e.agrupacion === a)),
    [eventos]
  )

  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const goToday = () => {
    const hoy = new Date()
    setCurrentDate(new Date(hoy.getFullYear(), hoy.getMonth(), 1))
  }

  const dateStr = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  const hoyISO = aISO(new Date())

  // Cuadrícula del mes empezando en lunes
  const startOffset = (new Date(year, month, 1).getDay() + 6) % 7
  const calendarDays = Array.from({ length: startOffset + daysInMonth }, (_, i) => {
    const dayNumber = i - startOffset + 1
    return dayNumber > 0 ? dayNumber : null
  })

  const monthName = currentDate.toLocaleString("es-ES", { month: "long" })
  const formattedDate = monthName.charAt(0).toUpperCase() + monthName.slice(1) + " " + year

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
          <label className="ml-auto flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={verEnsayos}
              onChange={(e) => setVerEnsayos(e.target.checked)}
            />
            Mostrar ensayos
          </label>
        </div>

        {/* Navegación de meses */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={prevMonth} className={navButton} aria-label="Mes anterior">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-serif capitalize" aria-live="polite">{formattedDate}</h2>
            <button onClick={goToday} className="text-xs text-primary-blue hover:underline">Ir a hoy</button>
          </div>
          <button onClick={nextMonth} className={navButton} aria-label="Mes siguiente">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <p className="mb-6 p-4 rounded-2xl bg-red-50 text-red-700 text-sm">
            No hemos podido cargar los eventos. Inténtalo de nuevo en unos minutos.
          </p>
        )}

        {/* Calendario en cuadrícula (tablet y ordenador) */}
        <div className={`hidden md:block transition-opacity ${cargando ? "opacity-50" : ""}`} aria-busy={cargando}>
          <div className="bg-muted/30 rounded-3xl p-6 shadow-sm">
            <div className="grid grid-cols-7 text-center font-semibold text-sm mb-2">
              {["L", "M", "X", "J", "V", "S", "D"].map((d) => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => {
                if (!day) return <div key={index} className="min-h-22.5" />

                const columna = index % 7
                const isWeekend = columna >= 5
                const esHoy = dateStr(day) === hoyISO
                const dayEvents = visibles.filter((e) => e.fecha === dateStr(day))

                return (
                  <div
                    key={index}
                    className={`
                      min-h-27.5 rounded-2xl p-3 shadow-sm
                      hover:shadow-md hover:-translate-y-1 transition-all duration-200
                      ${esHoy ? "bg-primary-blue/10" : isWeekend ? "bg-primary-blue/5" : "bg-white"}
                    `}
                  >
                    <div className={`text-sm font-bold ${esHoy ? "text-primary-blue" : ""}`}>{day}</div>

                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs mt-2 px-2 py-1 rounded border ${infoAgrupacion(event.agrupacion).chip} relative group`}
                      >
                        {/* Título: abre la página del evento */}
                        <Link href={`/evento?id=${event.id}`} className="block font-semibold leading-tight hover:underline">
                          {event.tipo === "ensayo" && <span className="font-normal opacity-70">Ensayo · </span>}
                          {event.titulo}
                        </Link>

                        {/* Lugar: abre Google Maps */}
                        <LugarMaps evento={event} className="text-[10px] opacity-70 mt-0.5" />

                        {event.hora && (
                          <div className="text-[10px] opacity-70 flex items-center gap-1">
                            <Clock className="w-3 h-3 shrink-0" />
                            {event.hora}
                          </div>
                        )}

                        {/* Cartel al pasar el ratón. En sábado y domingo
                            se abre hacia la izquierda para no salirse de la pantalla */}
                        {event.imagen && (
                          <div
                            className={`
                              absolute top-0 ${columna >= 5 ? "right-full mr-3" : "left-full ml-3"}
                              hidden group-hover:block z-50 w-36 rounded-xl overflow-hidden shadow-2xl border bg-white
                              pointer-events-none
                            `}
                          >
                            <img src={event.imagen} alt="" className="w-full h-auto object-cover" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

         {/* Eventos del mes en zigzag (en el móvil sustituye a la cuadrícula) */}
        <div className={cargando ? "opacity-50" : ""}>
          <EventosMes
            eventos={visibles.filter((e) => e.tipo !== "ensayo")}
            titulo={`Eventos de ${monthName} ${year}`}
          />
        </div>

        {!cargando && !error && visibles.length === 0 && (
          <p className="text-center text-muted-foreground mt-6">
            No hay eventos este mes{filtro ? ` para ${AGRUPACIONES[filtro].nombre}` : ""}.
          </p>
        )}
      </section>

      <section className="mb-20">
        <RehearsalSection ensayos={ensayos} />
      </section>
      <RedesFlotante />
      <Footer />
    </main>
  )
}