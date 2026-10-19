// Página de detalle de una noticia: /noticias/<slug>
// Se genera automáticamente una página por cada noticia de lib/noticias.ts

import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import {
  getNoticias,
  getNoticia,
  formatearFecha,
  estiloCategoria,
  agrupaciones,
  BANNER_NOTICIAS,
} from "@/lib/noticias"
import { RedesFlotante } from "@/components/redes-flotante"

// Necesario para exportar la web como estática: genera una página por noticia
export function generateStaticParams() {
  return getNoticias().map((n) => ({ slug: n.slug }))
}

// Título y descripción de la pestaña / buscadores
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const noticia = getNoticia(slug)
  if (!noticia) return {}
  return {
    title: `${noticia.titulo} | Ateneo Musical de Mieres`,
    description: noticia.resumen,
  }
}

export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const noticia = getNoticia(slug)
  if (!noticia) notFound()

  const Icono = estiloCategoria[noticia.categoria].icono

  // Lado de la foto flotante (por defecto, derecha)
  const claseLado =
    noticia.imagenLado === "izquierda" ? "md:float-left md:mr-8" : "md:float-right md:ml-8"

  // Otras noticias recientes para el final de la página
  const relacionadas = getNoticias().filter((n) => n.slug !== noticia.slug).slice(0, 3)

  return (
    <main className="min-h-screen">
      <Header />

      {/* Cabecera con el banner general de noticias */}
      <PageHero imagen={BANNER_NOTICIAS} alt="" altoMinimo="min-h-[35vh]">
        <div className={`inline-flex px-3 py-1 mb-4 ${estiloCategoria[noticia.categoria].clase} rounded-lg items-center gap-2`}>
          <Icono className="w-4 h-4" />
          <span className="text-sm font-bold uppercase tracking-wider">{noticia.categoria}</span>
        </div>
        <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-3 max-w-4xl">{noticia.titulo}</h1>
        <time dateTime={noticia.fecha} className="text-white/70 text-sm">
          {formatearFecha(noticia.fecha)}
        </time>
      </PageHero>

      {/* Cuerpo */}
      <article className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <Link
            href="/noticias"
            className="inline-flex items-center text-accent text-sm font-semibold uppercase tracking-wide mb-10 hover:text-accent/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a noticias
          </Link>

          {/* flow-root: hace que todo lo que va después empiece debajo de la foto flotante */}
          <div className="flow-root">
            {/* Foto de la noticia flotando a un lado (solo si se añadió una propia) */}
            {noticia.tieneImagenPropia && (
              <figure className={`mb-6 md:w-[45%] ${claseLado}`}>
                <img
                  src={noticia.imagen}
                  alt={noticia.titulo}
                  className="w-full rounded-2xl object-cover"
                />
              </figure>
            )}

            <p className="text-xl text-foreground/80 leading-relaxed mb-8 font-serif">{noticia.resumen}</p>

            {/* Párrafos, fotos y enlaces, en el orden en que están en `contenido` */}
            <div className="space-y-6 text-base leading-relaxed text-foreground">
              {noticia.contenido.map((bloque, i) => {
                // Párrafo de texto
                if (typeof bloque === "string") {
                  return <p key={i}>{bloque}</p>
                }

                // Foto a ancho completo (clear-both: siempre debajo de la foto flotante)
                if ("src" in bloque) {
                  return (
                    <figure key={i} className="!my-10 clear-both">
                      <img
                        src={bloque.src}
                        alt={bloque.alt}
                        loading="lazy"
                        className="w-full rounded-2xl object-cover"
                      />
                      {bloque.pie && (
                        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                          {bloque.pie}
                        </figcaption>
                      )}
                    </figure>
                  )
                }

                // Enlace destacado (botón)
                return (
                  <p key={i}>
                    <a
                      href={bloque.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-white text-base font-semibold hover:bg-accent/90 transition-colors"
                    >
                      {bloque.texto}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </p>
                )
              })}
            </div>
          </div>

          {/* Fuente de prensa: solo aparece si la noticia la tiene */}
          {noticia.fuente && (
            <div className="mt-12 border-t border-border pt-6 text-sm">
              <span className="font-semibold">Fuente:</span> {noticia.fuente.medio}
              {noticia.fuente.fecha && ` (${formatearFecha(noticia.fuente.fecha)})`}
              {" – "}
              <a
                href={noticia.fuente.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:text-accent/80"
              >
                Leer noticia completa
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Agrupaciones relacionadas */}
          {noticia.agrupaciones && noticia.agrupaciones.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {noticia.agrupaciones.map((a) => (
                <span
                  key={a}
                  className="px-3 py-1 rounded-full border border-border text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {agrupaciones[a].nombre}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Otras noticias */}
      {relacionadas.length > 0 && (
        <section className="bg-muted/40 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="font-serif text-3xl mb-8">Otras noticias</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relacionadas.map((n) => (
                <Link
                  key={n.slug}
                  href={`/noticias/${n.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all"
                >
                  <div className="overflow-hidden h-40">
                    <img
                      src={n.imagen}
                      alt={n.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      {n.categoria} · {formatearFecha(n.fecha)}
                    </p>
                    <h3 className="font-serif text-lg group-hover:text-accent transition-colors line-clamp-2">
                      {n.titulo}
                    </h3>
                    <span className="inline-flex items-center text-accent text-xs font-semibold uppercase mt-3">
                      Leer más <ArrowRight className="w-3 h-3 ml-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <RedesFlotante />
      <Footer />
    </main>
  )
}