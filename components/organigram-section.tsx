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
  console.log("SECCIONES:", secciones)
    return (
    <div className="max-w-5xl mx-auto mt-12 text-center">
      {titulo && (
        <h3 className="text-2xl lg:text-5xl font-serif text-black mb-10">
          {titulo}
        </h3>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {secciones?.map((sec) => (
          <details
            key={sec.nombre}
            className="group bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-md transition hover:bg-white/15 text-center"
          >
            <summary className="w-full flex items-center justify-between text-center">
              <span className="flex-1 text-center font-bold">
                {sec.nombre}{" "}
                <span className="text-white/60 font-normal">
                  ({sec.miembros.length})
                </span>
              </span>

              <ChevronDown className="w-4 h-4 text-black transition-transform group-open:rotate-180" />
            </summary>

            <ul className="mt-3 space-y-1 text-black/80 text-m text-center">
              {sec.miembros.map((m) => (
                <li key={m} className="pl-2 border-l border-white/20">
                  {m}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  )
}