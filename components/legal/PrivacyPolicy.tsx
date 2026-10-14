export function PrivacyPolicy() {
  const sectionStyle = "space-y-2 px-4"
  const titleStyle = "font-semibold text-foreground"
  const labelStyle = "text-foreground"
  const linkStyle = "font-medium text-foreground underline underline-offset-2 hover:text-primary"

  return (
    <div className="space-y-6 text-sm leading-relaxed text-muted-foreground text-justify">

      {/* Introducción */}
      <section className={sectionStyle}>
        <p>
          El Ateneo Musical de Mieres se compromete a proteger la privacidad de las personas que
          utilizan este sitio web. Esta Política de Privacidad explica cómo tratamos los datos
          personales que recogemos a través del sitio web, conforme al Reglamento (UE) 2016/679
          General de Protección de Datos (RGPD) y a la Ley Orgánica 3/2018, de 5 de diciembre, de
          Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
        </p>
      </section>

      {/* 1. Responsable del tratamiento */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>1. Responsable del tratamiento</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li><strong className={labelStyle}>Responsable:</strong> Ateneo Musical de Mieres</li>
          <li><strong className={labelStyle}>NIF:</strong> G74446758</li>
          <li>
            <strong className={labelStyle}>Domicilio:</strong> Lugar Avellanedo 37N. 33618, Mieres (Asturias). España.
          </li>
          <li>
            <strong className={labelStyle}>Correo electrónico:</strong>{" "}
            <a href="mailto:ateneomusicalmieres@gmail.com" className={linkStyle}>
              ateneomusicalmieres@gmail.com
            </a>
          </li>
        </ul>
      </section>

      {/* 2. Qué datos tratamos */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>2. Qué datos tratamos y cómo los obtenemos</h3>
        <p>
          Los datos personales que tratamos proceden directamente de la persona interesada, que los
          facilita a través de los formularios del sitio web o por correo electrónico. Según el
          caso, pueden ser:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong className={labelStyle}>Datos identificativos:</strong> nombre, apellidos, DNI y
            fecha de nacimiento.
          </li>
          <li>
            <strong className={labelStyle}>Datos de contacto:</strong> dirección postal, correo
            electrónico y teléfono.
          </li>
          <li>
            <strong className={labelStyle}>Datos bancarios:</strong> para la domiciliación de cuotas.
          </li>
          <li>
            <strong className={labelStyle}>Datos de navegación:</strong> dirección IP y otra
            información técnica obtenida mediante cookies, según se explica en la{" "}
            <strong className={labelStyle}>Política de Cookies</strong>.
          </li>
        </ul>
        <p>
          Tratamos únicamente los datos necesarios para cada finalidad. Los campos marcados como
          obligatorios en los formularios son imprescindibles para atender la solicitud. Si no se
          facilitan, no podremos gestionarla.
        </p>
      </section>

      {/* 3. Finalidades */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>3. Finalidades del tratamiento</h3>
        <p>Tratamos los datos personales para las siguientes finalidades:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong className={labelStyle}>Inscripción y gestión de socios:</strong> tramitar las
            altas, llevar el registro de socios, gestionar las cuotas y comunicar a los socios
            información sobre la vida de la asociación, como asambleas, convocatorias y avisos.
          </li>
          <li>
            <strong className={labelStyle}>Atención de consultas:</strong> responder a las preguntas
            y solicitudes de información recibidas a través del formulario de contacto o por correo
            electrónico.
          </li>
          <li>
            <strong className={labelStyle}>Comunicaciones sobre actividades:</strong> enviar
            información sobre conciertos, actividades y novedades del Ateneo, solo a quienes lo
            hayan autorizado expresamente.
          </li>
          <li>
            <strong className={labelStyle}>Análisis del uso del sitio web:</strong> obtener
            estadísticas de navegación para mejorar el sitio web, siempre con el consentimiento del
            usuario mediante el sistema de cookies.
          </li>
        </ul>
      </section>

      {/* 4. Legitimación */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>4. Legitimación</h3>
        <p>
          Tratamos sus datos con distintas bases legales según la finalidad. Al facilitarnos sus
          datos a través de los formularios del sitio web, se le informa de cuál se aplica en cada
          caso:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong className={labelStyle}>Inscripción y gestión de socios:</strong> la relación
            asociativa que se establece al hacerse socio, y el cumplimiento de las obligaciones
            legales de la asociación, como llevar el registro de socios exigido por la Ley Orgánica
            1/2002, reguladora del Derecho de Asociación (art. 6.1.b y 6.1.c RGPD).
          </li>
          <li>
            <strong className={labelStyle}>Atención de consultas:</strong> el consentimiento del
            usuario al enviarnos su mensaje (art. 6.1.a RGPD).
          </li>
          <li>
            <strong className={labelStyle}>Comunicaciones sobre actividades y analítica web:</strong>{" "}
            el consentimiento expreso del usuario (art. 6.1.a RGPD), que puede retirar en cualquier
            momento sin que ello afecte a la licitud del tratamiento anterior.
          </li>
        </ul>
      </section>

      {/* 5. Conservación */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>5. Conservación de los datos</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong className={labelStyle}>Datos de socios:</strong> se conservarán mientras se
            mantenga la condición de socio y, tras la baja, durante los plazos legalmente exigidos.
          </li>
          <li>
            <strong className={labelStyle}>Consultas:</strong> se conservarán el tiempo necesario
            para atender la solicitud.
          </li>
          <li>
            <strong className={labelStyle}>Comunicaciones sobre actividades:</strong> se conservarán
            hasta que el usuario retire su consentimiento.
          </li>
        </ul>
        <p>
          En todos los casos, los datos se conservarán además durante los plazos de prescripción de
          las responsabilidades legales que pudieran derivarse.
        </p>
      </section>

      {/* 6. Destinatarios */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>6. Destinatarios</h3>
        <p>
          Los datos no se cederán a terceros, salvo obligación legal o a la entidad bancaria para la
          gestión del cobro de cuotas.
        </p>
        <p>
          Pueden tener acceso a ellos los proveedores que prestan servicios al Ateneo, siempre con
          las garantías que exige la normativa:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong className={labelStyle}>Alojamiento web y correo electrónico:</strong> DonDominio
          </li>
          <li>
            <strong className={labelStyle}>Analítica web:</strong> Google LLC (Google Analytics).{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className={linkStyle}
            >
              Política de privacidad de Google
            </a>
          </li>
        </ul>
        <p>
          Algunos de estos proveedores pueden estar ubicados en Estados Unidos. Esas transferencias
          internacionales de datos están amparadas por el Marco de Privacidad de Datos UE-EE. UU.
          (EU-US Data Privacy Framework), reconocido por la Comisión Europea mediante decisión de
          adecuación.
        </p>
      </section>

      {/* 7. Derechos del usuario */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>7. Derechos del usuario</h3>
        <p>El usuario puede ejercer en cualquier momento los siguientes derechos:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li><strong className={labelStyle}>Acceso</strong> a sus datos personales (art. 15 RGPD).</li>
          <li>
            <strong className={labelStyle}>Rectificación</strong> de los datos inexactos o
            incompletos (art. 16 RGPD).
          </li>
          <li>
            <strong className={labelStyle}>Supresión</strong> de sus datos cuando ya no sean
            necesarios (art. 17 RGPD).
          </li>
          <li><strong className={labelStyle}>Limitación</strong> del tratamiento (art. 18 RGPD).</li>
          <li><strong className={labelStyle}>Portabilidad</strong> de sus datos (art. 20 RGPD).</li>
          <li><strong className={labelStyle}>Oposición</strong> al tratamiento (art. 21 RGPD).</li>
          <li><strong className={labelStyle}>Retirada</strong> del consentimiento prestado.</li>
        </ul>
        <p>
          Para ejercerlos, puede escribir a{" "}
          <a href="mailto:ateneomusicalmieres@gmail.com" className={linkStyle}>
            ateneomusicalmieres@gmail.com
          </a>{" "}
          o enviar un escrito a la dirección postal indicada, indicando el derecho que desea ejercer
          y adjuntando una copia de un documento que acredite su identidad.
        </p>
        <p>
          Si considera que el tratamiento de sus datos no se ajusta a la normativa, puede presentar
          una reclamación ante la Agencia Española de Protección de Datos (
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
            className={linkStyle}
          >
            www.aepd.es
          </a>
          ).
        </p>
      </section>

      {/* 8. Exactitud */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>8. Exactitud de los datos</h3>
        <p>
          El usuario garantiza que los datos que facilita son ciertos y correctos. Se compromete a
          comunicar al Ateneo Musical de Mieres cualquier cambio para mantenerlos actualizados.
        </p>
      </section>

      {/* 9. Menores */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>9. Menores de edad</h3>
        <p>
          La inscripción como socio de menores de 14 años, así como el envío de cualquier dato de un
          menor de esa edad, debe realizarla su padre, madre o tutor legal. Este facilitará también
          sus propios datos de contacto y prestará el consentimiento en nombre del menor. Si el
          Ateneo tuviera conocimiento de haber recibido datos de un menor de 14 años sin dicho
          consentimiento, procederá a su supresión.
        </p>
      </section>

      {/* 10. Seguridad */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>10. Medidas de seguridad</h3>
        <p>
          El Ateneo Musical de Mieres aplica las medidas técnicas y organizativas adecuadas para
          garantizar la seguridad, confidencialidad e integridad de los datos personales, conforme
          al artículo 32 del RGPD. Entre ellas se incluyen:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Conexión cifrada (HTTPS) en el sitio web.</li>
          <li>
            Control de acceso a los datos, limitado a las personas de la junta directiva que los
            necesitan para su función.
          </li>
          <li>Copias de seguridad periódicas.</li>
        </ul>
      </section>

      {/* 11. Enlaces a terceros */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>11. Enlaces a sitios de terceros</h3>
        <p>
          El sitio web puede contener enlaces a redes sociales u otras páginas de terceros. Esta
          Política de Privacidad no se aplica a esos sitios. Recomendamos consultar sus propias
          políticas de privacidad.
        </p>
      </section>

      {/* 12. Cookies */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>12. Cookies</h3>
        <p>
          El sitio web utiliza cookies. La información sobre qué cookies se utilizan, para qué
          sirven y cómo gestionarlas se recoge en la{" "}
          <strong className={labelStyle}>Política de Cookies</strong>.
        </p>
      </section>

      {/* 13. Cambios */}
      <section className={sectionStyle}>
        <h3 className={titleStyle}>13. Cambios en esta política</h3>
        <p>
          El Ateneo Musical de Mieres podrá modificar esta Política de Privacidad para adaptarla a
          novedades legislativas o a cambios en el funcionamiento del sitio web. La versión vigente
          será siempre la publicada en esta página, y los cambios entrarán en vigor desde su
          publicación.
        </p>
      </section>

    </div>
  )
}