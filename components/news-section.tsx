// Bloque "Últimas noticias" de la portada.
// Ya no tiene datos propios: los toma de lib/noticias.ts

import Link from "next/link"
import { ArrowRight, Newspaper } from "lucide-react"
import { getNoticias, formatearFecha, estiloCategoria } from "@/lib/noticias"

export function NewsSection() {
  const todas = getNoticias()
  if (todas.length === 0) return null

  // Destacada: la marcada como `destacada`; si no hay ninguna, la más reciente
  const destacada = todas.find((n) => n.destacada) ?? todas[0]
  const resto = todas.filter((n) => n.slug !== destacada.slug).slice(0, 2)
  const IconoDestacada = estiloCategoria[destacada.categoria].icono

  return (
    <section id="noticias" className="py-24 bg-white relative overflow-hidden z-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Cabecera */}
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
            href="/noticias"
            className="inline-flex items-center text-accent text-sm font-semibold tracking-wide uppercase hover:text-accent/80 transition-colors group"
          >
            Ver todas
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Noticia destacada */}
          <Link
            href={`/noticias/${destacada.slug}`}
            className="group relative flex flex-col justify-end min-h-[22rem] lg:min-h-0 lg:aspect-[4/3] rounded-2xl overflow-hidden hover-card-vibrant"
          >
            <img
              src={destacada.imagen}
              alt={destacada.titulo}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Categoría (izquierda) */}
            <div className={`absolute top-4 left-4 z-10 px-3 py-1 ${estiloCategoria[destacada.categoria].clase} rounded-lg flex items-center gap-2`}>
              <IconoDestacada className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-wider">{destacada.categoria}</span>
            </div>

            {/* Fecha (derecha) */}
            <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
              <span className="text-xs md:text-sm font-semibold text-foreground">{formatearFecha(destacada.fecha)}</span>
            </div>

            {/* Contenido */}
            <div className="relative p-6 md:p-8 pt-20">
              <h3 className="font-serif text-2xl md:text-3xl text-white mb-3 group-hover:text-accent-yellow transition-colors">
                {destacada.titulo}
              </h3>
              <p className="text-white/80 text-sm mb-4 max-w-md line-clamp-2">{destacada.resumen}</p>
              <span className="inline-flex items-center text-accent-yellow text-sm font-semibold tracking-wide uppercase">
                Leer más
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Resto */}
          <div className="flex flex-col gap-4">
            {resto.map((item) => {
              const Icono = estiloCategoria[item.categoria].icono
              return (
                <Link
                  key={item.slug}
                  href={`/noticias/${item.slug}`}
                  className="group flex bg-white rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all hover-card-vibrant"
                >
                  <div className="w-32 md:w-40 flex-shrink-0 relative overflow-hidden">
                    <img
                      src={item.imagen}
                      alt={item.titulo}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute top-2 left-2 w-8 h-8 ${estiloCategoria[item.categoria].clase} rounded-lg flex items-center justify-center`}>
                      <Icono className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="flex-grow p-5 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold tracking-wider uppercase text-primary">{item.categoria}</span>
                      <span className="text-xs text-muted-foreground">{formatearFecha(item.fecha)}</span>
                    </div>
                    <h3 className="font-serif text-lg md:text-xl text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {item.titulo}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.resumen}</p>
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