"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RedesFlotante } from "@/components/redes-flotante"
import { PageHero } from "@/components/page-hero"
import { FiltrosGaleria } from "@/components/galeria/filtros-galeria"
import { TarjetasEventos } from "@/components/galeria/tarjetas-eventos"
import { Mosaico } from "@/components/galeria/mosaico"
import { Visor } from "@/components/galeria/visor"
import {
  SIN_FECHA,
  contarFotos,
  cumpleAgrupaciones,
  cumpleAnio,
  formatearFecha,
  type Evento,
  type FotoConEvento,
} from "@/components/galeria/tipos"

// De dónde se lee el listado. Cuando exista el PHP, cambiar por "/api/galeria.php"
const URL_LISTADO = "/galeria.json"

type Vista = "eventos" | "fotos"

export default function GaleriaPage() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [estado, setEstado] = useState<"cargando" | "listo" | "error">("cargando")
  const [vista, setVista] = useState<Vista>("eventos")
  const [eventoAbierto, setEventoAbierto] = useState<Evento | null>(null)
  const [agrupaciones, setAgrupaciones] = useState<string[]>([])
  const [anio, setAnio] = useState("")
  const [indiceVisor, setIndiceVisor] = useState<number | null>(null)
  const inicioRef = useRef<HTMLDivElement>(null)

  // Carga el listado de la galería
  useEffect(() => {
    fetch(URL_LISTADO, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then((datos) => {
        setEventos(datos.eventos ?? [])
        setEstado("listo")
      })
      .catch(() => setEstado("error"))
  }, [])

  const eventosFiltrados = useMemo(
    () => eventos.filter((e) => cumpleAnio(e, anio) && cumpleAgrupaciones(e, agrupaciones)),
    [eventos, anio, agrupaciones]
  )

  const todasLasFotos = useMemo<FotoConEvento[]>(
    () => eventosFiltrados.flatMap((e) => e.fotos.map((f) => ({ ...f, evento: e }))),
    [eventosFiltrados]
  )

  // Agrupaciones disponibles, con cuántos eventos (o fotos) tiene cada una
  const opcionesAgrupacion = useMemo(() => {
    const conteo = new Map<string, number>()
    for (const e of eventos) {
      if (!cumpleAnio(e, anio)) continue
      for (const a of e.agrupaciones) {
        conteo.set(a, (conteo.get(a) ?? 0) + (vista === "eventos" ? 1 : e.fotos.length))
      }
    }
    return Array.from(conteo.entries())
      .map(([nombre, cantidad]) => ({ nombre, cantidad }))
      .sort((x, y) => x.nombre.localeCompare(y.nombre, "es"))
  }, [eventos, anio, vista])

  // Años disponibles (más recientes primero) y "Sin fecha" si hace falta
  const opcionesAnio = useMemo(() => {
    const anios = Array.from(new Set(eventos.filter((e) => e.anio !== null).map((e) => String(e.anio))))
    anios.sort((a, b) => Number(b) - Number(a))
    if (eventos.some((e) => e.anio === null)) anios.push(SIN_FECHA)
    return anios
  }, [eventos])

  // Fotos que recorre el visor: las del evento abierto o todas las filtradas
  const fotosVisor = useMemo<FotoConEvento[]>(
    () => (eventoAbierto ? eventoAbierto.fotos.map((f) => ({ ...f, evento: eventoAbierto })) : todasLasFotos),
    [eventoAbierto, todasLasFotos]
  )

  const hayFiltros = agrupaciones.length > 0 || anio !== ""

  function subir() {
    inicioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  function abrirEvento(evento: Evento) {
    setEventoAbierto(evento)
    subir()
  }

  function cerrarEvento() {
    setEventoAbierto(null)
    subir()
  }

  function quitarFiltros() {
    setAgrupaciones([])
    setAnio("")
  }

  const sinResultados = (
    <div className="py-16 text-center text-gray-600">
      <p>No hay {vista === "eventos" ? "eventos" : "fotos"} con estos filtros.</p>
      <button type="button" onClick={quitarFiltros} className="mt-2 text-primary-blue hover:underline">
        Quitar filtros
      </button>
    </div>
  )

  return (
    <>
      <Header />

      {/* Banner */}
      <PageHero imagen="/banner_2.png" altoMinimo="min-h-[40vh]">
        <p className="font-serif text-5xl text-white md:text-7xl">Galería de Imágenes</p>
      </PageHero>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div ref={inicioRef} className="scroll-mt-28" />

        {estado === "cargando" && <p className="py-20 text-center text-gray-500">Cargando galería…</p>}

        {estado === "error" && (
          <p className="py-20 text-center text-gray-600">
            No se ha podido cargar la galería. Inténtalo de nuevo más tarde.
          </p>
        )}

        {estado === "listo" && eventos.length === 0 && (
          <p className="py-20 text-center text-gray-600">Todavía no hay fotos en la galería.</p>
        )}

        {/* ÁLBUM DE UN EVENTO */}
        {estado === "listo" && eventoAbierto && (
          <section>
            <button type="button" onClick={cerrarEvento} className="mb-6 text-primary-blue hover:underline">
              ← Volver a la galería
            </button>

            <h2 className="font-serif text-3xl md:text-4xl">{eventoAbierto.titulo}</h2>
            <p className="mt-1 text-gray-600">
              {[formatearFecha(eventoAbierto.fecha), contarFotos(eventoAbierto.fotos.length)]
                .filter(Boolean)
                .join(" · ")}
            </p>

            {eventoAbierto.agrupaciones.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {eventoAbierto.agrupaciones.map((a) => (
                  <span key={a} className="rounded-full border px-2 py-0.5 text-xs text-gray-600">
                    {a}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8">
              <Mosaico fotos={fotosVisor} onAbrir={setIndiceVisor} />
            </div>
          </section>
        )}

        {/* VISTA GENERAL: EVENTOS O TODAS LAS FOTOS */}
        {estado === "listo" && !eventoAbierto && eventos.length > 0 && (
          <>
            <div className="mb-6 inline-flex rounded-full border bg-white p-1">
              {(["eventos", "fotos"] as Vista[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={vista === v}
                  onClick={() => setVista(v)}
                  className={`rounded-full px-4 py-1.5 text-sm transition ${
                    vista === v ? "bg-primary-blue text-white" : "text-gray-700 hover:bg-primary-blue/10"
                  }`}
                >
                  {v === "eventos" ? "Eventos" : "Todas las fotos"}
                </button>
              ))}
            </div>

            <FiltrosGaleria
              opcionesAgrupacion={opcionesAgrupacion}
              seleccionadas={agrupaciones}
              onCambiarSeleccionadas={setAgrupaciones}
              opcionesAnio={opcionesAnio}
              anio={anio}
              onCambiarAnio={setAnio}
              hayFiltros={hayFiltros}
              onQuitarFiltros={quitarFiltros}
            />

            {vista === "eventos" ? (
              eventosFiltrados.length > 0 ? (
                <TarjetasEventos eventos={eventosFiltrados} onAbrir={abrirEvento} />
              ) : (
                sinResultados
              )
            ) : todasLasFotos.length > 0 ? (
              <Mosaico fotos={todasLasFotos} onAbrir={setIndiceVisor} mostrarEvento />
            ) : (
              sinResultados
            )}
          </>
        )}
      </main>

      {indiceVisor !== null && (
        <Visor
          fotos={fotosVisor}
          indice={indiceVisor}
          onCambiar={setIndiceVisor}
          onCerrar={() => setIndiceVisor(null)}
        />
      )}

      <RedesFlotante />
      <Footer />
    </>
  )
}