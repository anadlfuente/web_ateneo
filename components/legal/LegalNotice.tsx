export function LegalNotice() {
  return (
    <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">

      {/* Datos Identificativos */}
      <section className="space-y-2 px-4">
        <h3 className="font-semibold text-foreground">1. Datos identificativos</h3>
        <p className="text-justify">
          Este sitio web (en adelante, «el sitio web») es titularidad del Ateneo Musical de Mieres, 
          asociación de carácter cultural. En cumplimiento de lo establecido en la Ley 34/2002, de 11 de julio, 
          de Servicios de la Sociedad de la Información y el Comercio Electrónico (LSSICE), se informa a todos 
          los usuarios es titularidad de:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li><strong className="text-foreground">Titular:</strong> ATENEO MUSICAL DE MIERES</li>
          <li><strong className="text-foreground">CIF:</strong> G74446758</li>
          <li><strong className="text-foreground">Domicilio:</strong> Lugar Avellanedo 37N. 33618, Mieres (Asturias). España.</li>
          <li>
            <strong className="text-foreground">Correo electrónico:</strong>{" "}
            <a href="mailto:ateneomusicalmieres@gmail.com" className="font-medium text-foreground underline underline-offset-2 hover:text-primary">
              ateneomusicalmieres@gmail.com
            </a>
          </li>
          <li><strong className="text-foreground">Teléfono:</strong> 681188519</li>
        </ul>
      </section>

      {/* Objeto */}
      <section className="space-y-2 px-4">
        <h3 className="font-semibold text-foreground">2. Objeto</h3>
        <p className="text-justify">
          El presente sitio web tiene como finalidad  la publicación de contenidos 
          informativos, artículos y recursos de interés general en relación con la 
          actividad y los proyectos del Ateneo Musical de Mieres y sus agrupaciones, 
          así como un medio de contacto con la asociación. Tiene carácter informativo 
          y divulgativo y no constituye por sí mismo una actividad comercial.
        </p>
      </section>

      {/* Condiciones de uso */}
      <section className="space-y-2 px-4">
        <h3 className="font-semibold text-foreground">3. Condiciones de uso</h3>
        <p className="text-justify">
          El acceso al sitio web es libre y gratuito y atribuye a quien lo realiza la 
          condición de usuario. El acceso y uso del sitio web implica la aceptación 
          plena y sin reservas de las disposiciones de este Aviso Legal, en la versión 
          publicada en el momento en que el usuario acceda a él. El ATENEO MUSICAL DE MIERES 
          podrá modificar los contenidos del sitio web y este Aviso Legal en cualquier momento.
        </p>
      </section>

      {/* Propiedad Intelectual e Industrial */}
      <section className="space-y-2 px-4">
        <h3 className="font-semibold text-foreground">4. Propiedad Intelectual e Industrial</h3>
        <p className="text-justify">
          Todos los contenidos de este sitio web —textos, fotografías, gráficos, imágenes, tecnología, 
          software, diseño gráfico, código fuente y demás elementos— son propiedad intelectual de ATENEO 
          MUSICAL DE MIERES o de terceros que han autorizado su uso, sin que puedan entenderse cedidos al 
          usuario ninguno de los derechos de explotación reconocidos por la normativa vigente en materia 
          de propiedad intelectual e industrial.
        </p>
        <p className="text-justify">
          Queda expresamente prohibida la reproducción total o parcial de los contenidos de este sitio web, 
          su transformación, distribución, comunicación pública, puesta a disposición, extracción y/o reutilización, 
          salvo autorización expresa del titular.
        </p>
      </section>

      {/* Protección de Datos y cookies */}
      <section className="space-y-2 px-4">
        <h3 className="font-semibold text-foreground">5. Protección de Datos y cookies</h3>
        <p className="text-justify">
          El tratamiento de los datos personales de los usuarios se rige por lo establecido en 
          la {" "}<strong className="text-foreground">Política de Privacidad</strong>. 
          El uso de cookies en el sitio web se detalla en la <strong className="text-foreground">Política de Cookies</strong>.
        </p>
      </section>

      {/* Responsabilidad de los contenidos */}
      <section className="space-y-2 px-4">
        <h3 className="font-semibold text-foreground">6. Responsabilidad de los contenidos</h3>
        <p className="text-justify">
          El ATENEO MUSICAL DE MIERES procura que la información del sitio web sea correcta y esté actualizada, 
          pero no se hace responsable de posibles errores u omisiones en los contenidos. Tampoco responde de las 
          interrupciones técnicas del servicio ni de los daños derivados del uso indebido del sitio web.
        </p>
        <p className="text-justify">
          El sitio web puede incluir enlaces a páginas de terceros. El ATENEO MUSICAL DE MIERES no se responsabiliza 
          de los contenidos de esas páginas, y los enlaces no implican ninguna relación con sus titulares.
        </p>
      </section>

      {/* Legislación aplicable y jurisdicción */}
      <section className="space-y-2 px-4">
        <h3 className="font-semibold text-foreground">7. Legislación aplicable y jurisdicción</h3>
        <p className="text-justify">
          La relación entre ATENEO MUSICAL DE MIERES y el usuario se regirá por la legislación española vigente. 
          Para la resolución de cualquier controversia que pudiera surgir en relación con el presente sitio web, 
          las partes se someten a los Juzgados y Tribunales competentes conforme a la normativa aplicable, 
          sin perjuicio de las normas de protección de los consumidores y usuarios que resulten imperativas.
        </p>
      </section>
    </div>
  )
}