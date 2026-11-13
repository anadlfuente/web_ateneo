"use client"

// Pantalla de acceso al panel.

import { useState, type FormEvent } from "react"
import { iniciarSesion, ErrorAdmin } from "@/lib/admin"

const claseCampo =
  "w-full min-h-11 rounded-lg border border-foreground/60 bg-white px-3 py-2 text-foreground " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"

export function FormularioLogin({ alEntrar }: { alEntrar: () => void }) {
  const [usuario, setUsuario] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [error, setError] = useState("")
  const [enviando, setEnviando] = useState(false)

  async function enviar(e: FormEvent) {
    e.preventDefault()
    if (!usuario.trim() || !contrasena) {
      setError("Escribe el usuario y la contraseña.")
      return
    }
    setEnviando(true)
    setError("")
    try {
      await iniciarSesion(usuario.trim(), contrasena)
      alEntrar()
    } catch (err) {
      setError(err instanceof ErrorAdmin ? err.message : "No se ha podido iniciar sesión.")
      setContrasena("")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="min-h-screen grid place-items-center bg-muted/40 px-6 py-12">
      <form onSubmit={enviar} noValidate className="w-full max-w-sm space-y-5 rounded-2xl bg-white p-8 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Panel del Ateneo</h1>
          <p className="mt-1 text-sm text-muted-foreground">Acceso solo para las personas encargadas de la web.</p>
        </div>

        <div>
          <label htmlFor="usuario" className="mb-1 block font-semibold">Usuario</label>
          <input
            id="usuario"
            name="usuario"
            autoComplete="username"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            aria-invalid={Boolean(error) || undefined}
            className={claseCampo}
            required
          />
        </div>

        <div>
          <label htmlFor="contrasena" className="mb-1 block font-semibold">Contraseña</label>
          <input
            id="contrasena"
            name="contrasena"
            type="password"
            autoComplete="current-password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            aria-invalid={Boolean(error) || undefined}
            className={claseCampo}
            required
          />
        </div>

        {error && (
          <p role="alert" className="text-sm font-semibold text-error">{error}</p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="w-full min-h-11 rounded-lg bg-primary-blue px-4 font-semibold text-foreground hover:bg-primary-blue/85 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          {enviando ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </main>
  )
}