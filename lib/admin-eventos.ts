// Funciones del panel para los eventos (hablan con api/admin/eventos.php).

import { peticionAdmin } from "@/lib/admin"
import type { AgrupacionId, TipoId } from "@/lib/eventos"

/** Un evento tal como se edita en el formulario. */
export type EventoAdmin = {
  id?: number
  titulo: string
  agrupaciones: AgrupacionId[]
  tipo: TipoId | ""
  fecha: string            // "2026-11-21"
  hora: string             // "20:00" o "" si no tiene
  lugar: string
  enlaceMaps: string
  descripcion: string
  imagen: string           // cartel, o "" si no tiene
  enlaceEntradas: string
  destacado: boolean
  publicado: boolean
}

/** Un evento ya guardado (siempre tiene id). */
export type EventoGuardado = EventoAdmin & { id: number }

export async function listarEventosAdmin(): Promise<EventoGuardado[]> {
  const r = await peticionAdmin<{ eventos: EventoGuardado[] }>("eventos.php")
  return r.eventos
}

export async function leerEventoAdmin(id: number): Promise<EventoGuardado> {
  const r = await peticionAdmin<{ evento: EventoGuardado }>(`eventos.php?id=${id}`)
  return r.evento
}

export async function guardarEventoAdmin(evento: EventoAdmin): Promise<{ id: number; publicado: boolean }> {
  return peticionAdmin("eventos.php", { metodo: "POST", datos: { accion: "guardar", evento } })
}

export async function publicarEventoAdmin(id: number, publicado: boolean): Promise<void> {
  await peticionAdmin("eventos.php", { metodo: "POST", datos: { accion: "publicar", id, publicado } })
}

export async function borrarEventoAdmin(id: number): Promise<void> {
  await peticionAdmin("eventos.php", { metodo: "POST", datos: { accion: "borrar", id } })
}