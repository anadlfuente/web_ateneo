// Banda Sinfónica · Directores.
// El banner, las pestañas y la llamada final están en app/banda/layout.tsx.

import type { Metadata } from "next"
import BloqueHistoria from "@/components/text-design"
import { directores } from "@/data/directores-banda"
import { fondoSeccion } from "@/lib/fondos"

export const metadata: Metadata = {
  title: "Directores · Banda Sinfónica",
  description: "Directores de la Banda Sinfónica del Ateneo Musical de Mieres.",
}

export default function BandaDirectoresPage() {
  return (
    <>
      {directores.bloques.map((bloque, i) => (
        <section key={bloque.titulo} className={fondoSeccion(i + 1)}>
          <div className="home-container">
            <BloqueHistoria {...bloque} invertido={i % 2 === 1} />
          </div>
        </section>
      ))}
    </>
  )
}