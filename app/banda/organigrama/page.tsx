// Banda Sinfónica · Organigrama.
// El banner, las pestañas y la llamada final están en app/banda/layout.tsx.

import type { Metadata } from "next"
import OrganigramaDB from "@/components/organigrama-db"

export const metadata: Metadata = {
  title: 'Organigrama · Banda Sinfónica | Ateneo Musical de Mieres',
  description: 'Músicos de la Banda Sinfónica del Ateneo Musical de Mieres organizados por secciones instrumentales. Ensayos los sábados por la mañana en Mieres.',
  alternates: { canonical: '/banda/organigrama/' },
};

export default function BandaOrganigramaPage() {
  return (
    <section className="home-section pt-10!">
      <div className="home-container">
        <OrganigramaDB
          agrupacion="banda"
          titulo="Músicos de la Banda Sinfónica"
          descripcion="Pulsa en cada instrumento para ver quién lo toca."
        />
      </div>
    </section>
  )
}