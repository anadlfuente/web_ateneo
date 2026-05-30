"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useEffect,useState } from "react"
import { useSearchParams } from "next/navigation"
import { ChevronDown } from "lucide-react"

import { LegalNotice } from "@/components/legal/LegalNotice"
import { PrivacyPolicy } from "@/components/legal/PrivacyPolicy"
import { CookiesPolicy } from "@/components/legal/CookiesPolicy"

function AccordionItem({ title, isOpen, onClick, children }: any) {
  return (
    <div className="border rounded-xl mb-4 overflow-hidden">
      <button
        onClick={onClick}
        className="w-full p-4 flex items-center justify-between
    font-semibold bg-muted/40 hover:bg-muted
    transition-all duration-200"
      >
        <span>{title}</span>

        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
      />
      </button>

      {isOpen && (
        <div className="p-6 bg-white">
          {children}
        </div>
      )}
    </div>
  )
}

export default function LegalPage() {
  const searchParams = useSearchParams()
  const section = searchParams.get("section")

  const [open, setOpen] = useState<string | null>("legal")

  useEffect(() => {
    if (section) {
      setOpen(section)
    } else {
      setOpen("legal")
    }
  }, [section])
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <section className="relative h-[30vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/banner.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-serif">
            Reglamento
          </h1>
        </div>
      </section>
      <section className="relative w-full">
        <div className="max-w-4xl mx-auto py-20 px-6">
        
        <AccordionItem
          title="Aviso Legal"
          isOpen={open === "legal"}
          onClick={() => setOpen(open === "legal" ? null : "legal")}
        >
          <LegalNotice />
        </AccordionItem>

        <AccordionItem
          title="Política de Privacidad"
          isOpen={open === "privacy"}
          onClick={() => setOpen(open === "privacy" ? null : "privacy")}
        >
          <PrivacyPolicy />
        </AccordionItem>

        <AccordionItem
          title="Política de Cookies"
          isOpen={open === "cookies"}
          onClick={() => setOpen(open === "cookies" ? null : "cookies")}
        >
          <CookiesPolicy />
        </AccordionItem>

      </div>
      </section>
      <Footer />
    </main>
  )
}