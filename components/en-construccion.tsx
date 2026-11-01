// Aviso de "sección en construcción" con un muñequito con casco.
// Uso: <EnConstruccion texto="Pronto podrás conocer aquí la historia de la Coral Cantares." />
// El dibujo es decorativo (aria-hidden): lo importante lo dicen el título y el texto.

type Props = {
  titulo?: string
  texto: string
}

export function EnConstruccion({ titulo = "Sección en construcción", texto }: Props) {
  return (
    <section className="home-section">
      <div className="home-container flex flex-col items-center py-10 text-center md:py-16">
        <svg
          aria-hidden="true"
          viewBox="0 0 220 200"
          className="mb-8 w-48 md:w-56"
          fill="none"
          stroke="var(--dark)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Suelo */}
          <path d="M20 186h180" />

          {/* Cono */}
          <path d="M150 184l18-62h8l18 62z" fill="#f59e0b" />
          <path d="M159 152h26M155 168h34" stroke="var(--light)" strokeWidth="6" />
          <path d="M150 184l18-62h8l18 62z" />
          <path d="M142 186h60" />

          {/* Cuerpo y piernas */}
          <path d="M82 112v40M82 152l-14 32M82 152l14 32" />
          {/* Brazo que saluda y brazo que sujeta el cartel */}
          <path d="M82 122l-22-18M82 122l26-6" />

          {/* Cabeza */}
          <circle cx="82" cy="90" r="18" fill="var(--light)" />
          <path d="M75 88h.01M89 88h.01" strokeWidth="5" />
          <path d="M75 97q7 6 14 0" />

          {/* Casco */}
          <path d="M62 80q20-28 40 0z" fill="var(--accent-yellow)" />
          <path d="M58 80h48" />

          {/* Cartel con una nota musical */}
          <rect x="106" y="86" width="34" height="34" rx="4" fill="var(--light)" />
          <path d="M119 111V96l12-3v15" />
          <circle cx="116" cy="111" r="3.5" fill="var(--dark)" />
          <circle cx="128" cy="108" r="3.5" fill="var(--dark)" />
        </svg>

        <h2 className="mb-3">{titulo}</h2>
        <p className="max-w-[50ch] text-muted-foreground">{texto}</p>
      </div>
    </section>
  )
}