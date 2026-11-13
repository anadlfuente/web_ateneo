// Organigrama de la Banda y la Coral, leído de la base de datos a través del PHP.

export type Musico = {
  nombre: string
  cargo: string | null
}

export type SeccionOrganigrama = {
  nombre: string
  miembros: Musico[]
}

// Dirección del PHP. En local se pone en .env.local; en el hosting es "/api"
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api"

// Pide el organigrama de una agrupación al PHP
export async function obtenerOrganigrama(agrupacion: "banda" | "coral"): Promise<SeccionOrganigrama[]> {
  const res = await fetch(`${API_URL}/organigrama.php?agrupacion=${agrupacion}`)
  if (!res.ok) throw new Error("No se pudo cargar el organigrama")
  return res.json()
}

// { nombre: "Nacho Fernández López", cargo: "Concertino" } → "Nacho Fernández López (Concertino)"
export function nombreConCargo(m: Musico) {
  return m.cargo ? `${m.nombre} (${m.cargo})` : m.nombre
}