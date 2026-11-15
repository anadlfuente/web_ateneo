// Coral Cantares · Organigrama (de momento, en construcción).
// El banner, las pestañas y la llamada final están en app/coral/layout.tsx.

import type { Metadata } from "next"
import OrganigramaDB from "@/components/organigrama-db"

export const metadata: Metadata = {
  title: 'Organigrama · Coral Cantares | Ateneo Musical de Mieres',
  description: 'Voces de la Coral Cantares del Ateneo Musical de Mieres repartidas por cuerdas. Coro aficionado a cuatro voces con ensayos los lunes a las 20:00.',
  alternates: { canonical: '/coral/organigrama/' },
};

export default function CoralOrganigramaPage() {
  return (
    <section className="home-section pt-10!">
      <div className="home-container">
        <OrganigramaDB
          agrupacion="coral"
          titulo="Voces de la Coral Cantares"
          descripcion="Pulsa en cada cuerda para ver quién la forma."
          unidad="voces"
        />
      </div>
    </section>
  )
}