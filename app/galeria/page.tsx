"use client"

import { useMemo, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const IMAGES = [
  {
    id: "1",
    url: "/images/img1.jpg",
    date: "2025-11-22",
    tags: ["Banda", "Santa Cecilia 2025"],
  },
  {
    id: "2",
    url: "/images/img2.jpg",
    date: "2025-11-23",
    tags: ["Coral", "Santa Cecilia 2025"],
  },
  {
    id: "3",
    url: "/images/img3.jpg",
    date: "2024-06-10",
    tags: ["Banda"],
  },
]

const TAG_GROUPS = [
  {
    label: "Asociación",
    key: "association",
    options: ["Banda", "Coral"],
  },
  {
    label: "Eventos",
    key: "event",
    options: ["Santa Cecilia 2025"],
  },
]
const ALL_TAGS = ["Banda", "Coral", "Santa Cecilia 2025"]

export default function GalleryPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")

  const filteredImages = useMemo(() => {
    return IMAGES.filter((img) => {
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => img.tags.includes(tag))

      const imgDate = new Date(img.date)

      const matchesFrom = fromDate ? imgDate >= new Date(fromDate) : true
      const matchesTo = toDate ? imgDate <= new Date(toDate) : true

      return matchesTags && matchesFrom && matchesTo
    })
  }, [selectedTags, fromDate, toDate])

  return (
    <>
      <Header />
    {/* Banner */}
      <section className="relative h-[30vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/banner_2.png')" }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-serif">
            Galería de imágenes
          </h1>
        </div>
      </section>
      <main className="max-w-6xl mx-auto">
        {/* FILTROS */}
        <div className="p-4 flex flex-col gap-4">
          <div className="flex gap-2 flex-wrap">
            {TAG_GROUPS.map((group) => (
                <div key={group.key} className="border rounded-lg p-3 bg-white">

                {/* HEADER DEL DROPDOWN */}
                <button
                    onClick={() =>
                    setOpenGroup(openGroup === group.key ? null : group.key)
                    }
                    className="w-full flex justify-between items-center font-medium text-left"
                >
                    <span>{group.label}</span>
                    <span className="text-gray-500">
                    {openGroup === group.key ? "▲" : "▼"}
                </span>
                </button>

                {/* OPTIONS */}
                {openGroup === group.key && (
                    <div className="mt-3 flex flex-wrap gap-2">
                    {group.options.map((tag) => (
                        <button
                        key={tag}
                        onClick={() =>
                            setSelectedTags((prev) =>
                            prev.includes(tag)
                                ? prev.filter((t) => t !== tag)
                                : [...prev, tag]
                            )
                        }
                        className={`px-3 py-1 rounded-full border text-sm transition ${
                            selectedTags.includes(tag)
                            ? "bg-primary-blue text-white border-primary-blue"
                            : "bg-white text-gray-700 hover:bg-primary-blue/10"
                        }`}
                        >
                        {tag}
                        </button>
                    ))}
                    </div>
                )}
                </div>
            ))}

            {/* FECHAS */}
            <div className="flex gap-4 pt-2">
                <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border rounded px-2 py-1"
                />
                <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border rounded px-2 py-1"
                />
            </div>

            </div>
          </div>
          <div className="flex gap-4">
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>

        {/* GALERÍA */}
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredImages.map((img) => (
            <div key={img.id} className="border rounded-lg overflow-hidden">
              <img src={img.url} className="w-full h-48 object-cover" />

              <div className="p-2 text-xs text-gray-600">
                {img.date}
                <div className="flex gap-1 flex-wrap mt-1">
                  {img.tags.map((t) => (
                    <span key={t} className="border px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}