"use client"

import { Suspense } from "react"
import LegalClient from "@/components/legal/LegalClient"

export default function LegalPage() {
  return (
    <Suspense fallback={null}>
      <LegalClient />
    </Suspense>
  )
}