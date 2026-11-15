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

/**
 * Dibuja la foto en su hueco.
 * Horizontal o cuadrada: rellena el hueco recortando lo que sobra (centrado).
 * Vertical (carteles): se ve entera, sin recortar, con fondo oscuro a los lados.
 */
function dibujarFoto(ctx: CanvasRenderingContext2D, img: ImageBitmap, x: number, y: number, w: number, h: number) {
  const iw = img.width
  const ih = img.height
  if (ih > iw) {
    const escala = Math.min(w / iw, h / ih)
    const dw = iw * escala
    const dh = ih * escala
    ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh)
  } else {
    const escala = Math.max(w / iw, h / ih)
    const sw = w / escala
    const sh = h / escala
    ctx.drawImage(img, (iw - sw) / 2, (ih - sh) / 2, sw, sh, x, y, w, h)
  }
}

export async function generarStory({ titulo, fecha, imagen }: DatosStory): Promise<Blob> {
  const { serif, sans } = await obtenerFuentes()

  const canvas = document.createElement("canvas")
  canvas.width = ANCHO
  canvas.height = ALTO
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("El navegador no permite generar la imagen")

  // Posiciones
  const fotoX = MARGEN
  const fotoY = 386
  const fotoAncho = ANCHO - MARGEN * 2   // 920
  const fotoAlto = 540
  const filaY = 1470                     // fila del sticker y el logo (acaba en 1620)
  const filaAlto = 150
  const franjaAlto = 100
  const franjaY = filaY - 24 - franjaAlto

  // Fondo claro y azul hasta la mitad de la foto
  ctx.fillStyle = CLARO
  ctx.fillRect(0, 0, ANCHO, ALTO)
  ctx.fillStyle = AZUL
  ctx.fillRect(0, 0, ANCHO, fotoY + fotoAlto / 2)

  // Cabecera: nombre a la izquierda y etiqueta amarilla a la derecha
  ctx.textBaseline = "top"
  ctx.fillStyle = OSCURO
  ctx.font = `900 30px ${sans}`
  ctx.fillText("ATENEO MUSICAL", MARGEN, 255)
  ctx.font = `400 30px ${sans}`
  ctx.fillText("DE MIERES", MARGEN, 295)

  ctx.font = `900 30px ${sans}`
  const etiqueta = "NOTICIA"
  const anchoEtiqueta = ctx.measureText(etiqueta).width + 56
  ctx.fillStyle = AMARILLO
  ctx.fillRect(ANCHO - MARGEN - anchoEtiqueta, 258, anchoEtiqueta, 64)
  ctx.fillStyle = OSCURO
  ctx.fillText(etiqueta, ANCHO - MARGEN - anchoEtiqueta + 28, 275)

  // Foto (si no carga, queda el recuadro oscuro)
  ctx.fillStyle = OSCURO
  ctx.fillRect(fotoX, fotoY, fotoAncho, fotoAlto)
  if (imagen) {
    try {
      dibujarFoto(ctx, await cargarImagen(imagen), fotoX, fotoY, fotoAncho, fotoAlto)
    } catch {
      // Sin foto
    }
  }

  // Fecha
  let y = fotoY + fotoAlto + 56
  if (fecha) {
    ctx.fillStyle = VERDE
    ctx.font = `700 30px ${sans}`
    ctx.fillText(fecha, MARGEN, y)
    y += 54
  }

  // Título: si es muy largo, baja de tamaño para no pisar la franja
  const altoDisponible = franjaY - 40 - y
  let tam = 66
  let lineas: string[] = []
  while (true) {
    ctx.font = `400 ${tam}px ${serif}`
    lineas = partirLineas(ctx, titulo, fotoAncho)
    if (lineas.length * tam * 1.08 <= altoDisponible || tam <= 44) break
    tam -= 2
  }
  const maxLineas = Math.max(1, Math.floor(altoDisponible / (tam * 1.08)))
  if (lineas.length > maxLineas) {
    lineas = lineas.slice(0, maxLineas)
    lineas[maxLineas - 1] = lineas[maxLineas - 1].replace(/\s*\S*$/, "") + "…"
  }
  ctx.fillStyle = OSCURO
  lineas.forEach((linea, i) => ctx.fillText(linea, MARGEN, y + i * tam * 1.08))

  // Franja azul con flecha hacia el sitio del sticker
  ctx.fillStyle = AZUL
  ctx.fillRect(MARGEN, franjaY, fotoAncho, franjaAlto)
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