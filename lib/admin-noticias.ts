// Funciones del panel para las noticias (hablan con api/admin/noticias.php y subir-imagen.php).

import { peticionAdmin, enviarArchivoAdmin } from "@/lib/admin"
import type { Agrupacion, BloqueContenido, Categoria, Fuente } from "@/lib/noticias"

/** Lo que sale en la lista del panel. */
export type NoticiaListaAdmin = {
  id: number
  slug: string
  titulo: string
  fecha: string
  categoria: Categoria
  publicado: boolean
  destacada: boolean
  actualizado: string
}

/** Una noticia completa, tal como se edita en el formulario. */
export type NoticiaAdmin = {
  id?: number
  slug: string
  titulo: string
  resumen: string
  fecha: string
  autor: string
  categoria: Categoria | ""
  imagen: string
  imagenAlt: string
  imagenLado: "izquierda" | "derecha"
  pieImagen: string
  contenido: BloqueContenido[]
  fuentes: Fuente[]
  agrupaciones: Agrupacion[]
  destacada: boolean
  publicado: boolean
}

export async function listarNoticiasAdmin(): Promise<NoticiaListaAdmin[]> {
  const r = await peticionAdmin<{ noticias: NoticiaListaAdmin[] }>("noticias.php")
  return r.noticias
}

export async function leerNoticiaAdmin(id: number): Promise<NoticiaAdmin> {
  const r = await peticionAdmin<{ noticia: NoticiaAdmin & { autor: string | null; imagen: string | null; imagenAlt: string | null; pieImagen: string | null } }>(
    `noticias.php?id=${id}`,
  )
  const n = r.noticia
  // En el formulario, los campos vacíos son "" (no null)
  return { ...n, autor: n.autor ?? "", imagen: n.imagen ?? "", imagenAlt: n.imagenAlt ?? "", pieImagen: n.pieImagen ?? "" }
}

export async function guardarNoticiaAdmin(noticia: NoticiaAdmin): Promise<{ id: number; slug: string; publicado: boolean }> {
  return peticionAdmin("noticias.php", { metodo: "POST", datos: { accion: "guardar", noticia } })
}

export async function publicarNoticiaAdmin(id: number, publicado: boolean): Promise<void> {
  await peticionAdmin("noticias.php", { metodo: "POST", datos: { accion: "publicar", id, publicado } })
}

export async function borrarNoticiaAdmin(id: number): Promise<void> {
  await peticionAdmin("noticias.php", { metodo: "POST", datos: { accion: "borrar", id } })
}

export async function subirImagenAdmin(
  archivo: File,
  destino: "noticias" | "eventos" = "noticias",
): Promise<{ ruta: string; ancho: number; alto: number }> {
  return enviarArchivoAdmin("subir-imagen.php", "imagen", archivo, { destino })
}