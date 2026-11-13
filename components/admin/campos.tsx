// Piezas comunes de los formularios del panel.

import type { ReactNode } from "react"

export const claseCampo =
  "w-full min-h-11 rounded-lg border border-foreground/60 bg-white px-3 py-2 text-foreground " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground " +
  "aria-[invalid=true]:border-2 aria-[invalid=true]:border-error"

export const claseBotonPrincipal =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary-blue px-4 font-semibold text-foreground " +
  "hover:bg-primary-blue/85 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
export const claseBotonSecundario =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-foreground/60 bg-white px-3 text-sm font-semibold " +
  "hover:bg-muted disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"

type PropsControl = { id: string; "aria-describedby"?: string; "aria-invalid"?: true }

type Props = {
  id: string
  etiqueta: string
  ayuda?: string
  error?: string
  obligatorio?: boolean
  children: (props: PropsControl) => ReactNode
}

/**
 * Etiqueta + campo + texto de ayuda + error, bien enlazados para los lectores de pantalla.
 * Uso: <Campo id="titulo" etiqueta="Título">{(p) => <input {...p} ... />}</Campo>
 */
export function Campo({ id, etiqueta, ayuda, error, obligatorio, children }: Props) {
  const describe = [ayuda && `${id}-ayuda`, error && `${id}-error`].filter(Boolean).join(" ") || undefined

  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-semibold">
        {etiqueta}
        {obligatorio && (
          <>
            <span aria-hidden="true"> *</span>
            <span className="sr-only"> (obligatorio)</span>
          </>
        )}
      </label>
      {ayuda && <p id={`${id}-ayuda`} className="mb-1 text-sm text-muted-foreground">{ayuda}</p>}
      {children({ id, "aria-describedby": describe, "aria-invalid": error ? true : undefined })}
      {error && <p id={`${id}-error`} className="mt-1 text-sm font-semibold text-error">{error}</p>}
    </div>
  )
}