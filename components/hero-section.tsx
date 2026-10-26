"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

const heroSlides = [
  { src: "/banda/Marco.JPG", alt: "Músicos del Ateneo Musical de Mieres" },
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
    <section className="bg-primary-blue text-foreground">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-12 pt-52 sm:px-6 sm:pb-16 sm:pt-48 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pb-20 lg:pt-44">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-wider">Ateneo Musical de Mieres</p>
          <h1 className="mb-5 font-serif">
            Ateneo Musical de Mieres: música para tus conciertos, procesiones y fiestas
          </h1>
          <p className="mb-7 max-w-prose text-base sm:text-lg">
            Una asociación musical de Mieres con cuatro agrupaciones y propuestas para acompañar tus eventos.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contrata" className="cta-primary">Contrátanos</Link>
            <Link href="/join" className="cta-secondary">Hazte socio</Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm font-semibold" aria-label="Datos de la asociación">
            <li>Desde 2018</li>
            <li>4 agrupaciones</li>
          </ul>
        </div>

        <div
          role="region"
          aria-roledescription="carrusel"
          aria-label="Fotografías de las agrupaciones del Ateneo"
          onMouseEnter={() => setInteracting(true)}
          onMouseLeave={() => setInteracting(false)}
          onFocus={() => setInteracting(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteracting(false)
          }}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border-2 border-foreground">
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
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold" aria-hidden="true">
              {currentSlide + 1} / {heroSlides.length}
            </p>
            <div className="flex items-center gap-2">
              {!reduceMotion && (
                <button
                  type="button"
                  onClick={() => setPaused((value) => !value)}
                  aria-label={paused ? "Reanudar carrusel de fotografías" : "Pausar carrusel de fotografías"}
                  className="flex min-h-11 min-w-11 items-center justify-center border-2 border-foreground"
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
                className="flex min-h-11 min-w-11 items-center justify-center border-2 border-foreground"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Fotografía siguiente"
                className="flex min-h-11 min-w-11 items-center justify-center border-2 border-foreground"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
