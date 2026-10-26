"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

const heroSlides = [
  { src: "/galeria-section/2018-11-17-santa-cecilia/002.webp", alt: "Celebración de Santa Cecilia el 17 de noviembre de 2018" },
  { src: "/banda/foto_family.JPG", alt: "Agrupaciones del Ateneo Musical de Mieres" },
  { src: "/banda/pasacalles.JPG", alt: "La Banda Sinfónica del Ateneo en un pasacalles" },
  {
    src: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1920&q=80",
    alt: "Instrumentos musicales en un escenario de concierto",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [interacting, setInteracting] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setReduceMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener("change", updatePreference)
    return () => mediaQuery.removeEventListener("change", updatePreference)
  }, [])

  useEffect(() => {
    if (paused || reduceMotion || interacting) return
    const timer = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % heroSlides.length)
    }, 6000)
    return () => window.clearInterval(timer)
  }, [paused, reduceMotion, interacting])

  const showPrevious = () => {
    setCurrentSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length)
  }

  const showNext = () => {
    setCurrentSlide((current) => (current + 1) % heroSlides.length)
  }

  return (
    <section className="hero-banner relative isolate min-h-[33rem] overflow-hidden text-light sm:min-h-[42rem] lg:min-h-[44rem]">
      <div
        role="region"
        aria-roledescription="carrusel"
        aria-label="Fotografías del Ateneo Musical de Mieres"
        onMouseEnter={() => setInteracting(true)}
        onMouseLeave={() => setInteracting(false)}
        onFocus={() => setInteracting(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteracting(false)
        }}
        className="absolute inset-0"
      >
        {heroSlides.map((slide, index) => (
          <div
            key={slide.src}
            aria-hidden={index !== currentSlide}
            className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${
              index === currentSlide ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {slide.src.startsWith("https://") ? (
              <img
                src={slide.src}
                alt={slide.alt}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 76rem) 100vw, 76rem"
                className="object-cover"
              />
            )}
          </div>
        ))}

        <div className="hero-banner-shade absolute inset-0" aria-hidden="true" />
        {!reduceMotion && (
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Reanudar carrusel de fotografías" : "Pausar carrusel de fotografías"}
            className="hero-carousel-pause pointer-events-auto absolute z-20 flex min-h-11 min-w-11 items-center justify-center rounded-full border border-light/80 bg-dark/75 text-light shadow-md backdrop-blur-sm transition-colors hover:bg-light hover:text-dark"
          >
            {paused
              ? <Play className="h-4 w-4" aria-hidden="true" />
              : <Pause className="h-4 w-4" aria-hidden="true" />}
          </button>
        )}
        <button
          type="button"
          onClick={showPrevious}
          aria-label="Fotografía anterior"
          className="hero-carousel-control hero-carousel-control-previous pointer-events-auto absolute bottom-5 left-4 z-20 flex min-h-11 min-w-11 items-center justify-center rounded-full border border-light/80 bg-dark/75 text-light shadow-md backdrop-blur-sm transition-colors hover:bg-light hover:text-dark"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label="Fotografía siguiente"
          className="hero-carousel-control hero-carousel-control-next pointer-events-auto absolute bottom-5 right-4 z-20 flex min-h-11 min-w-11 items-center justify-center rounded-full border border-light/80 bg-dark/75 text-light shadow-md backdrop-blur-sm transition-colors hover:bg-light hover:text-dark"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="hero-foreground pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[min(42vw,34rem)] md:block" aria-hidden="true">
        <Image
          src="/banda/marco-fondo.png"
          alt=""
          fill
          loading="lazy"
          sizes="(max-width: 767px) 0px, 34rem"
          className="object-contain object-bottom drop-shadow-[0_1rem_1.5rem_rgb(1_2_10_/_55%)]"
        />
      </div>

      <div className="home-container pointer-events-none relative z-20 flex min-h-[33rem] flex-col justify-center pb-16 pt-36 sm:min-h-[42rem] sm:pb-28 sm:pt-48 lg:min-h-[44rem] lg:pt-44">
        <div className="hero-copy pointer-events-auto w-[84%] max-w-3xl text-left md:w-[54%] lg:w-[56%]">
          <h1 className="hero-title mb-5">
            <span className="hero-title-brand">Ateneo Musical de Mieres</span>
            <span className="hero-title-message">Música para tus conciertos, procesiones y fiestas</span>
          </h1>
          <p className="mb-7 max-w-prose text-base sm:text-lg">
            Una asociación musical de Mieres con <strong>cuatro agrupaciones</strong> y propuestas para acompañar tus eventos.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contacto?asunto=contratar" className="cta-primary">Contrátanos</Link>
            <Link href="/join" className="cta-secondary cta-secondary-on-dark">Hazte socio</Link>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm" aria-label="Datos de la asociación">
            <li><strong>Desde 2018</strong></li>
            <li><strong>4 agrupaciones</strong></li>
          </ul>
        </div>
      </div>

      <p className="hero-slide-count absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full border border-light/70 bg-dark/75 px-3 py-1 text-sm font-semibold text-light shadow-md backdrop-blur-sm" aria-live="polite">
        {currentSlide + 1} / {heroSlides.length}
      </p>
    </section>
  )
}
