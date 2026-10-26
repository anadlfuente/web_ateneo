"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

const heroSlides = [
  { src: "/banda/Marco.JPG", alt: "Músicos del Ateneo Musical de Mieres" },
  { src: "/banda/foto_family.JPG", alt: "Agrupaciones del Ateneo Musical de Mieres" },
  { src: "/banda/pasacalles.JPG", alt: "La Banda Sinfónica del Ateneo en un pasacalles" },
  { src: "/coral/coral_cantares.jpg", alt: "Coral Cantares del Ateneo Musical de Mieres" },
  { src: "/claxon/claxon1.jpg", alt: "Claxon Boys del Ateneo Musical de Mieres" },
  { src: "/charanga/charanga2.jpeg", alt: "Charanga New Paentamala del Ateneo Musical de Mieres" },
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
    <section className="hero-banner relative isolate min-h-[38rem] overflow-hidden text-light sm:min-h-[42rem] lg:min-h-[44rem]">
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
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

        <div className="hero-banner-shade absolute inset-0" aria-hidden="true" />
        {!reduceMotion && (
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Reanudar carrusel de fotografías" : "Pausar carrusel de fotografías"}
            className="hero-carousel-pause absolute z-20 flex min-h-11 min-w-11 items-center justify-center rounded-full border border-light/70 bg-dark/85 text-light backdrop-blur-sm transition-colors hover:bg-light hover:text-dark"
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
          className="hero-carousel-control hero-carousel-control-previous absolute left-0 top-1/2 z-20 flex min-h-14 min-w-14 -translate-y-1/2 items-center justify-center rounded-r-full border border-light/70 bg-dark/85 text-light backdrop-blur-sm transition-colors hover:bg-light hover:text-dark"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label="Fotografía siguiente"
          className="hero-carousel-control hero-carousel-control-next absolute right-0 top-1/2 z-20 flex min-h-14 min-w-14 -translate-y-1/2 items-center justify-center rounded-l-full border border-light/70 bg-dark/85 text-light backdrop-blur-sm transition-colors hover:bg-light hover:text-dark"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="relative mx-auto flex min-h-[38rem] max-w-7xl flex-col justify-center px-4 pb-24 pt-52 sm:min-h-[42rem] sm:px-6 sm:pb-28 sm:pt-48 lg:min-h-[44rem] lg:px-8 lg:pt-44">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-wider">Ateneo Musical de Mieres</p>
          <h1 className="mb-5 font-serif">
            Ateneo Musical de Mieres: música para tus conciertos, procesiones y fiestas
          </h1>
          <p className="mb-7 max-w-prose text-base sm:text-lg">
            Una asociación musical de Mieres con cuatro agrupaciones y propuestas para acompañar tus eventos.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contrata" className="cta-primary">Contrátanos</Link>
            <Link href="/join" className="cta-secondary cta-secondary-on-dark">Hazte socio</Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm font-semibold" aria-label="Datos de la asociación">
            <li>Desde 2018</li>
            <li>4 agrupaciones</li>
          </ul>
        </div>
      </div>

      <p className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-7xl px-4 pb-5 text-sm font-semibold sm:px-6 lg:px-8" aria-hidden="true">
        {currentSlide + 1} / {heroSlides.length}
      </p>
    </section>
  )
}
