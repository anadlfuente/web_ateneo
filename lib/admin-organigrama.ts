// Funciones del panel para el organigrama (hablan con api/admin/organigrama.php).
// Cada función devuelve el organigrama completo de la agrupación, ya actualizado.

import { peticionAdmin } from "@/lib/admin"

export type AgrupacionOrganigrama = "banda" | "coral"

export type MusicoAdmin = { id: number; nombre: string; cargo: string; activo: boolean }
export type SeccionAdmin = { id: number; nombre: string; musicos: MusicoAdmin[] }
export type DatosMusico = { id?: number; seccionId: number; nombre: string; cargo: string; activo: boolean }

type Respuesta = { secciones: SeccionAdmin[] }

async function enviar(datos: Record<string, unknown>): Promise<SeccionAdmin[]> {
  const r = await peticionAdmin<Respuesta>("organigrama.php", { metodo: "POST", datos })
  return r.secciones
}

export async function leerOrganigramaAdmin(agrupacion: AgrupacionOrganigrama): Promise<SeccionAdmin[]> {
  const r = await peticionAdmin<Respuesta>(`organigrama.php?agrupacion=${agrupacion}`)
  return r.secciones
}

export const crearSeccionAdmin = (agrupacion: AgrupacionOrganigrama, nombre: string) =>
  enviar({ accion: "crear_seccion", agrupacion, nombre })

export const renombrarSeccionAdmin = (id: number, nombre: string) =>
  enviar({ accion: "renombrar_seccion", id, nombre })

export const borrarSeccionAdmin = (id: number) =>
  enviar({ accion: "borrar_seccion", id })

export const ordenarSeccionesAdmin = (agrupacion: AgrupacionOrganigrama, ids: number[]) =>
  enviar({ accion: "ordenar_secciones", agrupacion, ids })

export const guardarMusicoAdmin = (musico: DatosMusico) =>
  enviar({ accion: "guardar_musico", musico })

export const borrarMusicoAdmin = (id: number) =>
  enviar({ accion: "borrar_musico", id })

export const ordenarMusicosAdmin = (seccionId: number, ids: number[]) =>
  enviar({ accion: "ordenar_musicos", seccionId, ids })