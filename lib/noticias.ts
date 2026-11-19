// ─────────────────────────────────────────────────────────────
// NOTICIAS
// Las noticias están en la base de datos y se gestionan desde el
// panel de administración. Este archivo las pide a api/noticias.php
// y guarda lo común: categorías, agrupaciones, imágenes y estilos.
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from "react"
import { Trophy, Ticket, FileText, Newspaper, Music, type LucideIcon } from "lucide-react"

// ── Imágenes generales ───────────────────────────────────────

/** Imagen que se usa en las tarjetas cuando una noticia no tiene foto propia. */
export const IMAGEN_POR_DEFECTO = "/logo_ateneo.png"

/** Banner de cabecera de las páginas de noticias (listado y detalle). */
export const BANNER_NOTICIAS = "/banner_2.png"

export type Categoria = "Logros" | "Noticias" | "Prensa" | "Conciertos"

// ── Agrupaciones (etiquetas) ─────────────────────────────────
// La clave es la que se escribe en cada noticia y la que se usará
// en la URL de la agrupación. El nombre es lo que se muestra.

export const agrupaciones = {
  "banda-sinfonica":         { nombre: "Banda Sinfónica" },
  "coral-cantares":          { nombre: "Coral Cantares" },
  "charanga-new-paentamala": { nombre: "Charanga New Paentamala" },
  "claxon-boys":             { nombre: "Claxon Boys" },
  "grupos-camara":           { nombre: "Grupos de cámara" },
} as const

export type Agrupacion = keyof typeof agrupaciones

// ── Fuentes (noticias basadas en prensa) ─────────────────────

export interface Fuente {
  medio: string   // "La Nueva España"
  url: string     // enlace al artículo original
  fecha?: string  // fecha del artículo original, "AAAA-MM-DD" (opcional)
}

// ── Bloques del cuerpo de la noticia ─────────────────────────
// Cada bloque lleva un `tipo` que dice cómo se pinta.

export type BloqueContenido =
  | { tipo: "parrafo"; texto: string }
  | { tipo: "subtitulo"; texto: string }
  | { tipo: "imagen"; src: string; alt: string; pie?: string }
  | { tipo: "cita"; texto: string; autor?: string }
  | { tipo: "enlace"; url: string; texto: string }

// ── Cómo llegan las noticias del PHP ─────────────────────────

/** Lo que llega en el listado (sin el cuerpo). */
interface NoticiaResumenDatos {
  slug: string
  titulo: string
  resumen: string
  fecha: string                 // "AAAA-MM-DD"
  autor: string | null
  categoria: Categoria
  imagen: string | null
  imagenAlt: string | null      // descripción de la foto principal
  destacada: boolean
  agrupaciones: Agrupacion[]
  fuentes: Fuente[]             // referencias de prensa (puede estar vacía)
}

/** Lo que llega al pedir una noticia concreta. */
interface NoticiaDatos extends NoticiaResumenDatos {
  imagenLado: "izquierda" | "derecha"
  pieImagen: string | null
  contenido: BloqueContenido[]
}

// ── Cómo las reciben las páginas (con la imagen ya resuelta) ──

type ConImagen<T> = Omit<T, "imagen"> & {
  imagen: string              // siempre tiene valor: la propia o la de por defecto
  tieneImagenPropia: boolean  // true si la noticia tiene foto propia
}

export type NoticiaResumen = ConImagen<NoticiaResumenDatos>
export type Noticia = ConImagen<NoticiaDatos>

/** Rellena la imagen por defecto si la noticia no tiene foto propia. */
function completar<T extends { imagen: string | null }>(n: T): ConImagen<T> {
  return { ...n, imagen: n.imagen ? urlArchivo(n.imagen) : IMAGEN_POR_DEFECTO, tieneImagenPropia: Boolean(n.imagen) }}

// ── Pedir las noticias al PHP ────────────────────────────────

// Dirección del PHP. En local se pone en .env.local; en el hosting es "/api"
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api"

// Las fotos subidas desde el panel están en /uploads/ del servidor PHP.
// En el hosting es la misma web; en local están en localhost:8000, no en localhost:3000.
const ORIGEN_PHP = /^https?:\/\//.test(API_URL) ? new URL(API_URL).origin : ""

/** Dirección de una foto, que funciona igual en local y en el hosting. */
export function urlArchivo(ruta: string): string {
  return ruta.startsWith("/uploads/") ? ORIGEN_PHP + ruta : ruta
}

/** Noticias publicadas, de la más reciente a la más antigua (sin el cuerpo). */
export async function obtenerNoticias(params: { agrupacion?: Agrupacion; limite?: number; buscar?: string } = {}): Promise<NoticiaResumen[]> {
  const query = new URLSearchParams()
  if (params.agrupacion) query.set("agrupacion", params.agrupacion)
  if (params.limite) query.set("limite", String(params.limite))
  if (params.buscar) query.set("buscar", params.buscar)

  const res = await fetch(`${API_URL}/noticias.php?${query}`)
  if (!res.ok) throw new Error("No se pudieron cargar las noticias")
  const datos: NoticiaResumenDatos[] = await res.json()
  return datos.map(completar)
}

/** Una noticia completa por su slug, o null si no existe o no está publicada. */
export async function obtenerNoticia(slug: string): Promise<Noticia | null> {
  const res = await fetch(`${API_URL}/noticias.php?slug=${encodeURIComponent(slug)}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error("No se pudo cargar la noticia")
  const datos: NoticiaDatos = await res.json()
  return completar(datos)
}

/**
 * Dirección de la página de una noticia.
 * En el hosting: /noticias/<slug>/ (la atiende el PHP del paso 5).
 * En local con `next dev` esa ruta no existe, así que se usa /noticias/ver/?slug=<slug>.
 */
export function urlNoticia(slug: string): string {
  return process.env.NODE_ENV === "development"
    ? `/noticias/ver/?slug=${encodeURIComponent(slug)}`
    : `/noticias/${slug}/`
}

// ── Para usar en los componentes ─────────────────────────────

/**
 * Carga las noticias al abrir la página.
 * `noticias` es null mientras carga; `error` es true si el PHP falla.
 * Ejemplo: const { noticias, error } = useNoticias({ limite: 4 })
 */
export function useNoticias(params: { agrupacion?: Agrupacion; limite?: number } = {}) {
  const { agrupacion, limite } = params
  const [noticias, setNoticias] = useState<NoticiaResumen[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelado = false
    obtenerNoticias({ agrupacion, limite })
      .then((datos) => {
        if (!cancelado) setNoticias(datos)
      })
      .catch(() => {
        if (!cancelado) setError(true)
      })
    return () => {
      cancelado = true
    }
  }, [agrupacion, limite])

  return { noticias, error }
}

/** Convierte "2026-02-10" en "10 de febrero de 2026" sin desfases de zona horaria. */
export function formatearFecha(fecha: string): string {
  const [y, m, d] = fecha.split("-").map(Number)
  return new Date(y, m - 1, d).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

// ── Estilo visual de cada categoría ──────────────────────────

export const estiloCategoria: Record<Categoria, { clase: string; icono: LucideIcon }> = {
  Logros:     { clase: "bg-accent-yellow text-foreground", icono: Trophy },
  Noticias:   { clase: "bg-primary-blue text-white",       icono: Ticket },
  Prensa:     { clase: "bg-accent-green text-white",       icono: FileText },
  Conciertos: { clase: "bg-primary-blue text-white",       icono: Music },
}