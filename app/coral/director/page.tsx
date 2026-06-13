import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Organigram  from "@/components/organigram-section"

export const seccionesBanda = [
  {
    nombre: "Flautas",
    miembros: [
      "Ana Pérez",
      "María García",
      "Laura Fernández",
    ],
  },
  {
    nombre: "Oboes",
    miembros: [
      "Juan López",
      "Carlos Rodríguez",
    ],
  },
  {
    nombre: "Clarinetes",
    miembros: [
      "Pedro Martínez",
      "Sofía Alonso",
    ],
  },
  {
    nombre: "Saxofones",
    miembros: [
      "Luis Fernández",
    ],
  },
  {
    nombre: "Trompetas",
    miembros: [
      "Miguel Sánchez",
      "Elena García",
    ],
  },
]

export default function BandaPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <section className="relative h-[60vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/banner.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-serif">
            Director
          </h1>
        </div>
      </section>
      {/* Contenido */}
      <section className="max-w-6xl mx-auto px-6 py-12 space-y-8">

        {/* Bloque 1 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Imagen */}
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/historia/first_concert.jpg"
              alt="Historia Ateneo"
              className="w-full h-[300px] object-cover"
            />
          </div>

          {/* Texto */}
          <div>
            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              Miguel Quintana Aspra, nacido en Infiesto , comienza a los 8 años estudios solfeo, canto y violín.
              Más adelante inicia sus estudios de Grado Profesional de Violín con Marco Antonio García de Paz en 
              Conservatorio Profesional de Música de Gijón ampliando su formación con Amayak Dougarian. En 2011 se 
              incorpora a los estudios superiores de violín en el aula del profesor Alexei Mijlin, 
              donde se gradúa en el Conservatorio Superior de Música de Oviedo. 
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              En 2007 se incorpora al coro El León de Oro (LDO), con el que ha ganado varios concursos tanto nacionales
              como internacionales y ha participado en giras y proyectos por diversos países como Marruecos, 
              Francia, Eslovenia, el Reino Unido e Italia. Con LDO ha trabajado en varias ocasiones bajo la dirección 
              de Peter Phillips, el prestigioso fundador de «The Tallis Scholars» y uno de los mayores expertos del mundo 
              en música coral renacentista.
            </p>
          </div>
        </div>
        <div className="space-y-2" >
            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              En 2011 pasa a formar parte del Coro de la Ópera de Oviedo. En 2013 fue invitado por 
              EuropaChorAkademie (ECA), un coro compuesto por miembros de distintos países del mundo 
              con el que cantó la Octava Sinfonía de G. Mahler en Fráncfort bajo la dirección de Paavo Järvi; 
              con EuropaChorAkademie realiza en 2019 el concierto de Año Nuevo en la prestigiosa sala de conciertos 
              Laeiszhalle de Hamburgo.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
               En 2021 junto a LDO, colabora con Jordi Savall y «Le Concert des Nations» realizando conciertos en el 
               Festival Berlioz (La Cote-Saint-André) y Philharmonie de Paris.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              En la actualidad dirige diferentes agrupaciones corales: Capilla Polifónica Palacio de Meres; 
              Schola Cantorum Virgen del Carbayu (La Felguera) con la que destaca el 2º Premio en el Certamen 
              Coral Nacional Villa de Avilés.
            </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}