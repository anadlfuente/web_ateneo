import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { GroupsSection } from "@/components/groups-section"
import { VideosSection } from "@/components/youtube-section"
import { ParticipateSection } from "@/components/participate-section"
import { HomeAgendaNewsSection } from "@/components/home-agenda-news-section"
import { SponsorsSection } from "@/components/sponsors-section"
import { ContactQuickSection } from "@/components/contact-quick-section"
import { Footer } from "@/components/footer"
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ateneo Musical de Mieres | Web Oficial',
  description: 'Ateneo Musical de Mieres: Banda Sinfónica, Coral Cantares, Claxon Boys y Charanga New Paentamala. Conciertos, procesiones y fiestas en Asturias.',
  alternates: { canonical: '/' },
};
export default function Home() {
  return (
    <div className="site-frame">
      <Header />
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <main id="contenido" className="min-h-screen">
        <HeroSection />
        <GroupsSection />
        <VideosSection />
        <ParticipateSection />
        <HomeAgendaNewsSection />
        <SponsorsSection />
      </main>
      <Footer />
    </div>
  )
}