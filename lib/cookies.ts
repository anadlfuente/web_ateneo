// ─────────────────────────────────────────────────────────────
// CONSENTIMIENTO DE COOKIES
// Guarda la elección de la persona en su propio navegador.
// No necesita backend: cada visitante tiene su elección en su equipo.
// ─────────────────────────────────────────────────────────────

export interface Consentimiento {
  necesarias: true  // siempre activas, no requieren consentimiento
  externos: boolean // contenido de terceros: vídeos de YouTube, mapas...
  fecha: string     // cuándo se dio el consentimiento (ISO)
  version: number
}

const CLAVE = "ateneo-consentimiento"

// Si cambiáis los servicios que usa la web (p. ej. añadís analítica),
// subid este número: se volverá a pedir el consentimiento a todo el mundo.
export const VERSION = 1

// Cada cuánto se vuelve a preguntar (la AEPD recomienda no superar 24 meses).
const DURACION_MESES = 12

export function leerConsentimiento(): Consentimiento | null {
  try {
    const guardado = localStorage.getItem(CLAVE)
    if (!guardado) return null

    const c = JSON.parse(guardado) as Consentimiento
    if (c.version !== VERSION) return null

    const caduca = new Date(c.fecha)
    caduca.setMonth(caduca.getMonth() + DURACION_MESES)
    if (new Date() > caduca) return null

    return c
  } catch {
    return null
  }
}

export function guardarConsentimiento(externos: boolean): Consentimiento {
  const c: Consentimiento = {
    necesarias: true,
    externos,
    fecha: new Date().toISOString(),
    version: VERSION,
  }
  try {
    localStorage.setItem(CLAVE, JSON.stringify(c))
  } catch {
    // Navegación privada o almacenamiento bloqueado: la elección
    // dura lo que dure la visita, que es lo correcto en ese caso.
  }
  return c
}