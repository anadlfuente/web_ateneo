import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JoinSection } from "@/components/join-section"

export default function JoinPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <section className="relative h-[40vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/banner.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-serif">
            Hazte Socio
          </h1>
        </div>
      </section>
        <main>
            <JoinSection />
        </main>
      <Footer />
    </main>
  )
}