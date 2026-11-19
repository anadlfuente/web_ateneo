"use client"

// Panel: crear o editar una noticia.
//   /admin/noticias/editar/        → noticia nueva
//   /admin/noticias/editar/?id=5   → editar la noticia 5
//
// Si la sesión caduca al guardar, los cambios se guardan en el navegador y se
// recuperan solos al volver a entrar.

import { Suspense, useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { useSesionAdmin } from "@/components/admin/sesion-admin"
import { Campo, claseCampo, claseBotonPrincipal, claseBotonSecundario } from "@/components/admin/campos"
import { CampoFoto } from "@/components/admin/campo-foto"
import { EditorBloques } from "@/components/admin/editor-bloques"
import { EditorFuentes } from "@/components/admin/editor-fuentes"
import { NoticiaCuerpo } from "@/components/noticia-cuerpo"
import { ErrorAdmin } from "@/lib/admin"
import { leerNoticiaAdmin, guardarNoticiaAdmin, type NoticiaAdmin } from "@/lib/admin-noticias"
import { agrupaciones, estiloCategoria, formatearFecha, urlNoticia, type Agrupacion, type Categoria } from "@/lib/noticias"

const CATEGORIAS = Object.keys(estiloCategoria) as Categoria[]

function hoy() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

// Mientras se escribe: minúsculas, sin tildes, guiones en lugar de espacios
function limpiarSlug(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-/, "")
    .slice(0, 120)
}

// A partir del título: igual, pero sin guion al final
function slugDesdeTitulo(titulo: string) {
  return limpiarSlug(titulo).replace(/-+$/, "")
}

const NOTICIA_VACIA: NoticiaAdmin = {
  slug: "", titulo: "", resumen: "", fecha: "", autor: "", categoria: "",
  imagen: "", imagenAlt: "", imagenLado: "derecha", pieImagen: "",
  contenido: [{ tipo: "parrafo", texto: "" }],
  fuentes: [], agrupaciones: [], destacada: false, publicado: false,
}

const claveCopia = (id?: number) => `ateneo-noticia-sin-guardar-${id ?? "nueva"}`

