// ─────────────────────────────────────────────────────────────
// FUENTE ÚNICA DE NOTICIAS
// Para publicar una noticia nueva, solo hay que añadir un objeto
// a la lista `noticias`. La portada, el listado, la página de
// detalle y las secciones de cada agrupación se actualizan solos.
// ─────────────────────────────────────────────────────────────

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

// ── Fuente externa (noticias basadas en prensa) ──────────────

export interface Fuente {
  medio: string   // "La Nueva España"
  url: string     // enlace al artículo original
  fecha?: string  // fecha del artículo original, "AAAA-MM-DD" (opcional)
}

// ── Bloques que se pueden poner dentro de `contenido` ────────
// Además de párrafos de texto (strings), se pueden intercalar:

/** Una foto dentro del cuerpo de la noticia (a ancho completo). */
export interface ImagenContenido {
  src: string    // ruta de la foto, preferiblemente en /public/noticias/...
  alt: string    // descripción breve de la foto (accesibilidad y buscadores)
  pie?: string   // texto opcional debajo de la foto
}

/** Un enlace destacado (botón) dentro del cuerpo de la noticia. */
export interface EnlaceContenido {
  url: string    // dirección a la que lleva
  texto: string  // texto del botón
}

export type BloqueContenido = string | ImagenContenido | EnlaceContenido

// ── Cómo se escribe una noticia ──────────────────────────────

interface NoticiaDatos {
  slug: string                  // identificador para la URL: /noticias/<slug> (sin tildes ni espacios)
  titulo: string
  resumen: string               // 1-2 frases, se usa en tarjetas, listados y buscadores
  fecha: string                 // formato "AAAA-MM-DD"
  categoria: Categoria
  imagen?: string               // foto de la noticia (opcional). Sale en las tarjetas y flotando en el detalle.
                                // Si no se pone, en las tarjetas aparece IMAGEN_POR_DEFECTO.
  imagenLado?: "izquierda" | "derecha" // lado de la foto en el detalle (por defecto, derecha)
  contenido: BloqueContenido[]  // párrafos, fotos y enlaces, en el orden en que se muestran
  destacada?: boolean           // si es true, aparece grande en la portada
  agrupaciones?: Agrupacion[]   // formaciones relacionadas (puede haber varias o ninguna)
  fuente?: Fuente               // solo si la noticia resume un artículo de prensa
}

// ── Cómo la reciben las páginas (con la imagen ya resuelta) ──

export interface Noticia extends Omit<NoticiaDatos, "imagen"> {
  imagen: string              // siempre tiene valor: la propia o la de por defecto
  tieneImagenPropia: boolean  // true si se añadió una foto en la noticia
}

const noticias: NoticiaDatos[] = [
  {
    slug: "certamen-regional-de-bandas-2026",
    titulo: "La Banda Sinfónica gana el Certamen Regional de Bandas",
    resumen:
      "La Banda Sinfónica del Ateneo se alzó con el primer premio en el Certamen Regional, fruto de años de trabajo y dedicación.",
    fecha: "2026-02-10",
    categoria: "Logros",
    imagen: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&q=80",
    destacada: true,
    agrupaciones: ["banda-sinfonica"],
    contenido: [
      "Primer párrafo de la noticia completa.",
      "Segundo párrafo de la noticia completa.",
    ],
  },
  {
    slug: "loteria-de-navidad-2026",
    titulo: "Lotería de Navidad 2026",
    resumen:
      "💙🎄¡YA ESTÁ AQUÍ LA LOTERÍA DE NAVIDAD DEL ATENEO! 🎄💙",
    fecha: "2026-11-01",
    categoria: "Noticias",
    imagen: "/noticias/cartel-loteria-2026.jpeg",
    contenido: [
      "Las participaciones pueden conseguirse en los establecimientos colaboradores de Mieres o a través de cualquiera de los músicos del Ateneo. 🙌",
      "Cada participación cuesta 5 €: 4 € se juegan y 1 € es un donativo destinado a apoyar económicamente a la asociación y sus proyectos. ✨",
      "¿Cuál es el punto de venta más cercano? 📍 En el mapa pueden consultarse todos los establecimientos.",
      {
        url: "https://maps.google.com/",   // ← poner aquí el enlace real al mapa
        texto: "Ver puntos de venta en el mapa",
      },
      "Gracias por apoyar al Ateneo y ayudar a que siga haciendo música. 🎶 ¡Que nadie se quede sin la suya!",
    ],
  },
  {
    slug: "reportaje-la-nueva-espana",
    titulo: "Una bicefalia que suena bien: el Ateneo Musical de Mieres, con dos directores al frente, busca mayor proyección nacional",
    resumen:
      "El periódico regional dedica un reportaje para dar a conocer las dos nuevas caras que estarán al frente de su banda sinfónica",
    fecha: "2025-11-21",
    categoria: "Prensa",
    imagen: "/banda/julian-y-marcos.jpg",
    // Sin `imagen`: en las tarjetas saldrá la imagen por defecto con el logo
    agrupaciones: ["banda-sinfonica", "coral-cantares"],
    fuente: {
      medio: "La Nueva España",
      url: "https://www.lne.es/cuencas/2025/11/21/bicefalia-suena-ateneo-musical-mieres-123925362.html",   // ← poner aquí el enlace real al artículo
      fecha: "2025-11-21",
    },
    contenido: [
      "Resumen redactado por el Ateneo, con sus propias palabras.",
      "Segundo párrafo con los datos principales del reportaje.",
    ],
  },
]

// ── Funciones de acceso ──────────────────────────────────────

/** Rellena la imagen por defecto si la noticia no tiene foto propia. */
function completar(n: NoticiaDatos): Noticia {
  return {
    ...n,
    imagen: n.imagen ?? IMAGEN_POR_DEFECTO,
    tieneImagenPropia: Boolean(n.imagen),
  }
}

/** Todas las noticias, de la más reciente a la más antigua. */
export function getNoticias(): Noticia[] {
  return noticias.map(completar).sort((a, b) => b.fecha.localeCompare(a.fecha))
}

/** Una noticia concreta por su slug (o undefined si no existe). */
export function getNoticia(slug: string): Noticia | undefined {
  const n = noticias.find((n) => n.slug === slug)
  return n ? completar(n) : undefined
}

/**
 * Noticias de una agrupación, de la más reciente a la más antigua.
 * `limite` es opcional: getNoticiasPorAgrupacion("coral-cantares", 3) → las 3 últimas.
 */
export function getNoticiasPorAgrupacion(agrupacion: Agrupacion, limite?: number): Noticia[] {
  const filtradas = getNoticias().filter((n) => n.agrupaciones?.includes(agrupacion))
  return limite ? filtradas.slice(0, limite) : filtradas
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