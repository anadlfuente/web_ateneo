// data/historia.js
// Textos de la página de historia del Ateneo Musical de Mieres.
// - Las negritas se marcan con **dos asteriscos**.
// - Si un bloque no lleva foto, pon imagen: null.
// - Opcionales por bloque: altura: "300px" y flotante: true.

export const historia = {
  banner: {
    titulo: "Historia del Ateneo Musical de Mieres",
    subtitulo: "Dinamizando la vida musical mierense desde 2018",
    imagen: "/banner.jpg",
  },

  introduccion: [
    "El **Ateneo Musical de Mieres** se constituye bajo estatutos el **23 de junio de 2018**, con la creación de la **Banda Sinfónica del Ateneo Musical de Mieres**. El proyecto nace de un grupo de músicos asturianos, con **Antonio Cánovas Moreno** en la dirección musical, y con la idea de crear un espacio cultural donde cualquier tipo de formación musical tuviera cabida.",
    "Desde sus inicios, la asociación se concibió como un proyecto abierto e inclusivo, cuyo objetivo principal era fomentar la práctica musical colectiva, ofrecer oportunidades a músicos de todas las edades y niveles y convertirse en un punto de encuentro para personas unidas por una misma pasión: la música. La filosofía del Ateneo siempre ha sido la de entender la música como un elemento de **unión, aprendizaje y crecimiento**, tanto artístico como personal.",
  ],

  bloques: [
    {
      titulo: "Un Ateneo, muchas agrupaciones",
      flotante:true,
      imagen: "/historia/ateneo_diagram.svg", // ← añade esta foto
      alt: "Agrupaciones del Ateneo Musical de Mieres",
      parrafos: [
        "A lo largo de los años se han ido creando e incorporando nuevas agrupaciones, tanto de carácter temporal, como los pequeños grupos de cámara, como de manera permanente: la **Coral Cantares**, la **Charanga New Paentamala**, **Claxon Boys** y la **Banda Sinfónica**, agrupación fundadora de la asociación.",
        "Esta evolución ha permitido que el Ateneo abarque estilos y formatos musicales muy diversos, desde la música sinfónica tradicional hasta la música coral, las charangas populares, pequeños conjuntos instrumentales o proyectos contemporáneos. Gracias a esta diversidad, la asociación ha logrado adaptarse a diferentes públicos y participar en un amplio abanico de actividades culturales.",
        "Además, este **ecosistema musical** promueve la colaboración entre las distintas agrupaciones, que no solo comparten escenarios, sino también integrantes. Es habitual que un mismo músico forme parte de varias agrupaciones simultáneamente, enriqueciendo así su formación musical y favoreciendo el intercambio de experiencias entre los diferentes proyectos. Esta colaboración constante fortalece el sentimiento de pertenencia y crea una identidad común dentro del Ateneo Musical de Mieres.",
      ],
    },
    {
      titulo: "Los primeros años en el Recinto Ferial",
      flotante:true,
      imagen: "/historia/antigua-sala.webp", // ← foto de la antigua sala de ensayos con vosotros tocando
      alt: "Ensayo del Ateneo Musical de Mieres en el salón de actos del Recinto Ferial",
      parrafos: [
        "El Ateneo Musical de Mieres comenzó su andadura con sede en el **Recinto Ferial de Mieres**, aprovechando su salón de actos tanto para los ensayos como para la organización de conciertos y encuentros musicales.",
        "Durante la pandemia provocada por la COVID-19, estas instalaciones adquirieron una importancia fundamental. Sus dimensiones permitieron mantener la distancia interpersonal exigida por la normativa sanitaria, de modo que la actividad musical pudo continuar con las medidas de seguridad correspondientes en un momento especialmente complicado para el mundo de la cultura.",
        "Mientras muchas agrupaciones tuvieron que suspender completamente su actividad, el Ateneo consiguió **mantener vivo el contacto entre sus músicos** y seguir ofreciendo música a la sociedad dentro de las limitaciones existentes.",
      ],
    },
    {
      titulo: "Espacio Cultural 19-10: nuestra casa",
      flotante:true,
      imagen: null,
      alt: "",
      fotos: [
        {
          src: "/sponsors/espacio-cultura.jfif",
          alt: "Sala grande del Espacio Cultural 19-10, donde ensayan la Banda Sinfónica y la Charanga New Paentamala",
        },
        {
          src: "/historia/espacio-1910-sala-peque.webp",
          alt: "Sala pequeña del Espacio Cultural 19-10, utilizada por la Coral Cantares y los grupos de cámara",
        },
      ],
      parrafos: [
        "Actualmente, el Ateneo Musical de Mieres tiene su sede en la primera planta del **Espacio Cultural 19-10**, un edificio que se ha convertido en el centro neurálgico de la actividad de la asociación.",
        "Este espacio ofrece dos salas: una de ellas alberga los ensayos de las agrupaciones más numerosas, como la Banda Sinfónica y la Charanga New Paentamala, mientras que la segunda, de menor tamaño, es utilizada por la Coral Cantares, los grupos de cámara, Claxon Boys y otras formaciones de pequeño formato.",
        "Contar con unas **instalaciones propias** ha supuesto un importante impulso para el crecimiento del Ateneo, ya que permite organizar ensayos simultáneos, realizar reuniones, preparar conciertos y desarrollar nuevos proyectos musicales con mayor flexibilidad.",
      ],
    },
    {
      titulo: "Un espacio para estudiar y crecer",
      imagen: null,
      alt: "",
      parrafos: [
        "El Ateneo es consciente de la dificultad que tienen algunas personas, especialmente estudiantes de enseñanzas profesionales y superiores de música, para encontrar espacios adecuados donde estudiar su repertorio.",
        "Por ello, la asociación pone sus instalaciones a disposición de aquellos músicos que forman parte activa de alguna de sus agrupaciones, creando una relación de colaboración mutua.",
        "Este modelo beneficia a todos: los músicos disponen de un espacio donde continuar su formación y preparación individual, y la asociación cuenta con intérpretes comprometidos que enriquecen el nivel artístico de todas sus agrupaciones. Esta **filosofía colaborativa** es una de las señas de identidad del Ateneo Musical de Mieres y refleja su apuesta por el desarrollo cultural del concejo.",
      ],
    },
    {
      titulo: "Formación y relevo generacional",
      flotante:true,
      imagen: "/historia/vicuper.webp", // ← añade esta foto
      alt: "Alumnos de la Escuela de Música Vicuper",
      parrafos: [
        "El Ateneo está ligado al proyecto **Escuela de Música Vicuper**, en el que varios músicos del Ateneo desarrollan su labor docente como profesores.",
        "Esta estrecha relación favorece el **relevo generacional** dentro de la asociación, ya que permite que numerosos alumnos tengan la oportunidad de incorporarse después a las distintas agrupaciones del Ateneo. Se crea así una continuidad natural entre la formación musical y la práctica artística, que fortalece el tejido cultural del municipio y asegura el futuro de la asociación.",
      ],
    },
    {
      titulo: "Un proyecto en constante crecimiento",
      flotante:true,
      imagen: "/foto_family.JPG",
      alt: "Foto de familia de los integrantes del Ateneo Musical de Mieres",
      parrafos: [
        "Desde su fundación en 2018, el Ateneo Musical de Mieres ha experimentado un crecimiento constante, tanto en número de integrantes como de actividades organizadas. Conciertos, pasacalles, festivales, colaboraciones con otras asociaciones, actuaciones solidarias y participación en eventos culturales forman parte de una programación que continúa ampliándose año tras año.",
        "Más allá de la música, el Ateneo es un punto de encuentro para personas de distintas edades, profesiones y experiencias, y demuestra que la cultura puede generar **comunidad, amistad y compromiso** con el entorno.",
        "El verdadero patrimonio del Ateneo no reside únicamente en sus agrupaciones musicales, sino en **las personas que las hacen posibles** y en el ambiente de compañerismo que se ha construido desde su creación.",
      ],
    },
  ],

  cierre: {
    texto: "Y, como no podía ser de otra manera, terminamos con el grito que resume el orgullo de pertenecer a esta gran familia:",
    grito: ["¡EO, EO, EO,", "ME GUSTA EL ATENEO!"],
  },
}