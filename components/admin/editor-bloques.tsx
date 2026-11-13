"use client"

// Editor del cuerpo de la noticia: una lista de bloques (párrafos, subtítulos, fotos,
// citas y botones) que se pueden añadir, quitar y reordenar con los botones Subir / Bajar.

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react"
import type { BloqueContenido } from "@/lib/noticias"
import { Campo, claseCampo, claseBotonSecundario } from "@/components/admin/campos"
import { CampoFoto } from "@/components/admin/campo-foto"

type Tipo = BloqueContenido["tipo"]

const NOMBRES: Record<Tipo, string> = {
  parrafo: "Párrafo",
  subtitulo: "Subtítulo",
  imagen: "Foto",
  cita: "Cita destacada",
  enlace: "Botón con enlace",
}

const NUEVO: Record<Tipo, () => BloqueContenido> = {
  parrafo: () => ({ tipo: "parrafo", texto: "" }),
  subtitulo: () => ({ tipo: "subtitulo", texto: "" }),
  imagen: () => ({ tipo: "imagen", src: "", alt: "" }),
  cita: () => ({ tipo: "cita", texto: "" }),
  enlace: () => ({ tipo: "enlace", url: "https://", texto: "" }),
}

type Props = {
  bloques: BloqueContenido[]
  alCambiar: (bloques: BloqueContenido[]) => void
  errores: Record<string, string>
  alAnunciar: (texto: string) => void   // mensaje para lectores de pantalla
}

// Pone el foco en el primer elemento de la lista que exista y no esté desactivado
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

