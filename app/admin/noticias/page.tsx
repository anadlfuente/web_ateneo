"use client"

// Panel: lista de todas las noticias (publicadas y borradores).

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, Pencil, Plus, Trash2 } from "lucide-react"
import { useSesionAdmin } from "@/components/admin/sesion-admin"
import { ErrorAdmin } from "@/lib/admin"
import {
  listarNoticiasAdmin,
  publicarNoticiaAdmin,
  borrarNoticiaAdmin,
  type NoticiaListaAdmin,
} from "@/lib/admin-noticias"
import { formatearFecha, urlNoticia } from "@/lib/noticias"

const claseBoton =
  "inline-flex min-h-11 items-center gap-2 rounded-lg border border-foreground/60 bg-white px-3 text-sm font-semibold " +
  "hover:bg-muted disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"

export default function AdminNoticiasPage() {
  const { sesionCaducada } = useSesionAdmin()
  const [noticias, setNoticias] = useState<NoticiaListaAdmin[] | null>(null)
  const [error, setError] = useState("")
  const [aviso, setAviso] = useState("")
  const [ocupada, setOcupada] = useState<number | null>(null)

  function tratarError(err: unknown) {
    if (err instanceof ErrorAdmin && err.estado === 401) {
      sesionCaducada()
      return
    }
    setError(err instanceof ErrorAdmin ? err.message : "Ha habido un error. Inténtalo de nuevo.")
  }

  async function cargar() {
    try {
      setNoticias(await listarNoticiasAdmin())
    } catch (err) {
      tratarError(err)
    }
  }

  useEffect(() => {
    cargar()
  }, [])

  async function cambiarPublicado(n: NoticiaListaAdmin) {
    setOcupada(n.id)
    setError("")
    setAviso("")
    try {
      await publicarNoticiaAdmin(n.id, !n.publicado)
      setAviso(n.publicado ? `«${n.titulo}» ha pasado a borrador.` : `«${n.titulo}» ya está publicada en la web.`)
      await cargar()
    } catch (err) {
      tratarError(err)
    } finally {
      setOcupada(null)
    }
  }

  async function borrar(n: NoticiaListaAdmin) {
    if (!window.confirm(`¿Seguro que quieres borrar «${n.titulo}»? No se puede deshacer.`)) return
    setOcupada(n.id)
    setError("")
    setAviso("")
    try {
      await borrarNoticiaAdmin(n.id)
      setAviso(`«${n.titulo}» se ha borrado.`)
      await cargar()
    } catch (err) {
      tratarError(err)
    } finally {
      setOcupada(null)
    }
  }

  return (
    <>
      <Link href="/admin/" className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Volver al panel
      </Link>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Noticias</h1>
        <Link
          href="/admin/noticias/editar/"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary-blue px-4 font-semibold text-foreground hover:bg-primary-blue/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
          Nueva noticia
        </Link>
      </div>

      {/* Avisos: los lectores de pantalla los leen al aparecer */}
      <div aria-live="polite">
        {aviso && <p className="mb-4 rounded-lg bg-white p-4 font-semibold">{aviso}</p>}
      </div>
      {error && (
        <p role="alert" className="mb-4 rounded-lg bg-white p-4 font-semibold text-error">{error}</p>
      )}

      {noticias === null && !error && <p role="status">Cargando noticias…</p>}

      {noticias?.length === 0 && (
        <p className="rounded-2xl bg-white p-6">Todavía no hay noticias. Pulsa «Nueva noticia» para crear la primera.</p>
      )}

      {noticias && noticias.length > 0 && (
        <ul className="space-y-3">
          {noticias.map((n) => (
            <li
              key={n.id}
              className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2 text-sm">
                  <span
                    className={
                      n.publicado
                        ? "rounded-full bg-accent-green px-2.5 py-0.5 font-semibold text-white"
                        : "rounded-full border border-foreground/60 px-2.5 py-0.5 font-semibold"
                    }
                  >
                    {n.publicado ? "Publicada" : "Borrador"}
                  </span>
                  <span className="text-muted-foreground">
                    {formatearFecha(n.fecha)} · {n.categoria}
                  </span>
                </div>
                <h2 className="text-lg font-bold">{n.titulo}</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link href={`/admin/noticias/editar/?id=${n.id}`} className={claseBoton}>
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                  Editar<span className="sr-only">: {n.titulo}</span>
                </Link>

                {n.publicado && (
                  <a href={urlNoticia(n.slug)} target="_blank" rel="noopener noreferrer" className={claseBoton}>
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    Ver<span className="sr-only"> «{n.titulo}» en la web (se abre en una pestaña nueva)</span>
                  </a>
                )}

                <button type="button" onClick={() => cambiarPublicado(n)} disabled={ocupada === n.id} className={claseBoton}>
                  {n.publicado ? "Pasar a borrador" : "Publicar"}
                  <span className="sr-only">: {n.titulo}</span>
                </button>

                <button
                  type="button"
                  onClick={() => borrar(n)}
                  disabled={ocupada === n.id}
                  className={`${claseBoton} border-error text-error`}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Borrar<span className="sr-only">: {n.titulo}</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}