import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { GroupsSection } from "@/components/groups-section"
import { CalendarSection } from "@/components/calendar-section"
import { NewsSection } from "@/components/news-section"
import { SponsorsSection } from "@/components/sponsors-section"
import { JoinSection } from "@/components/join-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { VideosSection } from "@/components/youtube-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <VideosSection />
      <CalendarSection />
      <GroupsSection />
      <NewsSection />
      <SponsorsSection />
      <JoinSection />
      <ContactSection />
      <Footer />
    </main>
  )
}