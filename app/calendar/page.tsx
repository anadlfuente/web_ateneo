"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Music, Mic2 } from "lucide-react"
import { RehearsalSection } from "@/components/rehearsal-schedule"

// Define groups
type Group = "banda" | "coro" | "claxon" | "charanga"

type Event = {
  id: number
  title: string
  date: string
  start: string
  group: Group
  tipo?: string
  poster?: string  // 👈 opcional
}

const events: Event[] = [
  {
    id: 1,
    title: "Concierto Banda",
    date: "2026-05-12",
    start: "2026-05-12T20:30",
    group: "banda",
    tipo: "Concierto",
    poster : "/poster/festival-poster.jpeg"

  },
  {
    id: 2,
    title: "Ensayo general",
    date: "2026-05-18",
    start: "2026-05-23T20:30",
    group: "claxon",
  },
  {
    id: 3,
    title: "Cantares de Chigre",
    date: "2026-05-18",
    start: "2026-05-18T20:30",
    group: "coro",
    poster : "/poster/festival-poster.jpeg"
  },
]

const categoryStyles: Record<Group, string> = {
  banda: "bg-primary-blue/10 text-primary-blue-700 border-primary-blue",
  coro: "bg-accent-yellow/10 text-accent-yellow-700 border-accent-yellow",
  claxon: "bg-accent-green/10 text-accent-green-700 border-accent-green",
  charanga: "bg-primary-blue/10 text-primary-blue-700 border-primary-blue"
}

const ensayos = [
  { agrupacion: "Banda Sinfónica", dia: "Lunes y Miércoles", hora: "20:00 - 22:00", color: "#3399FE", icon: Music, href: "/banda" },
  { agrupacion: "Coral Cantares", dia: "Martes y Jueves", hora: "19:30 - 21:30", color: "#F6F61B", icon: Mic2, href: "/coral" },
]

export default function CalendarPage() {
  // Set actual month and day
  const [currentDate, setCurrentDate] = useState(new Date())
  const nextMonth = () => {
    setCurrentDate(prev =>
      new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    )
  }

  const prevMonth = () => {
    setCurrentDate(prev =>
      new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    )
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const dateStr = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

  // primer día del mes (JS: 0 domingo → 6 sábado)
  const firstDay = new Date(year, month, 1).getDay()

  // ajustamos para que lunes sea inicio
  const startOffset = (firstDay + 6) % 7

  // total de celdas del calendario
  const totalCells = startOffset + daysInMonth

  // array final del calendario
  const calendarDays = Array.from({ length: totalCells }, (_, i) => {
    const dayNumber = i - startOffset + 1
    return dayNumber > 0 ? dayNumber : null
  })

  // Format header of month Name
  const monthName = currentDate.toLocaleString("es-ES", {
    month: "long",
  })

  const formattedDate =
    monthName.charAt(0).toUpperCase() +
    monthName.slice(1) +
    " " +
    year

  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <section className="relative h-[60vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/banner.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-serif">
            Calendario
          </h1>
        </div>
      </section>

      {/* Contenido */}
      <section className="max-w-6xl mx-auto px-6 py-20 ">
        <h2 className="text-4xl font-serif mb-10">No te pierdas ninguno de nuestros conciertos!</h2>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="
              w-10 h-10
              flex items-center justify-center
              rounded-full
              border border-border
              bg-white
              hover:bg-primary-blue
              hover:text-white
              transition-all duration-200
              shadow-sm
            "
          >
          <ChevronLeft className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-serif capitalize">
            {formattedDate}
          </h2>

        <button
          onClick={nextMonth}
          className="
            w-10 h-10
            flex items-center justify-center
            rounded-full
            border border-border
            bg-white
            hover:bg-primary-blue
            hover:text-white
            transition-all duration-200
            shadow-sm
          "
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        </div>
        {/*Calendar*/}
        <div className="bg-muted/30 border rounded-3xl p-6 shadow-sm">
          <div className="grid grid-cols-7 text-center font-semibold text-sm mb-2">
            {["L", "M", "X", "J", "V", "S", "D"].map(d => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => {
              const isWeekend = index % 7 === 5 || index % 7 === 6

            if (!day) {
            return <div key={index} className="min-h-[90px]" />
            }

            const dayEvents = events.filter(e =>
            e.start.startsWith(dateStr(day))
          )

            return (
              <div
                  key={index}
                  className={`
                    min-h-[110px]
                    rounded-2xl
                    border border-border/50
                    p-3
                    shadow-sm
                    hover:shadow-md
                    hover:-translate-y-1
                    transition-all duration-200
                    ${isWeekend ? "bg-primary-blue/5": "bg-white"}
                  `}
                >
                <div className="text-sm font-bold">{day}</div>

                {dayEvents.map(event => {
                  const style = categoryStyles[event.group] || "bg-gray-100 text-gray-700"
                  return(
                    <div
                      key={event.id}
                      className={`text-xs mt-2 px-2 py-1 rounded border ${style} relative group`}
                    >
                    <div className="font-semibold leading-tight">
                      {event.title}
                    </div>
                    <div className="text-[10px] opacity-70">
                      {event.start.slice(11, 16)}
                    </div>

                    {/* POSTER “NUBE” */}
                    {event.poster && (
                    <div className="
                      absolute left-full ml-3 top-0
                      hidden group-hover:block
                      z-50
                      w-36
                      rounded-xl
                      overflow-hidden
                      shadow-2xl
                      border
                      bg-white
                      transition
                      duration-200
                      hover:scale-105
                    ">
                    <img
                      src={event.poster}
                      alt={event.title}
                      className="w-full h-auto object-cover"
                    />
                    </div>
                    )}
                  </div>
                )
            })}
            </div>
            )
          })}
        </div>
      </div> 
      </section >
      <section className="mb-10">
        <RehearsalSection ensayos={ensayos} />
      </section>
      <Footer />
    </main>
  )
}