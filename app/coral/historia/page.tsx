// Coral Cantares · Historia (de momento, en construcción).
// El banner, las pestañas y la llamada final están en app/coral/layout.tsx.

import type { Metadata } from "next"
import BloqueHistoria from "@/components/text-design"
import TextoRico from "@/components/text-bold"
import { coral } from "@/data/coral.js"
import { fondoSeccion } from "@/lib/fondos"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Coral Cantares",
  description: "Historia de la Coral Cantares del Ateneo Musical de Mieres.",
}

const HREF_UNIRSE = "/contacto?asunto=coral#contacto"

export default function CoralHistoriaPage() {
  return (
    <>
      {/* Introducción + invitación a unirse */}
      <section className="home-section">
        <div className="home-container grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto_20rem] lg:items-start">
          <div className="max-w-[68ch] space-y-5 text-base leading-relaxed text-foreground md:text-lg [&>p:first-child]:text-xl [&>p:first-child]:font-medium">
            {coral.introduccion.map((p, i) => (
              <p key={i}>
                <TextoRico texto={p} />
              </p>
            ))}
          </div>

          <img
            src={coral.logo.imagen}
            alt={coral.logo.alt}
            className="mx-auto w-28 lg:w-60 lg:self-center"
          />
          <aside aria-labelledby="unirse-titulo" className="home-card order-first p-6 lg:order-none">
            <h2 id="unirse-titulo" className="mb-3 text-xl!">
              ¿Te gusta cantar?
            </h2>
            <p className="mb-5">
              La Coral Cantares está abierta a nuevas voces. Si te apetece formar parte de ella,
              puedes escribir a través del formulario de contacto.
            </p>
            <Link href={HREF_UNIRSE} className="cta-primary w-full">
              Quiero unirme a la coral
            </Link>
          </aside>
        </div>
      </section>

      {/* Bloques de historia, con fondos alternos */}
      {coral.bloques.map((bloque, i) => (
        <section key={bloque.titulo} className={fondoSeccion(i)}>
          <div className="home-container">
            <BloqueHistoria {...bloque} invertido={i % 2 === 1} />
          </div>
        </section>
      ))}
    </>
  )
}