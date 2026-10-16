// ─────────────────────────────────────────────────────────────
// FUENTE ÚNICA DE NOTICIAS
// Para publicar una noticia nueva, solo hay que añadir un objeto
// a la lista `noticias`. La portada, el listado y la página de
// detalle se actualizan solos.
// ─────────────────────────────────────────────────────────────

import { Trophy, Ticket, FileText, Newspaper, Music, type LucideIcon } from "lucide-react"

export type Categoria = "Logros" | "Noticias" | "Prensa" | "Conciertos"

export interface Noticia {
  slug: string          // identificador para la URL: /noticias/<slug> (sin tildes ni espacios)
  titulo: string
  resumen: string       // 1-2 frases, se usa en tarjetas y listados
  fecha: string         // formato "AAAA-MM-DD"
  categoria: Categoria
  imagen: string        // preferiblemente en /public/noticias/...
  contenido: string[]   // cada elemento es un párrafo del texto completo
  destacada?: boolean   // si es true, aparece grande en la portada
}

const noticias: Noticia[] = [
  {
    slug: "certamen-regional-de-bandas-2026",
    titulo: "Ganamos el Certamen Regional de Bandas",
    resumen:
      "Nuestra Banda Sinfónica se alzó con el primer premio en el Certamen Regional, consolidando años de trabajo y dedicación.",
    fecha: "2026-02-10",
    categoria: "Logros",
    imagen: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&q=80",
    destacada: true,
    contenido: [
      "Primer párrafo de la noticia completa.",
      "Segundo párrafo de la noticia completa.",
    ],
  },
  {
    slug: "loteria-de-navidad-2025",
    titulo: "Lotería de Navidad 2025",
    resumen:
      "Ya tenemos los décimos. Colabora con la agrupación comprando tu número de la suerte.",
    fecha: "2025-11-01",
    categoria: "Noticias",
    imagen: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&q=80",
    contenido: ["Texto completo de la noticia."],
  },
  {
    slug: "reportaje-la-nueva-espana",
    titulo: "Reportaje en La Nueva España",
    resumen:
      "El periódico regional nos dedica un extenso reportaje sobre nuestra historia y proyectos futuros.",
    fecha: "2025-10-28",
    categoria: "Prensa",
    imagen: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80",
    contenido: ["Texto completo de la noticia."],
  },
]

// ── Funciones de acceso ──────────────────────────────────────

/** Todas las noticias, de la más reciente a la más antigua. */
export function getNoticias(): Noticia[] {
  return [...noticias].sort((a, b) => b.fecha.localeCompare(a.fecha))
}

/** Una noticia concreta por su slug (o undefined si no existe). */
export function getNoticia(slug: string): Noticia | undefined {
  return noticias.find((n) => n.slug === slug)
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

export const iconoPorDefecto = Newspaper