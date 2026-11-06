"use client"

import { ChevronDown } from "lucide-react"

type Section = {
  nombre: string
  miembros: string[]
}

type Props = {
  titulo?: string
  descripcion?: string
  secciones: Section[]
  unidad?: string
}

export default function Organigram({ titulo, descripcion, secciones, unidad = "músicos" }: Props) {
  return (
    <div className="text-center">
      {titulo && (
        <div className="mb-8">
          <h2 className={descripcion ? "mb-2" : ""}>{titulo}</h2>
          {descripcion && <p className="text-muted-foreground">{descripcion}</p>}
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {secciones?.map((sec) => (
          <details
            key={sec.nombre}
            className="group overflow-hidden rounded-xl border-t-[5px] border-blue-border bg-white shadow-sm"
          >
            {/* Cabecera: azul clarito, con línea fina debajo solo cuando está abierta */}
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 bg-primary-blue/15 px-4 py-3 font-bold text-foreground group-open:border-b group-open:border-blue-border/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground [&::-webkit-details-marker]:hidden">
              <span className="flex-1 text-left">{sec.nombre}</span>

              <span className="rounded-full bg-primary-blue px-2.5 text-sm font-extrabold text-foreground">
                {sec.miembros.length}
                <span className="sr-only"> {unidad}</span>
                </span>

              <ChevronDown
                className="h-4 w-4 text-foreground transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>

            {/* Nombres sobre blanco */}
            <ul className="space-y-1 bg-white px-4 py-3 text-left text-foreground/80">
              {sec.miembros.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  )
}