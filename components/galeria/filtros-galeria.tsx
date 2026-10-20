import { SIN_FECHA } from "@/components/galeria/tipos"

type Props = {
  opcionesAgrupacion: { nombre: string; cantidad: number }[]
  seleccionadas: string[]
  onCambiarSeleccionadas: (valor: string[]) => void
  opcionesAnio: string[]
  anio: string
  onCambiarAnio: (valor: string) => void
  hayFiltros: boolean
  onQuitarFiltros: () => void
}

export function FiltrosGaleria({
  opcionesAgrupacion,
  seleccionadas,
  onCambiarSeleccionadas,
  opcionesAnio,
  anio,
  onCambiarAnio,
  hayFiltros,
  onQuitarFiltros,
}: Props) {
  function alternar(nombre: string) {
    onCambiarSeleccionadas(
      seleccionadas.includes(nombre)
        ? seleccionadas.filter((a) => a !== nombre)
        : [...seleccionadas, nombre]
    )
  }

  return (
    <div className="mb-8 flex flex-col gap-5 border-b pb-6 md:flex-row md:items-end md:justify-between">
      {/* AGRUPACIONES */}
      {opcionesAgrupacion.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">Agrupación</p>
          <div className="flex flex-wrap gap-2">
            {opcionesAgrupacion.map(({ nombre, cantidad }) => {
              const activa = seleccionadas.includes(nombre)
              return (
                <button
                  key={nombre}
                  type="button"
                  aria-pressed={activa}
                  onClick={() => alternar(nombre)}
                  className={`rounded-full border px-3 py-1 text-sm transition ${
                    activa
                      ? "border-primary-blue bg-primary-blue text-white"
                      : "bg-white text-gray-700 hover:bg-primary-blue/10"
                  }`}
                >
                  {nombre} <span className={activa ? "text-white/80" : "text-gray-400"}>({cantidad})</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* AÑO + QUITAR FILTROS */}
      <div className="flex items-end gap-4">
        <label className="text-sm font-medium text-gray-700">
          Año
          <select
            value={anio}
            onChange={(e) => onCambiarAnio(e.target.value)}
            className="mt-2 block rounded-lg border bg-white px-3 py-1.5 font-normal"
          >
            <option value="">Todos</option>
            {opcionesAnio.map((valor) => (
              <option key={valor} value={valor}>
                {valor === SIN_FECHA ? "Sin fecha" : valor}
              </option>
            ))}
          </select>
        </label>

        {hayFiltros && (
          <button
            type="button"
            onClick={onQuitarFiltros}
            className="pb-2 text-sm text-primary-blue hover:underline"
          >
            Quitar filtros
          </button>
        )}
      </div>
    </div>
  )
}