"use client"

// Panel: crear, editar o duplicar un evento.
//   /admin/eventos/editar/             → evento nuevo
//   /admin/eventos/editar/?id=5        → editar el evento 5
//   /admin/eventos/editar/?duplicar=5  → evento nuevo, copiado del 5
//
// Si la sesión caduca al guardar, los cambios se guardan en el navegador y se
// recuperan solos al volver a entrar.

import { Suspense, useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useSesionAdmin } from "@/components/admin/sesion-admin"
import { Campo, claseCampo, claseBotonPrincipal, claseBotonSecundario } from "@/components/admin/campos"
import { CampoFoto } from "@/components/admin/campo-foto"
import { ErrorAdmin } from "@/lib/admin"
import { leerEventoAdmin, guardarEventoAdmin, type EventoAdmin } from "@/lib/admin-eventos"
import { AGRUPACIONES, TIPOS, aISO, type AgrupacionId, type TipoId } from "@/lib/eventos"

const EVENTO_VACIO: EventoAdmin = {
  titulo: "", agrupaciones: [], tipo: "concierto", fecha: "", hora: "", lugar: "",
  enlaceMaps: "", descripcion: "", imagen: "", enlaceEntradas: "", destacado: false, publicado: false,
}

const claveCopia = (id?: number) => `ateneo-evento-sin-guardar-${id ?? "nuevo"}`

