import Image from "next/image"
import Link from "next/link"

// Collage de fondo de la portada: uno para ordenador y otro para móvil
const fotoHero = {
  ordenador: "/banner-principal-ordenador.png",   // 2400 × 1000
  movil: "/banner-principal-movil.png",           // 1080 × 1350
}

export function HeroSection() {
  return (
    <section className="hero-banner relative isolate min-h-[33rem] overflow-hidden text-light sm:min-h-[42rem] lg:min-h-[44rem]">
      {/* Foto de fondo: collage de ordenador o de móvil, con el oscurecido encima */}
      <div className="absolute inset-0">
        <picture>
          {/* A partir de 768 px se usa el collage de ordenador; por debajo, el de móvil */}
          <source media="(min-width: 768px)" srcSet={fotoHero.ordenador} />
          <img
            src={fotoHero.movil}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 z-0 h-full w-full object-cover"
          />
        </picture>
        <div className="hero-banner-shade absolute inset-0 z-[1]" aria-hidden="true" />
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
        <div className="hero-copy pointer-events-auto w-[72%] max-w-3xl text-left md:w-[54%] lg:w-[56%]">
          <h1 className="hero-title mb-5">
            <span className="hero-title-brand">Ateneo Musical de Mieres</span>
            <span className="hero-title-message">Un punto de encuentro para la música</span>
          </h1>
          <p className="mb-7 max-w-prose text-base sm:text-lg">
            Una asociación musical de Mieres que reúne a <strong>cuatro agrupaciones</strong>, abierta a colaborar con otras formaciones y acompañar con su música fiestas y celebraciones.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contacto?asunto=contratar" data-cta="contratanos" data-cta-location="hero" className="cta-primary">Contacta con nosotros</Link>
            <Link href="/join" data-cta="hazte-socio" data-cta-location="hero" className="cta-secondary cta-secondary-on-dark">Hazte socio</Link>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm" aria-label="Datos de la asociación">
            <li><strong>Desde 2018</strong></li>
            <li><strong>4 agrupaciones</strong></li>
          </ul>
        </div>
      </div>
    </section>
  )
}