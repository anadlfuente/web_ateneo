// data/banda.js
// Textos de la página de la Banda Sinfónica.
// - Las negritas se marcan con **dos asteriscos**.
// - Cada párrafo va entre comillas y separado por coma.
// - Para comillas dentro del texto, usa « » (no comillas dobles normales).
// - Si un bloque no lleva foto, pon imagen: null y se mostrará solo el texto, centrado.

export const banda = {
  banner: {
    titulo: "La Banda Sinfónica del Ateneo Musical de Mieres",
    subtitulo: "Una historia de crecimiento, compromiso e innovación",
    imagen: "/banda/Marco.JPG",
  },

  introduccion: [
    "La **Banda Sinfónica del Ateneo Musical de Mieres** nació en 2018 como el proyecto fundacional del Ateneo Musical de Mieres. Lo que comenzó como la iniciativa de un grupo de músicos asturianos con el objetivo de crear una formación estable, abierta y de calidad, se ha convertido en pocos años en una de las agrupaciones musicales más activas del panorama bandístico asturiano.",
    "Desde su constitución, la banda ha perseguido una idea muy clara: ofrecer un espacio donde cualquier músico pudiera seguir disfrutando de la interpretación colectiva, independientemente de su edad o trayectoria, fomentando al mismo tiempo la formación continua, la convivencia y el desarrollo cultural del concejo de Mieres.",
  ],

  bloques: [
    {
      titulo: "Los primeros pasos",
      flotante: true,
      imagen: "/banda/foto-oficial-18.jpeg",
      altura: "400px",
      alt: "Primer concierto de la Banda Sinfónica del Ateneo Musical de Mieres",
      parrafos: [
        "Bajo la dirección musical de **Antonio Cánovas Moreno**, comenzaron los primeros ensayos en el **Recinto Ferial de Mieres**, lugar que se convertiría en la primera sede de la asociación. Allí comenzó a consolidarse una plantilla formada por músicos procedentes de diferentes bandas de Asturias, conservatorios y escuelas de música.",
        "Desde el principio, la Banda Sinfónica apostó por un repertorio variado que combinaba grandes clásicos para banda, música española, bandas sonoras, zarzuela, música contemporánea y adaptaciones sinfónicas, buscando acercar este tipo de formación a todos los públicos.",
        "En noviembre de 2018 empezó a participar en la programación cultural del municipio, convirtiéndose en una presencia habitual en conciertos extraordinarios, festivales, actos institucionales y celebraciones populares.",
      ],
    },
    {
      titulo: "La banda que dio origen al Ateneo",
      flotante: true,
      imagen: "/galeria-section/2018-11-17-santa-cecilia/002.webp",
      alt: "Bandera del Ateneo Musical de Mieres",
      parrafos: [
        "La **Banda Sinfónica** no solo fue la primera agrupación del Ateneo Musical de Mieres, sino también el motor que impulsó el nacimiento del resto de proyectos de la asociación.",
        "Con el paso de los años fueron incorporándose nuevas formaciones como la **Coral Cantares**, la **New Charanga Paentamala**, **Claxon Boys** y distintos grupos de cámara, compartiendo músicos, recursos e incluso proyectos artísticos.",
        "Este modelo de colaboración ha permitido crear un auténtico **ecosistema musical**, en el que numerosos intérpretes participan simultáneamente en varias agrupaciones.",
      ],
    },
    {
      titulo: "La pandemia: mantener viva la música",
      imagen: null,
      alt: "",
      parrafos: [
        "La llegada de la COVID-19 supuso uno de los mayores retos de la historia de la banda.",
        "Gracias a las dimensiones del salón de actos del Recinto Ferial de Mieres, fue posible retomar parcialmente los ensayos respetando las medidas sanitarias vigentes. Mientras muchas agrupaciones permanecían inactivas, la Banda Sinfónica consiguió mantener el contacto entre sus músicos y preparar nuevos proyectos para el regreso de la actividad cultural.",
        "Aquella etapa reforzó aún más el compromiso de todos los integrantes con la asociación y puso de manifiesto la capacidad de adaptación de la banda ante situaciones excepcionales.",
      ],
    },
    {
      titulo: "Una programación cada vez más ambiciosa",
      flotante: true,
      imagen: "/banda/conciertos-ateneo.png", // ← añade esta foto
      alt: "Concierto de la Banda Sinfónica del Ateneo Musical de Mieres",
      parrafos: [
        "Consolidada ya como una de las principales agrupaciones del concejo, la Banda Sinfónica comenzó a desarrollar una intensa actividad artística, participando cada año en los conciertos de **Primavera**, **Santa Cecilia** y **Navidad**, además de numerosos festivales y actuaciones organizadas por el Ayuntamiento de Mieres.",
        "Durante estos años también ha apostado por conciertos temáticos que han tenido una gran acogida por parte del público, como **«La Música de Nuestra Mina»**, un homenaje al patrimonio minero asturiano con la participación de destacados solistas y agrupaciones corales; el **«Homenaje a la Copla»**, junto a la cantante Nerea Vázquez; conciertos dedicados a la música de cine, al repertorio sinfónico contemporáneo o a grandes compositores internacionales; así como actuaciones solidarias y benéficas en colaboración con otras entidades culturales y sociales.",
        "Esta variedad artística ha permitido que cada temporada presente nuevos programas, alejándose del modelo tradicional de concierto de banda y apostando por espectáculos cuidadosamente diseñados para atraer a públicos de todas las edades.",
      ],
    },
    {
      titulo: "El hermanamiento con Totana y la gira por Murcia",
      flotante: true,
      imagen: "/banda/ateneo-aguilas.webp", // ← añade esta foto
      alt: "Banda del Ateneo Musical de Mieres en Águilas",
      parrafos: [
        "Uno de los momentos más importantes de la historia reciente de la Banda Sinfónica tuvo lugar en 2022, con motivo del hermanamiento con la **Agrupación Musical de Totana** (Murcia).",
        "La banda viajó hasta la Región de Murcia para ofrecer un concierto conjunto en Totana y participar posteriormente en otro hermanamiento musical con la banda del patronato de **Águilas**, compartiendo experiencias con músicos de otras comunidades autónomas y representando a Mieres fuera de Asturias por primera vez como agrupación.",
        "Meses después, el hermanamiento tuvo continuidad con la visita de la banda totanense a Mieres, donde ambas formaciones ofrecieron un concierto conjunto que reforzó los lazos de amistad entre ambas asociaciones.",
        "Más allá del aspecto musical, este intercambio supuso una experiencia humana inolvidable para todos los participantes y marcó el inicio de la vocación viajera de la Banda Sinfónica.",
      ],
    },
    {
      titulo: "«13 Reyes»: un proyecto único",
      flotante: true,
      imagen: "/historia/13reyes.webp", // ← añade esta foto
      alt: "Interpretación de 13 Reyes con la Banda de Gaitas La Laguna del Torollu",
      parrafos: [
        "Desarrollado junto a la **Banda de Gaitas La Laguna del Torollu** y con música del compositor **Yónatan Sánchez Santianes**, este proyecto nace con el propósito de narrar la historia de los reyes de Asturias mediante un gran poema sinfónico donde conviven la banda sinfónica y la banda de gaitas.",
        "El estreno del primer episodio tuvo lugar en 2024, dentro de la programación de la **Folixa na Primavera**, despertando un enorme interés tanto por la originalidad de la propuesta como por la calidad artística de su interpretación.",
        "La obra combina elementos de la música sinfónica contemporánea con melodías tradicionales asturianas, creando una identidad sonora propia que representa la unión entre tradición y modernidad.",
        "El éxito obtenido permitió que el proyecto continuara creciendo con nuevas interpretaciones y culminara con el estreno del **Episodio II: El Camino Primitivo**, consolidándose como una de las producciones más ambiciosas desarrolladas por el Ateneo Musical de Mieres.",
      ],
    },
    {
      titulo: "Lorient: llevando Mieres a Europa",
      flotante: true,
      imagen: "/historia/lorient.jpg", // ← añade esta foto
      alt: "La Banda Sinfónica del Ateneo Musical de Mieres en el Festival Intercéltico de Lorient",
      parrafos: [
        "En 2024, la Banda Sinfónica vivió uno de los hitos más importantes de su historia al participar en el **Festival Intercéltico de Lorient**, considerado el mayor encuentro internacional dedicado a la cultura celta. Además, se convirtió en la **primera banda sinfónica del mundo** en participar en el festival.",
        "Representar a Mieres y a Asturias en un evento de esta magnitud supuso un importante reconocimiento al trabajo realizado desde la creación de la banda.",
        "Durante varios días, los músicos participaron en conciertos, desfiles y actividades culturales junto a agrupaciones procedentes de diferentes países, llevando el nombre del Ateneo Musical de Mieres a uno de los festivales más prestigiosos del mundo celta.",
      ],
    },
    {
      titulo: "Skanda regresa en clave de banda",
      flotante: true,
      imagen: "/banda/skanda-ateneo.jpg", // ← añade esta foto
      alt: "La Banda Sinfónica del Ateneo Musical de Mieres en la Folixa Na Primavera 2025 con Skanda",
      parrafos: [
        "La vocación innovadora de la banda quedó nuevamente patente en la **Folixa na Primavera de 2025**, al acompañar a **Skanda**, referente del folk-rock asturiano, en su regreso a los escenarios tras una década de silencio, en un concierto extraordinario en el que también participó la Banda de Gaites Villa de Mieres. Esta colaboración permitió fusionar el sonido sinfónico con la energía del folk-rock en un espectáculo preparado especialmente para la ocasión, reafirmando la apuesta de la Banda Sinfónica por **proyectos transversales que conectan tradición, música popular y repertorio sinfónico**.",
        ],
    },

    {
      titulo: "Villafranca de los Caballeros",
      flotante: true,
      imagen: "/historia/villafranca.jpg", // ← añade esta foto
      alt: "La Banda Sinfónica del Ateneo Musical de Mieres en Villafranca de los Caballeros",
      parrafos: [
        "En 2026, la banda volvió a salir de Asturias para participar en un encuentro musical en **Villafranca de los Caballeros** (Toledo).",
        "Este viaje reafirmó el compromiso del Ateneo Musical con los intercambios culturales y permitió seguir estrechando relaciones con otras bandas españolas, compartiendo repertorio, experiencias y formas de entender la música de banda.",
      ],
    },
    {
      titulo: "Una agrupación en constante evolución",
      flotante: true,
      imagen: "/banda/foto_family.JPG",
      alt: "Foto de familia de los músicos de la Banda Sinfónica del Ateneo Musical de Mieres",
      parrafos: [
        "A lo largo de estos años, la Banda Sinfónica ha experimentado un crecimiento constante tanto en número de músicos como en calidad artística.",
        "Su repertorio se ha ampliado progresivamente, incorporando obras originales para banda, música contemporánea, bandas sonoras, espectáculos temáticos y proyectos multidisciplinares junto a coros, bandas de gaitas, solistas vocales y agrupaciones instrumentales.",
        "Este espíritu innovador ha convertido a la Banda Sinfónica del Ateneo Musical de Mieres en una agrupación capaz de afrontar proyectos cada vez más ambiciosos sin perder la esencia con la que nació en 2018: **hacer música de calidad, fomentar la convivencia entre sus integrantes y contribuir al desarrollo cultural de Mieres**.",
        "Hoy, la Banda Sinfónica continúa escribiendo su historia concierto tras concierto. Lo que comenzó como **el sueño compartido de un grupo de músicos se ha transformado en una realidad consolidada**, reconocida dentro y fuera de Asturias, y con un futuro lleno de nuevos retos, nuevos escenarios y nuevos proyectos que seguirán llevando el nombre del Ateneo Musical de Mieres allí donde la música tenga cabida.",
      ],
    },
  ],

  organigrama: [
    { nombre: "Clarinetes", miembros: ["Nacho Fernández López (Concertino)", "Aaron Mompó López", "Alicia Martínez Gutiérrez", "Alma Suárez","Carlos Álvarez Vázquez","Carlos García Rodríguez","Corona Morató Cecchini","Daniela Boto López","Graciela Pozo","Héctor Gil Ortiz","Iñaki de Barutell García","Pablo García González","Pablo Laviana","Paula García Valles","Pilar Sierra García","Sergio Moro Cueva","Soraya Álvarez Ferreras","Gerardo Rodríguez Suárez"] },
    { nombre: "Flautas", miembros: ["Alba Díaz de Anda", "Alba Fernández Antomil", "Ana de la Fuente","Carmen","Chus Fernández","Miriam González Rodríguez","Mónica","Nora Fariz Muñoz","Pablo Paniagua Álvarez","Simón Garnacho Escayo"] },
    { nombre: "Oboes", miembros: ["Clara Suárez Díaz", "Lucia del Casar Cabal"] },
    { nombre: "Saxofones", miembros: ["Ismael Fernández Arboleya","Jesús Martínez Barrial","José María Castillo Rojo","Lola Villa Suárez","Marta Carro Amigo","Pablo Jiménez Nogales","Siria González","Carmen Loriente Medina","Juanjo Ceñal Moral","Pablo Rodríguez"] },
    { nombre: "Trompas", miembros: ["Beatriz Martínez Pardo", "Juan Cecchini Neketan","Yelitza J Piniella Grillet"] },
    { nombre: "Trompetas", miembros: ["Diego García Jiménez", "Juan Neira","Laura López Quesada","Mara Moreno Ramos","Marcos Soto Díaz","Mateo Velasco Fernández","Pelayo Herrero Antolín"] },
    { nombre: "Trombones", miembros: ["Marcos Malnero", "Mateo Valdés","Pedro T."] },
    { nombre: "Fagots", miembros: ["Karly Esteban"] },
    { nombre: "Bombardinos y Tubas", miembros: ["Alicia Gutiérrez Rico","Anna J Piniella Grillet", "Pedro Blanco Rodríguez","Boniel Llaneza Carrio","Julián Oliver López"] },
    { nombre: "Violonchelos y Contrabajo", miembros: ["David García Cueto", "Valeria Pérez","Marco Pérez"] },
    { nombre: "Percusión", miembros: ["Clara Sampietro Rafel", "Jose Ramón Vidal","Jaime Montaño Domínguez","Sergio Costa Pesquera","Miriam Casanova Benavent"] },
    { nombre: "Piano", miembros: ["Hugo Álvarez Llanero"] },
  ],
}