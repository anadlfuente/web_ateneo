"use client"

import { ChevronDown } from "lucide-react"

type Section = {
  nombre: string
  miembros: string[]
}

type Props = {
  titulo?: string
  secciones: Section[]
}

export default function Organigram({ titulo, secciones }: Props) {
  return (
    <div className="text-center">
      {titulo && (
        <h3 className="text-3xl md:text-4xl font-serif text-center mb-8">
          {titulo}
        </h3>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {secciones?.map((sec) => (
          <details
            key={sec.nombre}
            className="group rounded-md overflow-hidden shadow-sm"
          >
            <summary className="flex items-center justify-between px-4 py-2 bg-secondary text-white cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <span className="flex-1 text-center font-bold">
                {sec.nombre}{" "}
                <span className="text-white/70 font-normal">
                  ({sec.miembros.length})
                </span>
              </span>

              <ChevronDown className="w-4 h-4 text-white transition-transform group-open:rotate-180" />
            </summary>

            <ul className="bg-white px-4 py-3 space-y-1 text-black/80 text-center">
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