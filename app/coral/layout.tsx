// Marco común de las páginas de la Coral Cantares:
// cabecera, banner, migas + pestañas, llamada final y pie.
// Cada página (historia, director, organigrama) solo pone su contenido en {children}.

import type { ReactNode } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { RedesFlotante } from "@/components/redes-flotante"
import { SubmenuAgrupacion } from "@/components/submenu-agrupacion"

// Pestañas. Para añadir o quitar una sección, basta con tocar esta lista
// (y crear o borrar su carpeta en app/coral/).
const SECCIONES = [
  { nombre: "Historia", href: "/coral/historia" },
  { nombre: "Director", href: "/coral/director" },
  { nombre: "Organigrama", href: "/coral/organigrama" },
]

const HREF_CONTRATAR = "/contacto?asunto=contratar&agrupacion=coral#formulario"

export default function CoralLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />

      <main id="contenido">
        <PageHero imagen="/coral/coral-jovellanos.jpeg" altoMinimo="min-h-[60vh]">
          <h1 className="text-white">Coral Cantares</h1>
        </PageHero>

        <SubmenuAgrupacion agrupacion="Coral Cantares" secciones={SECCIONES} />

        {children}

        {/* Llamada a la acción final */}
        <section className="home-section" aria-labelledby="contratar-final">
          <div className="home-container">
            <div className="flex flex-col gap-6 rounded-2xl bg-primary-blue/15 p-6 md:flex-row md:items-center md:justify-between md:p-10">
              <div className="max-w-[60ch]">
                <h2 id="contratar-final" className="mb-2">
                  ¿Quieres contar con la Coral Cantares en tu evento?
                </h2>
                <p>Cuéntanos qué necesitas y te respondemos por correo.</p>
              </div>
              <Link href={HREF_CONTRATAR} className="cta-primary shrink-0">
                Contacta con la Coral Cantares
              </Link>
            </div>
          </div>
        </section>
      </main>

      <RedesFlotante agrupacion="coral" />
      <Footer />
    </>
  )
}