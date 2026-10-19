"use client"

// Listado completo de noticias con paginación y filtro por categoría.

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { getNoticias, formatearFecha, type Categoria } from "@/lib/noticias"
import { RedesFlotante } from "@/components/redes-flotante"

const POR_PAGINA = 6

export default function NoticiasPage() {
  const todas = getNoticias()
  const categorias = Array.from(new Set(todas.map((n) => n.categoria)))

  const [categoria, setCategoria] = useState<Categoria | "Todas">("Todas")
  const [pagina, setPagina] = useState(1)

  const filtradas = categoria === "Todas" ? todas : todas.filter((n) => n.categoria === categoria)
  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / POR_PAGINA))
  const actuales = filtradas.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA)

  const irAPagina = (p: number) => {
    setPagina(p)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const cambiarCategoria = (c: Categoria | "Todas") => {
    setCategoria(c)
    setPagina(1)
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <PageHero imagen="/banner_2.png" altoMinimo="min-h-[40vh]">
        <h1 className="text-white text-5xl md:text-7xl font-serif">Últimas noticias</h1>
      </PageHero>

      <div className="bg-white pt-16 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* Filtro por categoría */}
          <div className="flex flex-wrap gap-2 mb-12">
            {(["Todas", ...categorias] as const).map((c) => (
              <button
                key={c}
                onClick={() => cambiarCategoria(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  categoria === c ? "bg-accent text-white" : "bg-muted text-foreground hover:bg-accent/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Feed */}
          <div className="space-y-10">
            {actuales.map((item) => (
              <article key={item.slug} className="group border-b border-border pb-10">
                <Link href={`/noticias/${item.slug}`} className="block">
                  <div className="overflow-hidden rounded-2xl mb-6">
                    <img
                      src={item.imagen}
                      alt={item.titulo}
                      className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3 uppercase tracking-wider">
                    <span>{item.categoria}</span>
                    <span>•</span>
                    <time dateTime={item.fecha}>{formatearFecha(item.fecha)}</time>
                  </div>

                  <h2 className="font-serif text-2xl md:text-3xl mb-3 group-hover:text-accent transition-colors">
                    {item.titulo}
                  </h2>
                  <p className="text-muted-foreground mb-4 max-w-3xl">{item.resumen}</p>

                  <span className="inline-flex items-center text-accent font-semibold uppercase text-sm">
                    Leer más
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </article>
            ))}

            {actuales.length === 0 && (
              <p className="text-center text-muted-foreground">No hay noticias en esta categoría.</p>
            )}
          </div>

          {/* Paginación (solo si hace falta) */}
          {totalPaginas > 1 && (
            <div className="flex items-center justify-center gap-4 pt-12">
              <button
                onClick={() => irAPagina(pagina - 1)}
                disabled={pagina === 1}
                className="px-4 py-2 border rounded disabled:opacity-40"
              >
                Anterior
              </button>
              <span className="text-sm">Página {pagina} de {totalPaginas}</span>
              <button
                onClick={() => irAPagina(pagina + 1)}
                disabled={pagina === totalPaginas}
                className="px-4 py-2 border rounded disabled:opacity-40"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>
      <RedesFlotante />
      <Footer />
    </main>
  )
}