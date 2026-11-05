// Datos y utilidades de eventos, compartidos por la portada,
// la página del calendario y la página de cada evento.

export type AgrupacionId = "banda" | "coral" | "charanga" | "claxon" | "camara" | "ateneo"
export type TipoId = "concierto" | "actuacion" | "ensayo" | "actividad"

export interface Evento {
  id: number
  titulo: string
  agrupacion: string
  tipo: TipoId
  fecha: string                // "2026-11-21"
  hora: string | null          // "20:00"
  lugar: string | null
  enlace_maps: string | null
  descripcion: string | null
  imagen: string | null        // cartel
  enlace_entradas: string | null
  destacado: boolean
}

// Nombre y colores de cada agrupación.
//   badge → bloque de fecha en la portada
//   chip  → etiqueta del evento en el calendario mensual
//   punto → puntito de color en los filtros
export const AGRUPACIONES: Record<AgrupacionId, {
  nombre: string; badge: string; chip: string; punto: string; imagen: string
}> = {
  banda: {
    nombre: "Banda Sinfónica",
    badge: "bg-primary-blue text-white",
    chip: "bg-primary-blue/10 text-primary-blue-700 border-primary-blue",
    punto: "bg-primary-blue",
    imagen: "/logo_ateneo.png",
  },
  coral: {
    nombre: "Coral Cantares",
    badge: "bg-accent-yellow text-foreground",
    chip: "bg-accent-yellow/10 text-accent-yellow-700 border-accent-yellow",
    punto: "bg-accent-yellow",
    imagen: "/coral/coral_cantares_logo.jpg",
  },
  claxon: {
    nombre: "Claxon Boys",
    badge: "bg-accent-green text-white",
    chip: "bg-accent-green/10 text-accent-green-700 border-accent-green",
    punto: "bg-accent-green",
    imagen: "/claxon/claxon_boys.jpg",
  },
  charanga: {
    nombre: "Charanga New Paentamala",
    badge: "bg-primary-blue text-white",
    chip: "bg-primary-blue/10 text-primary-blue-700 border-primary-blue",
    punto: "bg-primary-blue",
    imagen: "/charanga/charanga-logo.png",
  },
  camara: {
    nombre: "Grupos de cámara",
    badge: "bg-accent-green text-white",
    chip: "bg-accent-green/10 text-accent-green-700 border-accent-green",
    punto: "bg-accent-green",
    imagen: "/logo_ateneo.png",
  },
  ateneo: {
    nombre: "Ateneo Musical de Mieres",
    badge: "bg-primary-blue text-white",
    chip: "bg-primary-blue/10 text-primary-blue-700 border-primary-blue",
    punto: "bg-primary-blue",
    imagen: "/logo_ateneo.png",
  },
}

// Logo pequeño de cada agrupación (agenda de la portada)
export const LOGOS_AGRUPACION: Record<AgrupacionId, string> = {
  banda: "/logos/logo_ateneo-no-bg.png",
  coral: "/logos/coral_cantares_logo-no-bg.png",
  charanga: "/logos/charanga_new_paentamala-no-bg.png",
  claxon: "/logos/claxon_boys_logo-no-bg.png",
  camara: "/logos/logo_ateneo-no-bg.png",
  ateneo: "/logos/logo_ateneo-no-bg.png",
}

export const TIPOS: Record<TipoId, string> = {
  concierto: "Concierto",
  actuacion: "Actuación",
  ensayo: "Ensayo",
  actividad: "Actividad",
}

// Lo que sale en la portada: todo menos los ensayos
export const TIPOS_PUBLICOS: TipoId[] = ["concierto", "actuacion", "actividad"]

const MESES_CORTOS = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"]

// Dirección del PHP. En local se pone en .env.local; en el hosting es "/api"
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api"

// Pide los eventos al PHP
export async function obtenerEventos(params: {
  desde?: string
  hasta?: string
  agrupacion?: AgrupacionId
  tipos?: TipoId[]
  limite?: number
  pasados?: boolean
  id?: number
} = {}): Promise<Evento[]> {
  const query = new URLSearchParams()
  if (params.desde) query.set("desde", params.desde)
  if (params.hasta) query.set("hasta", params.hasta)
  if (params.agrupacion) query.set("agrupacion", params.agrupacion)
  if (params.tipos?.length) query.set("tipos", params.tipos.join(","))
  if (params.limite) query.set("limite", String(params.limite))
  if (params.pasados) query.set("pasados", "1")
  if (params.id) query.set("id", String(params.id))

  const res = await fetch(`${API_URL}/eventos.php?${query}`)
  if (!res.ok) throw new Error("No se pudieron cargar los eventos")
  return res.json()
}

// "2026-11-21" → { dia: "21", mes: "NOV", anio: "2026" }
export function partesFecha(fecha: string) {
  const [anio, mes, dia] = fecha.split("-")
  return { dia, mes: MESES_CORTOS[Number(mes) - 1], anio }
}

