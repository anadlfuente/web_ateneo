// Banda Sinfónica · Historia: introducción + bloques de historia.
// El banner, las pestañas y la llamada final están en app/banda/layout.tsx.

import type { Metadata } from "next"
import BloqueHistoria from "@/components/text-design"
import TextoRico from "@/components/text-bold"
import { banda } from "@/data/banda.js"
import { fondoSeccion } from "@/lib/fondos"

export const metadata: Metadata = {
  title: "Banda Sinfónica",
  description: "Historia de la Banda Sinfónica del Ateneo Musical de Mieres.",
}

export default function BandaHistoriaPage() {
  return (
    <>
      {/* Introducción */}
      <section className="home-section">
        <div className="home-container">
          <div className="max-w-[68ch] space-y-5 text-base leading-relaxed text-foreground md:text-lg [&>p:first-child]:text-xl [&>p:first-child]:font-medium">
            {banda.introduccion.map((p, i) => (
              <p key={i}>
                <TextoRico texto={p} />
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Bloques de historia, con fondos alternos */}
      {banda.bloques.map((bloque, i) => (
        <section key={bloque.titulo} className={fondoSeccion(i)}>
          <div className="home-container">
            <BloqueHistoria {...bloque} invertido={i % 2 === 1} />
          </div>
        </section>
      ))}
    </>
  )
}