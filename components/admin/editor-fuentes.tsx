"use client"

// Editor de las fuentes de prensa de una noticia (puede haber varias o ninguna).

import { Plus, Trash2 } from "lucide-react"
import type { Fuente } from "@/lib/noticias"
import { Campo, claseCampo, claseBotonSecundario } from "@/components/admin/campos"

type Props = {
  fuentes: Fuente[]
  alCambiar: (fuentes: Fuente[]) => void
  errores: Record<string, string>
}

export function EditorFuentes({ fuentes, alCambiar, errores }: Props) {
  function cambiar(i: number, cambios: Partial<Fuente>) {
    alCambiar(fuentes.map((f, j) => (j === i ? { ...f, ...cambios } : f)))
  }

  function agregar() {
    alCambiar([...fuentes, { medio: "", url: "https://" }])
    requestAnimationFrame(() => document.getElementById(`fuente-${fuentes.length}-medio`)?.focus())
  }

  function quitar(i: number) {
    alCambiar(fuentes.filter((_, j) => j !== i))
    requestAnimationFrame(() => document.getElementById("anadir-fuente")?.focus())
  }

  return (
    <div className="space-y-4">
      {fuentes.length === 0 && (
        <p className="text-sm text-muted-foreground">Esta noticia no tiene fuentes. Añade una si resume un artículo de prensa.</p>
      )}

      <ol className="space-y-4">
        {fuentes.map((f, i) => {
          const error = errores[`fuentes.${i}`]
          return (
            <li key={i}>
              <fieldset className={`space-y-3 rounded-xl border p-4 ${error ? "border-2 border-error" : "border-foreground/30"}`}>
                <legend className="px-1 font-bold">Fuente {i + 1}</legend>

                <Campo id={`fuente-${i}-medio`} etiqueta="Nombre del medio" obligatorio ayuda="Por ejemplo: La Nueva España" error={error}>
                  {(p) => <input {...p} className={claseCampo} value={f.medio} onChange={(e) => cambiar(i, { medio: e.target.value })} />}
                </Campo>

                <Campo id={`fuente-${i}-url`} etiqueta="Enlace al artículo" obligatorio ayuda="Tiene que empezar por https://">
                  {(p) => (
                    <input {...p} type="url" inputMode="url" className={claseCampo} value={f.url} onChange={(e) => cambiar(i, { url: e.target.value })} />
                  )}
                </Campo>

                <Campo id={`fuente-${i}-fecha`} etiqueta="Fecha del artículo (opcional)">
                  {(p) => (
                    <input
                      {...p}
                      type="date"
                      className={claseCampo}
                      value={f.fecha ?? ""}
                      onChange={(e) => cambiar(i, { fecha: e.target.value || undefined })}
                    />
                  )}
                </Campo>

                <button type="button" onClick={() => quitar(i)} className={`${claseBotonSecundario} border-error text-error`}>
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Quitar fuente {i + 1}
                </button>
              </fieldset>
            </li>
          )
        })}
      </ol>

      <button type="button" id="anadir-fuente" onClick={agregar} className={claseBotonSecundario}>
        <Plus className="h-4 w-4" aria-hidden="true" />
        Añadir fuente
      </button>
    </div>
  )
}