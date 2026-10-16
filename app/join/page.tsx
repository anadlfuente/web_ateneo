import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JoinSection } from "@/components/join-section"
import { PageHero } from "@/components/page-hero"

export default function JoinPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <PageHero
        imagen="/banner.jpg"
        altoMinimo="min-h-[40vh]"
        centrado
      >
        <h1 className="text-white text-5xl md:text-7xl font-serif leading-tight">
          Hazte Socio
        </h1>
      </PageHero>
        <main>
            <JoinSection />
        </main>
      <Footer />
    </main>
  )
}