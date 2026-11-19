// Genera la imagen vertical (1080×1920) para compartir una noticia en Instagram Historias.
// Diseño "A2": azul arriba hasta la mitad de la foto, título, franja azul con flecha
// hacia el sticker de enlace y el logo del Ateneo abajo a la derecha.
// Arriba (250 px) y abajo (300 px) se deja margen libre porque ahí Instagram pone su barra y sus botones.

const ANCHO = 1080
const ALTO = 1920
const MARGEN = 80

const AZUL = "#3399fe"
const AMARILLO = "#f6f61b"
const VERDE = "#285943"
const OSCURO = "#01020a"
const CLARO = "#f4f4f4"

const LOGO = "/logos/logo_ateneo_sin_texto-no-bg.png"

type DatosStory = {
  titulo: string
  fecha?: string          // ya escrita, p. ej. "23 de agosto de 2024"
  imagen?: string | null
}

/** Descarga una imagen y la prepara para dibujarla en el canvas. */
async function cargarImagen(src: string): Promise<ImageBitmap> {
  const res = await fetch(src)
  if (!res.ok) throw new Error("No se pudo cargar la imagen")
  return createImageBitmap(await res.blob())
}

/** Reparte el texto en líneas que quepan en el ancho indicado. */
function partirLineas(ctx: CanvasRenderingContext2D, texto: string, ancho: number): string[] {
  const lineas: string[] = []
  let actual = ""
  for (const palabra of texto.split(/\s+/)) {
    const prueba = actual ? `${actual} ${palabra}` : palabra
    if (ctx.measureText(prueba).width > ancho && actual) {
      lineas.push(actual)
      actual = palabra
    } else {
      actual = prueba
    }
  }
  if (actual) lineas.push(actual)
  return lineas
}

