// Marco de todas las páginas del panel: sin indexar y con login.

import type { Metadata } from "next"
import type { ReactNode } from "react"
import { SesionAdmin } from "@/components/admin/sesion-admin"

export const metadata: Metadata = {
  title: "Panel de administración",
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <SesionAdmin>{children}</SesionAdmin>
}