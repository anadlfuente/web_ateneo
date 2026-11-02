"use client"

import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import { type AgrupacionId, infoAgrupacion } from "@/lib/eventos"

export type Ensayo = {
  agrupacion: AgrupacionId   // "banda", "coral"... (nombre y color salen de lib/eventos.ts)
  dias: string               // "Lunes y miércoles"
  hora: string               // "20:00 – 22:00"
  lugar?: string             // opcional: "Sede del Ateneo"
  href: string               // página de historia de la agrupación
  icon: React.ElementType
}

type Props = {
  ensayos: Ensayo[]
}
export function RehearsalSection({ ensayos }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="rounded-3xl bg-muted/30 p-8 lg:p-12 xl:-mx-12">
        {/* Texto superior */}
        <div className="mb-8">
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-2">
            Horarios de ensayo
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            ¿Pensando en unirte? Estos son los horarios de cada agrupación.
            Pulsa en una para conocer su historia.
          </p>
        </div>

        {/* Tarjetas */}
        <ul className="grid sm:grid-cols-2 gap-4 lg:gap-6">
          {ensayos.map((ensayo) => {
            const info = infoAgrupacion(ensayo.agrupacion)
            const Icono = ensayo.icon
            return (
              <li key={ensayo.agrupacion}>
                <Link
                  href={ensayo.href}
                  className="
                    group flex h-full items-start gap-4 p-5 lg:p-6 rounded-2xl bg-white
                    border border-black/5
                    hover:shadow-md hover:-translate-y-0.5 hover:border-primary-blue/30
                    motion-reduce:hover:translate-y-0
                    transition-all
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2
                  "
                >
                  {/* Icono con el color de la agrupación */}
                  <span
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${info.badge}`}
                    aria-hidden="true"
                  >
                    <Icono className="w-6 h-6" />
                  </span>

                  <div className="flex-grow">
                    <h3 className="font-semibold text-foreground">{info.nombre}</h3>
                    <p className="font-serif text-lg text-foreground mt-1">{ensayo.dias}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                      {ensayo.hora}
                      {ensayo.lugar ? ` · ${ensayo.lugar}` : ""}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-blue mt-3 group-hover:underline underline-offset-4">
                      Conoce su historia
                      <ArrowRight
                        className="w-4 h-4 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0 transition-transform"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Botón */}
        <div className="flex justify-center mt-10">
          <Link
            href="/contacto"
            className="
              inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-blue text-white font-bold
              shadow-sm hover:shadow-md hover:brightness-90 transition-all
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2
            "
          >
            Quiero unirme
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}