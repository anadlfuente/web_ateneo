// Piezas del listado de noticias (/noticias/).
// Cada noticia sale con un tamaño distinto según su posición:
//   1ª (o la destacada)  → NoticiaApertura, grande
//   2ª y 3ª              → NoticiaSecundaria, columna lateral
//   4ª a 9ª              → NoticiaFila, tarjeta horizontal
//   el resto             → FilaArchivo, lista compacta del archivo

import { ArrowRight } from "lucide-react"
import { urlNoticia, type Categoria, type NoticiaResumen } from "@/lib/noticias"

// Cuadradito de color de cada categoría (solo decoración: el nombre va escrito al lado)
const colorMarca: Record<Categoria, string> = {
  Logros: "bg-accent-yellow ring-1 ring-dark",
  Noticias: "bg-primary-blue",
  Prensa: "bg-accent-green",
  Conciertos: "bg-primary-blue",
}

/** "2026-11-05" → "5 nov 2026" */
export function fechaCorta(fecha: string): string {
  const [y, m, d] = fecha.split("-").map(Number)
  return new Date(y, m - 1, d)
    .toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })
    .replace(".", "")
}

/** Nombres de los periódicos, sin repetir: "El Comercio · La Nueva España" */
function textoFuentes(n: NoticiaResumen): string {
  return Array.from(new Set(n.fuentes.map((f) => f.medio))).join(" · ")
}

// Subrayado azul del titular al pasar el ratón por la noticia
const claseTitular = "group-hover:underline decoration-primary-blue decoration-[3px] underline-offset-4"
const claseEnlace =
  "group block focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-foreground"

/** Categoría · fecha, con su cuadradito de color */
function Antetitulo({ noticia, claro = false }: { noticia: NoticiaResumen; claro?: boolean }) {
  return (
    <span className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-wider">
      <span aria-hidden="true" className={`inline-block h-2.5 w-2.5 shrink-0 ${colorMarca[noticia.categoria]}`} />
      <span>{noticia.categoria}</span>
      <span className={`font-bold ${claro ? "text-white/85" : "text-muted-foreground"}`}>
        · <time dateTime={noticia.fecha}>{fechaCorta(noticia.fecha)}</time>
      </span>
    </span>
  )
}

/** Foto de la noticia. Si no tiene foto propia sale el logo, sin recortar. */
function Foto({ noticia, className }: { noticia: NoticiaResumen; className: string }) {
  return (
    <img
      src={noticia.imagen}
      alt={noticia.imagenAlt || ""}
      loading="lazy"
      className={`${className} ${noticia.tieneImagenPropia ? "object-cover" : "object-contain bg-[#ffffff] p-6"}`}
    />
  )
}

function Fuente({ noticia, claro = false }: { noticia: NoticiaResumen; claro?: boolean }) {
  if (noticia.fuentes.length === 0) return null
  return (
    <p className={`text-sm font-bold ${claro ? "text-white/85" : "text-accent-green"}`}>Fuente: {textoFuentes(noticia)}</p>
  )
}

// ── 1ª noticia: grande ───────────────────────────────────────
// En el ordenador la foto ocupa todo el bloque y el texto va en un recuadro oscuro encima;
// en el móvil la foto va arriba y el recuadro debajo.

export function NoticiaApertura({ noticia }: { noticia: NoticiaResumen }) {
  return (
    <article className="min-w-0 flex-[999_1_640px]">
      <a
        href={urlNoticia(noticia.slug)}
className={`${claseEnlace} relative overflow-hidden rounded-xl bg-dark md:flex md:min-h-[460px] md:flex-col md:justify-end`}      >
        <Foto noticia={noticia} className="block aspect-[16/10] w-full md:absolute md:inset-0 md:aspect-auto md:h-full" />
<div className="relative flex flex-col gap-2.5 bg-dark p-5 text-white md:m-6 md:max-w-[560px] md:rounded-[10px] md:p-7">          <div className="flex flex-wrap items-center gap-2">
            <Antetitulo noticia={noticia} claro />
            {noticia.destacada && (
              <span className="rounded bg-accent-yellow px-2 py-0.5 text-[11px] font-black uppercase tracking-wider text-dark">
                Destacada
              </span>
            )}
          </div>
<h2 className={`text-xl font-black leading-tight md:text-[28px] ${claseTitular}`}>{noticia.titulo}</h2>
<p className="line-clamp-3 text-[15px] leading-relaxed text-white/85 md:text-base">{noticia.resumen}</p>
          <Fuente noticia={noticia} claro />
        </div>
      </a>
    </article>
  )
}

