"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const slides = [
  {
    id: 1,
    title: "Descubre nuestra historia y misión",
    subtitle: "Sobre Nosotros",
    description: "Nacimos en 2018 para dinamizar la vida musical mierense",
    cta: "Quiénes somos",
    href: "/historia",
    image: "/banda/Marco.JPG",
    color: "blue",
  },
  // {
  //   id: 2,
  //   title: "Comienza nuestra nueva temporada",
  //   subtitle: "Temporada 2026-2027",
  //   description: "Descubre la programacion de nuestras agrupaciones con conciertos inolvidables.",
  //   cta: "Explorar Temporada",
  //   href: "/calendar",
  //   image: "/banda/banner.jpg",
  //   color: "yellow",
  // },
  {
    id: 3,
    title: "Descubre nuestra galería de imágenes",
    subtitle: "Área Multimedia",
    description: "Un recorrido por la historia y la actividad del Ateneo Musical de Mieres y sus agrupaciones.",
    cta: "Visita nuestra galería",
    href: "/galeria",
    image: "/banda/foto_family.JPG",
    color: "green",
  },
  {
    id: 4,
    title: "Unete a nuestra familia musical",
    subtitle: "Hazte Socio",
    description: "Apoya la música de nuestra región.",
    cta: "Colabora",
    href: "/join",
    image: "/banda/pasacalles.JPG",
    color: "blue"
  },
  {
    id: 5,
    title: "Síguenos en Redes Sociales",
    subtitle: "Redes Sociales",
    description: "Síguenos para estar al tanto de nuestras últimas noticias",
    cta: "Contacto",
    href: "/contacto",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1920&q=80",
    color: "yellow"
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null) 
  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
  }

  const getAccentColor = (color: string) => {
    switch(color) {
      case "blue": return "bg-primary-blue"
      case "yellow": return "bg-accent-yellow"
      case "green": return "bg-accent-green"
      default: return "bg-primary-blue"
    }
  }
  useEffect(() => {
    startAutoPlay()
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const resetAutoPlay = () => {
  if (intervalRef.current) clearInterval(intervalRef.current)
  startAutoPlay()
}

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % slides.length)
  //   }, 6000)
  //   return () => clearInterval(timer)
  // }, [])

  const nextSlide = () => {
     setCurrentSlide((prev) => (prev + 1) % slides.length)
     resetAutoPlay()
  }
  const prevSlide = () => {
     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
     resetAutoPlay()
  }

  const touchInicio = useRef<{ x: number; y: number } | null>(null)
  const DISTANCIA_MINIMA = 50 // px que hay que deslizar para cambiar de diapositiva

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    touchInicio.current = { x: t.clientX, y: t.clientY }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchInicio.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touchInicio.current.x
    const dy = t.clientY - touchInicio.current.y
    touchInicio.current = null

    // Solo cuenta si el gesto es claramente horizontal
    if (Math.abs(dx) < DISTANCIA_MINIMA || Math.abs(dx) < Math.abs(dy)) return

    if (dx < 0) nextSlide() // dedo hacia la izquierda → siguiente
    else prevSlide()        // dedo hacia la derecha → anterior
  }

  return (
    <section
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={index !== currentSlide}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center pt-24 pb-24">
            <div className="max-w-7xl mx-auto px-6 md:px-24 lg:px-32 w-full">
              <div className="max-w-3xl">
                <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full mb-4 md:mb-6 transition-all duration-700 delay-200 ${
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                } ${slide.color === "blue" ? "bg-primary-blue" : slide.color === "yellow" ? "bg-accent-yellow" : "bg-accent-green"}`}>
                  <span className={`text-xs sm:text-sm font-bold tracking-wider uppercase ${slide.color === "yellow" ? "text-foreground" : "text-white"}`}>
                    {slide.subtitle}
                  </span>
                </div>
                
                <h1 className={`font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-4 md:mb-6 break-words transition-all duration-700 delay-300 ${
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                  {slide.title}
                </h1>
                
                <p className={`text-white/80 text-base md:text-xl max-w-xl mb-8 md:mb-10 transition-all duration-700 delay-400 ${
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                  {slide.description}
                </p>
                
                <Link href={slide.href}>
                  <Button 
                    size="lg"
                    className={`px-6 py-5 md:px-8 md:py-6 text-base font-semibold tracking-wide group ${
                      slide.color === "blue" 
                        ? "bg-primary-blue hover:bg-primary-blue/90 text-white" 
                        : slide.color === "yellow"
                        ? "bg-accent-yellow hover:bg-accent-yellow/90 text-foreground"
                        : "bg-accent-green hover:bg-accent-green/90 text-white"
                    }`}
                  >
                    {slide.cta}
                    <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows (tablet y escritorio) */}
      <div className="hidden md:block absolute bottom-1/2 translate-y-1/2 left-6 lg:left-12 z-20">
        <button 
          onClick={prevSlide}
          aria-label="Diapositiva anterior"
          className="w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-foreground transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
      <div className="hidden md:block absolute bottom-1/2 translate-y-1/2 right-6 lg:right-12 z-20">
        <button 
          onClick={nextSlide}
          aria-label="Diapositiva siguiente"
          className="w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-foreground transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators (+ flechas en móvil) */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <div className="flex items-center gap-2 md:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              aria-label={`Ir a la diapositiva ${index + 1}`}
              onClick={() => {
                setCurrentSlide(index)
                resetAutoPlay()
              }}
              className={`h-0.5 transition-all duration-300 ${
                index === currentSlide 
                  ? "w-8 md:w-12 bg-white" 
                  : "w-4 md:w-6 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 right-12 z-20 hidden lg:block">
        <div className="flex flex-col items-center gap-3 text-white/60 text-xs tracking-widest">
          <span className="writing-vertical">SCROLL</span>
          <div className="w-px h-16 bg-white/30 relative overflow-hidden">
            <div className="w-full h-1/2 bg-white absolute animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}