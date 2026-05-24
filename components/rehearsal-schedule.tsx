"use client"

import Link from "next/link"
import { ArrowRight, Clock} from "lucide-react"

type Ensayo = {
  agrupacion: string
  dia: string
  hora: string
  color: string
  icon: React.ElementType
}

type Props = {
  ensayos: Ensayo[]
}


export function RehearsalSection({ ensayos }: Props) {
  return (
    <div className="max-w-6xl mx-auto p-8 lg:p-12 rounded-3xl bg-primary-blue/20 backdrop-blur-md border border-white/20 shadow-xl">

  {/* TOP TEXT */}
  <div className="mb-8">
    <h3 className="font-serif text-2xl lg:text-3xl text-white mb-2">
      Horarios de Ensayo
    </h3>

    <p className="text-white/80 max-w-2xl">
      ¿Pensando en unirte? Aquí tienes los horarios de cada agrupación.
    </p>
  </div>

  {/* CARDS */}
  <div className="grid sm:grid-cols-2 gap-4">
    {ensayos.map((ensayo) => {

      return (
        <div
          key={ensayo.agrupacion}
          className="p-5 rounded-xl hover:scale-[1.03] transition-transform flex justify-between items-start gap-4"
          style={{ backgroundColor: ensayo.color }}
        >

          {/* LEFT CONTENT */}
          <div>
            <h4
              className="font-bold mb-1"
              style={{
                color:
                  ensayo.color === "#F6F61B"
                    ? "#302B27"
                    : "#FFFFFF",
              }}
            >
              {ensayo.agrupacion}
            </h4>

            <p
              className="font-serif text-lg"
              style={{
                color:
                  ensayo.color === "#F6F61B"
                    ? "#302B27"
                    : "#FFFFFF",
              }}
            >
              {ensayo.dia}
            </p>

            <p
              className="text-sm flex items-center gap-1.5 mt-1"
              style={{
                color:
                  ensayo.color === "#F6F61B"
                    ? "rgba(48,43,39,0.7)"
                    : "rgba(255,255,255,0.7)",
              }}
            >
              <Clock className="w-3.5 h-3.5" />
              {ensayo.hora}
            </p>
          </div>

          {/* RIGHT ICON */}
          <div
            className="shrink-0 opacity-80"
            style={{
              color:
                ensayo.color === "#F6F61B"
                  ? "#302B27"
                  : "#FFFFFF",
            }}
          >
            <ensayo.icon className="w-6 h-6" />
          </div>

        </div>
      )
    })}
  </div>

  {/* BUTTON */}
  <div className="flex justify-end mt-8">
    <Link
      href="/contacto"
      className="inline-flex items-center gap-2 px-6 py-3 bg-[#F6F61B] text-[#302B27] font-bold rounded-full hover:bg-white transition-all"
    >
      Quiero unirme
      <ArrowRight className="w-4 h-4" />
    </Link>
  </div>

</div>
  )
}