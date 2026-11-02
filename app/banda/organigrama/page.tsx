// Banda Sinfónica · Organigrama.
// El banner, las pestañas y la llamada final están en app/banda/layout.tsx.

import type { Metadata } from "next"
import Organigram from "@/components/organigram-section"
import { banda } from "@/data/banda.js"

export const metadata: Metadata = {
  title: "Organigrama · Banda Sinfónica",
  description: "Organigrama de la Banda Sinfónica del Ateneo Musical de Mieres.",
}

export default function BandaOrganigramaPage() {
  return (
    <section className="home-section pt-10!">
      <div className="home-container">
        <Organigram
          titulo="Músicos de la Banda Sinfónica"
          descripcion="Pulsa en cada instrumento para ver quién lo toca."
          secciones={banda.organigrama}
        />
      </div>
    </section>
  )
}