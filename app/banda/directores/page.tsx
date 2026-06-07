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
            Banda sinfónica
          </h1>
        </div>
      </section>
      {/* Contenido */}
      <section className="max-w-6xl mx-auto px-6 py-12 space-y-16">

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
            <h2 className="text-3xl font-serif mb-6">
              Los comienzos
            </h2>

            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a nisl eget libero pharetra lobortis ut quis libero. Vivamus lacus ligula, placerat at tristique eget, 
              pharetra volutpat elit. Pellentesque sollicitudin ex tortor, vel pharetra felis vestibulum sed. Mauris interdum imperdiet ante. Curabitur a diam scelerisque, ultricies tellus ac, fermentum libero. Aliquam at tortor vehicula, ullamcorper enim non, consectetur sapien. Praesent feugiat tincidunt tortor, ullamcorper interdum metus ultricies quis. Etiam a ligula nec leo tincidunt ornare. Suspendisse eu sem at augue aliquam euismod. Suspendisse porta accumsan nisi, quis sodales magna finibus nec. Aliquam erat volutpat. Mauris congue eros turpis, sit amet rhoncus augue lacinia at. Proin magna lacus, feugiat in pellentesque a, posuere eu nisi. Phasellus eu ultricies elit.
            </p>
          </div>
        </div>

        {/* Bloque 2 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Texto */}
          <div>
            <h2 className="text-3xl font-serif mb-6">
              Creciendo juntos
            </h2>

            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a nisl eget libero pharetra lobortis ut quis libero. Vivamus lacus ligula, placerat at tristique eget, 
              pharetra volutpat elit. Pellentesque sollicitudin ex tortor, vel pharetra felis vestibulum sed. Mauris interdum imperdiet ante. Curabitur a diam scelerisque, ultricies tellus ac, fermentum libero. Aliquam at tortor vehicula, ullamcorper enim non, consectetur sapien. Praesent feugiat tincidunt tortor, ullamcorper interdum metus ultricies quis. Etiam a ligula nec leo tincidunt ornare. Suspendisse eu sem at augue aliquam euismod. Suspendisse porta accumsan nisi, quis sodales magna finibus nec. Aliquam erat volutpat. Mauris congue eros turpis, sit amet rhoncus augue lacinia at. Proin magna lacus, feugiat in pellentesque a, posuere eu nisi. Phasellus eu ultricies elit.
            </p>
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