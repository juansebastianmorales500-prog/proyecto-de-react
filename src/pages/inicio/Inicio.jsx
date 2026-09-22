import { Link } from "react-router-dom";

const portada = "https://dragonball-api.com/characters/goku_normal.webp";

const secciones = [
  ["El universo", "Explora personajes, razas y afiliaciones del universo Dragon Ball."],
  ["La investigación", "Consulta la información desde la API y descubre cada ficha."],
  ["La tienda", "Agrega tus personajes favoritos al carrito y prepara tu pedido."],
];

function Inicio() {
  return (
    <main className="min-h-screen bg-[#e8dfcf] text-[#211d1a] dark:bg-[#171313] dark:text-[#f8f0e4]">
      <section className="relative overflow-hidden bg-[#171313] text-[#f8f0e4]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1fr_340px] md:py-28">
          <div>
            <p className="mb-5 text-sm uppercase tracking-[0.35em] text-[#e04b52]">Registro de investigación</p>
            <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">Dragon Ball</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#cbbdad]">
              Entra al archivo de personajes, revisa sus afiliaciones y elige con cuidado a quién llevarás en tu pedido.
            </p>
            <Link to="/catalogo" className="mt-9 inline-block rounded-lg bg-[#c9343e] px-7 py-3 font-bold text-white transition-colors hover:bg-[#a9232c]">
              Abrir el catálogo
            </Link>
          </div>
          <div className="relative mx-auto w-full max-w-xs rotate-2 rounded-sm bg-[#f8f0e4] p-3 shadow-2xl">
            <img
              src={portada}
              alt="Goku de Dragon Ball"
              className="h-96 w-full object-cover"
              onError={(evento) => {
                evento.currentTarget.src = "https://placehold.co/600x900/211d1a/e8dfcf?text=Death+Note";
              }}
            />
            <p className="py-3 text-center text-lg font-bold text-[#211d1a]">Who will be next?</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#9f2029]">Archivo Dragon Ball</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Todo queda registrado</h2>
          </div>
          <p className="max-w-sm text-[#695849] dark:text-[#cbbdad]">Una experiencia construida con React, TailwindCSS, navegación, autenticación y consumo de API.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {secciones.map(([titulo, descripcion], indice) => (
            <article key={titulo} className="border-t-4 border-[#c9343e] bg-[#f8f0e4] p-6 shadow-sm dark:bg-[#2b2525]">
              <span className="text-3xl font-bold text-[#c9343e]">0{indice + 1}</span>
              <h3 className="mt-6 text-xl font-bold">{titulo}</h3>
              <p className="mt-3 leading-7 text-[#695849] dark:text-[#cbbdad]">{descripcion}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="bg-[#211d1a] px-6 py-8 text-center text-[#cbbdad]">
        <p>Dragon Ball · Archivo de personajes</p>
      </footer>
    </main>
  );
}

export default Inicio;
