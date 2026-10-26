import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WhatMusicSection } from "@/components/what-music-section"
import { GroupsSection } from "@/components/groups-section"
import { VideosSection } from "@/components/youtube-section"
import { ParticipateSection } from "@/components/participate-section"
import { HomeAgendaNewsSection } from "@/components/home-agenda-news-section"
import { SponsorsSection } from "@/components/sponsors-section"
import { ContactQuickSection } from "@/components/contact-quick-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <main id="contenido" className="min-h-screen">
        <HeroSection />
        <WhatMusicSection />
        <GroupsSection />
        <VideosSection />
        <ParticipateSection />
        <HomeAgendaNewsSection />
        <SponsorsSection />
        <ContactQuickSection />
      </main>
      <Footer />
    </>
  )
}