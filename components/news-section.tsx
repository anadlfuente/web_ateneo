"use client"

import { ArrowRight, Newspaper, Trophy, Ticket, FileText } from "lucide-react"
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
    icon: Trophy,
    color: "secondary",
  },
  {
    id: 2,
    title: "Loteria de Navidad 2025",
    excerpt: "Ya tenemos los decimos. Colabora con la agrupacion comprando tu numero de la suerte.",
    date: "1 Nov 2025",
    category: "Noticias",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80",
    icon: Ticket,
    color: "primary",
  },
  {
    id: 3,
    title: "Reportaje en La Nueva Espana",
    excerpt: "El periodico regional nos dedica un extenso reportaje sobre nuestra historia y proyectos futuros.",
    date: "28 Oct 2025",
    category: "Prensa",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
    icon: FileText,
    color: "accent",
  },
]

const getCategoryColor = (color: string) => {
  switch(color) {
    case "primary": return "bg-primary-blue text-white"
    case "secondary": return "bg-accent-yellow text-foreground"
    case "accent": return "bg-accent-green text-white"
    default: return "bg-primary-blue text-white"
  }
}

export function NewsSection() {
  const featuredNews = news[0]
  const FeaturedIcon = featuredNews.icon
  
  return (
    <section id="noticias" className="py-24 bg-white relative overflow-hidden z-10">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
              <Newspaper className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-semibold tracking-wider uppercase">Actualidad</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
              Últimas <span className="text-accent">Noticias</span>
            </h2>
          </div>
          <Link 
            href="#todas-noticias"
            className="inline-flex items-center text-accent text-sm font-semibold tracking-wide uppercase hover:text-accent/80 transition-colors group"
          >
            Ver Todas
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* News grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Featured article */}
          <Link
            href={`#noticia-${featuredNews.id}`}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden hover-card-vibrant"
          >
            <img 
              src={featuredNews.image} 
              alt={featuredNews.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            {/* Category badge */}
            <div className={`absolute top-4 left-4 px-3 py-1 ${getCategoryColor(featuredNews.color)} rounded-lg flex items-center gap-2`}>
              <FeaturedIcon className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-wider">{featuredNews.category}</span>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-white/60 text-sm mb-2">
                {featuredNews.date}
              </p>
              <h3 className="font-serif text-2xl md:text-3xl text-white mb-3 group-hover:text-accent-yellow transition-colors">
                {featuredNews.title}
              </h3>
              <p className="text-white/80 text-sm mb-4 max-w-md line-clamp-2">
                {featuredNews.excerpt}
              </p>
              <span className="inline-flex items-center text-accent-yellow text-sm font-semibold tracking-wide uppercase group-hover:gap-3 transition-all">
                Leer mas
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Other articles */}
          <div className="flex flex-col gap-4">
            {news.slice(1).map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.id}
                  href={`#noticia-${item.id}`}
                  className="group flex bg-white rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all hover-card-vibrant"
                >
                  {/* Image */}
                  <div className="w-32 md:w-40 flex-shrink-0 relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute top-2 left-2 w-8 h-8 ${getCategoryColor(item.color)} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow p-5 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold tracking-wider uppercase text-primary">
                        {item.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <h3 className="font-serif text-lg md:text-xl text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
