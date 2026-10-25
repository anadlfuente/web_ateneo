// Tipos y utilidades compartidas por la galería.
// El formato coincide con el de public/galeria.json (generado por generar-galeria.mjs).

export type Foto = {
  src: string
  tipo: "imagen" | "video"
  ancho: number | null
  alto: number | null
  autor: string | null
  enlaceAutor: string | null
}

export type Evento = {
  id: string
  titulo: string
  fecha: string | null // "2026-05-01", "2026-05" o "2026"
  anio: number | null
  agrupaciones: string[]
  portada: string | null
  fotos: Foto[]
}

// Una foto junto con el evento al que pertenece (para mostrar título, fecha...)
export type FotoConEvento = Foto & { evento: Evento }

// Valor del filtro de año para los eventos sin fecha
export const SIN_FECHA = "sin-fecha"

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
]

// "2026-05-01" -> "1 de mayo de 2026" · "2026-05" -> "mayo de 2026" · "2026" -> "2026"
export function formatearFecha(fecha: string | null): string {
  if (!fecha) return ""
  const [anio, mes, dia] = fecha.split("-")
  const nombreMes = mes ? MESES[Number(mes) - 1] : ""
  if (dia && nombreMes) return `${Number(dia)} de ${nombreMes} de ${anio}`
  if (nombreMes) return `${nombreMes} de ${anio}`
  return anio
}

export function contarFotos(n: number): string {
  return n === 1 ? "1 foto" : `${n} fotos`
}

export function cumpleAnio(evento: Evento, anio: string): boolean {
  if (anio === "") return true
  if (anio === SIN_FECHA) return evento.anio === null
  return String(evento.anio) === anio
}

export function cumpleAgrupaciones(evento: Evento, seleccionadas: string[]): boolean {
  if (seleccionadas.length === 0) return true
  return seleccionadas.some((a) => evento.agrupaciones.includes(a))
}