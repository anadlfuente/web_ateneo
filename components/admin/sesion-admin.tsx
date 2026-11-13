"use client"

// Envuelve todas las páginas de /admin: si no hay sesión, enseña el login;
// si la hay, enseña la barra del panel y la página.

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import { comprobarSesion, cerrarSesion } from "@/lib/admin"
import { FormularioLogin } from "@/components/admin/formulario-login"

type Estado = "comprobando" | "fuera" | "dentro" | "error"

// Las páginas del panel usan sesionCaducada() cuando el PHP responde 401
const ContextoSesion = createContext<{ sesionCaducada: () => void }>({ sesionCaducada: () => {} })
export const useSesionAdmin = () => useContext(ContextoSesion)

export function SesionAdmin({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<Estado>("comprobando")

  useEffect(() => {
    comprobarSesion()
      .then((ok) => setEstado(ok ? "dentro" : "fuera"))
      .catch(() => setEstado("error"))
  }, [])

  async function salir() {
    try {
      await cerrarSesion()
    } finally {
      setEstado("fuera")
    }
  }

  if (estado === "comprobando") {
    return (
      <main className="min-h-screen grid place-items-center">
        <p role="status" aria-live="polite">Cargando…</p>
      </main>
    )
  }

  if (estado === "error") {
    return (
      <main className="min-h-screen grid place-items-center px-6">
        <p role="alert">No se ha podido conectar con el servidor. Inténtalo de nuevo más tarde.</p>
      </main>
    )
  }

  if (estado === "fuera") {
    return <FormularioLogin alEntrar={() => setEstado("dentro")} />
  }

  return (
    <ContextoSesion.Provider value={{ sesionCaducada: () => setEstado("fuera") }}>
      <div className="min-h-screen bg-muted/40">
        <header className="border-b border-border bg-white">
          <div className="mx-auto flex min-h-16 max-w-5xl items-center justify-between gap-4 px-6">
            <Link href="/admin/" className="font-bold text-foreground">Panel del Ateneo</Link>
            <div className="flex items-center gap-4">
              <a href="/" target="_blank" rel="noopener noreferrer" className="text-sm underline">
                Ver la web<span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
              <button
                type="button"
                onClick={salir}
                className="min-h-11 rounded-lg border border-foreground/60 px-4 text-sm font-semibold hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </header>
        <main id="contenido" className="mx-auto max-w-5xl px-6 py-10">{children}</main>
      </div>
    </ContextoSesion.Provider>
  )
}