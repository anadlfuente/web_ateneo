"use client"

// Panel: organigrama de la Banda Sinfónica y de la Coral Cantares.
// Cada sección (instrumento o cuerda) con sus músicos: añadir, editar, cambiar de sección,
// ordenar, ocultar y borrar. Cada cambio se guarda al momento.

import { useEffect, useState, type FormEvent } from "react"
import Link from "next/link"
import { ArrowDown, ArrowLeft, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react"
import { useSesionAdmin } from "@/components/admin/sesion-admin"
import { Campo, claseCampo, claseBotonPrincipal, claseBotonSecundario } from "@/components/admin/campos"
import { FormularioMusico } from "@/components/admin/formulario-musico"
import { ErrorAdmin } from "@/lib/admin"
import {
  leerOrganigramaAdmin,
  crearSeccionAdmin,
  renombrarSeccionAdmin,
  borrarSeccionAdmin,
  ordenarSeccionesAdmin,
  guardarMusicoAdmin,
  borrarMusicoAdmin,
  ordenarMusicosAdmin,
  type AgrupacionOrganigrama,
  type SeccionAdmin,
} from "@/lib/admin-organigrama"

const AGRUPACIONES: Record<AgrupacionOrganigrama, { nombre: string; personas: string; web: string }> = {
  banda: { nombre: "Banda Sinfónica", personas: "músicos", web: "/banda/organigrama/" },
  coral: { nombre: "Coral Cantares", personas: "voces", web: "/coral/organigrama/" },
}

// Botón cuadrado solo con icono (Subir / Bajar)
const claseIcono =
  "inline-flex h-11 w-11 items-center justify-center rounded-lg border border-foreground/60 bg-white " +
  "hover:bg-muted disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"

type Edicion =
  | { tipo: "musico"; id: number }
  | { tipo: "nuevo-musico"; seccionId: number }
  | { tipo: "seccion"; id: number }
  | { tipo: "nueva-seccion" }
  | null

// Pone el foco en el primer elemento que exista y no esté desactivado
function enfocar(...ids: string[]) {
  requestAnimationFrame(() => {
    for (const id of ids) {
      const el = document.getElementById(id) as HTMLButtonElement | null
      if (el && !el.disabled) {
        el.focus()
        return
      }
    }
  })
}

// Ids de una lista después de mover el elemento i una posición arriba (-1) o abajo (1)
function idsMovidos(lista: { id: number }[], i: number, paso: -1 | 1): number[] {
  const ids = lista.map((x) => x.id)
  const j = i + paso
  ;[ids[i], ids[j]] = [ids[j], ids[i]]
  return ids
}

// Formulario pequeño para el nombre de una sección (crear o renombrar)
function FormularioSeccion(props: {
  idCampo: string
  inicial: string
  error?: string
  ocupado: boolean
  alGuardar: (nombre: string) => void
  alCancelar: () => void
}) {
  const [nombre, setNombre] = useState(props.inicial)
  return (
    <form
      noValidate
      onSubmit={(e: FormEvent) => {
        e.preventDefault()
        props.alGuardar(nombre)
      }}
      className="flex w-full flex-wrap items-end gap-2"
    >
      <div className="min-w-0 flex-1">
        <Campo id={props.idCampo} etiqueta="Nombre de la sección" obligatorio ayuda="Instrumento o cuerda. Por ejemplo: Clarinetes, Sopranos." error={props.error}>
          {(p) => <input {...p} autoFocus className={claseCampo} value={nombre} onChange={(e) => setNombre(e.target.value)} />}
        </Campo>
      </div>
      <button type="submit" disabled={props.ocupado} className={claseBotonPrincipal}>Guardar</button>
      <button type="button" onClick={props.alCancelar} className={claseBotonSecundario}>Cancelar</button>
    </form>
  )
}

export default function AdminOrganigramaPage() {
  const { sesionCaducada } = useSesionAdmin()
  const [agrupacion, setAgrupacion] = useState<AgrupacionOrganigrama>("banda")
  const [secciones, setSecciones] = useState<SeccionAdmin[] | null>(null)
  const [edicion, setEdicion] = useState<Edicion>(null)
  const [errores, setErrores] = useState<Record<string, string>>({})
  const [error, setError] = useState("")
  const [aviso, setAviso] = useState("")
  const [ocupado, setOcupado] = useState(false)

  function tratarError(err: unknown) {
    if (err instanceof ErrorAdmin && err.estado === 401) {
      sesionCaducada()
      return
    }
    if (err instanceof ErrorAdmin && err.estado === 422) setErrores(err.campos)
    setError(err instanceof ErrorAdmin ? err.message : "Ha habido un error. Inténtalo de nuevo.")
  }

  useEffect(() => {
    setSecciones(null)
    setEdicion(null)
    setError("")
    setAviso("")
    leerOrganigramaAdmin(agrupacion).then(setSecciones).catch(tratarError)
  }, [agrupacion])

  // Hace un cambio, muestra el organigrama actualizado y deja el foco donde tiene sentido
  async function ejecutar(accion: () => Promise<SeccionAdmin[]>, mensaje: string, foco: string[] = []) {
    setOcupado(true)
    setError("")
    setAviso("")
    try {
      setSecciones(await accion())
      setEdicion(null)
      setErrores({})
      setAviso(mensaje)
      if (foco.length) enfocar(...foco)
    } catch (err) {
      tratarError(err)
    } finally {
      setOcupado(false)
    }
  }

  function abrir(e: Edicion) {
    setEdicion(e)
    setErrores({})
    setError("")
  }

  const info = AGRUPACIONES[agrupacion]

  return (
    <>
      <Link href="/admin/" className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Volver al panel
      </Link>

      <h1 className="mb-2 text-3xl font-bold">Organigrama</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Cada cambio se guarda al momento y se ve en la web en un minuto. Usa las flechas para cambiar el orden en que salen.
      </p>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <div role="group" aria-label="Agrupación" className="flex flex-wrap gap-2">
          {(Object.keys(AGRUPACIONES) as AgrupacionOrganigrama[]).map((a) => (
            <button
              key={a}
              type="button"
              aria-pressed={agrupacion === a}
              onClick={() => setAgrupacion(a)}
              className={`${claseBotonSecundario} aria-pressed:bg-foreground aria-pressed:text-white`}
            >
              {AGRUPACIONES[a].nombre}
            </button>
          ))}
        </div>
        <a href={info.web} target="_blank" rel="noopener noreferrer" className="ml-auto text-sm underline">
          Ver el organigrama en la web<span className="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
      </div>

      <div aria-live="polite">
        {aviso && <p className="mb-4 rounded-lg bg-white p-4 font-semibold">{aviso}</p>}
      </div>
      {error && <p role="alert" className="mb-4 rounded-lg bg-white p-4 font-semibold text-error">{error}</p>}

      {secciones === null && !error && <p role="status">Cargando organigrama…</p>}

      {secciones && secciones.length === 0 && (
        <p className="mb-4 rounded-2xl bg-white p-6">Todavía no hay secciones. Crea la primera con «Añadir sección».</p>
      )}

      {secciones && secciones.length > 0 && (
        <ol className="space-y-6">
          {secciones.map((s, i) => (
            <li key={s.id}>
              <section aria-labelledby={`seccion-${s.id}-titulo`} className="rounded-2xl bg-white p-5 shadow-sm">
                {/* Cabecera de la sección */}
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  {edicion?.tipo === "seccion" && edicion.id === s.id ? (
                    <FormularioSeccion
                      idCampo={`seccion-${s.id}-nombre`}
                      inicial={s.nombre}
                      error={errores.nombre}
                      ocupado={ocupado}
                      alCancelar={() => abrir(null)}
                      alGuardar={(nombre) =>
                        ejecutar(() => renombrarSeccionAdmin(s.id, nombre), `Sección renombrada a «${nombre.trim()}».`, [
                          `seccion-${s.id}-renombrar`,
                        ])
                      }
                    />
                  ) : (
                    <>
                      <h2 id={`seccion-${s.id}-titulo`} className="text-xl font-bold">
                        {s.nombre}{" "}
                        <span className="text-base font-normal text-muted-foreground">
                          ({s.musicos.filter((m) => m.activo).length} {info.personas})
                        </span>
                      </h2>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          id={`seccion-${s.id}-subir`}
                          disabled={ocupado || i === 0}
                          onClick={() =>
                            ejecutar(() => ordenarSeccionesAdmin(agrupacion, idsMovidos(secciones, i, -1)), `${s.nombre} sube a la posición ${i}.`, [
                              `seccion-${s.id}-subir`,
                              `seccion-${s.id}-bajar`,
                            ])
                          }
                          aria-label={`Subir la sección ${s.nombre}`}
                          title="Subir sección"
                          className={claseIcono}
                        >
                          <ArrowUp className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          id={`seccion-${s.id}-bajar`}
                          disabled={ocupado || i === secciones.length - 1}
                          onClick={() =>
                            ejecutar(() => ordenarSeccionesAdmin(agrupacion, idsMovidos(secciones, i, 1)), `${s.nombre} baja a la posición ${i + 2}.`, [
                              `seccion-${s.id}-bajar`,
                              `seccion-${s.id}-subir`,
                            ])
                          }
                          aria-label={`Bajar la sección ${s.nombre}`}
                          title="Bajar sección"
                          className={claseIcono}
                        >
                          <ArrowDown className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          id={`seccion-${s.id}-renombrar`}
                          onClick={() => abrir({ tipo: "seccion", id: s.id })}
                          className={claseBotonSecundario}
                        >
                          <Pencil className="h-4 w-4" aria-hidden="true" />
                          Renombrar<span className="sr-only"> la sección {s.nombre}</span>
                        </button>
                        {s.musicos.length === 0 && (
                          <button
                            type="button"
                            disabled={ocupado}
                            onClick={() => {
                              if (window.confirm(`¿Borrar la sección «${s.nombre}»?`)) {
                                ejecutar(() => borrarSeccionAdmin(s.id), `Sección «${s.nombre}» borrada.`, ["anadir-seccion"])
                              }
                            }}
                            className={`${claseBotonSecundario} border-error text-error`}
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                            Borrar<span className="sr-only"> la sección {s.nombre}</span>
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Músicos de la sección */}
                {s.musicos.length === 0 && (
                  <p className="text-sm text-muted-foreground">Esta sección todavía no tiene {info.personas}.</p>
                )}

                <ol className="divide-y divide-border">
                  {s.musicos.map((m, j) => (
                    <li key={m.id} className="py-3">
                      {edicion?.tipo === "musico" && edicion.id === m.id ? (
                        <FormularioMusico
                          inicial={{ id: m.id, seccionId: s.id, nombre: m.nombre, cargo: m.cargo, activo: m.activo }}
                          secciones={secciones}
                          errores={errores}
                          ocupado={ocupado}
                          alCancelar={() => {
                            abrir(null)
                            enfocar(`musico-${m.id}-editar`)
                          }}
                          alGuardar={(datos) =>
                            ejecutar(() => guardarMusicoAdmin(datos), `Cambios de ${datos.nombre.trim()} guardados.`, [`musico-${m.id}-editar`])
                          }
                        />
                      ) : (
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <p className="min-w-0">
                            <span className="font-semibold">{m.nombre}</span>
                            {m.cargo && <span className="ml-2 rounded-full bg-primary-blue/15 px-2 py-0.5 text-sm">{m.cargo}</span>}
                            {!m.activo && (
                              <span className="ml-2 rounded-full border border-foreground/60 px-2 py-0.5 text-sm">No sale en la web</span>
                            )}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              id={`musico-${m.id}-subir`}
                              disabled={ocupado || j === 0}
                              onClick={() =>
                                ejecutar(() => ordenarMusicosAdmin(s.id, idsMovidos(s.musicos, j, -1)), `${m.nombre} sube a la posición ${j}.`, [
                                  `musico-${m.id}-subir`,
                                  `musico-${m.id}-bajar`,
                                ])
                              }
                              aria-label={`Subir a ${m.nombre}`}
                              title="Subir"
                              className={claseIcono}
                            >
                              <ArrowUp className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              id={`musico-${m.id}-bajar`}
                              disabled={ocupado || j === s.musicos.length - 1}
                              onClick={() =>
                                ejecutar(() => ordenarMusicosAdmin(s.id, idsMovidos(s.musicos, j, 1)), `${m.nombre} baja a la posición ${j + 2}.`, [
                                  `musico-${m.id}-bajar`,
                                  `musico-${m.id}-subir`,
                                ])
                              }
                              aria-label={`Bajar a ${m.nombre}`}
                              title="Bajar"
                              className={claseIcono}
                            >
                              <ArrowDown className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              id={`musico-${m.id}-editar`}
                              onClick={() => abrir({ tipo: "musico", id: m.id })}
                              className={claseBotonSecundario}
                            >
                              <Pencil className="h-4 w-4" aria-hidden="true" />
                              Editar<span className="sr-only"> a {m.nombre}</span>
                            </button>
                            <button
                              type="button"
                              disabled={ocupado}
                              onClick={() => {
                                if (window.confirm(`¿Borrar a ${m.nombre} del organigrama? Si solo ha dejado la agrupación, puedes editarlo y desmarcar «Sale en la web».`)) {
                                  ejecutar(() => borrarMusicoAdmin(m.id), `${m.nombre} borrado del organigrama.`, [`seccion-${s.id}-anadir`])
                                }
                              }}
                              className={`${claseBotonSecundario} border-error text-error`}
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                              Borrar<span className="sr-only"> a {m.nombre}</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ol>

                {/* Añadir a esta sección */}
                {edicion?.tipo === "nuevo-musico" && edicion.seccionId === s.id ? (
                  <div className="mt-3">
                    <FormularioMusico
                      inicial={{ seccionId: s.id, nombre: "", cargo: "", activo: true }}
                      secciones={secciones}
                      errores={errores}
                      ocupado={ocupado}
                      alCancelar={() => {
                        abrir(null)
                        enfocar(`seccion-${s.id}-anadir`)
                      }}
                      alGuardar={(datos) =>
                        ejecutar(() => guardarMusicoAdmin(datos), `${datos.nombre.trim()} añadido a ${s.nombre}.`, [`seccion-${s.id}-anadir`])
                      }
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    id={`seccion-${s.id}-anadir`}
                    onClick={() => abrir({ tipo: "nuevo-musico", seccionId: s.id })}
                    className={`${claseBotonSecundario} mt-3`}
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    Añadir a {s.nombre}
                  </button>
                )}
              </section>
            </li>
          ))}
        </ol>
      )}

      {/* Añadir sección */}
      {secciones &&
        (edicion?.tipo === "nueva-seccion" ? (
          <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
            <FormularioSeccion
              idCampo="nueva-seccion-nombre"
              inicial=""
              error={errores.nombre}
              ocupado={ocupado}
              alCancelar={() => {
                abrir(null)
                enfocar("anadir-seccion")
              }}
              alGuardar={(nombre) =>
                ejecutar(() => crearSeccionAdmin(agrupacion, nombre), `Sección «${nombre.trim()}» creada al final.`, ["anadir-seccion"])
              }
            />
          </div>
        ) : (
          <button
            type="button"
            id="anadir-seccion"
            onClick={() => abrir({ tipo: "nueva-seccion" })}
            className={`${claseBotonSecundario} mt-6`}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Añadir sección
          </button>
        ))}
    </>
  )
}