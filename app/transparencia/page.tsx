import { Header } from "@/components/header"
import { Footer } from "@/components/footer"


export default function TransparenciaPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <section className="relative h-[30vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/banner_2.png')" }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-serif">
            Transparencia
          </h1>
        </div>
      </section>
      {/* Contenido */}
      <section className="max-w-6xl mx-auto px-6 py-24 space-y-32">
        <div>
          <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a nisl eget libero pharetra lobortis ut quis libero. Vivamus lacus ligula, placerat at tristique eget, 
              pharetra volutpat elit. Pellentesque sollicitudin ex tortor, vel pharetra felis vestibulum sed. Mauris interdum imperdiet ante. Curabitur a diam scelerisque, ultricies tellus ac, fermentum libero. Aliquam at tortor vehicula, ullamcorper enim non, consectetur sapien. Praesent feugiat tincidunt tortor, ullamcorper interdum metus ultricies quis. Etiam a ligula nec leo tincidunt ornare. Suspendisse eu sem at augue aliquam euismod. Suspendisse porta accumsan nisi, quis sodales magna finibus nec. Aliquam erat volutpat. Mauris congue eros turpis, sit amet rhoncus augue lacinia at. Proin magna lacus, feugiat in pellentesque a, posuere eu nisi. Phasellus eu ultricies elit.
        </p>
        </div>

      </section>
      <Footer />
    </main>
  )
}