// ── 2ª y 3ª: columna lateral ─────────────────────────────────

export function NoticiaSecundaria({ noticia }: { noticia: NoticiaResumen }) {
  return (
    <article className="border-b border-[#c9ccd3] pb-6">
      <a href={urlNoticia(noticia.slug)} className={`${claseEnlace} flex flex-col gap-2.5`}>
        <Foto noticia={noticia} className="aspect-video w-full rounded-[10px]" />
        <Antetitulo noticia={noticia} />
<h3 className={`line-clamp-3 text-lg font-black leading-snug ${claseTitular}`}>{noticia.titulo}</h3>        <Fuente noticia={noticia} />
      </a>
    </article>
  )
}

// ── 4ª a 9ª: tarjeta horizontal ──────────────────────────────

export function NoticiaFila({ noticia }: { noticia: NoticiaResumen }) {
  return (
    <article className="border-b border-[#c9ccd3] pb-6 md:pb-7">
      <a href={urlNoticia(noticia.slug)} className={`${claseEnlace} flex items-start gap-4 md:gap-5`}>
        <Foto noticia={noticia} className="aspect-[4/3] w-28 shrink-0 rounded-lg md:w-48 md:rounded-[10px]" />
        <div className="flex min-w-0 flex-col gap-2">
          <Antetitulo noticia={noticia} />
<h3 className={`line-clamp-3 text-[15px] font-black leading-snug md:text-base ${claseTitular}`}>{noticia.titulo}</h3>
<p className="hidden text-sm leading-normal text-muted-foreground md:line-clamp-2">{noticia.resumen}</p>
          <Fuente noticia={noticia} />
        </div>
      </a>
    </article>
  )
}

// ── Archivo y resultados de búsqueda: fila compacta ─────────

export function FilaArchivo({ noticia }: { noticia: NoticiaResumen }) {
  return (
    <li className="border-b border-[#dcdde1]">
      <a
        href={urlNoticia(noticia.slug)}
        className={`${claseEnlace} grid min-h-11 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-4 md:grid-cols-[8rem_8rem_minmax(0,1fr)_auto] md:gap-5`}
      >
        {/* En el ordenador: fecha y categoría en columnas; en el móvil, encima del titular */}
        <span className="hidden text-sm font-bold text-muted-foreground md:block">
          <time dateTime={noticia.fecha}>{fechaCorta(noticia.fecha)}</time>
        </span>
        <span className="hidden items-center gap-2 text-xs font-black uppercase tracking-wider md:flex">
          <span aria-hidden="true" className={`inline-block h-2.5 w-2.5 shrink-0 ${colorMarca[noticia.categoria]}`} />
          {noticia.categoria}
        </span>
        <span className="flex min-w-0 flex-col gap-1">
          <span className="md:hidden">
            <Antetitulo noticia={noticia} />
          </span>
<span className={`text-[15px] font-bold leading-snug md:text-base ${claseTitular}`}>{noticia.titulo}</span>          {noticia.fuentes.length > 0 && (
            <span className="text-[13px] font-bold text-accent-green">Fuente: {textoFuentes(noticia)}</span>
          )}
        </span>
        <ArrowRight aria-hidden="true" className="h-[18px] w-[18px]" />
      </a>
    </li>
  )
}