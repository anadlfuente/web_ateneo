import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"
import { PageHero } from "@/components/page-hero"
import { RedesFlotante } from "@/components/redes-flotante"

export default function JoinPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <PageHero
        imagen="/banner_2.png"
        altoMinimo="min-h-[40vh]"
      >
        <h1 className="text-white text-5xl md:text-7xl font-serif leading-tight">
          Contacto
        </h1>
      </PageHero>
        <main>
            <ContactSection />
        </main>
      <RedesFlotante />
      <Footer />
    </main>
  )
}