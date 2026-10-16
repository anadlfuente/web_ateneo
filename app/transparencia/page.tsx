import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"

export default function TransparenciaPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <PageHero
        imagen="/banner_2.png"
        altoMinimo="min-h-[40vh]"
        centrado
      >
        <h1 className="text-white text-4xl md:text-7xl font-serif leading-tight">
          Transparencia
        </h1>
      </PageHero>
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