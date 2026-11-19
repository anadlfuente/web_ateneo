"use client"

// Listado completo de noticias con paginación y filtro por categoría.

import { useEffect, useState } from "react"
import { Search, X } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { useNoticias, obtenerNoticias, BANNER_NOTICIAS, type NoticiaResumen } from "@/lib/noticias"
import { NoticiaApertura, NoticiaSecundaria, NoticiaFila, FilaArchivo } from "@/components/noticias-listado"
import { RedesFlotante } from "@/components/redes-flotante"
import { MigasDePan } from "@/components/migas-de-pan"

const EN_PORTADA = 9          // las 9 más recientes salen en la portada; el resto, en el archivo
const POR_TANDA_ARCHIVO = 10  // cuántas más se enseñan al pulsar «Mostrar más»

const clasePastilla = (activa: boolean, oscura = false) =>
  `min-h-11 rounded-full border-2 px-5 py-2 text-[15px] font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
    activa
      ? oscura
        ? "border-dark bg-dark text-white"
        : "border-primary-blue bg-primary-blue text-dark"
      : "border-[#b9bcc4] bg-transparent text-dark hover:border-dark"
  }`

export default function NoticiasPage() {
  const { noticias, error } = useNoticias()
  const todas = noticias ?? []
  const [anio, setAnio] = useState("Todos")
  const [visiblesArchivo, setVisiblesArchivo] = useState(POR_TANDA_ARCHIVO)

  // ── Buscador: busca en TODAS las noticias (título, resumen, texto y periódicos) en el PHP ──
  const [busqueda, setBusqueda] = useState("")
  const [resultados, setResultados] = useState<NoticiaResumen[] | null>(null)
  const [errorBusqueda, setErrorBusqueda] = useState(false)
  const termino = busqueda.trim()
  const buscando = termino.length >= 2

  useEffect(() => {
    if (!buscando) {
      setResultados(null)
      return
    }
    let cancelado = false
    // Espera a que se deje de escribir un momento antes de preguntar al PHP
    const espera = setTimeout(() => {
      obtenerNoticias({ buscar: termino })
        .then((datos) => {
          if (!cancelado) {
            setResultados(datos)
            setErrorBusqueda(false)
          }
        })
        .catch(() => {
          if (!cancelado) setErrorBusqueda(true)
        })
    }, 300)
    return () => {
      cancelado = true
      clearTimeout(espera)
    }
  }, [termino, buscando])

   // ── Portada: la destacada (si hay) va primero; el resto, por fecha ──
  const destacada = todas.find((n) => n.destacada)
  const ordenadas = destacada ? [destacada, ...todas.filter((n) => n !== destacada)] : todas

  const apertura = ordenadas[0]
  const secundarias = ordenadas.slice(1, 3)
  const filas = ordenadas.slice(3, EN_PORTADA)

  // ── Archivo: todas las noticias, de la más reciente a la más antigua, filtrables por año ──
  const archivoCompleto = todas
  const anios = Array.from(new Set(archivoCompleto.map((n) => n.fecha.slice(0, 4))))
  const archivo = anio === "Todos" ? archivoCompleto : archivoCompleto.filter((n) => n.fecha.startsWith(anio))


  const cambiarAnio = (a: string) => {
    setAnio(a)
    setVisiblesArchivo(POR_TANDA_ARCHIVO)
  }

  const resultadosFiltrados = resultados
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <PageHero imagen={BANNER_NOTICIAS} altoMinimo="min-h-[40vh]">
        <h1 className="text-white text-5xl md:text-7xl font-serif">Últimas noticias</h1>
      </PageHero>

      {/* Migas de pan */}
          <MigasDePan items={[{ nombre: "Noticias" }]} />

              <div className="bg-background pt-10 pb-20 md:pt-12">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {/* Buscador */}
          <div className="mb-8 flex md:justify-end">

            <div className="flex h-12 w-full items-center gap-2.5 rounded-full border-2 border-[#b9bcc4] bg-[#ffffff] px-4 focus-within:border-dark md:w-[340px]">
              <Search aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-muted-foreground" />
              <label htmlFor="buscar-noticias" className="sr-only">Buscar noticias</label>
              <input
                id="buscar-noticias"
                type="search"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar noticias"
                autoComplete="off"
                className="w-full bg-transparent text-base text-dark outline-none placeholder:text-muted-foreground"
              />
              {busqueda && (
                <button
                  type="button"
                  onClick={() => setBusqueda("")}
                  aria-label="Borrar búsqueda"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-dark/10"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* ── Mientras se busca: lista de resultados ── */}
          {buscando ? (
            <section aria-labelledby="titulo-resultados" className="rounded-xl bg-[#ffffff] px-5 pb-6 pt-6 md:px-10 md:pt-9">
              <h2 id="titulo-resultados" className="border-b-2 border-dark pb-4 text-2xl font-black">
                <span role="status" aria-live="polite">
                  {errorBusqueda
                    ? "No se ha podido hacer la búsqueda"
                    : resultadosFiltrados === null
                      ? "Buscando…"
                      : `${resultadosFiltrados.length} ${resultadosFiltrados.length === 1 ? "resultado" : "resultados"} para «${termino}»`}
                </span>
              </h2>
              {resultadosFiltrados && resultadosFiltrados.length > 0 && (
                <ul>
                  {resultadosFiltrados.map((n) => (
                    <FilaArchivo key={n.slug} noticia={n} />
                  ))}
                </ul>
              )}
              {resultadosFiltrados && resultadosFiltrados.length === 0 && (
                <p className="pt-6 text-muted-foreground">Prueba con otra palabra o quita el filtro de categoría.</p>
              )}
            </section>
          ) : (
            <>
              {/* ── Portada ── */}
              {apertura && (
                <div className="flex flex-wrap gap-8">
                  <NoticiaApertura noticia={apertura} />
                  {secundarias.length > 0 && (
                    <aside
                      aria-label="Otras noticias recientes"
                      className="flex flex-[1_1_320px] flex-col gap-6 lg:border-l lg:border-[#c9ccd3] lg:pl-8"
                    >
                      {secundarias.map((n) => (
                        <NoticiaSecundaria key={n.slug} noticia={n} />
                      ))}
                    </aside>
                  )}
                </div>
              )}

              {filas.length > 0 && (
                <section aria-labelledby="titulo-mas-noticias" className="mt-12 md:mt-16">
                  <h2 id="titulo-mas-noticias" className="text-2xl font-black md:text-[22px]">Más noticias</h2>
                  <div aria-hidden="true" className="mb-7 mt-2.5 h-[5px] w-14 bg-accent-yellow" />
                  <div className="grid gap-x-10 gap-y-6 lg:grid-cols-2">
                    {filas.map((n) => (
                      <NoticiaFila key={n.slug} noticia={n} />
                    ))}
                  </div>
                </section>
              )}

              {/* ── Archivo (solo si hay noticias que no caben en la portada) ── */}
              {archivoCompleto.length > 0 && (
                <section aria-labelledby="titulo-archivo" className="mt-16 rounded-xl bg-[#ffffff] px-5 pb-6 pt-6 md:mt-20 md:px-10 md:pt-9">
                  <div className="flex flex-col gap-4 border-b-2 border-dark pb-5 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h2 id="titulo-archivo" className="text-2xl font-black md:text-[22px]">Archivo de noticias</h2>
                      <p className="mt-1 text-[15px] text-muted-foreground">
                        {archivo.length} {archivo.length === 1 ? "publicación" : "publicaciones"}
                        {anio !== "Todos" && ` en ${anio}`}
                      </p>
                    </div>
                    {anios.length > 1 && (
                      <div role="group" aria-label="Filtrar archivo por año" className="-mx-5 flex gap-1.5 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
                        {["Todos", ...anios].map((a) => (
                          <button
                            key={a}
                            type="button"
                            aria-pressed={anio === a}
                            onClick={() => cambiarAnio(a)}
                            className={`shrink-0 ${clasePastilla(anio === a, true)}`}
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <ul>
                    {archivo.slice(0, visiblesArchivo).map((n) => (
                      <FilaArchivo key={n.slug} noticia={n} />
                    ))}
                  </ul>
                  {visiblesArchivo < archivo.length && (
                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        onClick={() => setVisiblesArchivo((v) => v + POR_TANDA_ARCHIVO)}
                        className="min-h-12 w-full rounded-full border-2 border-dark px-7 font-bold hover:bg-dark hover:text-white md:w-auto"
                      >
                        Mostrar más
                      </button>
                    </div>
                  )}
                </section>
              )}
            </>
          )}

          {/* Estados de carga y error */}
          {noticias === null && !error && (
            <p role="status" aria-live="polite" className="text-center text-muted-foreground">Cargando noticias…</p>
          )}
          {error && (
            <p role="alert" className="text-center text-muted-foreground">
              No se han podido cargar las noticias. Inténtalo de nuevo más tarde.
            </p>
          )}
          {noticias && !buscando && todas.length === 0 && (
            <p className="text-center text-muted-foreground">Todavía no hay noticias publicadas.</p>
          )}
        </div>
      </div>
      <RedesFlotante />
      <Footer />
    </main>
  )
}