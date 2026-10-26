import { contarFotos, formatearFecha, type Evento } from "@/components/galeria/tipos"

type Props = {
  eventos: Evento[]
  onAbrir: (evento: Evento) => void
}

export function TarjetasEventos({ eventos, onAbrir }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {eventos.map((evento) => (
        <button
          key={evento.id}
          type="button"
          onClick={() => onAbrir(evento)}
          className="group overflow-hidden rounded-xl bg-white text-left shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue"
        >
          <div className="aspect-[4/3] overflow-hidden bg-gray-100">
            {evento.portada && (
              <img
                src={evento.portada}
                alt={`Portada de ${evento.titulo}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            )}
          </div>

          <div className="p-4">
            <h3 className="font-serif text-xl">{evento.titulo}</h3>
            <p className="mt-1 text-sm text-gray-600">
              {[formatearFecha(evento.fecha), contarFotos(evento.fotos.length)].filter(Boolean).join(" · ")}
            </p>

            {evento.agrupaciones.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {evento.agrupaciones.map((a) => (
                  <span key={a} className="rounded-full border px-2 py-0.5 text-xs text-gray-600">
                    {a}
                  </span>
                ))}
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  )
}