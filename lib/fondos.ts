// Alterna fondo azul suave y fondo claro para separar visualmente los bloques.
// Uso: <section className={fondoSeccion(i)}> dentro de un .map((bloque, i) => ...)
export const fondoSeccion = (i: number) =>
  i % 2 === 0 ? "home-section home-section-blue" : "home-section"