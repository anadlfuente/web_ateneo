// generar-galeria.mjs
// Lee las carpetas de eventos de public/galeria-section/ y genera public/galeria.json,
// que es el listado que usa la página de galería.
//
// Se ejecuta solo al hacer `npm run dev` y `npm run build` (ver "predev" y "prebuild"
// en package.json). También se puede lanzar a mano:  node generar-galeria.mjs

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// ---------- Ajustes ----------
const CARPETA_GALERIA = "public/galeria-section";
const URL_BASE = "/galeria-section";
const SALIDA = "public/galeria.json";

// Nombres oficiales de las agrupaciones. Si en un info.json aparece otro nombre,
// el script avisa (suele ser una errata que rompería el filtro).
const AGRUPACIONES = [
  "Banda Sinfónica",
  "Coral Cantares",
  "New Charanga Paentamala",
  "Claxon Boys",
  "Grupos de cámara",
];
// -----------------------------

const EXT_IMAGEN = [".webp", ".jpg", ".jpeg", ".png", ".avif"];
const EXT_VIDEO = [".mp4", ".webm"];
const avisos = [];

const ordenNatural = (a, b) => a.localeCompare(b, "es", { numeric: true });
const sinExtension = (nombre) => path.parse(nombre).name;

// "2026-05-01-santa-cruz-de-la-zarza" -> "Santa cruz de la zarza"
function tituloDesdeCarpeta(carpeta) {
  const texto = carpeta.replace(/^\d{4}(-\d{2}){0,2}-?/, "").replace(/-/g, " ").trim();
  return texto ? texto.charAt(0).toUpperCase() + texto.slice(1) : carpeta;
}

// Acepta "2026-05-01", "2026-05" o "2026". Si no hay fecha en info.json, la saca del nombre de la carpeta.
function leerFecha(info, carpeta) {
  const valor = info.fecha ?? carpeta.match(/^(\d{4}(-\d{2}){0,2})/)?.[1] ?? null;
  if (valor === null || valor === "") return null;
  if (!/^\d{4}(-\d{2}){0,2}$/.test(String(valor))) {
    avisos.push(`${carpeta}: la fecha "${valor}" no tiene el formato AAAA-MM-DD; se ignora.`);
    return null;
  }
  return String(valor);
}

async function leerInfo(rutaCarpeta, carpeta) {
  const rutaInfo = path.join(rutaCarpeta, "info.json");
  try {
    return JSON.parse(await fs.readFile(rutaInfo, "utf8"));
  } catch (e) {
    if (e.code === "ENOENT") {
      avisos.push(`${carpeta}: no tiene info.json; uso el nombre de la carpeta como título.`);
    } else {
      avisos.push(`${carpeta}: el info.json tiene un error de formato (${e.message}). Revisa comas y comillas.`);
    }
    return {};
  }
}

