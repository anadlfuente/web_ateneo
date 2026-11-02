// Coral Cantares · Director.
// El banner, las pestañas y la llamada final están en app/coral/layout.tsx.

import type { Metadata } from "next"
import BloqueHistoria from "@/components/text-design"
import { coralDirector } from "@/data/director-coral"
import { fondoSeccion } from "@/lib/fondos"

export const metadata: Metadata = {
  title: "Director · Coral Cantares",
  description: "Director de la Coral Cantares del Ateneo Musical de Mieres.",
}

export default function CoralDirectorPage() {
  return (
    <>
      {coralDirector.bloques.map((bloque, i) => (
        <section key={bloque.titulo} className={`${fondoSeccion(i + 1)} ${i === 0 ? "pt-10!" : ""}`}>
          <div className="home-container">
            <BloqueHistoria {...bloque} invertido={i % 2 === 1} />
          </div>
        </section>
      ))}
    </>
  )
}