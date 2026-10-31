import Link from "next/link"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Organigram from "@/components/organigram-section"
import BloqueHistoria from "@/components/text-design"
import TextoRico from "@/components/text-bold"
import { banda } from "@/data/banda.js"
import { PageHero } from "@/components/page-hero"

export const metadata: Metadata = {
  title: "Banda Sinfónica",
  description:
    "Historia y organigrama de la Banda Sinfónica del Ateneo Musical de Mieres.",
}

type Dato = { etiqueta: string; valor: string }

const HREF_CONTRATAR = "/contacto?asunto=contratar&agrupacion=banda#formulario"

// Alterna fondo claro y azul suave para separar visualmente los bloques.
const fondoSeccion = (i: number) =>
  i % 2 === 0 ? "home-section home-section-blue" : "home-section"

export default function BandaPage() {
  // Datos clave opcionales: solo se muestran si hay al menos 3 reales en banda.js.
  const datos = (
    (banda as unknown as { datos?: Dato[] }).datos ?? []
  ).filter((d) => d.etiqueta && d.valor)
  const mostrarDatos = datos.length >= 3

  return (
    <>
      <Header />

      <main id="contenido">
        <PageHero imagen={banda.banner.imagen} altoMinimo="min-h-[60vh]">
          <div className="flex flex-col gap-3">
            <h1 className="text-white">{banda.banner.titulo}</h1>
            <p className="font-serif max-w-3xl text-white">
              {banda.banner.subtitulo}
            </p>
          </div>
        </PageHero>

        {/* Migas de pan */}
        <nav aria-label="Migas de pan" className="home-container pt-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-link">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Banda Sinfónica</li>
          </ol>
        </nav>

        {/* Introducción + contratación */}
        <section className="home-section">
          <div className="home-container grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
            <div className="max-w-[68ch] space-y-5 text-base leading-relaxed text-foreground md:text-lg [&>p:first-child]:text-xl [&>p:first-child]:font-medium">
              {banda.introduccion.map((p, i) => (
                <p key={i}>
                  <TextoRico texto={p} />
                </p>
              ))}
            </div>

            <aside
              aria-labelledby="contratar-titulo"
              className="home-card order-first p-6 lg:order-none"
            >
              <h2 id="contratar-titulo" className="mb-4 text-xl!">
                {mostrarDatos ? "De un vistazo" : "¿Tienes un evento?"}
              </h2>

              {mostrarDatos && (
                <dl className="mb-6">
                  {datos.map((d) => (
                    <div
                      key={d.etiqueta}
                      className="flex items-baseline justify-between gap-4 border-b py-2 last:border-b-0"
                    >
                      <dt>{d.etiqueta}</dt>
                      <dd className="text-right font-bold">{d.valor}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <Link href={HREF_CONTRATAR} className="cta-primary w-full">
                Contratar a la Banda Sinfónica
              </Link>
            </aside>
          </div>
        </section>

        {/* Bloques de historia, con fondos alternos */}
        {banda.bloques.map((bloque, i) => (
          <section key={bloque.titulo} className={fondoSeccion(i)}>
            <div className="home-container">
              <BloqueHistoria {...bloque} invertido={i % 2 === 1} />
            </div>
          </section>
        ))}

        {/* Organigrama */}
        <section className={fondoSeccion(banda.bloques.length)}>
          <div className="home-container">
            <Organigram titulo="Organigrama" secciones={banda.organigrama} />
          </div>
        </section>

        {/* Llamada a la acción final */}
        <section className="home-section" aria-labelledby="contratar-final">
          <div className="home-container">
            <div className="flex flex-col gap-6 rounded-2xl bg-primary-blue/15 p-6 md:flex-row md:items-center md:justify-between md:p-10">
              <div className="max-w-[60ch]">
                <h2 id="contratar-final" className="mb-2">
                  ¿Quieres contar con la Banda Sinfónica en tu evento?
                </h2>
                <p>Cuéntanos qué necesitas y te respondemos por correo.</p>
              </div>
              <Link href={HREF_CONTRATAR} className="cta-primary shrink-0">
                Contratar a la Banda Sinfónica
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}