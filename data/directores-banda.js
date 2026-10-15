// data/directores.js
// Textos de la página de directores de la Banda Sinfónica.
// - Las negritas se marcan con **dos asteriscos**.
// - flotante: true → el texto rodea la foto y continúa por debajo.
// - altura: "350px" → alto de la foto (opcional).

export const directores = {
  banner: {
    titulo: "Directores",
    imagen: "/banda/julian-y-marcos.jpg",
    posicion: "50% 15%", // qué parte de la foto se ve en el banner (horizontal vertical)
  },

  bloques: [
    {
      titulo: "Director",
      imagen: "/banda/julian-oliver.jpeg",
      alt: "Julián Oliver López, director de la Banda Sinfónica del Ateneo Musical de Mieres",
      flotante: true,
      altura: "400px",
      parrafos: [
        "**Julián Oliver López**, nacido en Valencia y de familia toledana de Villafranca de los Caballeros, comienza sus estudios en Catarroja (Valencia) y realiza la carrera en el Conservatorio Superior de Castellón en la especialidad de tuba y bombardino.",
        "Estudia durante tres cursos en la «Brass Academy» de Alicante, donde fue alumno de Josep Burguera. También recibe clases de solistas nacionales e internacionales como Miguel Moreno, Vicente López, Steven Mead, Shoichiro Hokazono, Mario Torrijo, Mel Culbertson y Øystein Baadsvik.",
        "Se forma durante tres años en el Curso de Composición, Análisis y Dirección de Bandas de la Vall d’Albaida (Valencia) con los profesores José Rafael Pascual Vilaplana, Ramón García Soler y José Miguel Fayos.",
        "Ha dirigido la Agrupación Musical Cruz Cubierta y la Banda Juvenil de Benetússer, en Valencia, y es director de la **Banda Sinfónica del Ateneo Musical de Mieres** desde septiembre de 2025. Ha escrito varias obras de teatro musical, además de un pasodoble y una marcha de procesión.",
        "Ha desarrollado su experiencia como docente durante diez años en escuelas de música de Valencia, Catarroja, Benetússer (Valencia), Herencia (Ciudad Real) y Villafranca de los Caballeros (Toledo). Además, fue profesor de música en el IES Maimónides de Córdoba durante un curso.",
        "Ha trabajado como profesor de tuba y bombardino en los conservatorios profesionales de música de Santander, Gijón y Oviedo, donde ejerce actualmente su labor docente.",
        "En el mundo de las charangas, es fundador de la charanga «La Melopea» (Toledo), con la que ha ganado varios premios nacionales y grabó el CD «Si me gusta la música, es por el bombo». Ha sido jurado en el Concurso Nacional de Charangas de Escucha (Teruel). Actualmente es miembro de la **New Charanga Paentamala**, agrupación del Ateneo Musical de Mieres.",
        "Apasionado de la música y la enseñanza, participa activamente en la creación de proyectos atractivos para el público y los intérpretes, intentando transmitir la pasión con la que vive este arte.",
      ],
    },
    {
      titulo: "Subdirector",
      imagen: "/banda/Marcos-malnero.jpeg",
      alt: "Marcos Malnero Varela, subdirector de la Banda Sinfónica del Ateneo Musical de Mieres",
      flotante: true,
      altura: "400px",
      parrafos: [
        "**Marcos Malnero Varela** nació en Mieres y es profesor de Piano, profesor superior de Trombón y profesor superior de Solfeo, Teoría de la Música, Transposición y Acompañamiento.",
        "A lo largo de su carrera ha colaborado con destacadas orquestas, como la Orquesta Sinfónica del Principado de Asturias (OSPA), Oviedo Filarmonía, la Orquesta Sinfónica Ciudad de Avilés, la Orquesta Sinfónica de Gijón y la Orquesta del Teatro Lírico de Barcelona, entre otras.",
        "Además, ha participado en una amplia variedad de actividades artísticas, que van desde la música de cámara hasta la música escenificada. Ha grabado dos discos con la Big Band de Gijón y otros con diferentes grupos, como La Bandina.",
        "También ha desarrollado una importante labor pedagógica, realizando conciertos didácticos en los ciclos «¡Música, Maestro!» del Ayuntamiento de Gijón y con diversos grupos de cámara, con el objetivo de dar a conocer los instrumentos de viento metal en general y el trombón en particular. Asimismo, ha participado como profesor de trombón en los cursos de verano de la Fundación Magistralia.",
        "Ha sido director de la Banda de Música de Mieres, la Banda de Música de Candás y la Banda de Música de Cangas del Narcea.",
        "Desde 1998 es profesor en el Conservatorio Municipal Profesional «Julián Orbón» de Avilés.",
      ],
    },
  ],
}