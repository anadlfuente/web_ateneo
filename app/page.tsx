import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { GroupsSection } from "@/components/groups-section"
import { VideosSection } from "@/components/youtube-section"
import { BudgetBandSection } from "@/components/budget-band-section"
import { WhatMusicSection } from "@/components/what-music-section"
import { ParticipateSection } from "@/components/participate-section"
import { HomeAgendaNewsSection } from "@/components/home-agenda-news-section"
import { SponsorsSection } from "@/components/sponsors-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="site-frame">
      <Header />
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <main id="contenido" className="min-h-screen">
        <HeroSection />
        <GroupsSection />
        <VideosSection />
        <BudgetBandSection />
        <WhatMusicSection />
        <ParticipateSection />
        <HomeAgendaNewsSection />
        <SponsorsSection />
      </main>
      <Footer />
    </div>
  )
}