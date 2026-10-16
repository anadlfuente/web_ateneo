"use client"

// Hace que toda la web sepa qué ha aceptado la persona.
// Se coloca una sola vez, en app/layout.tsx.

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { leerConsentimiento, guardarConsentimiento, type Consentimiento } from "@/lib/cookies"

interface ContextoConsentimiento {
  consentimiento: Consentimiento | null
  listo: boolean                 // ya se ha leído la elección guardada
  configAbierta: boolean
  guardar: (externos: boolean) => void
  abrirConfiguracion: () => void
  cerrarConfiguracion: () => void
}

const Contexto = createContext<ContextoConsentimiento | null>(null)

export function ConsentimientoProvider({ children }: { children: ReactNode }) {
  const [consentimiento, setConsentimiento] = useState<Consentimiento | null>(null)
  const [listo, setListo] = useState(false)
  const [configAbierta, setConfigAbierta] = useState(false)

  // Al entrar en la web, leemos lo que eligió la última vez
  useEffect(() => {
    setConsentimiento(leerConsentimiento())
    setListo(true)
  }, [])

  const guardar = (externos: boolean) => {
    setConsentimiento(guardarConsentimiento(externos))
    setConfigAbierta(false)
  }

  return (
    <Contexto.Provider
      value={{
        consentimiento,
        listo,
        configAbierta,
        guardar,
        abrirConfiguracion: () => setConfigAbierta(true),
        cerrarConfiguracion: () => setConfigAbierta(false),
      }}
    >
      {children}
    </Contexto.Provider>
  )
}

export function useConsentimiento() {
  const ctx = useContext(Contexto)
  if (!ctx) throw new Error("useConsentimiento debe usarse dentro de <ConsentimientoProvider>")
  return ctx
}