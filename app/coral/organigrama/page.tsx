// Coral Cantares · Organigrama (de momento, en construcción).
// El banner, las pestañas y la llamada final están en app/coral/layout.tsx.

import type { Metadata } from "next"
import Organigram from "@/components/organigram-section"
import { coral } from "@/data/coral.js"

export const metadata: Metadata = {
  title: "Organigrama · Coral Cantares",
  description: "Organigrama de la Coral Cantares del Ateneo Musical de Mieres.",
}

export default function CoralOrganigramaPage() {
  return (
    <section className="home-section pt-10!">
      <div className="home-container">
        <Organigram
          titulo="Voces de la Coral Cantares"
          descripcion="Pulsa en cada cuerda para ver quién la forma."
          secciones={coral.organigrama}
          unidad="voces"
        />
      </div>
    </section>
  )
}