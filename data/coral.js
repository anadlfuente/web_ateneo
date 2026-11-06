// data/coral.js
// Textos de la página de la Coral Cantares.
// - Las negritas se marcan con **dos asteriscos**.
// - Cada párrafo va entre comillas y separado por coma.
// - Para comillas dentro del texto, usa « » (no comillas dobles normales).
// - Si un bloque no lleva foto, pon imagen: null y se mostrará solo el texto.

export const coral = {
  logo: {
    imagen: "/logos/coral_cantares_logo-no-bg.png",
    alt: "Logotipo de la Coral Cantares: la silueta de un hombre con sombrero",
  },

  introduccion: [
    "La **Coral Cantares** nace en 2022 bajo el paraguas del **Ateneo Musical de Mieres**, como un grupo de cantantes aficionados con ganas de compartir su gusto por la música coral. En pocos años se ha hecho un hueco propio en la vida cultural de Mieres.",
    "Sus primeros pasos estuvieron dirigidos por **Elena Miguélez Civera**, y en la actualidad la dirección corre a cargo de **Miguel Quintana**. La coral trabaja un repertorio a cuatro voces (sopranos, altos, tenores y bajos) y ensaya en la sala pequeña del **Espacio Cultural 19-10**, sede del Ateneo.",
  ],

    bloques: [
    {
      titulo: "En recuerdo de Ovidio Barbao",
      imagen: "/coral/ovidio-barbao.jpeg",
      altura: "320px",
      alt: "Ovidio Barbao, en cuyo homenaje nació la Coral Cantares",
      parrafos: [
        "La coral surge en homenaje a **Ovidio Barbao**, un hombre muy querido en Mieres y amigo de muchos de sus actuales integrantes. A Ovidio le encantaba cantar, y su voz grave destacaba especialmente en canciones como **«Cantares»**, de Joan Manuel Serrat.",
        "De esa canción toma la coral su nombre, y en su recuerdo el logotipo muestra la silueta de un hombre con sombrero, tal como muchos le recuerdan.",
      ],
    },
    {
      titulo: "Una presencia habitual en Mieres",
      imagen: "/coral/coral-jovellanos.jpeg",
      altura: "320px",
      alt: "La Coral Cantares durante una actuación",
      parrafos: [
        "En estos años, la coral se ha convertido en una presencia habitual en la vida cultural de Mieres. Participa en homenajes, galas solidarias como las dedicadas a la lucha contra el cáncer, entregas de premios y conciertos de Navidad.",
        "También forman parte de su calendario la **Folixa de Mieres**, el homenaje a **Juanín de Mieres** y las visitas a residencias de mayores, una cita que la agrupación considera ineludible.",
      ],
    },
    {
      titulo: "«13 Reyes: El Camino Primitivo»",
      imagen: "/coral/13-reyes-coral.jpeg",
      altura: "300px",
      alt: "La Coral Cantares y la Banda Sinfónica del Ateneo Musical de Mieres interpretando «13 Reyes» en el Auditorio Príncipe Felipe de Oviedo",
      parrafos: [
        "Uno de sus proyectos más destacados es el **Episodio II** de **«13 Reyes:El Camino Primitivo»**, en el que la coral participa como coro a cuatro voces junto a la **Banda Sinfónica del Ateneo Musical de Mieres**, bajo la batuta de **Iñaki Santianes**. La obra se estrenó en mayo de 2026 en el **Auditorio Príncipe Felipe de Oviedo**.",
      ],
    },
    {
      titulo: "Cantares de Chigre",
      imagen: "/coral/cantares-de-chigre-2024.jpg",
      altura: "380px",
      alt: "Cartel de Cantares de Chigre 2024",
      parrafos: [
        "Además de su repertorio a cuatro voces, la coral participa desde 2023, año en que comenzó la actividad, en **Cantares de Chigre**. Se trata de una iniciativa propia, registrada en Mieres por Pumarada Gascona, S.L., que organizan integrantes de la coral y del Ateneo y que cuenta con el apoyo del **Ayuntamiento de Mieres** a través de la Concejalía de Hostelería y Comercio.",
      ],
    },
  ],

  organigrama: [
    { nombre: "Sopranos", miembros: ["Marinel Olavarrieta", "Yolanda Peña", "Inmaculada Fueyo", "Yolanda Díaz", "Elena Álvarez García"] },
    { nombre: "Altos", miembros: ["Diana González", "Rosa Fernández", "Susana Gracia Fernández", "Inés Fernández", "Sofía Gutiérrez"] },
    { nombre: "Tenores", miembros: ["Iván Díaz Calvo", "José María Martínez Guardo", "Ricardo Fuertes", "Chema Castillo"] },
    { nombre: "Bajos", miembros: ["Manuel Rodríguez Alonso", "Juaco Yagüe"] },
  ],
}