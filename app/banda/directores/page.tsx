import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Organigram  from "@/components/organigram-section"


export default function BandaPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Banner */}
      <section className="relative w-full h-[40vh] sm:h-[40vh] md:h-[45vh] lg:h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: "url('/banda/julian-y-marcos.jpg')",
            backgroundPosition: "50% 15%", 
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex justify-center items-start pt-60">
          <h1 className="text-white text-5xl md:text-7xl font-serif">
            Directores
          </h1>
        </div>
      </section>
      {/* Contenido */}
      <section className="max-w-6xl mx-auto px-6 py-12 space-y-6">

        {/* Bloque 1 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Imagen */}
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/banda/julian-oliver.jpeg"
              alt="Historia Ateneo"
              className="w-full h-[350px] object-cover"
            />
          </div>

          {/* Texto */}
          <div>
            <h2 className="text-3xl font-serif mb-6">
              Director
            </h2>

            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              <strong>Julián Oliver López</strong>, nacido en Valencia y de familia toledana de Villafranca de los 
              Caballeros, comienza sus estudios en Catarroja (Valencia) y realiza la carrera en el Conservatorio 
              Superior de Castellón en la especialidad de tuba y bombardino.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              Estudia durante tres cursos en la "Brass Academy" de Alicante, donde fue alumno de Josep Burguera.
              También recibe clases de solistas nacionales e internacionales como Miguel Moreno, Vicente López, 
              Steven Mead, Shoichiro Hokazono, Mario Torrijo, Mel Culbertson y Øystein Baadsvik.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              Formado durante 3 años como alumno en el Curso de Composición, Análisis y Dirección de Bandas de la Vall 
              d’Albaida (Valencia) con los profesores José Rafael Pascual Vilaplana,  Ramón García Soler 
              y José Miguel Fayos. 
              </p>
          </div>
        </div>
          <div className="space-y-2" >
            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              Ha dirigido las bandas "Agrupación Musical Cruz Cubierta" y "Banda Juvenil de Benetússer", 
              en Valencia, y es director de la “Banda Sinfónica del Ateneo Musical de Mieres” desde septiembre de 2025. 
              Ha escrito varias obras de teatro-musical, además de un pasodoble y una marcha de procesión.   
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              Ha desarrollado su experiencia como docente durante 10 años en Escuelas de Música de Valencia, 
              Catarroja, Benetússer (Valencia), Herencia (Ciudad Real) y Villafranca de los caballeros (Toledo). 
              Además de profesor de música en el IES Maimónides de Córdoba durante un curso.  
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              Ha trabajado como profesor de tuba y bombardino en los Conservatorios Profesionales de Música de Santander, 
              Gijón y Oviedo, en el que actualmente ejerce la labor docente.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              En el mundo de las charangas, es fundador de la Charanga “La Melopea” (Toledo), 
              ganadores de varios premios nacionales y con los que grabó el CD “Si me gusta la música, 
              es por el bombo”. Ha sido jurado en el Concurso Nacional de Charangas de Escucha (Teruel). 
              Actualmente es miembro de la Charanga New Paentamala (sección del Ateneo Musical de Mieres).
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              Apasionado de la música y la enseñanza, participa activamente en la creación de proyectos atractivos 
              para el público y los intérpretes, intentando transmitir la pasión con la que vive este arte.
            </p>
        </div>
        {/* Bloque 2 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Texto */}
          <div>
            <h2 className="text-3xl font-serif mb-6">
              Subdirector
            </h2>

            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              <strong>Marcos Malnero Varela</strong> nació en Mieres y es Profesor de Piano, 
              Profesor Superior de Trombón y Profesor Superior de Solfeo, Teoría de la Música, 
              Transposición y Acompañamiento.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              A lo largo de su carrera, ha colaborado con varias orquestas destacadas, 
              como la Orquesta Sinfónica del Principado de Asturias (OSPA), la Oviedo Filarmonía, 
              la Orquesta Sinfónica Ciudad de Avilés, la Orquesta Sinfónica de Gijón y la Orquesta 
              del Teatro Lírico de Barcelona, entre otras.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              Además, ha participado en una amplia variedad de actividades artísticas, que van 
              desde la música de cámara hasta la música escenificada.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              Ha grabado dos discos con la Big Band de Gijón y otros con diferentes grupos, como la Bandina.
            </p>
          </div>

          {/* Imagen */}
          <div className="overflow-hidden rounded-2xl shadow-xl max-w-lg md:max-w-2xl lg:max-w-2xl mx-auto">
            <img
              src="/banda/Marcos-malnero.jpeg"
              alt="Historia Ateneo"
              className="w-full h-auto block"
            />
          </div>
        </div>
        <div className="space-y-2" >
            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              También ha desarrollado una importante labor pedagógica, realizando conciertos 
              didácticos en los ciclos ¡Música Maestro! del Ayuntamiento de Gijón y con diversos 
              grupos de cámara, con el objetivo de dar a conocer los instrumentos de viento metal 
              en general y el trombón en particular.   
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              Asimismo, ha participado como profesor de trombón en los cursos de verano 
              de la Fundación Magistralia.   
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              Ha sido el director de la Banda de Música de Mieres, la Banda de Música de Candás y la Banda de Música de Cangas del Narcea.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground text-justify">
              Desde 1998, es profesor en el Conservatorio Municipal Profesional “Julián Orbón” de Avilés.
            </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}