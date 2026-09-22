import { ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext";


function formatearPrecio(valor) {
return valor.toLocaleString("es-CO", {
    style: "currency",   //para mostrar el numero con moneda
    currency: "COP", // Peso colombiano
    maximumFractionDigits: 0,    // este es para decir que sin decimales
});
}

export default function CharacterCard({ personaje }) {
  const { agregarAlCarrito } = useCart();
  const [vistaAbierta, setVistaAbierta] = useState(false);

  useEffect(() => {
    if (!vistaAbierta) return undefined;

    const cerrarConEscape = (evento) => {
      if (evento.key === "Escape") setVistaAbierta(false);
    };

    document.addEventListener("keydown", cerrarConEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", cerrarConEscape);
      document.body.style.overflow = "";
    };
  }, [vistaAbierta]);

  const agregarPersonaje = (evento) => {
    evento.stopPropagation();
    agregarAlCarrito(personaje);
  };

    return (
    <>
      <article
        className="group cursor-pointer overflow-hidden rounded-2xl bg-[#f8f0e4] shadow-sm ring-1 ring-[#cbbdad] transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-[#2b2525] dark:ring-[#5c4545]"
        onClick={() => setVistaAbierta(true)}
        onKeyDown={(evento) => {
          if (evento.key === "Enter" || evento.key === " ") setVistaAbierta(true);
        }}
        role="button"
        tabIndex={0}
        aria-label={`Ver detalles de ${personaje.name}`}
      >
    <div className="relative">
        <img
          src={personaje.image}
          alt={personaje.name}
          className="h-56 w-full object-cover"
          loading="lazy"
          onError={(evento) => {
            evento.currentTarget.src = "https://placehold.co/600x800/211d1a/e8dfcf?text=Dragon+Ball";
          }}
        />
        <span className="absolute left-3 top-3 rounded-full bg-[#c9343e] px-2.5 py-1 text-xs font-medium text-white">
        {personaje.role || "Personaje"}
        </span>
    </div>

    <div className="p-4">
        <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold leading-tight">{personaje.name}</h3>
        <span className="shrink-0 text-xs text-[#907d6c]">#{personaje.id}</span>
        </div>


        <ul className="mt-3 space-y-1 text-sm text-[#695849] dark:text-[#d6c7b8]">
        <li><span className="text-[#907d6c]">Serie:</span> Dragon Ball</li>
        <li><span className="text-[#907d6c]">Afiliación:</span> {personaje.episodio}</li>
        <li><span className="text-[#907d6c]">Rol:</span> {personaje.role || "Personaje"}</li>
        </ul>


        <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-bold text-[#9f2029]">{formatearPrecio(personaje.precio)}</span>
              <button
                type="button"
                onClick={agregarPersonaje}
                className="rounded-full bg-[#211d1a] p-2 text-[#e04b52] transition-colors"
                title="Agregar al carrito"
              >
                  <ShoppingCart size={18} />
              </button>

        </div>
    </div>

      </article>

    {vistaAbierta && (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
        role="presentation"
        onClick={() => setVistaAbierta(false)}
      >
        <div
          className="relative grid max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-[#f8f0e4] shadow-2xl dark:bg-[#2b2525] md:grid-cols-[minmax(280px,0.9fr)_1.1fr]"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`personaje-${personaje.id}`}
          onClick={(evento) => evento.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setVistaAbierta(false)}
            className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-[#c9343e]"
            title="Cerrar vista previa"
            aria-label="Cerrar vista previa"
          >
            <X size={20} />
          </button>

          <img
            src={personaje.image}
            alt={personaje.name}
            className="h-80 w-full object-cover md:h-full md:min-h-[480px]"
            onError={(evento) => {
              evento.currentTarget.src = "https://placehold.co/800x1000/211d1a/e8dfcf?text=Dragon+Ball";
            }}
          />

          <div className="p-6 md:p-8">
            <div className="flex items-start gap-3 pr-8">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#c9343e]">Ficha de personaje</p>
                <h2 id={`personaje-${personaje.id}`} className="mt-2 text-3xl font-bold text-[#211d1a] dark:text-[#f8f0e4]">{personaje.name}</h2>
              </div>
              <span className="ml-auto shrink-0 text-sm text-[#907d6c]">#{personaje.id}</span>
            </div>

            <p className="mt-5 leading-7 text-[#695849] dark:text-[#d6c7b8]">{personaje.description}</p>

            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-[#e8dfcf] p-3 dark:bg-[#171313]"><dt className="text-[#907d6c]">Raza</dt><dd className="mt-1 font-semibold text-[#211d1a] dark:text-[#f8f0e4]">{personaje.race}</dd></div>
              <div className="rounded-lg bg-[#e8dfcf] p-3 dark:bg-[#171313]"><dt className="text-[#907d6c]">Género</dt><dd className="mt-1 font-semibold text-[#211d1a] dark:text-[#f8f0e4]">{personaje.gender}</dd></div>
              <div className="rounded-lg bg-[#e8dfcf] p-3 dark:bg-[#171313]"><dt className="text-[#907d6c]">Ki</dt><dd className="mt-1 font-semibold text-[#211d1a] dark:text-[#f8f0e4]">{personaje.ki}</dd></div>
              <div className="rounded-lg bg-[#e8dfcf] p-3 dark:bg-[#171313]"><dt className="text-[#907d6c]">Ki máximo</dt><dd className="mt-1 font-semibold text-[#211d1a] dark:text-[#f8f0e4]">{personaje.maxKi}</dd></div>
            </dl>

            <p className="mt-5 text-sm text-[#695849] dark:text-[#d6c7b8]">Afiliación: <strong>{personaje.episodio}</strong></p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <span className="text-xl font-bold text-[#9f2029]">{formatearPrecio(personaje.precio)}</span>
              <button
                type="button"
                onClick={agregarPersonaje}
                className="flex items-center gap-2 rounded-lg bg-[#c9343e] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#a9232c]"
              >
                <ShoppingCart size={18} />
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
);
}