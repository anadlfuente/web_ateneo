"use client"

// Página de una noticia.
// En el hosting se abre como /noticias/<slug>/ (lo redirige aquí el PHP del paso 5).
// En local se abre como /noticias/ver/?slug=<slug>.
// Es una sola página que pide la noticia al PHP: así cualquier noticia nueva tiene su página al momento.

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import { NoticiaCuerpo } from "@/components/noticia-cuerpo"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import {
  obtenerNoticia,
  useNoticias,
  urlNoticia,
  formatearFecha,
  estiloCategoria,
  BANNER_NOTICIAS,
  type Noticia,
} from "@/lib/noticias"
import { RedesFlotante } from "@/components/redes-flotante"
import { MigasDePan } from "@/components/migas-de-pan"
import { CompartirNoticia } from "@/components/compartir-noticia"

// Saca el slug de ?slug=... o, en el hosting, de /noticias/<slug>/
function slugDeLaDireccion(param: string | null): string | null {
  if (param) return param
  const m = window.location.pathname.match(/^\/noticias\/([^/]+)\/?$/)
  return m && m[1] !== "ver" ? decodeURIComponent(m[1]) : null
}

function DetalleNoticia() {
  const param = useSearchParams().get("slug")
  const [noticia, setNoticia] = useState<Noticia | null>(null)
  const [estado, setEstado] = useState<"cargando" | "ok" | "no-existe" | "error">("cargando")
  const { noticias: recientes } = useNoticias({ limite: 4 })

  useEffect(() => {
    const slug = slugDeLaDireccion(param)
    if (!slug) {
      setEstado("no-existe")
      return
    }
    setEstado("cargando")
    obtenerNoticia(slug)
      .then((datos) => {
        if (!datos) {
          setEstado("no-existe")
          return
        }
        setNoticia(datos)
        setEstado("ok")
                document.title = `${datos.titulo} | Ateneo Musical de Mieres`
        // Al cargar, Next vuelve a poner la descripción general de la web: se cambia por la de la noticia
        document
          .querySelectorAll('meta[name="description"]')
          .forEach((m) => m.setAttribute("content", datos.resumen))
      })
      .catch(() => setEstado("error"))
  }, [param])

  // Mientras carga, si no existe o si falla: banner general y un mensaje
  if (estado !== "ok" || !noticia) {
    return (
      <>
        <PageHero imagen={BANNER_NOTICIAS} alt="" altoMinimo="min-h-[35vh]">
          <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight">Noticias</h1>
        </PageHero>
        <div className="bg-white py-16 min-h-[40vh]">
          <div className="max-w-5xl mx-auto px-6 text-center">
            {estado === "cargando" && (
              <p role="status" aria-live="polite" className="text-muted-foreground">Cargando noticia…</p>
            )}
            {estado === "no-existe" && <p>Esta noticia no existe o ya no está publicada.</p>}
            {estado === "error" && (
              <p role="alert">No se ha podido cargar la noticia. Inténtalo de nuevo más tarde.</p>
            )}
            <Link
              href="/noticias"
              className="inline-flex items-center text-accent text-sm font-semibold uppercase tracking-wide mt-8 hover:text-accent/80"
            >
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              Ver todas las noticias
            </Link>
          </div>
        </div>
      </>
    )
  }

  const Icono = estiloCategoria[noticia.categoria].icono

  // Otras noticias recientes para el final de la página
  const relacionadas = (recientes ?? []).filter((n) => n.slug !== noticia.slug).slice(0, 3)

  return (
    <>
      {/* Cabecera con el banner general de noticias */}
      <PageHero imagen={BANNER_NOTICIAS} alt="" altoMinimo="min-h-[35vh]">
        <div className={`inline-flex px-3 py-1 mb-4 ${estiloCategoria[noticia.categoria].clase} rounded-lg items-center gap-2`}>
          <Icono className="w-4 h-4" aria-hidden="true" />
          <span className="text-sm font-bold uppercase tracking-wider">{noticia.categoria}</span>
        </div>
        <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-3 max-w-4xl">{noticia.titulo}</h1>
        <p className="text-white/70 text-sm">
          {noticia.autor && (
            <>
              Por <span className="font-semibold text-white">{noticia.autor}</span>
              <span aria-hidden="true"> · </span>
            </>
          )}
          <time dateTime={noticia.fecha}>{formatearFecha(noticia.fecha)}</time>
        </p>
      </PageHero>

      {/* Migas de pan */}
      <MigasDePan items={[{ nombre: "Noticias", href: "/noticias" }, { nombre: noticia.titulo }]} />

      {/* Cuerpo */}
      <article className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <Link
            href="/noticias"
            className="inline-flex items-center text-accent text-sm font-semibold uppercase tracking-wide mb-10 hover:text-accent/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            Volver a noticias
          </Link>

                    <NoticiaCuerpo {...noticia} imagen={noticia.tieneImagenPropia ? noticia.imagen : null} />

          <CompartirNoticia titulo={noticia.titulo} imagen={noticia.imagen} />
        </div>
      </article>

      {/* Otras noticias */}
      {relacionadas.length > 0 && (
        <section className="bg-muted/40 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="font-serif text-3xl mb-8">Otras noticias</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relacionadas.map((n) => (
                <a
                  key={n.slug}
                  href={urlNoticia(n.slug)}
                  className="group bg-white rounded-2xl overflow-hidden transition-all"
                >
                  <div className="overflow-hidden h-40">
                    <img
                      src={n.imagen}
                      alt={n.imagenAlt || n.titulo}
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
                      Leer más <ArrowRight className="w-3 h-3 ml-1" aria-hidden="true" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default function NoticiaPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Suspense es necesario para que la página se pueda exportar como estática.
          El id "noticia-precargada" lo usará el PHP del paso 5 para meter el texto para buscadores. */}
      <Suspense fallback={<div id="noticia-precargada" className="min-h-[60vh]" />}>
        <DetalleNoticia />
      </Suspense>
      <RedesFlotante />
      <Footer />
    </main>
  )
}