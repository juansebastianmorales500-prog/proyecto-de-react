import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();

const CLAVE_CARRITO = "carrito";

// Función auxiliar si la tienes fuera o defínela arriba si no la tenías
const leerCarritoDesdeStorage = () => {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO);
    const carrito = guardado ? JSON.parse(guardado) : [];
    return Array.isArray(carrito) ? carrito : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(leerCarritoDesdeStorage);

  // Cada vez que "carrito" cambia, lo guardamos en localStorage
  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = useCallback((personaje) => {
    setCarrito((prev) => {
      const yaExiste = prev.find((item) => item.id === personaje.id);

      if (yaExiste) {
        return prev.map((item) =>
          item.id === personaje.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          id: personaje.id,
          name: personaje.name,
          image: personaje.image,
          role: personaje.role,
          episodio: personaje.episodio,
          precio: personaje.precio,
          cantidad: 1,
        },
      ];
    });
  }, []);

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const cambiarCantidad = useCallback((id, cantidad) => {
    setCarrito((prev) => prev.map((item) =>
      item.id === id ? { ...item, cantidad: Math.max(1, cantidad) } : item
    ));
  }, []);

  const eliminarDelCarrito = useCallback((id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const vaciarCarrito = useCallback(() => setCarrito([]), []);

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, cambiarCantidad, eliminarDelCarrito, vaciarCarrito, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext);
}