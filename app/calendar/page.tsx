"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState } from "react"


const events = [
  {
    id: 1,
    title: "Concierto Banda",
    date: "2026-05-12",
    start: "2026-05-12T20:30"
  },
  {
    id: 2,
    title: "Ensayo general",
    date: "2026-05-18",
    start: "2026-05-18T20:30"
  },
  {
    id: 3,
    title: "Cantares de Chigre",
    date: "2026-05-18",
    start: "2026-05-18T20:30"
  },
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
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-serif mb-6">No te pierdas ninguno de nuestros conciertos!</h2>
        <div className="flex items-center justify-between mb-6">
          <button onClick={prevMonth}>←</button>

          <h2 className="text-xl font-serif capitalize">
            {currentDate.toLocaleString("es-ES", {
              month: "long",
              year: "numeric",
          })}
          </h2>

        <button onClick={nextMonth}>→</button>
        </div>
        {/*Calendar*/}
        <div className="grid grid-cols-7 text-center font-semibold text-sm mb-2">
          {["L", "M", "X", "J", "V", "S", "D"].map(d => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {

          if (!day) {
          return <div key={index} className="min-h-[90px]" />
          }

          const dayEvents = events.filter(e =>
          e.start.startsWith(dateStr(day))
        )

          return (
            <div key={index} className="border p-2 min-h-[90px] rounded-sm">
              <div className="text-sm font-bold">{day}</div>

              {dayEvents.map(event => (
                <div
                key={event.id}
                  className="text-xs mt-1 px-2 py-1 rounded bg-blue-100"
                >
                  <div className="font-medium">{event.title}</div>

                  <div className="text-[10px] opacity-70">
                    {event.start.slice(11, 16)}
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
      </section>
      <Footer />
    </main>
  )
}