"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

const news = [
  {
    id: 1,
    title: "Ganamos el Certamen Regional de Bandas",
    excerpt: "Nuestra Banda Sinfonica se alzo con el primer premio en el Certamen Regional, consolidando anos de trabajo y dedicacion.",
    date: "10 Feb 2026",
    category: "Logros",
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Loteria de Navidad 2025",
    excerpt: "Ya tenemos los decimos. Colabora con la agrupacion comprando tu numero de la suerte.",
    date: "1 Nov 2025",
    category: "Noticias",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80",
  },
  {
    id: 3,
    title: "Reportaje en La Nueva Espana",
    excerpt: "El periodico regional nos dedica un extenso reportaje sobre nuestra historia y proyectos futuros.",
    date: "28 Oct 2025",
    category: "Prensa",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
  },
]

export function NewsSection() {
  return (
    <section id="noticias" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4">
              Actualidad
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
              Ultimas<br />
              Noticias
            </h2>
          </div>
          <Link 
            href="#todas-noticias"
            className="inline-flex items-center text-foreground text-sm font-medium tracking-wide uppercase hover:text-secondary transition-colors group"
          >
            Ver Todas
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* News grid - NY Phil style */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured article */}
          <Link
            href={`#noticia-${news[0].id}`}
            className="group relative aspect-[4/3] overflow-hidden"
          >
            <img 
              src={news[0].image} 
              alt={news[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-white/60 text-xs tracking-[0.2em] uppercase mb-2">
                {news[0].category} &middot; {news[0].date}
              </p>
              <h3 className="font-serif text-3xl text-white mb-3 group-hover:text-secondary transition-colors">
                {news[0].title}
              </h3>
              <p className="text-white/80 text-sm mb-4 max-w-md">
                {news[0].excerpt}
              </p>
              <span className="inline-flex items-center text-white text-sm font-medium tracking-wide uppercase group-hover:underline">
                Leer mas
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Other articles */}
          <div className="flex flex-col gap-px bg-border">
            {news.slice(1).map((item) => (
              <Link
                key={item.id}
                href={`#noticia-${item.id}`}
                className="group flex bg-white hover:bg-muted transition-colors"
              >
                {/* Image */}
                <div className="w-40 flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-grow p-6 flex flex-col justify-center">
                  <p className="text-xs tracking-[0.2em] text-secondary uppercase mb-1">
                    {item.category}
                  </p>
                  <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.excerpt}
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">{item.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
