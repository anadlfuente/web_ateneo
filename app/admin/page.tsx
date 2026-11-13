// Inicio del panel: los apartados que se pueden gestionar.

import Link from "next/link"
import { Newspaper } from "lucide-react"

export default function AdminInicio() {
  return (
    <>
      <h1 className="mb-2 text-3xl font-bold">Panel de administración</h1>
      <p className="mb-8 text-muted-foreground">Elige qué quieres gestionar.</p>

      <ul className="grid gap-4 sm:grid-cols-2">
        <li>
          <Link
            href="/admin/noticias/"
            className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            <Newspaper className="h-6 w-6 shrink-0 text-accent" aria-hidden="true" />
            <span>
              <span className="block text-lg font-bold">Noticias</span>
              <span className="text-sm text-muted-foreground">Crear, editar y publicar noticias.</span>
            </span>
          </Link>
        </li>
      </ul>
    </>
  )
}