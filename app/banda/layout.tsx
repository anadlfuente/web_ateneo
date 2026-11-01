// Marco común de las páginas de la Banda Sinfónica:
// cabecera, banner, migas + pestañas, llamada final y pie.
// Cada página (historia, directores, organigrama) solo pone su contenido en {children}.

import type { ReactNode } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { RedesFlotante } from "@/components/redes-flotante"
import { SubmenuAgrupacion } from "@/components/submenu-agrupacion"
import { banda } from "@/data/banda.js"

// Pestañas. Para añadir o quitar una sección, basta con tocar esta lista
// (y crear o borrar su carpeta en app/banda/).
const SECCIONES = [
  { nombre: "Historia", href: "/banda/historia" },
  { nombre: "Directores", href: "/banda/directores" },
  { nombre: "Organigrama", href: "/banda/organigrama" },
]

const HREF_CONTRATAR = "/contacto?asunto=contratar&agrupacion=banda#formulario"

export default function BandaLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />

      <main id="contenido">
        <PageHero imagen={banda.banner.imagen} altoMinimo="min-h-[60vh]">
          <div className="flex flex-col gap-3">
            <h1 className="text-white">{banda.banner.titulo}</h1>
            <p className="font-serif max-w-3xl text-white">{banda.banner.subtitulo}</p>
          </div>
        </PageHero>

        <SubmenuAgrupacion agrupacion="Banda Sinfónica" secciones={SECCIONES} />

        {children}

        {/* Llamada a la acción final */}
        <section className="home-section" aria-labelledby="contratar-final">
          <div className="home-container">
            <div className="flex flex-col gap-6 rounded-2xl bg-primary-blue/15 p-6 md:flex-row md:items-center md:justify-between md:p-10">
              <div className="max-w-[60ch]">
                <h2 id="contratar-final" className="mb-2">
                  ¿Quieres contar con la Banda Sinfónica en tu evento?
                </h2>
                <p>Cuéntanos qué necesitas y te respondemos por correo.</p>
              </div>
              <Link href={HREF_CONTRATAR} className="cta-primary shrink-0">
                Contratar a la Banda Sinfónica
              </Link>
            </div>
          </div>
        </section>
      </main>

      <RedesFlotante agrupacion="banda" />
      <Footer />
    </>
  )
}