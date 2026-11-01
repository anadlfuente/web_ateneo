// Migas de pan: muestran dónde está la página dentro de la web.
// Uso:
//   <MigasDePan items={[{ nombre: "Banda Sinfónica", href: "/banda/historia" }, { nombre: "Directores" }]} />
// - "Inicio" se añade solo, no hace falta ponerlo.
// - El último elemento es la página actual: no lleva enlace (no hace falta poner href).

import Link from "next/link"

interface Miga {
  nombre: string
  href?: string
}

interface MigasDePanProps {
  items: Miga[]
}

export function MigasDePan({ items }: MigasDePanProps) {
  const migas: Miga[] = [{ nombre: "Inicio", href: "/" }, ...items]

  return (
    <nav aria-label="Migas de pan" className="home-container pt-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {migas.map((miga, i) => {
          const esUltima = i === migas.length - 1
          return (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {esUltima || !miga.href ? (
                <span aria-current={esUltima ? "page" : undefined}>{miga.nombre}</span>
              ) : (
                <Link href={miga.href} className="text-link">
                  {miga.nombre}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}