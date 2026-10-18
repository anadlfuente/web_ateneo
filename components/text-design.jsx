"use client"
import { useState, useRef, useEffect } from "react"

import TextoRico from "@/components/text-bold"
import Carrusel from "@/components/carrusel"

export default function BloqueHistoria(props) {
  const {
    titulo,
    parrafos,
    imagen = null,
    alt = "",
    fotos = null,
    invertido = false,
    altura = "",
    flotante = false,
  } = props

  const [ratio, setRatio] = useState(null)
  const imgRef = useRef(null)
  const alto = altura || "400px"

  const leerProporcion = () => {
    const img = imgRef.current
    if (img && img.naturalWidth) setRatio(img.naturalWidth / img.naturalHeight)
  }

  // Por si la foto ya estaba en caché y cargó antes de tiempo
  useEffect(() => {
    if (imgRef.current?.complete) leerProporcion()
  }, [])

  const texto = (
    <div className="text-lg leading-relaxed text-muted-foreground space-y-6 text-justify hyphens-auto">
      {parrafos.map((p, i) => (
        <p key={i}>
          <TextoRico texto={p} />
        </p>
      ))}
    </div>
  )

  // Bloque solo de texto: sin foto ni carrusel
  if (!imagen && !fotos) {
    return (
      <div>
        <h2 className="text-3xl md:text-4xl font-serif mb-6">{titulo}</h2>
        {texto}
      </div>
    )
  }

  // Bloque con el texto rodeando la foto o el carrusel
  if (flotante) {
    return (
      <div className="flow-root">
        <h2 className="text-3xl md:text-4xl font-serif mb-6">{titulo}</h2>
        {fotos ? (
          <div
            className={`mb-8 md:mb-6 md:w-1/2 ${
              invertido ? "md:float-right md:ml-10" : "md:float-left md:mr-10"
            }`}
          >
            <Carrusel fotos={fotos} />
          </div>
        ) : (
          <img
            ref={imgRef}
            src={imagen}
            alt={alt}
            loading="lazy"
            onLoad={leerProporcion}
            className={`block mx-auto mb-8 h-auto rounded-2xl shadow-xl md:mb-6 md:max-w-[50%] ${
              invertido ? "md:float-right md:ml-10 md:mr-0" : "md:float-left md:mr-10 md:ml-0"
            }`}
            style={{ width: ratio ? `min(100%, calc(${alto} * ${ratio}))` : "100%" }}
          />
        )}
        {texto}
      </div>
    )
  }

  // Bloque en dos columnas
  return (
    <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <div className={invertido ? "md:order-last" : ""}>
        {fotos ? (
          <Carrusel fotos={fotos} />
        ) : (
          <img
            ref={imgRef}
            src={imagen}
            alt={alt}
            loading="lazy"
            onLoad={leerProporcion}
            className="block mx-auto h-auto rounded-2xl shadow-xl"
            style={{ width: ratio ? `min(100%, calc(${alto} * ${ratio}))` : "100%" }}
          />
        )}
      </div>
      <div>
        <h2 className="text-3xl md:text-4xl font-serif mb-6">{titulo}</h2>
        {texto}
      </div>
    </div>
  )
}