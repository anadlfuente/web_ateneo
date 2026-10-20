// convertir-webp.mjs
// Convierte a WebP las fotos JPG/JPEG/PNG de public/galeria-section/ (la galería de eventos),
// manteniendo la proporción ancho/alto. El resto de public/ no se toca.
// - Ninguna foto pasa de 1920 px en su lado más largo (las más pequeñas no se agrandan).
// - Respeta la orientación de las fotos de móvil (EXIF) y la transparencia de los PNG.
// - Sustituye cada original por su versión WebP (no guarda copia de los originales).
// - Actualiza las rutas .jpg/.jpeg/.png -> .webp en el código (app/, components/, etc.).
//
// Uso (desde la raíz del proyecto):
//   node convertir-webp.mjs --prueba   -> solo muestra lo que haría, no cambia nada
//   node convertir-webp.mjs            -> lo hace de verdad
//   node convertir-webp.mjs --todo     -> convierte también el resto de public/ (cuidado con logos y esquemas)

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// ---------- Ajustes ----------
const CARPETA_PUBLIC = "public";
const CARPETA_GALERIA = "public/galeria-section";   // carpeta de la galería (fotos por eventos)
// dónde buscar referencias a las fotos (las que no existan se ignoran)
const CARPETAS_CODIGO = ["app", "components", "src", "pages", "lib", "data", "index.html"];
const LADO_MAXIMO = 1920;  // px del lado más largo
const CALIDAD = 82;        // 80-85 es visualmente igual al original
// -----------------------------

const PRUEBA = process.argv.includes("--prueba");
const TODO_PUBLIC = process.argv.includes("--todo");

// Por defecto solo se convierten los JPG/JPEG/PNG de public/galeria-section/ (la galería).
// El resto de public/ (posters, noticias, sponsors, logos...) no se toca,
// salvo que se use --todo.
function esConvertible(archivo) {
  const ext = path.extname(archivo).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return false;
  if (TODO_PUBLIC) return true;
  return !path.relative(CARPETA_GALERIA, archivo).startsWith("..");
}
const EXT_CODIGO = [".js", ".jsx", ".ts", ".tsx", ".css", ".scss", ".html", ".json", ".md"];

async function existe(ruta) {
  try { await fs.access(ruta); return true; } catch { return false; }
}

async function listarArchivos(ruta) {
  if (!(await existe(ruta))) return [];
  const info = await fs.stat(ruta);
  if (info.isFile()) return [ruta];
  const resultado = [];
  for (const entrada of await fs.readdir(ruta, { withFileTypes: true })) {
    if (entrada.name === "node_modules" || entrada.name.startsWith(".")) continue;
    resultado.push(...(await listarArchivos(path.join(ruta, entrada.name))));
  }
  return resultado;
}

const kb = (bytes) => (bytes / 1024).toFixed(0) + " KB";
const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2) + " MB";

async function main() {
  const fotos = (await listarArchivos(CARPETA_PUBLIC))
    .filter(esConvertible);

  if (fotos.length === 0) {
    console.log("No he encontrado fotos para convertir en public/galeria-section/.");
    return;
  }

  console.log(PRUEBA ? "\n=== MODO PRUEBA: no se cambia nada ===\n" : "");
  let totalAntes = 0, totalDespues = 0;
  const cambiosRutas = []; // [rutaVieja, rutaNueva] relativas a public/

  for (const foto of fotos) {
    const relativa = path.relative(CARPETA_PUBLIC, foto).split(path.sep).join("/");
    const relativaWebp = relativa.replace(/\.(jpe?g|png)$/i, ".webp");
    const destino = path.join(CARPETA_PUBLIC, relativaWebp);

    if (await existe(destino)) {
      console.log(`⚠️  Ya existe ${relativaWebp}, me salto ${relativa}`);
      continue;
    }

    const original = await fs.readFile(foto);
    const meta = await sharp(original).metadata();
    const buffer = await sharp(original)
      .rotate() // aplica la orientación EXIF (fotos de móvil)
      .resize({ width: LADO_MAXIMO, height: LADO_MAXIMO, fit: "inside", withoutEnlargement: true })
      .webp({ quality: CALIDAD })
      .toBuffer();
    const metaNueva = await sharp(buffer).metadata();

    totalAntes += original.length;
    totalDespues += buffer.length;
    console.log(
      `${relativa}  ${meta.width}x${meta.height} ${kb(original.length)}  ->  ` +
      `${relativaWebp}  ${metaNueva.width}x${metaNueva.height} ${kb(buffer.length)}`
    );

    if (!PRUEBA) {
      await fs.writeFile(destino, buffer);
      await fs.unlink(foto);
    }
    cambiosRutas.push([relativa, relativaWebp]);
  }

  // Actualizar referencias en el código
  const archivosCodigo = [];
  for (const c of CARPETAS_CODIGO) archivosCodigo.push(...(await listarArchivos(c)));
  const codigo = archivosCodigo.filter((f) => EXT_CODIGO.includes(path.extname(f).toLowerCase()));

  const sinReferencia = new Set(cambiosRutas.map(([v]) => v));
  let archivosModificados = 0;

  for (const archivo of codigo) {
    let texto = await fs.readFile(archivo, "utf8");
    const textoInicial = texto;
    for (const [vieja, nueva] of cambiosRutas) {
      if (texto.includes(vieja)) {
        texto = texto.split(vieja).join(nueva);
        sinReferencia.delete(vieja);
      }
    }
    if (texto !== textoInicial) {
      archivosModificados++;
      console.log(`✏️  Rutas actualizadas en ${archivo}`);
      if (!PRUEBA) await fs.writeFile(archivo, texto, "utf8");
    }
  }

  console.log("\n--- Resumen ---");
  console.log(`Fotos convertidas: ${cambiosRutas.length}`);
  console.log(`Peso antes: ${mb(totalAntes)}  ->  después: ${mb(totalDespues)}`);
  console.log(`Archivos de código actualizados: ${archivosModificados}`);
  if (sinReferencia.size > 0) {
    console.log("\n⚠️  Estas fotos no aparecen con su ruta completa en el código.");
    console.log("   Puede que no se usen, o que la ruta se construya por partes. Revísalas a mano:");
    for (const r of sinReferencia) console.log("   - " + r);
  }
  if (PRUEBA) console.log("\nTodo correcto? Ejecuta de nuevo sin --prueba para aplicarlo.");
}

main().catch((e) => { console.error("Error:", e.message); process.exit(1); });
