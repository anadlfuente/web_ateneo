"use client"

// Botones para compartir una noticia en redes sociales.
// Son enlaces normales a cada red: no cargan nada de terceros en la web,
// así que no instalan cookies ni necesitan consentimiento.

import { useEffect, useState } from "react"
import { Check, Link2, Mail } from "lucide-react"
import { FaFacebookF, FaTelegram, FaWhatsapp, FaXTwitter, FaInstagram } from "react-icons/fa6"
import { generarStory } from "@/lib/story-noticia"

type Props = {
  titulo: string
  imagen?: string     // foto de la noticia, para la imagen de Instagram Historias
  fecha?: string      // fecha ya escrita, p. ej. "23 de agosto de 2024"
}

export function CompartirNoticia({ titulo, imagen, fecha }: Props) {
  const [url, setUrl] = useState("")
  const [copiado, setCopiado] = useState(false)

  useEffect(() => setUrl(window.location.href), [])

  // Imagen preparada para el menú de compartir del móvil (Instagram Historias).
  // Se prepara al cargar la página porque el móvil exige compartir justo al pulsar.
  const [archivo, setArchivo] = useState<File | null>(null)
  const [avisoStory, setAvisoStory] = useState("")
  useEffect(() => {
    if (typeof navigator.canShare !== "function") return
    generarStory({ titulo, fecha, imagen })
      .then((blob) => {
        const f = new File([blob], "story-ateneo.png", { type: "image/png" })
        if (navigator.canShare({ files: [f] })) setArchivo(f)
      })
      .catch(() => {})
  }, [titulo, fecha, imagen])

  const compartirImagen = async () => {
    if (!archivo) return
    // Se copia el enlace para pegarlo en el sticker «Enlace» de Instagram
    navigator.clipboard?.writeText(url).catch(() => {})
    setAvisoStory("Enlace copiado: en Instagram, añade el sticker «Enlace» y pégalo")
    try {
      // title vacío: si no, Instagram solo ofrece Reels y no Historias
      await navigator.share({ files: [archivo], title: "" })
    } catch {
      // La persona ha cerrado el menú sin compartir
    }
  }

  const u = encodeURIComponent(url)
  const t = encodeURIComponent(titulo)

  const redes = [
    { nombre: "WhatsApp", Icono: FaWhatsapp, href: `https://wa.me/?text=${t}%20${u}` },
    { nombre: "Facebook", Icono: FaFacebookF, href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { nombre: "X", Icono: FaXTwitter, href: `https://x.com/intent/post?text=${t}&url=${u}` },
    { nombre: "Telegram", Icono: FaTelegram, href: `https://t.me/share/url?url=${u}&text=${t}` },
  ]

  const copiarEnlace = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2500)
    } catch {
      // Si el navegador no deja copiar, no se hace nada
    }
  }

  const claseBoton =
    "w-10 h-10 flex items-center justify-center rounded-full border border-border text-foreground " +
    "hover:bg-foreground hover:text-white transition-colors " +
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <span className="text-sm font-semibold">Compartir:</span>

      <ul className="flex flex-wrap gap-2">
        {redes.map(({ nombre, Icono, href }) => (
          <li key={nombre}>
            <a
              href={url ? href : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Compartir en ${nombre} (se abre en una pestaña nueva)`}
              className={claseBoton}
            >
              <Icono className="w-4 h-4" aria-hidden="true" />
            </a>
          </li>
        ))}

        <li>
          <a
            href={url ? `mailto:?subject=${t}&body=${u}` : undefined}
            aria-label="Compartir por correo electrónico"
            className={claseBoton}
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
          </a>
        </li>

        {archivo && (
          <li>
            <button
              type="button"
              onClick={compartirImagen}
              aria-label="Compartir la noticia en Instagram Historias (también copia el enlace)"              className={claseBoton}
            >
              <FaInstagram className="w-4 h-4" aria-hidden="true" />
            </button>
          </li>
        )}
        
        <li>
          <button
            type="button"
            onClick={copiarEnlace}
            aria-label="Copiar el enlace de la noticia"
            className={claseBoton}
          >
            {copiado
              ? <Check className="w-4 h-4" aria-hidden="true" />
              : <Link2 className="w-4 h-4" aria-hidden="true" />}
          </button>
        </li>
      </ul>

      {/* Aviso para todos (también lo lee el lector de pantalla) */}
      <span role="status" className="text-sm text-muted-foreground">
        {copiado ? "Enlace copiado" : avisoStory}
      </span>
    </div>
  )
}