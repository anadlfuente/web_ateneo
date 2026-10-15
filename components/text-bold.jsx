export default function TextoRico({ texto }) {
  // Divide el texto por **...**: las partes impares son las negritas
  const partes = texto.split(/\*\*(.+?)\*\*/g)

  return (
    <>
      {partes.map((parte, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="text-foreground">{parte}</strong>
        ) : (
          parte
        )
      )}
    </>
  )
}