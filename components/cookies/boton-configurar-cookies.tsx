"use client"

// Enlace para el footer: permite cambiar o retirar el consentimiento
// en cualquier momento (es obligatorio que exista).

import { useConsentimiento } from "./consentimiento-provider"

export function BotonConfigurarCookies({ className = "" }: { className?: string }) {
  const { abrirConfiguracion } = useConsentimiento()
  return (
    <button type="button" onClick={abrirConfiguracion} className={className}>
      Configurar cookies
    </button>
  )
}