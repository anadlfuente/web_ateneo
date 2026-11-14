// Comunicación del panel de administración con el PHP (api/admin/).
// Envía la cookie de sesión y el código anti-envíos falsos en cada petición.

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api"

let csrf: string | null = null

/**
 * Error con el mensaje que manda el PHP y su código (401 = sesión caducada).
 * `campos` trae el error de cada campo cuando falla la comprobación (código 422).
 */
export class ErrorAdmin extends Error {
  estado: number
  campos: Record<string, string>
  constructor(mensaje: string, estado: number, campos: Record<string, string> = {}) {
    super(mensaje)
    this.estado = estado
    this.campos = campos
  }
}

/** Petición al PHP del panel. `datos` se envía como JSON. */
export async function peticionAdmin<T>(
  ruta: string,
  opciones: { metodo?: "GET" | "POST"; datos?: unknown } = {},
): Promise<T> {
  const cabeceras: Record<string, string> = {}
  if (opciones.datos !== undefined) cabeceras["Content-Type"] = "application/json"
  if (csrf) cabeceras["X-CSRF-Token"] = csrf

  let res: Response
  try {
    res = await fetch(`${API_URL}/admin/${ruta}`, {
      method: opciones.metodo ?? "GET",
      credentials: "include",
      headers: cabeceras,
      body: opciones.datos !== undefined ? JSON.stringify(opciones.datos) : undefined,
    })
  } catch {
    throw new ErrorAdmin("No se ha podido conectar con el servidor. Revisa la conexión.", 0)
  }

  const cuerpo = await res.json().catch(() => ({}))
  if (!res.ok) throw new ErrorAdmin(cuerpo.error ?? "Ha habido un error. Inténtalo de nuevo.", res.status, cuerpo.campos ?? {})
  return cuerpo as T
}

/** Envía un archivo al PHP del panel (para las fotos). */
export async function enviarArchivoAdmin<T>(
  ruta: string,
  campo: string,
  archivo: File,
  extra: Record<string, string> = {},
): Promise<T> {
  const datos = new FormData()
  datos.append(campo, archivo)
  Object.entries(extra).forEach(([clave, valor]) => datos.append(clave, valor))
  
  let res: Response
  try {
    res = await fetch(`${API_URL}/admin/${ruta}`, {
      method: "POST",
      credentials: "include",
      headers: csrf ? { "X-CSRF-Token": csrf } : {},
      body: datos,
    })
  } catch {
    throw new ErrorAdmin("No se ha podido conectar con el servidor. Revisa la conexión.", 0)
  }

  const cuerpo = await res.json().catch(() => ({}))
  if (!res.ok) throw new ErrorAdmin(cuerpo.error ?? "No se ha podido subir la foto.", res.status)
  return cuerpo as T
}

/** true si hay una sesión abierta. */
export async function comprobarSesion(): Promise<boolean> {
  const r = await peticionAdmin<{ conectado: boolean; csrf: string | null }>("estado.php")
  csrf = r.csrf
  return r.conectado
}

export async function iniciarSesion(usuario: string, contrasena: string): Promise<void> {
  const r = await peticionAdmin<{ csrf: string }>("login.php", { metodo: "POST", datos: { usuario, contrasena } })
  csrf = r.csrf
}

export async function cerrarSesion(): Promise<void> {
  try {
    await peticionAdmin("logout.php", { metodo: "POST", datos: {} })
  } finally {
    csrf = null
  }
}