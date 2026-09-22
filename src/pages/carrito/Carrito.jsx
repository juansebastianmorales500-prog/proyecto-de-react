import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { toast } from "react-hot-toast";

const IVA = 0.19;
const moneda = (valor) => valor.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

function Carrito() {
  const { carrito, cambiarCantidad, eliminarDelCarrito, vaciarCarrito } = useCart();
  const [enviando, setEnviando] = useState(false);
  const subtotal = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  const iva = subtotal * IVA;
  const total = subtotal + iva;

  const enviarPedido = async () => {
    if (!carrito.length) return;
    if (!window.confirm("¿Confirmas el envío de este pedido?")) return;
    setEnviando(true);
    await new Promise((resolver) => setTimeout(resolver, 500));
    vaciarCarrito();
    setEnviando(false);
    toast.success("Pedido enviado correctamente. ¡Gracias por tu compra!");
  };

  return (
    <main className="min-h-screen bg-[#e8dfcf] px-6 py-10 dark:bg-[#171313]">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-[#211d1a] dark:text-[#f8f0e4]">Pedido del cuaderno</h1>
        {!carrito.length ? (
          <div className="mt-10 rounded-2xl bg-[#f8f0e4] p-12 text-center shadow-sm dark:bg-[#2b2525]">
            <ShoppingBag className="mx-auto text-[#c9343e]" size={48} />
            <h2 className="mt-4 text-xl font-semibold text-[#211d1a] dark:text-[#f8f0e4]">Tu carrito está vacío</h2>
            <p className="mt-2 text-[#695849] dark:text-[#cbbdad]">Agrega personajes desde el catálogo.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="space-y-4">
              {carrito.map((item) => (
                <article key={item.id} className="flex flex-wrap items-center gap-4 rounded-xl bg-[#f8f0e4] p-4 shadow-sm dark:bg-[#2b2525]">
                  <img src={item.image} alt={item.name} className="h-24 w-20 rounded-lg object-cover" />
                  <div className="min-w-40 flex-1">
                    <h2 className="font-semibold text-[#211d1a] dark:text-[#f8f0e4]">{item.name}</h2>
                    <p className="text-sm text-[#695849] dark:text-[#cbbdad]">Afiliación: {item.episodio || "No disponible"}</p>
                    <p className="text-sm text-[#695849] dark:text-[#cbbdad]">Rol: {item.role || "Personaje"}</p>
                    <p className="mt-2 text-sm text-[#695849] dark:text-[#cbbdad]">Unitario: {moneda(item.precio)}</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 p-1 dark:border-slate-700">
                    <button type="button" onClick={() => cambiarCantidad(item.id, item.cantidad - 1)} className="p-1" title="Disminuir cantidad"><Minus size={16} /></button>
                    <span className="w-6 text-center">{item.cantidad}</span>
                    <button type="button" onClick={() => cambiarCantidad(item.id, item.cantidad + 1)} className="p-1" title="Aumentar cantidad"><Plus size={16} /></button>
                  </div>
                  <strong className="w-28 text-right text-[#211d1a] dark:text-[#f8f0e4]">{moneda(item.precio * item.cantidad)}</strong>
                  <button type="button" onClick={() => eliminarDelCarrito(item.id)} className="p-2 text-rose-500" title="Eliminar producto"><Trash2 size={18} /></button>
                </article>
              ))}
            </div>
            <aside className="h-fit rounded-xl bg-[#211d1a] p-6 text-white">
              <h2 className="text-xl font-semibold">Resumen del pedido</h2>
              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <p className="flex justify-between"><span>Subtotal</span><span>{moneda(subtotal)}</span></p>
                <p className="flex justify-between"><span>IVA (19%)</span><span>{moneda(iva)}</span></p>
                <p className="flex justify-between border-t border-slate-700 pt-4 text-lg font-bold text-white"><span>Total a pagar</span><span>{moneda(total)}</span></p>
              </div>
              <button type="button" disabled={enviando} onClick={enviarPedido} className="mt-8 w-full rounded-lg bg-[#c9343e] px-4 py-3 font-bold text-white disabled:opacity-50">{enviando ? "Enviando..." : "Enviar pedido"}</button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default Carrito;
