// Banda Sinfónica · Historia: introducción + bloques de historia.
// El banner, las pestañas y la llamada final están en app/banda/layout.tsx.

import type { Metadata } from "next"
import BloqueHistoria from "@/components/text-design"
import TextoRico from "@/components/text-bold"
import { banda } from "@/data/banda.js"
import { fondoSeccion } from "@/lib/fondos"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Banda Sinfónica",
  description: "Historia de la Banda Sinfónica del Ateneo Musical de Mieres.",
}

const HREF_UNIRSE = "/contacto?asunto=banda#contacto"

export default function BandaHistoriaPage() {
  return (
    <>
      {/* Introducción + invitación a unirse */}
      <section className="home-section">
        <div className="home-container grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <div className="max-w-[68ch] space-y-5 text-base leading-relaxed text-foreground md:text-lg [&>p:first-child]:text-xl [&>p:first-child]:font-medium">
            {banda.introduccion.map((p, i) => (
              <p key={i}>
                <TextoRico texto={p} />
              </p>
            ))}
          </div>

          <aside aria-labelledby="unirse-titulo" className="home-card order-first p-6 lg:order-none">
            <h2 id="unirse-titulo" className="mb-3 text-xl!">
              ¿Tocas un instrumento?
            </h2>
            <p className="mb-5">
              La Banda Sinfónica está abierta a nuevos músicos. Si te apetece formar parte de ella,
              puedes escribir a través del formulario de contacto.
            </p>
            <Link href={HREF_UNIRSE} className="cta-primary w-full">
              Quiero unirme a la banda
            </Link>
          </aside>
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