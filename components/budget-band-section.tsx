import Link from "next/link"

export function BudgetBandSection() {
  return (
    <section className="home-section bg-primary-blue text-foreground">
      <div className="home-container flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="section-heading">¿Quieres esta música en tu evento?</h2>
          <p className="mt-2">Contacta con el Ateneo para solicitar un presupuesto.</p>
        </div>
        <Link href="/contacto?asunto=contratar" className="cta-primary">
          Pedir presupuesto
        </Link>
      </div>
    </section>
  )
}
