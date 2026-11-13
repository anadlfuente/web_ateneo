// Cuerpo de una noticia: foto principal, resumen, bloques, fuentes y agrupaciones.
// Lo usan la página de la noticia y la vista previa del panel, para que se vean igual.

import { ExternalLink } from "lucide-react"
import {
  agrupaciones as nombresAgrupaciones,
  formatearFecha,
  urlArchivo,
  type Agrupacion,
  type BloqueContenido,
  type Fuente,
} from "@/lib/noticias"

type Props = {
  titulo: string
  resumen: string
  imagen: string | null              // foto principal propia (null si no tiene)
  imagenAlt?: string | null
  imagenLado?: "izquierda" | "derecha"
  pieImagen?: string | null
  contenido: BloqueContenido[]
  fuentes: Fuente[]
  agrupaciones: Agrupacion[]
}

export function NoticiaCuerpo({
  titulo, resumen, imagen, imagenAlt, imagenLado, pieImagen, contenido, fuentes, agrupaciones,
}: Props) {
  // Lado de la foto flotante (por defecto, derecha)
  const claseLado = imagenLado === "izquierda" ? "md:float-left md:mr-8" : "md:float-right md:ml-8"

  return (
    <>
      {/* flow-root: hace que todo lo que va después empiece debajo de la foto flotante */}
      <div className="flow-root">
        {imagen && (
          <figure className={`mb-6 md:w-[45%] ${claseLado}`}>
            <img src={urlArchivo(imagen)} alt={imagenAlt || titulo} className="w-full rounded-2xl object-cover" />
            {pieImagen && <figcaption className="mt-2 text-xs text-muted-foreground">{pieImagen}</figcaption>}
          </figure>
        )}

        <p className="text-xl text-foreground/80 leading-relaxed mb-8 font-serif">{resumen}</p>

        {/* Bloques del cuerpo, en el orden en que están en `contenido` */}
        <div className="space-y-6 text-base leading-relaxed text-foreground">
          {contenido.map((bloque, i) => {
            switch (bloque.tipo) {
              case "parrafo":
                return <p key={i}>{bloque.texto}</p>

              case "subtitulo":
                return (
                  <h2 key={i} className="!mt-10 text-xl md:text-2xl font-bold text-foreground">                    {bloque.texto}
                  </h2>
                )

              // Foto a ancho completo (clear-both: siempre debajo de la foto flotante)
              case "imagen":
                if (!bloque.src) return null
                return (
                  <figure key={i} className="!my-10 clear-both">
                    <img src={urlArchivo(bloque.src)} alt={bloque.alt} loading="lazy" className="w-full rounded-2xl object-cover" />
                    {bloque.pie && (
                      <figcaption className="mt-3 text-center text-sm text-muted-foreground">{bloque.pie}</figcaption>
                    )}
                  </figure>
                )

              // Cita destacada
              case "cita":
                return (
                  <figure key={i} className="!my-10 flow-root border-l-4 border-accent-green pl-6 md:pl-8">
                    <blockquote className="text-2xl md:text-3xl leading-snug font-semibold text-foreground">
                      <p>
                        <span aria-hidden="true" className="text-accent-green">“</span>
                        {bloque.texto}
                        <span aria-hidden="true" className="text-accent-green">”</span>
                      </p>
                    </blockquote>
                    {bloque.autor && (
                      <figcaption className="mt-3 text-sm uppercase tracking-wider text-muted-foreground">— {bloque.autor}</figcaption>
                    )}
                  </figure>
                )

              // Enlace destacado (botón)
              case "enlace":
                return (
                  <p key={i}>
                    <a
                      href={bloque.url}
                      target="_blank"
                      rel="noopener noreferrer"
className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary-blue text-foreground text-base font-semibold hover:bg-primary-blue/85 transition-colors"                    >
                      {bloque.texto}
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </p>
                )

              default:
                return null
            }
          })}
        </div>
      </div>

      {/* Fuentes de prensa: solo aparecen si la noticia tiene alguna */}
      {fuentes.length > 0 && (
        <div className="mt-12 border-t border-border pt-6 text-sm">
          <p className="font-semibold mb-2">{fuentes.length === 1 ? "Fuente" : "Fuentes"}</p>
          <ul className="space-y-1">
            {fuentes.map((f, i) => (
              <li key={i}>
                {f.medio}
                {f.fecha && ` (${formatearFecha(f.fecha)})`}
                {" – "}
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
className="inline-flex items-center gap-1 font-semibold text-foreground underline hover:no-underline"                >
                  Leer noticia completa<span className="sr-only"> en {f.medio}</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Agrupaciones relacionadas */}
      {agrupaciones.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {agrupaciones.map((a) => (
            <span
              key={a}
              className="px-3 py-1 rounded-full border border-border text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              {nombresAgrupaciones[a]?.nombre ?? a}
            </span>
          ))}
        </div>
      )}
    </>
  )
}