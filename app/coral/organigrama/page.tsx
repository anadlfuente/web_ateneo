// Coral Cantares · Organigrama (de momento, en construcción).
// El banner, las pestañas y la llamada final están en app/coral/layout.tsx.

import type { Metadata } from "next"
import { EnConstruccion } from "@/components/en-construccion"

export const metadata: Metadata = {
  title: "Organigrama · Coral Cantares",
  description: "Organigrama de la Coral Cantares del Ateneo Musical de Mieres.",
}

export default function CoralOrganigramaPage() {
  return <EnConstruccion texto="Pronto podrás conocer aquí a las voces que forman la Coral Cantares." />
}