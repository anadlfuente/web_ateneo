"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const events = [
  {
    id: 1,
    date: { day: "15", month: "MAR", year: "2026" },
    title: "Concierto de Primavera",
    subtitle: "Banda Sinfonica",
    location: "Teatro Principal",
    time: "20:00h",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80",
  },
  {
    id: 2,
    date: { day: "22", month: "MAR", year: "2026" },
    title: "Festival Coral Regional",
    subtitle: "Coral Cantares",
    location: "Auditorio Municipal",
    time: "19:00h",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80",
  },
  {
    id: 3,
    date: { day: "05", month: "ABR", year: "2026" },
    title: "Rock Night",
    subtitle: "Claxon Boys",
    location: "Sala Concerts",
    time: "22:00h",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
  },
]

const upcomingSmall = [
  { date: "19 MAR", title: "Fiestas de San Jose", group: "Charanga" },
  { date: "28 MAR", title: "Concierto Benefico", group: "Banda Sinfonica" },
  { date: "12 ABR", title: "Primavera Coral", group: "Coral Cantares" },
  { date: "20 ABR", title: "Fiesta Mayor", group: "Charanga" },
]

export function CalendarSection() {
  return (
    <section id="calendario" className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4">
              Calendario
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
              Proximos<br />
              Conciertos
            </h2>
          </div>
          <Link 
            href="#calendario-completo"
            className="inline-flex items-center text-foreground text-sm font-medium tracking-wide uppercase hover:text-secondary transition-colors group"
          >
            Ver Calendario Completo
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured events */}
          <div className="lg:col-span-2 space-y-px bg-border">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`#evento-${event.id}`}
                className="group flex bg-white hover:bg-muted transition-colors"
              >
                {/* Date */}
                <div className="w-28 flex-shrink-0 py-8 px-6 flex flex-col items-center justify-center border-r border-border">
                  <span className="text-4xl font-serif text-foreground">{event.date.day}</span>
                  <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">{event.date.month}</span>
                </div>

                {/* Content */}
                <div className="flex-grow py-6 px-8 flex flex-col justify-center">
                  <p className="text-xs tracking-[0.2em] text-secondary uppercase mb-1">
                    {event.subtitle}
                  </p>
                  <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-secondary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {event.location} &middot; {event.time}
                  </p>
                </div>

                {/* Image */}
                <div className="w-40 flex-shrink-0 hidden md:block">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Sidebar */}
          <div className="bg-foreground text-white p-8">
            <h3 className="font-serif text-2xl mb-8">
              Mas Eventos
            </h3>
            
            <div className="space-y-6">
              {upcomingSmall.map((event, index) => (
                <Link 
                  key={index}
                  href="#"
                  className="block group pb-6 border-b border-white/20 last:border-0 last:pb-0"
                >
                  <p className="text-xs tracking-[0.2em] text-white/60 uppercase mb-1">
                    {event.date}
                  </p>
                  <h4 className="text-lg text-white group-hover:text-secondary transition-colors">
                    {event.title}
                  </h4>
                  <p className="text-sm text-white/60">{event.group}</p>
                </Link>
              ))}
            </div>

            <Button 
              className="w-full mt-8 bg-white text-foreground hover:bg-white/90 text-sm font-medium tracking-wide uppercase"
            >
              Ver Todos
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
