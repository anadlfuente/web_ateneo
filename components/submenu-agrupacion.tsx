"use client"

// Migas de pan + pestañas de las secciones de una agrupación
// (Historia · Directores · Organigrama). Marca sola la sección en la que se está.
// Se usa en el layout de cada agrupación, p. ej. app/banda/layout.tsx.

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MigasDePan } from "@/components/migas-de-pan"

export type SeccionAgrupacion = { nombre: string; href: string }

type Props = {
  agrupacion: string               // "Banda Sinfónica"
  secciones: SeccionAgrupacion[]   // la primera es la página principal de la agrupación
}

export function SubmenuAgrupacion({ agrupacion, secciones }: Props) {
  const ruta = usePathname().replace(/\/$/, "")   // por si la dirección acaba en "/"
  const actual = secciones.find((s) => s.href === ruta) ?? secciones[0]

  return (
    <>
      <MigasDePan
        items={[{ nombre: agrupacion, href: secciones[0].href }, { nombre: actual.nombre }]}
      />

      <nav aria-label={`Secciones de ${agrupacion}`} className="mt-5 border-b border-gray-200">
        <ul className="home-container flex gap-6 sm:gap-8">
          {secciones.map((s) => {
            const activa = s.href === actual.href
            return (
              <li key={s.href}>
                <Link
                  href={s.href}
                  aria-current={activa ? "page" : undefined}
                  className={`block border-b-[3px] py-3 font-semibold transition-colors ${
                    activa
                      ? "border-blue-border text-foreground font-extrabold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.nombre}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}