function Editor() {
  const params = useSearchParams()
  const idParam = Number(params.get("id")) || undefined
  const duplicarDe = Number(params.get("duplicar")) || undefined
  const { sesionCaducada } = useSesionAdmin()

  const hayQueCargar = Boolean(idParam || duplicarDe)
  const [evento, setEvento] = useState<EventoAdmin | null>(hayQueCargar ? null : { ...EVENTO_VACIO, fecha: aISO(new Date()) })
  const [estado, setEstado] = useState<"cargando" | "listo" | "no-existe" | "error">(hayQueCargar ? "cargando" : "listo")
  const [errores, setErrores] = useState<Record<string, string>>({})
  const [mensajeError, setMensajeError] = useState("")
  const [aviso, setAviso] = useState("")
  const [guardando, setGuardando] = useState(false)
  const [sucio, setSucio] = useState(false)
  const cajaErrores = useRef<HTMLDivElement>(null)

  function recuperarCopia(id?: number) {
    try {
      const copia = sessionStorage.getItem(claveCopia(id))
      if (copia) {
        setEvento(JSON.parse(copia))
        setSucio(true)
        setAviso("Se han recuperado los cambios que no se llegaron a guardar. Revísalos y pulsa «Guardar».")
      }
    } catch {
      // el navegador no deja usar sessionStorage: no pasa nada
    }
  }

  // Cargar el evento (para editarlo o para duplicarlo), o empezar uno nuevo
  useEffect(() => {
    const origen = idParam ?? duplicarDe
    if (!origen) {
      recuperarCopia(undefined)
      return
    }
    leerEventoAdmin(origen)
      .then((ev) => {
        if (!idParam && duplicarDe) {
          // Copia: sin id (será un evento nuevo) y como borrador
          const { id: _id, ...resto } = ev
          setEvento({ ...resto, publicado: false })
          setSucio(true)
          setAviso(`Copia de «${ev.titulo}». Cambia la fecha y lo que haga falta, y guarda.`)
        } else {
          setEvento(ev)
          recuperarCopia(idParam)
        }
        setEstado("listo")
      })
      .catch((err) => {
        if (err instanceof ErrorAdmin && err.estado === 401) sesionCaducada()
        else if (err instanceof ErrorAdmin && err.estado === 404) setEstado("no-existe")
        else setEstado("error")
      })
  }, [idParam, duplicarDe])

  // Aviso del navegador si se intenta cerrar la pestaña con cambios sin guardar
  useEffect(() => {
    if (!sucio) return
    const avisar = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ""
    }
    window.addEventListener("beforeunload", avisar)
    return () => window.removeEventListener("beforeunload", avisar)
  }, [sucio])

  function cambiar(cambios: Partial<EventoAdmin>) {
    setEvento((ev) => (ev ? { ...ev, ...cambios } : ev))
    setErrores((e) => {
      const copia = { ...e }
      Object.keys(cambios).forEach((k) => delete copia[k])
      return copia
    })
    setSucio(true)
  }

  async function guardar(publicado: boolean) {
    if (!evento) return
    setGuardando(true)
    setErrores({})
    setMensajeError("")
    setAviso("")
    const datos = { ...evento, publicado }

    try {
      const r = await guardarEventoAdmin(datos)
      try {
        sessionStorage.removeItem(claveCopia(evento.id))
      } catch {}
      setEvento({ ...datos, id: r.id })
      setSucio(false)

      if (publicado) setAviso(evento.publicado ? "Cambios guardados. Ya se ven en el calendario." : "Evento publicado. Ya se ve en el calendario.")
      else setAviso(evento.publicado ? "El evento ha pasado a borrador: ya no se ve en la web." : "Borrador guardado. Todavía no se ve en la web.")

      // Un evento nuevo pasa a tener su id en la dirección (para que al volver a guardar se actualice)
      if (!evento.id) window.history.replaceState(null, "", `/admin/eventos/editar/?id=${r.id}`)
    } catch (err) {
      if (err instanceof ErrorAdmin && err.estado === 401) {
        try {
          sessionStorage.setItem(claveCopia(evento.id), JSON.stringify(evento))
        } catch {}
        sesionCaducada()
        return
      }
      if (err instanceof ErrorAdmin && err.estado === 422) setErrores(err.campos)
      setMensajeError(err instanceof ErrorAdmin ? err.message : "No se ha podido guardar. Inténtalo de nuevo.")
      requestAnimationFrame(() => cajaErrores.current?.focus())
    } finally {
      setGuardando(false)
    }
  }

  if (estado === "cargando") return <p role="status">Cargando evento…</p>

  if (estado === "no-existe") {
    return (
      <>
        <p className="mb-4">Este evento ya no existe.</p>
        <Link href="/admin/eventos/" className="font-semibold underline">Volver a la lista</Link>
      </>
    )
  }

  if (estado === "error" || !evento) {
    return <p role="alert">No se ha podido cargar el evento. Inténtalo de nuevo más tarde.</p>
  }

  const e = errores
  const numErrores = Object.keys(e).length

  return (
    <>
      <Link
        href="/admin/eventos/"
        onClick={(ev) => {
          if (sucio && !window.confirm("Hay cambios sin guardar. ¿Salir igualmente?")) ev.preventDefault()
        }}
        className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Volver a la lista
      </Link>

      <h1 className="mb-2 text-3xl font-bold">{evento.id ? "Editar evento" : "Nuevo evento"}</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        {evento.publicado ? "Publicado: se ve en el calendario." : "Borrador: todavía no se ve en la web."} Los campos con * son obligatorios.
      </p>

      <div aria-live="polite">
        {aviso && (
          <p className="mb-6 rounded-lg bg-white p-4 font-semibold">
            {aviso}{" "}
            {evento.publicado && evento.id && !sucio && (
              <a href={`/evento/?id=${evento.id}`} target="_blank" rel="noopener noreferrer" className="underline">
                Ver en la web<span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            )}
          </p>
        )}
      </div>

      {mensajeError && (
        <div ref={cajaErrores} tabIndex={-1} role="alert" className="mb-6 rounded-lg border-2 border-error bg-white p-4">
          <p className="font-semibold text-error">{mensajeError}</p>
          {numErrores > 0 && (
            <p className="mt-1 text-sm">
              Hay {numErrores} {numErrores === 1 ? "cosa" : "cosas"} por revisar, marcadas en rojo.
            </p>
          )}
        </div>
      )}

      <form
        noValidate
        className="space-y-8"
        onSubmit={(ev) => {
          ev.preventDefault()
          guardar(evento.publicado)
        }}
      >
        {/* ── Qué y quién ── */}
        <section aria-labelledby="sec-que" className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
          <h2 id="sec-que" className="text-xl font-bold">Qué es</h2>

          <Campo id="titulo" etiqueta="Título" obligatorio error={e.titulo}>
            {(p) => <input {...p} className={claseCampo} value={evento.titulo} onChange={(ev) => cambiar({ titulo: ev.target.value })} />}
          </Campo>

          <Campo id="tipo" etiqueta="Tipo de evento" obligatorio ayuda="Los ensayos no salen en la portada." error={e.tipo}>
            {(p) => (
              <select {...p} className={claseCampo} value={evento.tipo} onChange={(ev) => cambiar({ tipo: ev.target.value as TipoId })}>
                <option value="">Elige el tipo</option>
                {(Object.keys(TIPOS) as TipoId[]).map((t) => (
                  <option key={t} value={t}>{TIPOS[t]}</option>
                ))}
              </select>
            )}
          </Campo>

          <fieldset aria-describedby={e.agrupaciones ? "agrupaciones-error" : undefined}>
            <legend className="mb-1 font-semibold">
              Agrupaciones<span aria-hidden="true"> *</span><span className="sr-only"> (obligatorio)</span>
            </legend>
            <p className="mb-1 text-sm text-muted-foreground">Puedes marcar varias si actúan juntas.</p>
            <div className="grid gap-1 sm:grid-cols-2">
              {(Object.keys(AGRUPACIONES) as AgrupacionId[]).map((a) => (
                <label key={a} className="flex min-h-11 items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-5 w-5"
                    checked={evento.agrupaciones.includes(a)}
                    onChange={(ev) =>
                      cambiar({
                        agrupaciones: ev.target.checked
                          ? [...evento.agrupaciones, a]
                          : evento.agrupaciones.filter((x) => x !== a),
                      })
                    }
                  />
                  {AGRUPACIONES[a].nombre}
                </label>
              ))}
            </div>
            {e.agrupaciones && <p id="agrupaciones-error" className="mt-1 text-sm font-semibold text-error">{e.agrupaciones}</p>}
          </fieldset>

          <Campo id="descripcion" etiqueta="Descripción (opcional)" ayuda="Programa, artistas invitados, precio… Lo que haga falta saber." error={e.descripcion}>
            {(p) => <textarea {...p} rows={5} className={claseCampo} value={evento.descripcion} onChange={(ev) => cambiar({ descripcion: ev.target.value })} />}
          </Campo>
        </section>

        {/* ── Cuándo y dónde ── */}
        <section aria-labelledby="sec-cuando" className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
          <h2 id="sec-cuando" className="text-xl font-bold">Cuándo y dónde</h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <Campo id="fecha" etiqueta="Fecha" obligatorio error={e.fecha}>
              {(p) => <input {...p} type="date" className={claseCampo} value={evento.fecha} onChange={(ev) => cambiar({ fecha: ev.target.value })} />}
            </Campo>
            <Campo id="hora" etiqueta="Hora (opcional)" error={e.hora}>
              {(p) => <input {...p} type="time" className={claseCampo} value={evento.hora} onChange={(ev) => cambiar({ hora: ev.target.value })} />}
            </Campo>
          </div>

          <Campo id="lugar" etiqueta="Lugar (opcional)" ayuda="Por ejemplo: Auditorio Teodoro Cuesta, Mieres" error={e.lugar}>
            {(p) => <input {...p} className={claseCampo} value={evento.lugar} onChange={(ev) => cambiar({ lugar: ev.target.value })} />}
          </Campo>

          <Campo
            id="enlaceMaps"
            etiqueta="Enlace de Google Maps (opcional)"
            ayuda="En Google Maps, busca el sitio → Compartir → Copiar enlace, y pégalo aquí."
            error={e.enlaceMaps}
          >
            {(p) => (
              <input {...p} type="url" inputMode="url" className={claseCampo} value={evento.enlaceMaps} onChange={(ev) => cambiar({ enlaceMaps: ev.target.value })} />
            )}
          </Campo>
        </section>

        {/* ── Cartel y entradas ── */}
        <section aria-labelledby="sec-cartel" className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
          <div>
            <h2 id="sec-cartel" className="text-xl font-bold">Cartel y entradas</h2>
            <p className="mt-1 text-sm text-muted-foreground">Si no hay cartel, en el calendario sale la foto de la agrupación.</p>
          </div>

          <CampoFoto id="imagen" etiqueta="Cartel (opcional)" ruta={evento.imagen} alCambiar={(ruta) => cambiar({ imagen: ruta })} error={e.imagen} destino="eventos" />

          <Campo id="enlaceEntradas" etiqueta="Enlace para comprar entradas (opcional)" error={e.enlaceEntradas}>
            {(p) => (
              <input {...p} type="url" inputMode="url" className={claseCampo} value={evento.enlaceEntradas} onChange={(ev) => cambiar({ enlaceEntradas: ev.target.value })} />
            )}
          </Campo>

          <label className="flex min-h-11 items-start gap-3">
            <input
              type="checkbox"
              className="mt-0.5 h-5 w-5"
              checked={evento.destacado}
              onChange={(ev) => cambiar({ destacado: ev.target.checked })}
              aria-describedby="destacado-ayuda"
            />
            <span>
              <span className="block font-semibold">Destacado</span>
              <span id="destacado-ayuda" className="text-sm text-muted-foreground">Sale el primero, en grande, en el calendario.</span>
            </span>
          </label>
        </section>

        {/* ── Botones (se quedan fijos abajo al bajar por la página) ── */}
        <div className="sticky bottom-0 z-10 -mx-6 flex flex-wrap items-center gap-3 border-t border-border bg-white px-6 py-4">
          {evento.publicado ? (
            <>
              <button type="button" onClick={() => guardar(true)} disabled={guardando} className={claseBotonPrincipal}>
                {guardando ? "Guardando…" : "Guardar cambios"}
              </button>
              <button type="button" onClick={() => guardar(false)} disabled={guardando} className={claseBotonSecundario}>
                Guardar y pasar a borrador
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => guardar(true)} disabled={guardando} className={claseBotonPrincipal}>
                {guardando ? "Guardando…" : "Guardar y publicar"}
              </button>
              <button type="button" onClick={() => guardar(false)} disabled={guardando} className={claseBotonSecundario}>
                Guardar borrador
              </button>
            </>
          )}
          {sucio && <span className="text-sm text-muted-foreground">Hay cambios sin guardar</span>}
        </div>
      </form>
    </>
  )
}

export default function EditarEventoPage() {
  return (
    // Suspense es necesario para que la página se pueda exportar como estática
    <Suspense fallback={<p role="status">Cargando…</p>}>
      <Editor />
    </Suspense>
  )
}