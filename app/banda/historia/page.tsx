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

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif leading-tight">
            La Banda Sinfónica del Ateneo Musical de Mieres
          </h1>

          <p className="text-white/90 text-xl md:text-2xl lg:text-3xl font-serif mt-6 max-w-4xl">
            Una historia de crecimiento, compromiso e innovación
          </p>
        </div>
      </section>
      {/* Contenido */}
     <section className="max-w-7xl mx-auto px-6 py-16 md:py-20 space-y-24">

        {/* Introducción */}
        <div className="max-w-7xl mx-auto">
          <div className="text-lg md:text-xl leading-relaxed text-muted-foreground text-justify space-y-6">
            <p>
              La <strong className="text-foreground">Banda Sinfónica del Ateneo Musical de Mieres</strong>
              nació en 2018 como el proyecto fundacional del Ateneo Musical de Mieres.
              Lo que comenzó como la iniciativa de un grupo de músicos asturianos con el objetivo de
              crear una formación estable, abierta y de calidad, se ha convertido en pocos años
              en una de las agrupaciones musicales más activas del panorama bandístico asturiano.
            </p>

            <p>
              Desde su constitución, la banda ha perseguido una idea muy clara:
              ofrecer un espacio donde cualquier músico pudiera seguir disfrutando de la
              interpretación colectiva, independientemente de su edad o trayectoria,
              fomentando al mismo tiempo la formación continua, la convivencia y el desarrollo
              cultural del concejo de Mieres.
            </p>
          </div>
        </div>

        {/* Bloque 1 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Imagen */}
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/historia/first_concert.jpg"
              alt="Historia Ateneo"
              className="w-full h-[400px] object-cover"
            />
          </div>

          {/* Texto */}
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              Los primeros pasos
            </h2>

            <div className="text-lg leading-relaxed text-muted-foreground text-justify space-y-6">
              <p>
                Bajo la dirección musical de <strong className="text-foreground">Antonio Cánovas Moreno</strong>,
                comenzaron los primeros ensayos en el Recinto Ferial de Mieres, lugar que se convertiría
                en la primera sede de la asociación. Allí comenzó a consolidarse una plantilla formada
                por músicos procedentes de diferentes bandas de Asturias, conservatorios y escuelas de música.
              </p>

              <p>
                Desde el principio, la Banda Sinfónica apostó por un repertorio variado que combinaba
                grandes clásicos para banda, música española, bandas sonoras, zarzuela, música contemporánea
                y adaptaciones sinfónicas, buscando acercar este tipo de formación a todos los públicos.
              </p>

              <p>
                En noviembre de 2018 comenzó a participar en la programación cultural del municipio,
                convirtiéndose en una presencia habitual en conciertos extraordinarios, festivales,
                actos institucionales y celebraciones populares.
              </p>
            </div>
          </div>
        </div>

        {/* Bloque 2 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Texto */}
          <div>
            <h2 className="text-3xl font-serif mb-6">
              La banda que dio origen al Ateneo
            </h2>

            <div className="text-lg leading-relaxed text-muted-foreground text-justify space-y-6">
              <p>
                La <strong className="text-foreground">Banda Sinfónica</strong> no solo fue la primera
                agrupación del Ateneo Musical de Mieres, sino también el motor que impulsó el nacimiento
                del resto de proyectos de la asociación.
              </p>

              <p>
                Con el paso de los años fueron incorporándose nuevas formaciones como la
                <strong className="text-foreground"> Coral Cantares</strong>, la
                <strong className="text-foreground"> New Charanga Paentamala</strong>,
                <strong className="text-foreground"> Claxon Boys</strong> y distintos grupos de cámara,
                compartiendo músicos, recursos e incluso proyectos artísticos.
              </p>

              <p>
                Este modelo de colaboración ha permitido crear un auténtico
                <strong className="text-foreground"> ecosistema musical</strong>, en el que numerosos
                intérpretes participan simultáneamente en varias agrupaciones.
              </p>
            </div>  
          </div>

          {/* Imagen */}
          <div className="overflow-hidden rounded-2xl shadow-xl max-w-lg md:max-w-2xl lg:max-w-2xl mx-auto">
            <img
              src="/historia/BanderaAteneo.JPG"
              alt="Historia Ateneo"
              className="w-full h-[450px] block"
            />
          </div>
        </div>

        {/* Bloque 3 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Imagen */}
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <img
              src="/foto_family.JPG"
              alt="Historia Ateneo"
              className="w-full h-[300px] object-cover"
            />
          </div>

          {/* Texto */}
          <div>
            <h2 className="text-4xl font-serif mb-6">
              El Ateneo hoy
            </h2>

            <p className="text-lg leading-relaxed text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a nisl eget libero pharetra lobortis ut quis libero. Vivamus lacus ligula, placerat at tristique eget, 
              pharetra volutpat elit. Pellentesque sollicitudin ex tortor, vel pharetra felis vestibulum sed. Mauris interdum imperdiet ante. Curabitur a diam scelerisque, ultricies tellus ac, fermentum libero. Aliquam at tortor vehicula, ullamcorper enim non, consectetur sapien. Praesent feugiat tincidunt tortor, ullamcorper interdum metus ultricies quis. Etiam a ligula nec leo tincidunt ornare. Suspendisse eu sem at augue aliquam euismod. Suspendisse porta accumsan nisi, quis sodales magna finibus nec. Aliquam erat volutpat. Mauris congue eros turpis, sit amet rhoncus augue lacinia at. Proin magna lacus, feugiat in pellentesque a, posuere eu nisi. Phasellus eu ultricies elit.
            </p>
          </div>
        </div>
      </section>
      <section className="pb-10">
        <div className="max-w-5xl mx-auto py-10">
            <Organigram
            titulo="Organigrama"
            secciones={seccionesBanda}
          />
        </div>
      </section>
      <Footer />
    </main>
  )
}