"use client"

import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const events = [
  {
    id: 1,
    date: { day: "15", month: "MAR", year: "2026" },
    title: "Concierto de Primavera",
    subtitle: "Banda Sinfónica",
    location: "Teatro Principal",
    time: "20:00h",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80",
    color: "primary",
    featured: true,
  },
  {
    id: 2,
    date: { day: "22", month: "MAR", year: "2026" },
    title: "Festival Coral Regional",
    subtitle: "Coral Cantares",
    location: "Auditorio Municipal",
    time: "19:00h",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80",
    color: "accent",
  },
  {
    id: 3,
    date: { day: "05", month: "ABR", year: "2026" },
    title: "Rock Night",
    subtitle: "Claxon Boys",
    location: "Sala Concerts",
    time: "22:00h",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
    color: "secondary",
  },
]

const upcomingSmall = [
  { date: "19 MAR", title: "Fiestas de San Jose", group: "Charanga", color: "primary"},
  { date: "28 MAR", title: "Concierto Benefico", group: "Banda Sinfonica", color: "primary"},
  { date: "12 ABR", title: "Primavera Coral", group: "Coral Cantares", color: "accent" },
  { date: "20 ABR", title: "Fiesta Mayor", group: "Charanga", color: "secondary"},
]

const getColorClass = (color: string) => {
  switch(color) {
    case "primary": return "bg-primary-blue text-white"
    case "secondary": return "bg-accent-yellow text-foreground"
    case "accent": return "bg-accent-green text-white"
    default: return "bg-primary-blue text-white"
  }
}


export function CalendarSection() {
  return (
    <section id="calendario" className="py-24 bg-gradient-to-br from-muted via-white to-primary/5 relative overflow-hidden z-10">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">Calendario</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
              Proximos <span className="text-primary">Conciertos</span>
            </h2>
          </div>
          <Link 
            href="#calendario-completo"
            className="inline-flex items-center text-primary text-sm font-semibold tracking-wide uppercase hover:text-primary/80 transition-colors group"
          >
            Ver Calendario Completo
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured events */}
          <div className="lg:col-span-2 space-y-4">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`#evento-${event.id}`}
                className="group flex bg-white rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all hover-card-vibrant"
              >
                {/* Date badge */}
                <div className={`w-24 md:w-28 flex-shrink-0 ${getColorClass(event.color)} flex flex-col items-center justify-center py-6`}>
                  <span className="text-4xl md:text-5xl font-bold">{event.date.day}</span>
                  <span className="text-sm font-semibold tracking-wider uppercase opacity-80">{event.date.month}</span>
                </div>

                {/* Content */}
                <div className="flex-grow py-6 px-6 flex flex-col justify-center">
                  <span className="text-xs font-semibold tracking-wider uppercase text-primary mb-1">
                    {event.subtitle}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </span>
                  </div>
                </div>

                {/* Image */}
                <div className="w-32 md:w-40 flex-shrink-0 hidden md:block relative overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Sidebar - More events */}
          <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-6 text-white">
            <h3 className="font-serif text-2xl mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Mas Eventos
            </h3>
            
            <div className="space-y-4">
              {upcomingSmall.map((event, index) => (
                <Link 
                  key={index}
                  href="#"
                  className="block group pb-4 border-b border-white/20 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`px-2 py-0.5 ${event.color === "secondary" ? "bg-secondary text-foreground" : "bg-white/20"} rounded text-xs font-bold`}>
                      {event.date}
                    </span>
                    <span className="text-xs text-white/60 uppercase tracking-wider">{event.group}</span>
                  </div>
                  <h4 className="text-lg font-medium text-white group-hover:text-secondary transition-colors">
                    {event.title}
                  </h4>
                </Link>
              ))}
            </div>

            <Button 
              className="w-full mt-6 bg-white text-primary hover:bg-secondary hover:text-foreground font-semibold rounded-lg"
            >
              Ver Todos los Eventos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

