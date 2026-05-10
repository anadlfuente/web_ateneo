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
    image: "Marco.jpg",
  },
  {
    id: 2,
    title: "Comienza nuestra nueva temporada",
    subtitle: "Temporada 2026-2027",
    description: "Descubre la programacion de nuestra nueva temporada con conciertos inolvidables.",
    cta: "Explorar Temporada",
    href: "/historia",
    image: "banner.jpg",
  },
  {
    id: 3,
    title: "Descubre nuestra galería de imágenes",
    subtitle: "Área Multimedia",
    description: "Una noche magica con las mejores obras del repertorio sinfonico.",
    cta: "Comprar Entradas",
    href: "#galeria-imagenes",
    image: "foto_family.JPG",
  },
  {
    id: 4,
    title: "Unete a Nuestra Familia Musical",
    subtitle: "Hazte Socio",
    description: "Apoya la musica en tu comunidad y disfruta de beneficios exclusivos.",
    cta: "Mas Informacion",
    href: "#hazte-socio",
    image: "pasacalles.jpg",
  },
  {
    id: 5,
    title: "Síguenos en Redes Sociales",
    subtitle: "Redes Sociales",
    description: "Síguenos para estar al tanto de nuestras últimas noticias",
    cta: "Contacto",
    href: "#contacto",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1920&q=80",
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

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                <p className={`text-white/80 text-sm tracking-[0.3em] uppercase mb-4 transition-all duration-700 delay-200 ${
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                  {slide.subtitle}
                </p>
                
                <h1 className={`font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-6 transition-all duration-700 delay-300 ${
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                  {slide.title}
                </h1>
                
                <p className={`text-white/80 text-lg md:text-xl max-w-xl mb-10 transition-all duration-700 delay-400 ${
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                  {slide.description}
                </p>
                
                <Link href={slide.href}>
                  <Button 
                    className={`bg-white text-foreground hover:bg-white/90 px-10 py-6 text-sm font-medium tracking-wide uppercase group transition-all duration-700 delay-500 ${
                      index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    {slide.cta}
                    <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </ Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <div className="absolute bottom-1/2 translate-y-1/2 left-6 lg:left-12 z-20">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-foreground transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
      <div className="absolute bottom-1/2 translate-y-1/2 right-6 lg:right-12 z-20">
        <button 
          onClick={nextSlide}
          className="w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-foreground transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index)
              resetAutoPlay()}}
            className={`h-0.5 transition-all duration-300 ${
              index === currentSlide 
                ? "w-12 bg-white" 
                : "w-6 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
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