/** Busca las fuentes que ya carga la web (Lato y DM Serif Display, de next/font). */
async function obtenerFuentes() {
  await document.fonts.ready
  const lista = Array.from(document.fonts as unknown as Iterable<FontFace>)
  const serif = lista.find((f) => /dm.?serif/i.test(f.family))
  const lato = lista.filter((f) => /lato/i.test(f.family))
  await Promise.all(
    [serif, ...lato].filter((f): f is FontFace => Boolean(f)).map((f) => f.load().catch(() => null)),
  )
  const limpio = (s: string) => s.replace(/^["']|["']$/g, "")
  return {
    serif: serif ? `"${limpio(serif.family)}", Georgia, serif` : "Georgia, serif",
    sans: lato[0] ? `"${limpio(lato[0].family)}", Arial, sans-serif` : "Arial, sans-serif",
  }
}
type Hueco = { x: number; w: number; h: number }

const ANCHO_FOTO = ANCHO - MARGEN * 2   // 920

/**
 * Hueco de la foto. Siempre con su proporción: sin recortes y sin bandas negras.
 * - Horizontal o cuadrada: a todo el ancho. Si hace falta, la fecha y el título se aprietan
 *   (solo si es casi cuadrada y ni así cabe, se estrecha un poco).
 * - Vertical: a todo el ancho mientras quepa con el texto a su tamaño normal;
 *   si no cabe, se estrecha y queda centrada (como mínimo 540 px de alto).
 */
function huecoFoto(img: ImageBitmap | null, altoMaxHorizontal: number, altoMaxVertical: number): Hueco {
  if (!img) return { x: MARGEN, w: ANCHO_FOTO, h: 540 }
  const altoNatural = (ANCHO_FOTO * img.height) / img.width
  const altoMax = img.width >= img.height ? altoMaxHorizontal : Math.max(540, altoMaxVertical)
  if (altoNatural <= altoMax) return { x: MARGEN, w: ANCHO_FOTO, h: altoNatural }
  const w = (altoMax * img.width) / img.height
  return { x: (ANCHO - w) / 2, w, h: altoMax }
}

/** Dibuja la foto entera en su hueco. */
function dibujarFoto(ctx: CanvasRenderingContext2D, img: ImageBitmap, { x, w, h }: Hueco, y: number) {
  ctx.drawImage(img, x, y, w, h)
}

/** Alto que ocupa el título entero con un tamaño de letra dado. */
function altoTitulo(ctx: CanvasRenderingContext2D, titulo: string, serif: string, tam: number): number {
  ctx.font = `400 ${tam}px ${serif}`
  return partirLineas(ctx, titulo, ANCHO_FOTO).length * tam * 1.08
}

/** Alto del título a su tamaño normal: 66 px, o 58/52 si pasa de 3 líneas. Siempre entero. */
function medirTitulo(ctx: CanvasRenderingContext2D, titulo: string, serif: string): number {
  for (const tam of [66, 58]) {
    ctx.font = `400 ${tam}px ${serif}`
    if (partirLineas(ctx, titulo, ANCHO_FOTO).length <= 3) return altoTitulo(ctx, titulo, serif, tam)
  }
  return altoTitulo(ctx, titulo, serif, 52)
}

export async function generarStory({ titulo, fecha, imagen }: DatosStory): Promise<Blob> {
  const { serif, sans } = await obtenerFuentes()

  const canvas = document.createElement("canvas")
  canvas.width = ANCHO
  canvas.height = ALTO
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("El navegador no permite generar la imagen")

  // La foto se carga lo primero, porque su forma decide dónde va todo lo demás
  let foto: ImageBitmap | null = null
  if (imagen) {
    try {
      foto = await cargarImagen(imagen)
    } catch {
      // Sin foto
    }
  }

  // Posiciones
  const cabeceraY = 160                  // nombre del Ateneo y etiqueta
  const fotoY = cabeceraY + 120          // la foto empieza justo debajo de la cabecera (280)
  const filaY = 1600                     // fila del sticker y el logo (acaba en 1750)
  const filaAlto = 150
  const franjaAlto = 100
  const franjaY = filaY - 24 - franjaAlto
  const altoFecha = fecha ? 54 : 0
  const HUECO_MIN = 24                   // separación mínima entre foto, texto y franja
  const TITULO_MIN = 40            // letra más pequeña del título (nunca se corta)
  const TITULO_MAX = 80 

  // Hueco de la foto según su forma
  const espacio = franjaY - fotoY
   const textoNormal = 56 + altoFecha + medirTitulo(ctx, titulo, serif) + 40
  const textoApretado = HUECO_MIN * 2 + altoFecha + altoTitulo(ctx, titulo, serif, TITULO_MIN)   // título entero a la letra más pequeña
  const hueco = huecoFoto(foto, espacio - textoApretado, espacio - textoNormal)

  // Fondo claro y azul hasta la mitad de la foto
  ctx.fillStyle = CLARO
  ctx.fillRect(0, 0, ANCHO, ALTO)
  ctx.fillStyle = AZUL
  ctx.fillRect(0, 0, ANCHO, fotoY + hueco.h / 2)

  // Cabecera: nombre a la izquierda y etiqueta amarilla a la derecha
  ctx.textBaseline = "top"
  ctx.fillStyle = OSCURO
  ctx.font = `900 30px ${sans}`
  ctx.fillText("ATENEO MUSICAL", MARGEN, cabeceraY)
  ctx.font = `400 30px ${sans}`
  ctx.fillText("DE MIERES", MARGEN, cabeceraY + 40)

  ctx.font = `900 30px ${sans}`
  const etiqueta = "NOTICIA"
  const anchoEtiqueta = ctx.measureText(etiqueta).width + 56
  ctx.fillStyle = AMARILLO
  ctx.fillRect(ANCHO - MARGEN - anchoEtiqueta, cabeceraY + 3, anchoEtiqueta, 64)
  ctx.fillStyle = OSCURO
  ctx.fillText(etiqueta, ANCHO - MARGEN - anchoEtiqueta + 28, cabeceraY + 20)

  // Foto con una sombra suave debajo (si no hay o no carga, queda un recuadro oscuro)
  ctx.save()
  ctx.shadowColor = "rgba(1, 2, 10, 0.35)"
  ctx.shadowBlur = 40
  ctx.shadowOffsetY = 16
  if (foto) {
    dibujarFoto(ctx, foto, hueco, fotoY)
  } else {
    ctx.fillStyle = OSCURO
    ctx.fillRect(hueco.x, fotoY, hueco.w, hueco.h)
  }
  ctx.restore()   // quita la sombra para que no la tengan el texto ni la franja

  // Título: lo más grande posible (de 66 a 40 px) en el espacio que deja la foto. Siempre entero.
  const libre = franjaY - (fotoY + hueco.h)
  const espacioTitulo = libre - HUECO_MIN * 2 - altoFecha
  let tam = TITULO_MAX
  while (tam > TITULO_MIN && altoTitulo(ctx, titulo, serif, tam) > espacioTitulo) tam -= 2
  ctx.font = `400 ${tam}px ${serif}`
  const lineas = partirLineas(ctx, titulo, ANCHO_FOTO)

  // Fecha y título, centrados en el hueco entre la foto y la franja
  const altoBloque = altoFecha + lineas.length * tam * 1.08
  let y = fotoY + hueco.h + Math.max(HUECO_MIN, (libre - altoBloque) / 2)
  if (fecha) {
    ctx.fillStyle = VERDE
    ctx.font = `700 30px ${sans}`
    ctx.fillText(fecha, MARGEN, y)
    y += altoFecha
  }
  ctx.fillStyle = OSCURO
  ctx.font = `400 ${tam}px ${serif}`
  lineas.forEach((linea, i) => ctx.fillText(linea, MARGEN, y + i * tam * 1.08))

  // Franja azul con flecha hacia el sitio del sticker
  ctx.fillStyle = AZUL
  ctx.fillRect(MARGEN, franjaY, ANCHO_FOTO, franjaAlto)
  const fx = MARGEN + 62
  const fy = franjaY + franjaAlto / 2
  ctx.strokeStyle = OSCURO
  ctx.lineWidth = 5
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  ctx.beginPath()
  ctx.moveTo(fx, fy - 20)
  ctx.lineTo(fx, fy + 20)
  ctx.moveTo(fx - 14, fy + 6)
  ctx.lineTo(fx, fy + 20)
  ctx.lineTo(fx + 14, fy + 6)
  ctx.stroke()
  ctx.fillStyle = OSCURO
  ctx.font = `900 32px ${sans}`
  ctx.textBaseline = "middle"
  ctx.fillText("Toca el enlace para leer la noticia completa", fx + 40, fy)

  // Logo abajo a la derecha (a la izquierda queda el hueco para el sticker)
  try {
    const logo = await cargarImagen(LOGO)
    const anchoLogo = (logo.width * filaAlto) / logo.height
    ctx.drawImage(logo, ANCHO - MARGEN - anchoLogo, filaY, anchoLogo, filaAlto)
  } catch {
    // Sin logo
  }

  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("No se pudo generar la imagen"))), "image/png"),
  )
}