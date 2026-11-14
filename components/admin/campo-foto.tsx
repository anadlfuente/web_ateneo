"use client"

// Elegir una foto del ordenador o del móvil y subirla al servidor.

import { useState, type ChangeEvent } from "react"
import { ImagePlus, Trash2 } from "lucide-react"
import { ErrorAdmin } from "@/lib/admin"
import { subirImagenAdmin } from "@/lib/admin-noticias"
import { urlArchivo } from "@/lib/noticias"
import { claseBotonSecundario } from "@/components/admin/campos"

const MAX_MB = 15

type Props = {
  id: string
  etiqueta: string
  ruta: string                          // "" si todavía no hay foto
  alCambiar: (ruta: string) => void
  error?: string
  destino?: "noticias" | "eventos"      // carpeta donde se guarda
}

export function CampoFoto({ id, etiqueta, ruta, alCambiar, error, destino = "noticias" }: Props) {
  const [subiendo, setSubiendo] = useState(false)
  const [fallo, setFallo] = useState("")

  async function elegir(e: ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0]
    e.target.value = ""   // para poder volver a elegir la misma foto
    if (!archivo) return
    if (archivo.size > MAX_MB * 1024 * 1024) {
      setFallo(`La foto pesa demasiado (máximo ${MAX_MB} MB).`)
      return
    }
    setSubiendo(true)
    setFallo("")
    try {
      const r = await subirImagenAdmin(archivo, destino)
      alCambiar(r.ruta)
    } catch (err) {
      if (err instanceof ErrorAdmin && err.estado === 401) {
        setFallo("La sesión ha caducado. Pulsa «Guardar» para no perder los cambios y vuelve a entrar.")
      } else {
        setFallo(err instanceof ErrorAdmin ? err.message : "No se ha podido subir la foto.")
      }
    } finally {
      setSubiendo(false)
    }
  }

  const mensaje = fallo || error

  return (
    <div>
      <p className="mb-2 font-semibold">{etiqueta}</p>

      <div className="flex flex-wrap items-start gap-4">
        {ruta && <img src={urlArchivo(ruta)} alt="" className="h-28 w-40 rounded-lg bg-muted object-cover" />}

        <div className="flex flex-col gap-2">
          <label
            className={`${claseBotonSecundario} cursor-pointer focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-foreground`}
          >
            <ImagePlus className="h-4 w-4" aria-hidden="true" />
            {ruta ? "Cambiar foto" : "Elegir foto"}
            <span className="sr-only">: {etiqueta}</span>
            <input
              id={id}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={elegir}
              disabled={subiendo}
              aria-describedby={`${id}-ayuda${mensaje ? ` ${id}-error` : ""}`}
              className="sr-only"
            />
          </label>

          {ruta && (
            <button type="button" onClick={() => alCambiar("")} className={`${claseBotonSecundario} border-error text-error`}>
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Quitar foto<span className="sr-only">: {etiqueta}</span>
            </button>
          )}
        </div>
      </div>

      <p id={`${id}-ayuda`} className="mt-2 text-sm text-muted-foreground">
        JPG, PNG o WebP, hasta {MAX_MB} MB. Se reduce y se optimiza automáticamente.
      </p>
      {subiendo && <p role="status" className="mt-1 text-sm font-semibold">Subiendo foto…</p>}
      {mensaje && <p id={`${id}-error`} role="alert" className="mt-1 text-sm font-semibold text-error">{mensaje}</p>}
    </div>
  )
}