// "2026-11-21" → "sábado, 21 de noviembre de 2026"
export function fechaLarga(fecha: string) {
  const [a, m, d] = fecha.split("-").map(Number)
  return new Date(a, m - 1, d).toLocaleDateString("es-ES", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  })
}

// Fecha de JavaScript → "2026-11-21"
export function aISO(fecha: Date) {
  const m = String(fecha.getMonth() + 1).padStart(2, "0")
  const d = String(fecha.getDate()).padStart(2, "0")
  return `${fecha.getFullYear()}-${m}-${d}`
}

export function infoAgrupacion(id: string) {
  return AGRUPACIONES[id as AgrupacionId] ?? AGRUPACIONES.ateneo
}

// Agrupaciones de un evento: "banda,coral" → ["banda", "coral"]
// Si no hay ninguna válida, se considera un evento del Ateneo.
export function agrupacionesEvento(ev: Evento): AgrupacionId[] {
  const ids = (ev.agrupacion ?? "")
    .split(",")
    .map((a) => a.trim())
    .filter((a): a is AgrupacionId => a in AGRUPACIONES)
  return ids.length ? ids : ["ateneo"]
}

// Color de cada agrupación en la pelota del calendario pequeño
const COLOR_PELOTA: Record<AgrupacionId, string> = {
  banda: "var(--primary-blue)",
  coral: "var(--accent-yellow)",
  claxon: "var(--accent-green)",
  charanga: "var(--primary-blue)",
  camara: "var(--accent-green)",
  ateneo: "var(--primary-blue)",
}

// Fondo de la pelota: un solo color, o la pelota dividida en partes iguales
// (2 agrupaciones → mitades, 3 → tercios...)
export function fondoPelota(ids: AgrupacionId[]) {
  const colores = ids.map((id) => COLOR_PELOTA[id])
  if (colores.length === 1) return colores[0]
  const parte = 100 / colores.length
  const tramos = colores.map((c, i) => `${c} ${i * parte}% ${(i + 1) * parte}%`)
  return `conic-gradient(${tramos.join(", ")})`
}

// Corrige rutas mal escritas: "public/poster/x.jpg" o "poster/x.jpg" → "/poster/x.jpg"
// Las direcciones completas (https://...) se dejan tal cual.
export function rutaImagen(ruta: string | null | undefined): string | null {
  if (!ruta || !ruta.trim()) return null
  let r = ruta.trim().replace(/\\/g, "/")
  if (/^https?:\/\//.test(r)) return r
  r = r.replace(/^\/?public\//, "/")
  if (!r.startsWith("/")) r = "/" + r
  return r
}

// Imagen del evento, o la de su agrupación si no tiene cartel
export function imagenEvento(ev: Evento) {
  return rutaImagen(ev.imagen) ?? rutaImagen(AGRUPACIONES[agrupacionesEvento(ev)[0]].imagen) ?? ""
}

// Enlace a Google Maps: el que se haya pegado en el panel,
// o si no, una búsqueda del nombre del lugar en Mieres
export function urlMaps(ev: Evento) {
  if (ev.enlace_maps) return ev.enlace_maps
  if (!ev.lugar) return null
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ev.lugar + ", Mieres")}`
}

// Duración que se supone a un evento con hora (Google Calendar necesita una hora de fin)
const DURACION_HORAS = 2

// Enlace que abre Google Calendar con el evento ya relleno.
// Sin hora → evento de día completo. Con hora → dura DURACION_HORAS.
export function urlGoogleCalendar(ev: Evento) {
  const [a, m, d] = ev.fecha.split("-").map(Number)
  const dos = (n: number) => String(n).padStart(2, "0")
  // Fecha → "20261121" o "20261121T200000"
  const compacta = (f: Date, conHora: boolean) =>
    `${f.getFullYear()}${dos(f.getMonth() + 1)}${dos(f.getDate())}` +
    (conHora ? `T${dos(f.getHours())}${dos(f.getMinutes())}00` : "")

  let dates: string
  if (ev.hora) {
    const [h, min] = ev.hora.split(":").map(Number)
    const inicio = new Date(a, m - 1, d, h, min)
    const fin = new Date(inicio.getTime() + DURACION_HORAS * 60 * 60 * 1000)
    dates = `${compacta(inicio, true)}/${compacta(fin, true)}`
  } else {
    dates = `${compacta(new Date(a, m - 1, d), false)}/${compacta(new Date(a, m - 1, d + 1), false)}`
  }

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: ev.titulo,
    dates,
    ctz: "Europe/Madrid",
  })
  if (ev.lugar) params.set("location", `${ev.lugar}, Mieres`)
  if (typeof window !== "undefined") {
    params.set("details", `Más información: ${window.location.origin}/evento?id=${ev.id}`)
  }
  return `https://calendar.google.com/calendar/render?${params}`
}