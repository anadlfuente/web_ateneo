"use client"

// Panel: lista de eventos. Por defecto, los próximos; se puede ver también los pasados
// y filtrar por agrupación.

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, Eye, Pencil, Plus, Trash2 } from "lucide-react"
import { useSesionAdmin } from "@/components/admin/sesion-admin"
import { claseBotonPrincipal, claseBotonSecundario, claseCampo } from "@/components/admin/campos"
import { ErrorAdmin } from "@/lib/admin"
import { listarEventosAdmin, publicarEventoAdmin, borrarEventoAdmin, type EventoGuardado } from "@/lib/admin-eventos"
import { AGRUPACIONES, TIPOS, aISO, fechaLarga, type AgrupacionId } from "@/lib/eventos"

const capitalizar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1)

export default function AdminEventosPage() {
  const { sesionCaducada } = useSesionAdmin()
  const [eventos, setEventos] = useState<EventoGuardado[] | null>(null)
  const [vista, setVista] = useState<"proximos" | "pasados">("proximos")
  const [agrupacion, setAgrupacion] = useState<AgrupacionId | "">("")
  const [error, setError] = useState("")
  const [aviso, setAviso] = useState("")
  const [ocupado, setOcupado] = useState<number | null>(null)

  function tratarError(err: unknown) {
    if (err instanceof ErrorAdmin && err.estado === 401) {
      sesionCaducada()
      return
    }
    setError(err instanceof ErrorAdmin ? err.message : "Ha habido un error. Inténtalo de nuevo.")
  }

  async function cargar() {
    try {
      setEventos(await listarEventosAdmin())
    } catch (err) {
      tratarError(err)
    }
  }

  useEffect(() => {
    cargar()
  }, [])

  async function cambiarPublicado(ev: EventoGuardado) {
    setOcupado(ev.id)
    setError("")
    setAviso("")
    try {
      await publicarEventoAdmin(ev.id, !ev.publicado)
      setAviso(ev.publicado ? `«${ev.titulo}» ha pasado a borrador.` : `«${ev.titulo}» ya está publicado en el calendario.`)
      await cargar()
    } catch (err) {
      tratarError(err)
    } finally {
      setOcupado(null)
    }
  }

  async function borrar(ev: EventoGuardado) {
    if (!window.confirm(`¿Seguro que quieres borrar «${ev.titulo}»? No se puede deshacer.`)) return
    setOcupado(ev.id)
    setError("")
    setAviso("")
    try {
      await borrarEventoAdmin(ev.id)
      setAviso(`«${ev.titulo}» se ha borrado.`)
      await cargar()
    } catch (err) {
      tratarError(err)
    } finally {
      setOcupado(null)
    }
  }

  // Próximos: del más cercano al más lejano. Pasados: del más reciente al más antiguo.
  const hoy = aISO(new Date())
  const visibles = (eventos ?? [])
    .filter((ev) => (vista === "proximos" ? ev.fecha >= hoy : ev.fecha < hoy))
    .filter((ev) => !agrupacion || ev.agrupaciones.includes(agrupacion))
    .sort((a, b) => {
      const orden = (a.fecha + a.hora).localeCompare(b.fecha + b.hora)
      return vista === "proximos" ? orden : -orden
    })

  return (
    <>
      <Link href="/admin/" className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Volver al panel
      </Link>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Eventos</h1>
        <Link href="/admin/eventos/editar/" className={claseBotonPrincipal}>
          <Plus className="h-5 w-5" aria-hidden="true" />
          Nuevo evento
        </Link>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex flex-wrap items-end gap-4">
        <div role="group" aria-label="Qué eventos mostrar" className="flex gap-2">
          <button
            type="button"
            aria-pressed={vista === "proximos"}
            onClick={() => setVista("proximos")}
            className={`${claseBotonSecundario} aria-pressed:bg-foreground aria-pressed:text-white`}
          >
            Próximos
          </button>
          <button
            type="button"
            aria-pressed={vista === "pasados"}
            onClick={() => setVista("pasados")}
            className={`${claseBotonSecundario} aria-pressed:bg-foreground aria-pressed:text-white`}
          >
            Pasados
          </button>
        </div>

        <div>
          <label htmlFor="filtro-agrupacion" className="mb-1 block text-sm font-semibold">Agrupación</label>
          <select
            id="filtro-agrupacion"
            value={agrupacion}
            onChange={(e) => setAgrupacion(e.target.value as AgrupacionId | "")}
            className={claseCampo}
          >
            <option value="">Todas</option>
            {(Object.keys(AGRUPACIONES) as AgrupacionId[]).map((a) => (
              <option key={a} value={a}>{AGRUPACIONES[a].nombre}</option>
            ))}
          </select>
        </div>
      </div>

      <div aria-live="polite">
        {aviso && <p className="mb-4 rounded-lg bg-white p-4 font-semibold">{aviso}</p>}
        {eventos && (
          <p className="mb-4 text-sm text-muted-foreground">
            {visibles.length === 1 ? "1 evento" : `${visibles.length} eventos`}
          </p>
        )}
      </div>
      {error && <p role="alert" className="mb-4 rounded-lg bg-white p-4 font-semibold text-error">{error}</p>}

      {eventos === null && !error && <p role="status">Cargando eventos…</p>}

      {eventos && visibles.length === 0 && (
        <p className="rounded-2xl bg-white p-6">
          {vista === "proximos" ? "No hay próximos eventos" : "No hay eventos pasados"}
          {agrupacion ? ` de ${AGRUPACIONES[agrupacion].nombre}` : ""}.
        </p>
      )}

      {visibles.length > 0 && (
        <ul className="space-y-3">
          {visibles.map((ev) => (
            <li
              key={ev.id}
              className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2 text-sm">
                  <span
                    className={
                      ev.publicado
                        ? "rounded-full bg-accent-green px-2.5 py-0.5 font-semibold text-white"
                        : "rounded-full border border-foreground/60 px-2.5 py-0.5 font-semibold"
                    }
                  >
                    {ev.publicado ? "Publicado" : "Borrador"}
                  </span>
                  {ev.destacado && (
                    <span className="rounded-full bg-accent-yellow px-2.5 py-0.5 font-semibold text-foreground">Destacado</span>
                  )}
                  <span className="font-semibold">
                    {capitalizar(fechaLarga(ev.fecha))}
                    {ev.hora && ` · ${ev.hora} h`}
                  </span>
                </div>
                <h2 className="text-lg font-bold">{ev.titulo}</h2>
                <p className="text-sm text-muted-foreground">
                  {[
                    ev.tipo ? TIPOS[ev.tipo] : "",
                    ev.lugar,
                    ev.agrupaciones.map((a) => AGRUPACIONES[a]?.nombre ?? a).join(", "),
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link href={`/admin/eventos/editar/?id=${ev.id}`} className={claseBotonSecundario}>
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                  Editar<span className="sr-only">: {ev.titulo}</span>
                </Link>

                <Link href={`/admin/eventos/editar/?duplicar=${ev.id}`} className={claseBotonSecundario}>
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  Duplicar<span className="sr-only">: {ev.titulo}</span>
                </Link>

                {ev.publicado && (
                  <a href={`/evento/?id=${ev.id}`} target="_blank" rel="noopener noreferrer" className={claseBotonSecundario}>
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    Ver<span className="sr-only"> «{ev.titulo}» en la web (se abre en una pestaña nueva)</span>
                  </a>
                )}

                <button type="button" onClick={() => cambiarPublicado(ev)} disabled={ocupado === ev.id} className={claseBotonSecundario}>
                  {ev.publicado ? "Pasar a borrador" : "Publicar"}
                  <span className="sr-only">: {ev.titulo}</span>
                </button>

                <button
                  type="button"
                  onClick={() => borrar(ev)}
                  disabled={ocupado === ev.id}
                  className={`${claseBotonSecundario} border-error text-error`}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Borrar<span className="sr-only">: {ev.titulo}</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}