async function leerEvento(carpeta) {
  const rutaCarpeta = path.join(CARPETA_GALERIA, carpeta);
  const info = await leerInfo(rutaCarpeta, carpeta);

  const agrupaciones = Array.isArray(info.agrupaciones) ? info.agrupaciones : [];
  for (const a of agrupaciones) {
    if (!AGRUPACIONES.includes(a)) {
      avisos.push(`${carpeta}: agrupación desconocida "${a}". ¿Errata? Las válidas son: ${AGRUPACIONES.join(", ")}.`);
    }
  }

  const autores = info.autores && typeof info.autores === "object" ? info.autores : {};
  // Enlace a la red social del autor principal (opcional). Solo se aceptan URLs http(s).
  let enlaceAutor = null;
  if (info.enlaceAutor) {
    if (/^https?:\/\//.test(String(info.enlaceAutor))) enlaceAutor = String(info.enlaceAutor);
    else avisos.push(`${carpeta}: el enlaceAutor "${info.enlaceAutor}" debe empezar por https://; se ignora.`);
  }
  const archivos = (await fs.readdir(rutaCarpeta)).sort(ordenNatural);
  const fotos = [];

  for (const archivo of archivos) {
    const ext = path.extname(archivo).toLowerCase();
    const esImagen = EXT_IMAGEN.includes(ext);
    const esVideo = EXT_VIDEO.includes(ext);
    if (!esImagen && !esVideo) continue;

    if ([".jpg", ".jpeg", ".png"].includes(ext)) {
      avisos.push(`${carpeta}/${archivo}: sin convertir a WebP. Ejecuta node convertir-webp.mjs.`);
    }

    let ancho = null, alto = null;
    if (esImagen) {
      try {
        const meta = await sharp(path.join(rutaCarpeta, archivo)).metadata();
        ancho = meta.width ?? null;
        alto = meta.height ?? null;
      } catch {
        avisos.push(`${carpeta}/${archivo}: no se ha podido leer la imagen.`);
        continue;
      }
    }

    const nombre = sinExtension(archivo);
    const autor = autores[nombre] ?? info.autor ?? null;
    fotos.push({
      src: `${URL_BASE}/${encodeURIComponent(carpeta)}/${encodeURIComponent(archivo)}`,
      tipo: esVideo ? "video" : "imagen",
      ancho,
      alto,
      autor,
      // El enlace solo se pone si la foto es del autor principal del evento
      enlaceAutor: autor && autor === info.autor ? enlaceAutor : null,
    });
  }

  if (fotos.length === 0) {
    avisos.push(`${carpeta}: no tiene fotos; no aparecerá en la galería.`);
    return null;
  }

  // Portada: la indicada en info.json (con o sin extensión) o la primera imagen.
  const imagenes = fotos.filter((f) => f.tipo === "imagen");
  let portada = imagenes[0]?.src ?? null;
  if (info.portada) {
    const buscada = sinExtension(String(info.portada));
    const encontrada = imagenes.find((f) => sinExtension(decodeURIComponent(f.src.split("/").pop())) === buscada);
    if (encontrada) portada = encontrada.src;
    else avisos.push(`${carpeta}: la portada "${info.portada}" no existe; uso la primera foto.`);
  }

  const fecha = leerFecha(info, carpeta);
  return {
    id: carpeta,
    titulo: info.titulo || tituloDesdeCarpeta(carpeta),
    fecha,
    anio: fecha ? Number(fecha.slice(0, 4)) : null,
    agrupaciones,
    portada,
    fotos,
  };
}

async function main() {
  let carpetas = [];
  try {
    const entradas = await fs.readdir(CARPETA_GALERIA, { withFileTypes: true });
    carpetas = entradas.filter((e) => e.isDirectory() && !e.name.startsWith(".")).map((e) => e.name);
  } catch {
    console.log(`No existe ${CARPETA_GALERIA}/; genero una galería vacía.`);
  }

  const eventos = (await Promise.all(carpetas.map(leerEvento))).filter(Boolean);

  // Más recientes primero; los eventos sin fecha, al final.
  eventos.sort((a, b) => {
    if (a.fecha && b.fecha) return b.fecha.localeCompare(a.fecha);
    if (a.fecha) return -1;
    if (b.fecha) return 1;
    return a.titulo.localeCompare(b.titulo, "es");
  });

  const datos = { generado: new Date().toISOString(), eventos };
  await fs.writeFile(SALIDA, JSON.stringify(datos, null, 2) + "\n", "utf8");

  const totalFotos = eventos.reduce((n, e) => n + e.fotos.length, 0);
  console.log(`Galería: ${eventos.length} eventos, ${totalFotos} archivos -> ${SALIDA}`);
  if (avisos.length) {
    console.log("\n⚠️  Avisos:");
    for (const a of avisos) console.log("   - " + a);
  }
}

main().catch((e) => {
  console.error("Error generando la galería:", e.message);
  process.exit(1);
});
