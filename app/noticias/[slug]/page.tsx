// Página de detalle de una noticia: /noticias/<slug>
// Se genera automáticamente una página por cada noticia de lib/noticias.ts

import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { getNoticias, getNoticia, formatearFecha, estiloCategoria } from "@/lib/noticias"
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

  // Otras noticias recientes para el final de la página
  const relacionadas = getNoticias().filter((n) => n.slug !== noticia.slug).slice(0, 3)

  return (
    <main className="min-h-screen">
      <Header />

      {/* Cabecera con imagen */}
      <PageHero imagen={noticia.imagen} alt={noticia.titulo} altoMinimo="min-h-[55vh]">
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
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/noticias"
            className="inline-flex items-center text-accent text-sm font-semibold uppercase tracking-wide mb-10 hover:text-accent/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a noticias
          </Link>

          <p className="text-xl text-foreground/80 leading-relaxed mb-8 font-serif">{noticia.resumen}</p>

          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            {noticia.contenido.map((parrafo, i) => (
              <p key={i}>{parrafo}</p>
            ))}
          </div>
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