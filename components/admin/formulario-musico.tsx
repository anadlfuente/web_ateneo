"use client"

// Formulario para añadir o editar a un músico del organigrama.

import { useState, type FormEvent } from "react"
import { Campo, claseCampo, claseBotonPrincipal, claseBotonSecundario } from "@/components/admin/campos"
import type { DatosMusico, SeccionAdmin } from "@/lib/admin-organigrama"

type Props = {
  inicial: DatosMusico
  secciones: SeccionAdmin[]           // para poder cambiarlo de sección
  errores: Record<string, string>
  ocupado: boolean
  alGuardar: (datos: DatosMusico) => void
  alCancelar: () => void
}

export function FormularioMusico({ inicial, secciones, errores, ocupado, alGuardar, alCancelar }: Props) {
  const [datos, setDatos] = useState(inicial)
  const id = `musico-form-${inicial.id ?? `nuevo-${inicial.seccionId}`}`
  const cambiar = (c: Partial<DatosMusico>) => setDatos((d) => ({ ...d, ...c }))

  function enviar(e: FormEvent) {
    e.preventDefault()
    alGuardar(datos)
  }

  return (
    <form
      onSubmit={enviar}
      noValidate
      aria-label={inicial.id ? `Editar a ${inicial.nombre}` : "Añadir a la sección"}
      className="w-full space-y-3 rounded-xl border border-foreground/30 bg-muted p-4"
    >
      <Campo id={`${id}-nombre`} etiqueta="Nombre y apellidos" obligatorio error={errores.nombre}>
        {(p) => <input {...p} autoFocus className={claseCampo} value={datos.nombre} onChange={(e) => cambiar({ nombre: e.target.value })} />}
      </Campo>

      <Campo
        id={`${id}-cargo`}
        etiqueta="Cargo (opcional)"
        ayuda="Por ejemplo: Concertino. Sale entre paréntesis junto al nombre."
        error={errores.cargo}
      >
        {(p) => <input {...p} className={claseCampo} value={datos.cargo} onChange={(e) => cambiar({ cargo: e.target.value })} />}
      </Campo>

      {/* Cambiar de sección: solo al editar a alguien que ya existe */}
      {inicial.id && (
        <Campo id={`${id}-seccion`} etiqueta="Sección" ayuda="Si lo cambias de sección, pasa al final de la nueva.">
          {(p) => (
            <select {...p} className={claseCampo} value={datos.seccionId} onChange={(e) => cambiar({ seccionId: Number(e.target.value) })}>
              {secciones.map((s) => (
                <option key={s.id} value={s.id}>{s.nombre}</option>
              ))}
            </select>
          )}
        </Campo>
      )}

      <label className="flex min-h-11 items-start gap-3">
        <input
          type="checkbox"
          className="mt-0.5 h-5 w-5"
          checked={datos.activo}
          onChange={(e) => cambiar({ activo: e.target.checked })}
          aria-describedby={`${id}-activo-ayuda`}
        />
        <span>
          <span className="block font-semibold">Sale en la web</span>
          <span id={`${id}-activo-ayuda`} className="text-sm text-muted-foreground">
            Desmárcalo si ya no está en la agrupación pero no quieres borrarlo.
          </span>
        </span>
      </label>

      <div className="flex flex-wrap gap-2">
        <button type="submit" disabled={ocupado} className={claseBotonPrincipal}>
          {ocupado ? "Guardando…" : "Guardar"}
        </button>
        <button type="button" onClick={alCancelar} className={claseBotonSecundario}>Cancelar</button>
      </div>
    </form>
  )
}