export function EditorBloques({ bloques, alCambiar, errores, alAnunciar }: Props) {
  function cambiar(i: number, cambios: Record<string, string>) {
    alCambiar(bloques.map((b, j) => (j === i ? ({ ...b, ...cambios } as BloqueContenido) : b)))
  }

  function mover(i: number, paso: -1 | 1) {
    const j = i + paso
    if (j < 0 || j >= bloques.length) return
    const copia = [...bloques]
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
    alCambiar(copia)
    alAnunciar(`${NOMBRES[bloques[i].tipo]} movido a la posición ${j + 1} de ${bloques.length}.`)
    enfocar(`bloque-${j}-${paso < 0 ? "subir" : "bajar"}`, `bloque-${j}-${paso < 0 ? "bajar" : "subir"}`)
  }

  function quitar(i: number) {
    const b = bloques[i]
    const vacio = JSON.stringify(b) === JSON.stringify(NUEVO[b.tipo]())
    if (!vacio && !window.confirm(`¿Quitar el bloque ${i + 1} (${NOMBRES[b.tipo].toLowerCase()})?`)) return
    alCambiar(bloques.filter((_, j) => j !== i))
    alAnunciar(`Bloque ${i + 1} quitado.`)
    enfocar(`bloque-${Math.min(i, bloques.length - 2)}-campo`, "anadir-parrafo")
  }

  function agregar(tipo: Tipo) {
    alCambiar([...bloques, NUEVO[tipo]()])
    alAnunciar(`${NOMBRES[tipo]} añadido al final.`)
    enfocar(`bloque-${bloques.length}-campo`)
  }

  return (
    <div className="space-y-4">
      {bloques.length === 0 && (
        <p className="text-sm text-muted-foreground">La noticia todavía no tiene texto. Añade un párrafo con los botones de abajo.</p>
      )}

      <ol className="space-y-4">
        {bloques.map((b, i) => {
          const id = `bloque-${i}`
          const error = errores[`contenido.${i}`]

          return (
            <li key={i}>
              <fieldset className={`rounded-xl border bg-white p-4 ${error ? "border-2 border-error" : "border-foreground/30"}`}>
                <legend className="px-1 font-bold">{i + 1}. {NOMBRES[b.tipo]}</legend>

                <div className="space-y-3">
                  {b.tipo === "parrafo" && (
                    <Campo id={`${id}-campo`} etiqueta="Texto" error={error}>
                      {(p) => (
                        <textarea {...p} rows={5} className={claseCampo} value={b.texto} onChange={(e) => cambiar(i, { texto: e.target.value })} />
                      )}
                    </Campo>
                  )}

                  {b.tipo === "subtitulo" && (
                    <Campo id={`${id}-campo`} etiqueta="Texto del subtítulo" error={error}>
                      {(p) => (
                        <input {...p} className={claseCampo} value={b.texto} onChange={(e) => cambiar(i, { texto: e.target.value })} />
                      )}
                    </Campo>
                  )}

                  {b.tipo === "cita" && (
                    <>
                      <Campo id={`${id}-campo`} etiqueta="Frase destacada" ayuda="Sin comillas: se ponen solas." error={error}>
                        {(p) => (
                          <textarea {...p} rows={3} className={claseCampo} value={b.texto} onChange={(e) => cambiar(i, { texto: e.target.value })} />
                        )}
                      </Campo>
                      <Campo id={`${id}-autor`} etiqueta="Quién lo dice (opcional)">
                        {(p) => (
                          <input {...p} className={claseCampo} value={b.autor ?? ""} onChange={(e) => cambiar(i, { autor: e.target.value })} />
                        )}
                      </Campo>
                    </>
                  )}

                  {b.tipo === "enlace" && (
                    <>
                      <Campo id={`${id}-campo`} etiqueta="Dirección" ayuda="Tiene que empezar por https://" error={error}>
                        {(p) => (
                          <input {...p} type="url" inputMode="url" className={claseCampo} value={b.url} onChange={(e) => cambiar(i, { url: e.target.value })} />
                        )}
                      </Campo>
                      <Campo id={`${id}-texto`} etiqueta="Texto del botón" ayuda="Por ejemplo: «Ver puntos de venta en el mapa»">
                        {(p) => (
                          <input {...p} className={claseCampo} value={b.texto} onChange={(e) => cambiar(i, { texto: e.target.value })} />
                        )}
                      </Campo>
                    </>
                  )}

                  {b.tipo === "imagen" && (
                    <>
                      <CampoFoto id={`${id}-campo`} etiqueta="Foto" ruta={b.src} alCambiar={(ruta) => cambiar(i, { src: ruta })} error={error} />
                      {b.src && (
                        <>
                          <Campo
                            id={`${id}-alt`}
                            etiqueta="Descripción de la foto"
                            obligatorio
                            ayuda="Qué se ve en la foto, para quien no puede verla. Por ejemplo: «La Banda Sinfónica actuando en la plaza de Requejo»."
                          >
                            {(p) => (
                              <textarea {...p} rows={2} className={claseCampo} value={b.alt} onChange={(e) => cambiar(i, { alt: e.target.value })} />
                            )}
                          </Campo>
                          <Campo id={`${id}-pie`} etiqueta="Pie de foto (opcional)">
                            {(p) => (
                              <input {...p} className={claseCampo} value={b.pie ?? ""} onChange={(e) => cambiar(i, { pie: e.target.value })} />
                            )}
                          </Campo>
                        </>
                      )}
                    </>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" id={`${id}-subir`} onClick={() => mover(i, -1)} disabled={i === 0} className={claseBotonSecundario}>
                    <ArrowUp className="h-4 w-4" aria-hidden="true" />
                    Subir<span className="sr-only"> bloque {i + 1}</span>
                  </button>
                  <button
                    type="button"
                    id={`${id}-bajar`}
                    onClick={() => mover(i, 1)}
                    disabled={i === bloques.length - 1}
                    className={claseBotonSecundario}
                  >
                    <ArrowDown className="h-4 w-4" aria-hidden="true" />
                    Bajar<span className="sr-only"> bloque {i + 1}</span>
                  </button>
                  <button type="button" onClick={() => quitar(i)} className={`${claseBotonSecundario} border-error text-error`}>
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Quitar<span className="sr-only"> bloque {i + 1}</span>
                  </button>
                </div>
              </fieldset>
            </li>
          )
        })}
      </ol>

      <div className="rounded-xl border border-dashed border-foreground/60 p-4">
        <p id="anadir-bloque" className="mb-2 text-sm font-semibold">Añadir al final:</p>
        <div role="group" aria-labelledby="anadir-bloque" className="flex flex-wrap gap-2">
          {(Object.keys(NOMBRES) as Tipo[]).map((tipo) => (
            <button key={tipo} type="button" id={`anadir-${tipo}`} onClick={() => agregar(tipo)} className={claseBotonSecundario}>
              <Plus className="h-4 w-4" aria-hidden="true" />
              {NOMBRES[tipo]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}