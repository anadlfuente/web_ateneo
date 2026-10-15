// data/coral-director.js
// Texto de la página del director de la Coral Cantares.
// - Las negritas se marcan con **dos asteriscos**.
// - flotante: true → el texto rodea la foto y continúa por debajo.
// - altura: "400px" → alto de la foto (opcional).

export const coralDirector = {
  banner: {
    titulo: "Director",
    subtitulo: "Coral Cantares",
    imagen: "/coral/miguel-quintana2.jpeg",
    posicion: "60% 40%", // qué parte de la foto se ve en el banner (horizontal vertical)
  },

  bloques: [
    {
      titulo: "Miguel Quintana Aspra",
      imagen: "/coral/miguel-quintana.jpeg", // ← añade la foto del director
      alt: "Miguel Quintana Aspra, director de la Coral Cantares del Ateneo Musical de Mieres",
      flotante: true,
      altura: "400px",
      parrafos: [
        "**Miguel Quintana Aspra**, nacido en Infiesto, comienza a los ocho años sus estudios de solfeo, canto y violín. Más adelante inicia el Grado Profesional de Violín con Marco Antonio García de Paz en el Conservatorio Profesional de Música de Gijón, y amplía su formación con Amayak Dougarian. En 2011 comienza los estudios superiores de violín en el Conservatorio Superior de Música de Oviedo, en el aula del profesor Alexei Mijlin, donde se gradúa.",
        "En 2007 se incorpora al coro **El León de Oro (LDO)**, con el que ha ganado varios concursos nacionales e internacionales y ha participado en giras y proyectos en países como Marruecos, Francia, Eslovenia, el Reino Unido e Italia. Con LDO ha trabajado en varias ocasiones bajo la dirección de Peter Phillips, fundador de «The Tallis Scholars» y uno de los mayores expertos del mundo en música coral renacentista.",
        "En 2011 pasa a formar parte del **Coro de la Ópera de Oviedo**. En 2013 es invitado por la EuropaChorAkademie (ECA), un coro formado por miembros de distintos países, con el que canta la Octava Sinfonía de G. Mahler en Fráncfort bajo la dirección de Paavo Järvi. Con este mismo coro ofrece en 2019 el concierto de Año Nuevo en la prestigiosa sala Laeiszhalle de Hamburgo.",
        "En 2021, junto a LDO, colabora con Jordi Savall y «Le Concert des Nations» en conciertos en el Festival Berlioz (La Côte-Saint-André) y en la Philharmonie de Paris.",
        "En la actualidad dirige diferentes agrupaciones corales: la **Capilla Polifónica Palacio de Meres** y la **Schola Cantorum Virgen del Carbayu** (La Felguera), con la que ha obtenido el segundo premio en el Certamen Coral Nacional Villa de Avilés.",
      ],
    },
  ],
}