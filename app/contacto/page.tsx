import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"
import { PageHero } from "@/components/page-hero"
import { RedesFlotante } from "@/components/redes-flotante"
import { MigasDePan } from "@/components/migas-de-pan"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      {/* Banner */}
      <PageHero imagen="/banner_2.png" altoMinimo="min-h-[40vh]">
        <h1 className="text-white">Contacto</h1>
      </PageHero>

            {/* Migas de pan */}
                  <MigasDePan items={[{ nombre: "Contacto" }]} />

        <main>
            <ContactSection />
        </main>
      <RedesFlotante />
      <Footer />
    </main>
  )
}