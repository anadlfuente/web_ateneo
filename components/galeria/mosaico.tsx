import type { FotoConEvento } from "@/components/galeria/tipos"

type Props = {
  fotos: FotoConEvento[]
  onAbrir: (indice: number) => void
  mostrarEvento?: boolean // en "Todas las fotos", enseña el evento al pasar el ratón
}

// Proporción real de cada foto, para que no se recorte ni "salte" al cargar
function proporcion(foto: FotoConEvento): string {
  return foto.ancho && foto.alto ? `${foto.ancho} / ${foto.alto}` : "16 / 9"
}

export function Mosaico({ fotos, onAbrir, mostrarEvento = false }: Props) {
  return (
    <div className="columns-2 gap-3 md:columns-3 lg:columns-4">
      {fotos.map((foto, i) => (
        <button
          key={foto.src}
          type="button"
          onClick={() => onAbrir(i)}
          aria-label={`Abrir ${foto.tipo === "video" ? "vídeo" : "foto"} de ${foto.evento.titulo}`}
          style={{ aspectRatio: proporcion(foto) }}
          className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-lg bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue"
        >
          {foto.tipo === "video" ? (
            <>
              <video
                src={`${foto.src}#t=0.1`}
                preload="metadata"
                muted
                playsInline
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-xl text-white">
                  ▶
                </span>
              </span>
            </>
          ) : (
            <img
              src={foto.src}
              alt={foto.evento.titulo}
              width={foto.ancho ?? undefined}
              height={foto.alto ?? undefined}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          )}

          {mostrarEvento && (
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-left text-xs text-white opacity-0 transition group-hover:opacity-100">
              {foto.evento.titulo}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}