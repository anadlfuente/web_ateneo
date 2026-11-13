"use client"

// Carga el organigrama desde la base de datos y lo pinta con el componente de siempre.

import { useEffect, useState } from "react"
import Organigram from "@/components/organigram-section"
import { obtenerOrganigrama, nombreConCargo } from "@/lib/organigrama"

type Props = {
  agrupacion: "banda" | "coral"
  titulo?: string
  descripcion?: string
  unidad?: string
}

type Seccion = { nombre: string; miembros: string[] }

export default function OrganigramaDB({ agrupacion, titulo, descripcion, unidad }: Props) {
  const [secciones, setSecciones] = useState<Seccion[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelado = false
    obtenerOrganigrama(agrupacion)
      .then((datos) => {
        if (cancelado) return
        setSecciones(datos.map((s) => ({ nombre: s.nombre, miembros: s.miembros.map(nombreConCargo) })))
      })
      .catch(() => {
        if (!cancelado) setError(true)
      })
    return () => {
      cancelado = true
    }
  }, [agrupacion])

  let aviso = ""
  if (error) aviso = "No se pudo cargar el organigrama. Inténtalo de nuevo más tarde."
  else if (!secciones) aviso = "Cargando…"
  else if (secciones.length === 0) aviso = "El organigrama se publicará próximamente."

  return (
    <>
      <Organigram titulo={titulo} descripcion={aviso ? undefined : descripcion} secciones={secciones ?? []} unidad={unidad} />
      {aviso && (
        <p role="status" className="text-center text-muted-foreground">
          {aviso}
        </p>
      )}
    </>
  )
}