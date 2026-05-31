"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const ITEMS_PER_PAGE = 3

const news = [
  {
    id: 1,
    title: "Ganamos el Certamen Regional de Bandas",
    excerpt: "...",
    date: "2026-02-10",
    category: "Logros",
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&q=80",
  },
  {
    id: 2,
    title: "Loteria de Navidad 2025",
    excerpt: "...",
    date: "2025-11-01",
    category: "Noticias",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80",
  },
  {
    id: 3,
    title: "Reportaje en La Nueva Espana",
    excerpt: "Aquí supongo que explico algo",
    date: "2025-10-28",
    category: "Prensa",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
  },
  {
    id: 4,
    title: "Prueba 2",
    excerpt: "...",
    date: "2026-10-28",
    category: "Prensa",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
  },
]

export default function NewsPage() {
  const sortedNews = [...news].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(sortedNews.length / ITEMS_PER_PAGE)

  const start = (page - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE

  const currentNews = sortedNews.slice(start, end)

  return (
    <main className="min-h-screen">

      <Header />

      {/* Banner */}
      <section className="relative h-[30vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/banner_2.png')" }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-serif">
            Últimas noticias
          </h1>
        </div>
      </section>

      {/* Feed */}
      <div className="bg-white pt-20 pb-20">
        <div className="max-w-5xl mx-auto px-6 space-y-10">

          {currentNews.map((item) => (
            <article
              key={item.id}
              className="group border-b border-border pb-10"
            >
              <Link href={`#noticia-${item.id}`} className="block">

                <div className="overflow-hidden rounded-2xl mb-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3 uppercase tracking-wider">
                  <span>{item.category}</span>
                  <span>•</span>
                  <span>
                    {new Date(item.date).toLocaleDateString("es-ES")}
                  </span>
                </div>

                <h2 className="font-serif text-2xl md:text-3xl mb-3 group-hover:text-accent transition-colors">
                  {item.title}
                </h2>

                <p className="text-muted-foreground mb-4 max-w-3xl">
                  {item.excerpt}
                </p>

                <span className="inline-flex items-center text-accent font-semibold uppercase text-sm">
                  Leer más
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>

              </Link>
            </article>
          ))}

          {/* PAGINACIÓN */}
          <div className="flex items-center justify-center gap-4 pt-10">

            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded disabled:opacity-40"
            >
              Anterior
            </button>

            <span className="text-sm">
              Página {page} de {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-40"
            >
              Siguiente
            </button>

          </div>

        </div>
      </div>

      <Footer />

    </main>
  )
}