// Vídeo de YouTube que solo se carga con consentimiento.
// Uso: <VideoYoutube id="dQw4w9WgXcQ" titulo="Concierto de Santa Cecilia 2025" />
// El `id` es lo que va después de "watch?v=" en la URL del vídeo.

import { ContenidoExterno } from "./contenido-externo"

export function VideoYoutube({ id, titulo }: { id: string; titulo: string }) {
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-muted">
      <ContenidoExterno servicio="YouTube">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={titulo}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </ContenidoExterno>
    </div>
  )
}