function Editor() {
  const idParam = Number(useSearchParams().get("id")) || undefined
  const { sesionCaducada } = useSesionAdmin()

  const [noticia, setNoticia] = useState<NoticiaAdmin | null>(idParam ? null : { ...NOTICIA_VACIA, fecha: hoy() })
  const [estado, setEstado] = useState<"cargando" | "listo" | "no-existe" | "error">(idParam ? "cargando" : "listo")
  const [errores, setErrores] = useState<Record<string, string>>({})
  const [mensajeError, setMensajeError] = useState("")
  const [aviso, setAviso] = useState("")
  const [anuncio, setAnuncio] = useState("")
  const [guardando, setGuardando] = useState(false)
  const [sucio, setSucio] = useState(false)
  const [slugTocado, setSlugTocado] = useState(Boolean(idParam))
  const [vistaPrevia, setVistaPrevia] = useState(false)
  const cajaErrores = useRef<HTMLDivElement>(null)

  // Si hay cambios que no se llegaron a guardar (sesión caducada), se recuperan
  function recuperarCopia(id?: number) {
    try {
      const copia = sessionStorage.getItem(claveCopia(id))
      if (copia) {
        setNoticia(JSON.parse(copia))
        setSucio(true)
        setAviso("Se han recuperado los cambios que no se llegaron a guardar. Revísalos y pulsa «Guardar».")
      }
    } catch {
      // el navegador no deja usar sessionStorage: no pasa nada
    }
  }

  // Cargar la noticia (o empezar una nueva)
  useEffect(() => {
    if (!idParam) {
      recuperarCopia(undefined)
      return
    }
    leerNoticiaAdmin(idParam)
      .then((n) => {
        setNoticia(n)
        setEstado("listo")
        recuperarCopia(idParam)
      })
      .catch((err) => {
        if (err instanceof ErrorAdmin && err.estado === 401) sesionCaducada()
        else if (err instanceof ErrorAdmin && err.estado === 404) setEstado("no-existe")
        else setEstado("error")
      })
  }, [idParam])

  // Aviso del navegador si se intenta cerrar la pestaña con cambios sin guardar
  useEffect(() => {
    if (!sucio) return
    const avisar = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ""
    }
    window.addEventListener("beforeunload", avisar)
    return () => window.removeEventListener("beforeunload", avisar)
  }, [sucio])

  function cambiar(cambios: Partial<NoticiaAdmin>) {
    setNoticia((n) => {
      if (!n) return n
      const nueva = { ...n, ...cambios }
      // En una noticia nueva, la dirección sigue al título hasta que alguien la toque a mano
      if ("titulo" in cambios && !slugTocado) nueva.slug = slugDesdeTitulo(cambios.titulo ?? "")
      return nueva
    })
    setErrores((e) => {
      const copia = { ...e }
      Object.keys(cambios).forEach((k) => delete copia[k])
      return copia
    })
    setSucio(true)
  }

  async function guardar(publicado: boolean) {
    if (!noticia) return
    setGuardando(true)
    setErrores({})
    setMensajeError("")
    setAviso("")
    const datos = { ...noticia, publicado }

    try {
      const r = await guardarNoticiaAdmin(datos)
      try {
        sessionStorage.removeItem(claveCopia(noticia.id))
      } catch {}
      setNoticia({ ...datos, id: r.id, slug: r.slug })
      setSucio(false)
      setSlugTocado(true)

      if (publicado) setAviso(noticia.publicado ? "Cambios guardados. Ya se ven en la web." : "Noticia publicada. Ya se ve en la web.")
      else setAviso(noticia.publicado ? "La noticia ha pasado a borrador: ya no se ve en la web." : "Borrador guardado. Todavía no se ve en la web.")

      // Una noticia nueva pasa a tener su id en la dirección (para que al volver a guardar se actualice)
      if (!noticia.id) window.history.replaceState(null, "", `/admin/noticias/editar/?id=${r.id}`)
    } catch (err) {
      if (err instanceof ErrorAdmin && err.estado === 401) {
        try {
          sessionStorage.setItem(claveCopia(noticia.id), JSON.stringify(noticia))
        } catch {}
        sesionCaducada()
        return
      }
      if (err instanceof ErrorAdmin && err.estado === 422) setErrores(err.campos)
      setMensajeError(err instanceof ErrorAdmin ? err.message : "No se ha podido guardar. Inténtalo de nuevo.")
      requestAnimationFrame(() => cajaErrores.current?.focus())
    } finally {
      setGuardando(false)
    }
  }

  function alternarVistaPrevia() {
    setVistaPrevia((v) => !v)
    if (!vistaPrevia) {
      requestAnimationFrame(() => document.getElementById("vista-previa")?.scrollIntoView({ behavior: "smooth" }))
    }
  }

  if (estado === "cargando") return <p role="status">Cargando noticia…</p>

  if (estado === "no-existe") {
    return (
      <>
        <p className="mb-4">Esta noticia ya no existe.</p>
        <Link href="/admin/noticias/" className="font-semibold underline">Volver a la lista</Link>
      </>
    )
  }

  if (estado === "error" || !noticia) {
    return <p role="alert">No se ha podido cargar la noticia. Inténtalo de nuevo más tarde.</p>
  }

  const e = errores
  const numErrores = Object.keys(e).length

  return (
    <>
      <Link
        href="/admin/noticias/"
        onClick={(ev) => {
          if (sucio && !window.confirm("Hay cambios sin guardar. ¿Salir igualmente?")) ev.preventDefault()
        }}
        className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Volver a la lista
      </Link>

      <h1 className="mb-2 text-3xl font-bold">{noticia.id ? "Editar noticia" : "Nueva noticia"}</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        {noticia.publicado ? "Publicada: se ve en la web." : "Borrador: todavía no se ve en la web."} Los campos con * son obligatorios.
      </p>

      {/* Mensajes para lectores de pantalla (mover bloques, etc.) */}
      <div aria-live="polite" className="sr-only">{anuncio}</div>

      <div aria-live="polite">
        {aviso && (
          <p className="mb-6 rounded-lg bg-white p-4 font-semibold">
            {aviso}{" "}
            {noticia.publicado && noticia.id && !sucio && (
              <a href={urlNoticia(noticia.slug)} target="_blank" rel="noopener noreferrer" className="underline">
                Ver en la web<span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            )}
          </p>
        )}
      </div>

      {mensajeError && (
        <div ref={cajaErrores} tabIndex={-1} role="alert" className="mb-6 rounded-lg border-2 border-error bg-white p-4">
          <p className="font-semibold text-error">{mensajeError}</p>
          {numErrores > 0 && (
            <p className="mt-1 text-sm">
              Hay {numErrores} {numErrores === 1 ? "cosa" : "cosas"} por revisar, marcadas en rojo.
            </p>
          )}
        </div>
      )}

      <form
        noValidate
        className="space-y-8"
        onSubmit={(ev) => {
          ev.preventDefault()
          guardar(noticia.publicado)
        }}
      >
        {/* ── Datos principales ── */}
        <section aria-labelledby="sec-datos" className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
          <h2 id="sec-datos" className="text-xl font-bold">Datos principales</h2>

          <Campo id="titulo" etiqueta="Título" obligatorio error={e.titulo}>
            {(p) => <input {...p} className={claseCampo} value={noticia.titulo} onChange={(ev) => cambiar({ titulo: ev.target.value })} />}
          </Campo>

          <Campo
            id="slug"
            etiqueta="Dirección de la noticia"
            ayuda={
              (noticia.publicado
                ? "Cuidado: si la cambias en una noticia ya publicada, los enlaces antiguos dejarán de funcionar. "
                : "Se crea sola a partir del título. ") + `Quedará así: /noticias/${noticia.slug || "…"}/`
            }
            error={e.slug}
          >
            {(p) => (
              <input
                {...p}
                className={claseCampo}
                value={noticia.slug}
                onChange={(ev) => {
                  setSlugTocado(true)
                  cambiar({ slug: limpiarSlug(ev.target.value) })
                }}
              />
            )}
          </Campo>

          <Campo
            id="resumen"
            etiqueta="Resumen"
            obligatorio
            ayuda={`Una o dos frases. Sale en las tarjetas, en Google y al compartir la noticia. (${noticia.resumen.length} de 500 caracteres)`}
            error={e.resumen}
          >
            {(p) => <textarea {...p} rows={3} className={claseCampo} value={noticia.resumen} onChange={(ev) => cambiar({ resumen: ev.target.value })} />}
          </Campo>

          <div className="grid gap-5 sm:grid-cols-2">
            <Campo id="fecha" etiqueta="Fecha" obligatorio error={e.fecha}>
              {(p) => <input {...p} type="date" className={claseCampo} value={noticia.fecha} onChange={(ev) => cambiar({ fecha: ev.target.value })} />}
            </Campo>

            <Campo id="categoria" etiqueta="Categoría" obligatorio error={e.categoria}>
              {(p) => (
                <select {...p} className={claseCampo} value={noticia.categoria} onChange={(ev) => cambiar({ categoria: ev.target.value as Categoria })}>
                  <option value="">Elige una categoría</option>
                  {CATEGORIAS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              )}
            </Campo>
          </div>

          <Campo id="autor" etiqueta="Autor (opcional)" ayuda="Quién firma la noticia. Sale junto a la fecha." error={e.autor}>
            {(p) => <input {...p} className={claseCampo} value={noticia.autor} onChange={(ev) => cambiar({ autor: ev.target.value })} />}
          </Campo>

          <fieldset>
            <legend className="mb-1 font-semibold">Agrupaciones relacionadas (opcional)</legend>
            <div className="grid gap-1 sm:grid-cols-2">
              {(Object.keys(agrupaciones) as Agrupacion[]).map((a) => (
                <label key={a} className="flex min-h-11 items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-5 w-5"
                    checked={noticia.agrupaciones.includes(a)}
                    onChange={(ev) =>
                      cambiar({
                        agrupaciones: ev.target.checked
                          ? [...noticia.agrupaciones, a]
                          : noticia.agrupaciones.filter((x) => x !== a),
                      })
                    }
                  />
                  {agrupaciones[a].nombre}
                </label>
              ))}
            </div>
          </fieldset>
                    <label className="flex min-h-11 items-start gap-3">
            <input
              type="checkbox"
              className="mt-0.5 h-5 w-5"
              checked={noticia.destacada}
              onChange={(ev) => cambiar({ destacada: ev.target.checked })}
              aria-describedby="destacada-ayuda"
            />
            <span>
              <span className="block font-semibold">Destacada</span>
              <span id="destacada-ayuda" className="text-sm text-muted-foreground">
                Sale la primera, en grande, en la página de noticias aunque no sea la más reciente. Si hay varias destacadas, sale la más reciente de ellas.
              </span>
            </span>
          </label>
        </section>

        {/* ── Foto principal ── */}
        <section aria-labelledby="sec-foto" className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
          <div>
            <h2 id="sec-foto" className="text-xl font-bold">Foto principal</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Opcional. Sale en las tarjetas, al compartir la noticia y junto al texto. Si no hay ninguna, en las tarjetas sale el logo del Ateneo.
            </p>
          </div>

          <CampoFoto id="imagen" etiqueta="Foto principal" ruta={noticia.imagen} alCambiar={(ruta) => cambiar({ imagen: ruta })} error={e.imagen} />

          {noticia.imagen && (
            <>
              <Campo
                id="imagenAlt"
                etiqueta="Descripción de la foto"
                obligatorio
                ayuda="Qué se ve en la foto, para quien no puede verla. Por ejemplo: «Julián y Marcos, directores de la Banda Sinfónica, en el local de ensayo»."
                error={e.imagenAlt}
              >
                {(p) => <textarea {...p} rows={2} className={claseCampo} value={noticia.imagenAlt} onChange={(ev) => cambiar({ imagenAlt: ev.target.value })} />}
              </Campo>

              <Campo id="pieImagen" etiqueta="Pie de foto (opcional)" ayuda="Texto pequeño debajo de la foto. Por ejemplo: «Foto: J.R. Viejo»." error={e.pieImagen}>
                {(p) => <input {...p} className={claseCampo} value={noticia.pieImagen} onChange={(ev) => cambiar({ pieImagen: ev.target.value })} />}
              </Campo>

              <fieldset>
                <legend className="mb-1 font-semibold">Lado de la foto junto al texto</legend>
                <div className="flex flex-wrap gap-6">
                  {(["derecha", "izquierda"] as const).map((lado) => (
                    <label key={lado} className="flex min-h-11 items-center gap-2">
                      <input
                        type="radio"
                        name="imagenLado"
                        className="h-5 w-5"
                        checked={noticia.imagenLado === lado}
                        onChange={() => cambiar({ imagenLado: lado })}
                      />
                      {lado === "derecha" ? "Derecha" : "Izquierda"}
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          )}
        </section>

        {/* ── Cuerpo ── */}
        <section aria-labelledby="sec-cuerpo" className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
          <div>
            <h2 id="sec-cuerpo" className="text-xl font-bold">Texto de la noticia</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Añade los bloques en el orden en que se leerán. Usa «Subtítulo» para los títulos pequeños entre párrafos.
            </p>
          </div>
          {e.contenido && <p className="text-sm font-semibold text-error">{e.contenido}</p>}
          <EditorBloques bloques={noticia.contenido} alCambiar={(contenido) => cambiar({ contenido })} errores={e} alAnunciar={setAnuncio} />
        </section>

        {/* ── Fuentes ── */}
        <section aria-labelledby="sec-fuentes" className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
          <div>
            <h2 id="sec-fuentes" className="text-xl font-bold">Fuentes de prensa</h2>
            <p className="mt-1 text-sm text-muted-foreground">Los artículos en los que se basa la noticia, si los hay.</p>
          </div>
          <EditorFuentes fuentes={noticia.fuentes} alCambiar={(fuentes) => cambiar({ fuentes })} errores={e} />
        </section>

        {/* ── Botones (se quedan fijos abajo al bajar por la página) ── */}
        <div className="sticky bottom-0 z-10 -mx-6 flex flex-wrap items-center gap-3 border-t border-border bg-white px-6 py-4">
          {noticia.publicado ? (
            <>
              <button type="button" onClick={() => guardar(true)} disabled={guardando} className={claseBotonPrincipal}>
                {guardando ? "Guardando…" : "Guardar cambios"}
              </button>
              <button type="button" onClick={() => guardar(false)} disabled={guardando} className={claseBotonSecundario}>
                Guardar y pasar a borrador
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => guardar(true)} disabled={guardando} className={claseBotonPrincipal}>
                {guardando ? "Guardando…" : "Guardar y publicar"}
              </button>
              <button type="button" onClick={() => guardar(false)} disabled={guardando} className={claseBotonSecundario}>
                Guardar borrador
              </button>
            </>
          )}

          <button
            type="button"
            onClick={alternarVistaPrevia}
            aria-expanded={vistaPrevia}
            aria-controls="vista-previa"
            className={claseBotonSecundario}
          >
            {vistaPrevia ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
            {vistaPrevia ? "Ocultar vista previa" : "Vista previa"}
          </button>

          {sucio && <span className="text-sm text-muted-foreground">Hay cambios sin guardar</span>}
        </div>
      </form>

      {/* ── Vista previa ── */}
      <section
        id="vista-previa"
        aria-labelledby="sec-vista-previa"
        hidden={!vistaPrevia}
        className="mt-8 rounded-2xl bg-white p-6 shadow-sm"
      >
        <h2 id="sec-vista-previa" className="mb-1 text-xl font-bold">Vista previa</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Así se verá el cuerpo de la noticia. En la web, encima, irá el banner de noticias con el título.
        </p>

        <div className="border-t border-border pt-6">
          <p className="text-sm uppercase tracking-wider text-muted-foreground">
            {noticia.categoria || "Sin categoría"} · {noticia.fecha ? formatearFecha(noticia.fecha) : "Sin fecha"}
            {noticia.autor && ` · Por ${noticia.autor}`}
          </p>
          <p className="mb-8 mt-2 text-3xl font-bold">{noticia.titulo || "Sin título"}</p>

          <NoticiaCuerpo
            titulo={noticia.titulo}
            resumen={noticia.resumen}
            imagen={noticia.imagen || null}
            imagenAlt={noticia.imagenAlt}
            imagenLado={noticia.imagenLado}
            pieImagen={noticia.pieImagen}
            contenido={noticia.contenido}
            fuentes={noticia.fuentes}
            agrupaciones={noticia.agrupaciones}
          />
        </div>
      </section>
    </>
  )
}

export default function EditarNoticiaPage() {
  return (
    // Suspense es necesario para que la página se pueda exportar como estática
    <Suspense fallback={<p role="status">Cargando…</p>}>
      <Editor />
    </Suspense>
  )
}