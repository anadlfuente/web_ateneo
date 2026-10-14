type CookieRow = {
  name: string
  owner: string
  purpose: string
  duration: string
}

// Tabla reutilizable para las listas de cookies
function CookieTable({ rows }: { rows: CookieRow[] }) {
  return (
    // overflow-x-auto: en móvil, la tabla se puede deslizar en horizontal en vez de salirse de la pantalla
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full min-w-140 border-collapse text-left text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-3 py-2 font-semibold text-foreground">Cookie</th>
            <th className="px-3 py-2 font-semibold text-foreground">Titular</th>
            <th className="px-3 py-2 font-semibold text-foreground">Finalidad</th>
            <th className="px-3 py-2 font-semibold text-foreground">Duración</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-t border-border align-top">
              <td className="px-3 py-2 font-mono text-xs text-foreground">{row.name}</td>
              <td className="px-3 py-2">{row.owner}</td>
              <td className="px-3 py-2">{row.purpose}</td>
              <td className="px-3 py-2 whitespace-nowrap">{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ---- Datos de las tablas: para añadir o quitar una cookie, edita estas listas ----

const ownCookies: CookieRow[] = [
  {
    name: "cookie_consent",
    owner: "Ateneo Musical de Mieres",
    purpose: "Técnica: guarda la elección del usuario sobre las cookies",
    duration: "1 año",
  },
  {
    name: "PHPSESSID",
    owner: "Ateneo Musical de Mieres",
    purpose: "Técnica: mantiene la sesión durante el envío de formularios",
    duration: "Sesión",
  },
]

const thirdPartyCookies: CookieRow[] = [
  {
    name: "YSC",
    owner: "Google (YouTube)",
    purpose: "Registra un identificador para llevar estadísticas de los vídeos vistos",
    duration: "Sesión",
  },
  {
    name: "VISITOR_INFO1_LIVE",
    owner: "Google (YouTube)",
    purpose: "Estima el ancho de banda del usuario y guarda preferencias del reproductor",
    duration: "6 meses",
  },
]

const browserLinks = [
  { name: "Chrome", url: "https://support.google.com/chrome/answer/95647" },
  { name: "Firefox", url: "https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox" },
  { name: "Safari (Mac)", url: "https://support.apple.com/guide/safari/sfri11471/mac" },
  { name: "Safari (iPhone/iPad)", url: "https://support.apple.com/105082" },
  { name: "Edge", url: "https://support.microsoft.com/edge/microsoft-edge-browsing-data-and-privacy" },
  { name: "Opera", url: "https://help.opera.com/latest/web-preferences/#cookies" },
]

export function CookiesPolicy() {
  const sectionStyle = "space-y-2 px-4"
  const titleStyle = "font-semibold text-foreground"
  const subtitleStyle = "pt-2 font-medium text-foreground"
  const labelStyle = "text-foreground"
  const linkStyle = "font-medium text-foreground underline underline-offset-2 hover:text-primary"

  return (
    <div className="space-y-6 text-sm leading-relaxed text-muted-foreground text-justify">

      {/* Introducción */}
      <section className={sectionStyle}>
        <p>
          El sitio web del Ateneo Musical de Mieres utiliza cookies y tecnologías similares para
          garantizar su correcto funcionamiento y, si el usuario lo acepta, para mostrar contenido
          multimedia de terceros, como vídeos de YouTube. A continuación se explica qué son, cuáles
          se utilizan y cómo gestionarlas.
        </p>
      </section>

      {/* 1. Qué son */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>1. ¿Qué son las cookies?</h3>
        <p>
          Las cookies son pequeños archivos que un sitio web guarda en el dispositivo del usuario
          (ordenador, móvil o tableta) cuando lo visita. Cada vez que el usuario vuelve a la página,
          el navegador puede recuperar esa información. Esto permite, por ejemplo, recordar sus
          preferencias o hacer funcionar determinados servicios.
        </p>
        <p>
          Esta política se aplica también a otras tecnologías de almacenamiento similares, como el
          almacenamiento local del navegador.
        </p>
      </section>

      {/* 2. Responsable */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>2. Responsable</h3>
        <p>
          El responsable de las cookies propias de este sitio web es el Ateneo Musical de Mieres,
          cuyos datos figuran en el <strong className={labelStyle}>Aviso Legal</strong>.
        </p>
      </section>

      {/* 3. Tipos */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>3. Tipos de cookies</h3>

        <p className={subtitleStyle}>Según quién las gestiona:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong className={labelStyle}>Cookies propias:</strong> las envía y gestiona el propio
            Ateneo Musical de Mieres desde este sitio web.
          </li>
          <li>
            <strong className={labelStyle}>Cookies de terceros:</strong> las envía o gestiona otra
            entidad que trata los datos obtenidos a través de ellas, como Google en el caso de
            YouTube.
          </li>
        </ul>

        <p className={subtitleStyle}>Según su duración:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong className={labelStyle}>Cookies de sesión:</strong> se eliminan al cerrar el
            navegador.
          </li>
          <li>
            <strong className={labelStyle}>Cookies persistentes:</strong> permanecen en el
            dispositivo durante un tiempo determinado, que puede ir de unos minutos a varios años.
          </li>
        </ul>

        <p className={subtitleStyle}>Según su finalidad:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong className={labelStyle}>Técnicas o necesarias:</strong> permiten el funcionamiento
            básico del sitio web, como recordar la elección del usuario sobre las cookies o enviar
            formularios. No requieren consentimiento.
          </li>
          <li>
            <strong className={labelStyle}>De preferencias o personalización:</strong> recuerdan
            opciones del usuario, como el idioma.
          </li>
          <li>
            <strong className={labelStyle}>De análisis o medición:</strong> permiten conocer de forma
            estadística cómo se utiliza el sitio web.
          </li>
          <li>
            <strong className={labelStyle}>De publicidad comportamental:</strong> crean un perfil del
            usuario a partir de sus hábitos de navegación para mostrarle publicidad personalizada.
          </li>
        </ul>

        <p className="pt-2">
          Este sitio web utiliza cookies técnicas propias y, solo si el usuario lo acepta, cookies de
          terceros asociadas a los vídeos de YouTube. No utiliza cookies de análisis propias ni
          publicitarias. No obstante, las cookies que instala YouTube pueden ser utilizadas por
          Google con sus propias finalidades, incluidas las de análisis y publicidad, según su
          política.
        </p>
      </section>

      {/* 4. Cookies utilizadas */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>4. Cookies utilizadas en este sitio web</h3>

        <p className={subtitleStyle}>Cookies propias</p>
        <CookieTable rows={ownCookies} />

        <p className={subtitleStyle}>
          Cookies de terceros (solo se instalan si el usuario las acepta)
        </p>
        <CookieTable rows={thirdPartyCookies} />

        <p className="pt-2">
          Más información sobre las cookies de Google en su{" "}
          <a
            href="https://policies.google.com/technologies/cookies"
            target="_blank"
            rel="noopener noreferrer"
            className={linkStyle}
          >
            página sobre el uso de cookies
          </a>
          .
        </p>
        <p>
          Los contenidos de terceros a los que se acceda desde este sitio web, como redes sociales o
          plataformas de vídeo, se rigen por sus propias políticas de cookies.
        </p>
      </section>

      {/* 5. Consentimiento */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>5. Consentimiento</h3>
        <p>Al acceder por primera vez al sitio web aparece un aviso de cookies que permite:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Aceptar todas las cookies.</li>
          <li>Rechazar las cookies no necesarias.</li>
          <li>Configurar qué tipos de cookies se aceptan.</li>
        </ul>
        <p>
          Los vídeos de YouTube no se cargan hasta que el usuario da su consentimiento, ya sea desde
          el aviso de cookies o desde el botón que aparece en el propio vídeo. Las cookies técnicas
          se utilizan siempre, porque son necesarias para el funcionamiento del sitio web.
        </p>
        <p>
          Si el usuario rechaza las cookies de YouTube, podrá seguir navegando con normalidad. Los
          vídeos se sustituirán por un aviso con enlace para verlos directamente en YouTube.
        </p>
      </section>

      {/* 6. Retirada del consentimiento */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>6. Retirada del consentimiento y configuración</h3>
        <p>
          El usuario puede cambiar su elección o retirar su consentimiento en cualquier momento a
          través del enlace <strong className={labelStyle}>«Configurar cookies»</strong>, disponible
          en el pie de todas las páginas. También puede eliminar las cookies desde su navegador.
        </p>
      </section>

      {/* 7. Transferencias internacionales */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>7. Transferencias internacionales</h3>
        <p>
          Google LLC, titular de YouTube, puede tratar datos en Estados Unidos. Estas transferencias
          están amparadas por el Marco de Privacidad de Datos UE-EE. UU. (EU-US Data Privacy
          Framework), reconocido por la Comisión Europea mediante decisión de adecuación. Más
          información en la{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className={linkStyle}
          >
            política de privacidad de Google
          </a>
          .
        </p>
      </section>

      {/* 8. Gestión desde el navegador */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>8. Cómo gestionar las cookies desde el navegador</h3>
        <p>
          El usuario puede restringir, bloquear o eliminar las cookies desde la configuración de su
          navegador:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          {browserLinks.map((browser) => (
            <li key={browser.name}>
              <a
                href={browser.url}
                target="_blank"
                rel="noopener noreferrer"
                className={linkStyle}
              >
                {browser.name}
              </a>
            </li>
          ))}
        </ul>
        <p>
          Más información sobre la gestión de cookies en{" "}
          <a
            href="https://www.aboutcookies.org/how-to-manage-and-delete-cookies"
            target="_blank"
            rel="noopener noreferrer"
            className={linkStyle}
          >
            aboutcookies.org
          </a>
          .
        </p>
        <p>
          Si se bloquean las cookies técnicas, es posible que algunas funciones del sitio web no
          estén disponibles, como el envío de formularios.
        </p>
      </section>

      {/* 9. Actualizaciones */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>9. Actualizaciones de esta política</h3>
        <p>
          El Ateneo Musical de Mieres podrá modificar esta Política de Cookies para adaptarla a
          cambios normativos o a la incorporación de nuevas herramientas en el sitio web. La versión
          vigente será siempre la publicada en esta página.
        </p>
      </section>

      {/* 10. Contacto */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>10. Contacto</h3>
        <p>
          Si tiene dudas sobre el uso de cookies en este sitio web, puede escribir a{" "}
          <a href="mailto:ateneomusicalmieres@gmail.com" className={linkStyle}>
            ateneomusicalmieres@gmail.com
          </a>
          . Para más información sobre el tratamiento de sus datos personales, consulte la{" "}
          <strong className={labelStyle}>Política de Privacidad</strong>.
        </p>
      </section>

    </div>
  )
}