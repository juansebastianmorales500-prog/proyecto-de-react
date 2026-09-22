import { useState } from "react";
import { useCharacters } from "../../useCharacters.js";
import CharacterCard from "../../components/catalogo/characterCard";
function Productos() {
  const [pagina, setPagina] = useState(1);
  const { personajes, cargando, error, haySiguiente, recargar } = useCharacters(pagina);

  return (
    <section className="min-h-screen bg-[#e8dfcf] px-6 py-10 dark:bg-[#171313]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-[#211d1a] dark:text-[#f8f0e4]">Libro de personajes</h2>
        <p className="mt-2 text-[#695849] dark:text-[#cbbdad]">
          Personajes de Dragon Ball disponibles en la tienda
        </p>


        {cargando && <p className="mt-10 text-center text-slate-400">Cargando personajes...</p>}
        {error && (
          <div className="mt-10 text-center">
            <p className="text-rose-500">{error}</p>
            <button
              type="button"
              onClick={recargar}
              className="mt-4 rounded-lg bg-[#211d1a] px-4 py-2 text-white"
            >
              Intentar de nuevo
            </button>
          </div>
        )}


        {!cargando && !error && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
                  gap-6">
            {personajes.map((personaje) => (
              <CharacterCard key={personaje.id} personaje={personaje} />
            ))}
          </div>
        )}
        {!cargando && !error && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button type="button" disabled={pagina === 1} onClick={() => setPagina((actual) => actual - 1)} className="rounded-lg bg-[#211d1a] px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-40">Anterior</button>
            <span className="font-semibold text-[#4a382c]">Página {pagina}</span>
            <button type="button" disabled={!haySiguiente} onClick={() => setPagina((actual) => actual + 1)} className="rounded-lg bg-[#c9343e] px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">Siguiente</button>
          </div>
        )}
      </div>
    </section>
  );
}


export default Productos;