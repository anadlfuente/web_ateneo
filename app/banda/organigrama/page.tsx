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
    <section className="home-section">
      <div className="home-container">
        <Organigram titulo="Organigrama" secciones={banda.organigrama} />
      </div>
    </section>
  )
}