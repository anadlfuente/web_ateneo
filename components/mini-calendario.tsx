"use client"

// Calendario mensual pequeño: cada día es un botón y, si tiene eventos,
// debajo del número aparece un puntito por cada color de agrupación.

import { ChevronLeft, ChevronRight } from "lucide-react"
import { type Evento, agrupacionesEvento, fondoPelota, aISO } from "@/lib/eventos"

type Props = {
  year: number
  month: number                         // 0 = enero
  eventos: Evento[]                     // eventos ya filtrados del mes
  seleccionado: string | null           // "2026-11-21"
  onSeleccionar: (fecha: string) => void
  onPrev: () => void
  onNext: () => void
  onHoy: () => void
  cargando?: boolean
}

const DIAS_SEMANA = ["L", "M", "X", "J", "V", "S", "D"]

export function MiniCalendario({
  year, month, eventos, seleccionado, onSeleccionar, onPrev, onNext, onHoy, cargando = false,
}: Props) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startOffset = (new Date(year, month, 1).getDay() + 6) % 7   // empieza en lunes
  const hoyISO = aISO(new Date())

  const dateStr = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

  // Una pelota por evento del día. Si participan varias agrupaciones, la pelota
  // se divide en sus colores. Las pelotas iguales del mismo día no se repiten.
  const puntosDelDia = (fecha: string) => {
    const fondos = eventos
      .filter((e) => e.fecha === fecha)
      .map((e) => fondoPelota(agrupacionesEvento(e)))
    return [...new Set(fondos)]
  }

  const monthName = new Date(year, month, 1).toLocaleString("es-ES", { month: "long" })

  return (
    <div className={`bg-white rounded-3xl p-4 shadow-sm border border-border transition-opacity ${cargando ? "opacity-50" : ""}`}
         aria-busy={cargando}>
      {/* Cabecera: mes y flechas */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onPrev} aria-label="Mes anterior"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary-blue hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-serif capitalize" aria-live="polite">{monthName} {year}</h3>
          <button onClick={onHoy} className="text-xs text-primary-blue hover:underline">Ir a hoy</button>
        </div>
        <button onClick={onNext} aria-label="Mes siguiente"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary-blue hover:text-white transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-muted-foreground mb-1">
        {DIAS_SEMANA.map((d) => <div key={d}>{d}</div>)}
      </div>

      {/* Días del mes */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startOffset }).map((_, i) => <div key={`vacio-${i}`} />)}

        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const fecha = dateStr(day)
          const puntos = puntosDelDia(fecha)
          const esHoy = fecha === hoyISO
          const activo = fecha === seleccionado

          return (
            <button
              key={fecha}
              onClick={() => onSeleccionar(fecha)}
              aria-pressed={activo}
              aria-label={`${day} de ${monthName}${puntos.length ? ", con eventos" : ""}`}
              className={`
                aspect-square rounded-xl flex flex-col items-center justify-center text-sm transition-colors
                ${activo
                  ? "bg-foreground text-white"
                  : esHoy
                    ? "bg-primary-blue/10 text-primary-blue font-bold"
                    : "hover:bg-muted"}
              `}
            >
              <span className="leading-none">{day}</span>
              {/* Puntitos (si no hay eventos, se deja el hueco para que no "salten" los números) */}
              <span className="flex gap-0.5 mt-1 h-2">
                {puntos.map((fondo) => (
                  <span
                    key={fondo}
                    className={`w-2 h-2 rounded-full ring-1 ${activo ? "ring-white" : "ring-black/20"}`}
                    style={{ background: fondo }}
                  />
                ))}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}