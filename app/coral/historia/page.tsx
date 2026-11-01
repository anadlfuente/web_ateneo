// Coral Cantares · Historia (de momento, en construcción).
// El banner, las pestañas y la llamada final están en app/coral/layout.tsx.

import type { Metadata } from "next"
import { EnConstruccion } from "@/components/en-construccion"

export const metadata: Metadata = {
  title: "Coral Cantares",
  description: "Historia de la Coral Cantares del Ateneo Musical de Mieres.",
}

export default function CoralHistoriaPage() {
  return <EnConstruccion texto="Pronto podrás conocer aquí la historia de la Coral Cantares." />
}
