import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/Themecontext";
import { Sun, Moon, ShoppingCart, UserRound, LogOut, Menu, X } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function leerUsuario() {
  try {
    return JSON.parse(localStorage.getItem("usuario") || "null");
  } catch {
    return null;
  }
}

function Navbar() {
  const { tema, cambiarTema } = useTheme();
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [perfilAbierto, setPerfilAbierto] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [sesion, setSesion] = useState(() => ({
    logueado: localStorage.getItem("logueado") === "true",
    usuario: leerUsuario(),
  }));

  useEffect(() => {
    const actualizarSesion = () => {
      setSesion({
        logueado: localStorage.getItem("logueado") === "true",
        usuario: leerUsuario(),
      });
    };

    window.addEventListener("sesion-cambiada", actualizarSesion);
    window.addEventListener("storage", actualizarSesion);
    return () => {
      window.removeEventListener("sesion-cambiada", actualizarSesion);
      window.removeEventListener("storage", actualizarSesion);
    };
  }, []);

  useEffect(() => {
    setMenuAbierto(false);
  }, [location.pathname]);

  const cerrarSesion = async () => {
    const confirmacion = await Swal.fire({
      title: "¿Deseas cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#c9343e",
      cancelButtonColor: "#695849",
    });

    if (!confirmacion.isConfirmed) return;

    localStorage.removeItem("logueado");
    sessionStorage.removeItem("logueado");
    setPerfilAbierto(false);
    window.dispatchEvent(new Event("sesion-cambiada"));
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-red-950 bg-[#171313] text-[#f5eadb] shadow-lg">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        
        {/* LOGO CON LA TORTUGUITA */}
        <Link to="/" className="group flex items-center gap-2 text-xl font-bold tracking-wide sm:gap-2.5 sm:text-2xl">
          <span className="text-xl transition-transform group-hover:scale-110 sm:text-2xl">🐢</span>
          <span className="text-[#c9343e]">Dragon<span className="text-[#f5eadb]">Ball</span></span>
        </Link>

        {/* NAVEGACIÓN Y CARRITO */}
        <nav className="hidden items-center gap-6 font-medium text-[#cbbdad] lg:flex">
          <Link to="/" className="transition-colors hover:text-[#e04b52]">Inicio</Link>
          <Link to="/catalogo" className="transition-colors hover:text-[#e04b52]">Catálogo</Link>
          <Link to="/juego" className="transition-colors hover:text-[#e04b52]">Juego</Link>
          <Link to="/contactame" className="transition-colors hover:text-[#e04b52]">Contacto</Link>
        </nav>

        {/* BOTONES DE CARRITO, SESIÓN Y TEMA */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* BOTÓN DEL CARRITO */}
          <Link to="/carrito" className="relative rounded-full p-2 text-[#cbbdad] transition-colors hover:bg-[#302323]" title="Ver carrito">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c9343e] text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {/* BOTÓN PARA CAMBIAR TEMA */}
          <button
            type="button"
            onClick={cambiarTema}
            title={tema === "claro" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
            className="rounded-full p-2 text-[#cbbdad] transition-colors hover:bg-[#302323]"
          >
            {tema === "claro" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {sesion.logueado ? (
            <div className="relative">
              <button type="button" onClick={() => setPerfilAbierto(!perfilAbierto)} className="p-2 text-cyan-300 hover:text-white" title="Abrir perfil">
                <UserRound size={22} />
              </button>
              {perfilAbierto && (
                <div className="absolute right-0 top-12 w-52 rounded-lg bg-white p-4 text-slate-800 shadow-xl ring-1 ring-slate-200 dark:bg-[#2b2525] dark:text-[#f8f0e4] dark:ring-[#5c4545]">
                  <p className="font-semibold">{sesion.usuario?.usuario || "Usuario"}</p>
                  <Link to="/perfil" className="mt-3 block text-sm text-cyan-700 hover:underline dark:text-cyan-300">Ver perfil</Link>
                  <button type="button" onClick={cerrarSesion} className="mt-3 flex items-center gap-2 text-sm text-rose-600 hover:underline"><LogOut size={16} />Cerrar sesión</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" state={{ from: location }} className="hidden rounded-lg px-4 py-2 text-sm text-[#cbbdad] transition-colors hover:bg-[#302323] sm:block">Iniciar Sesión</Link>
              <Link to="/registro" className="hidden rounded-lg bg-[#c9343e] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#a9232c] sm:block">Registrarse</Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="rounded-full p-2 text-[#cbbdad] transition-colors hover:bg-[#302323] lg:hidden"
            title={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
          >
            {menuAbierto ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuAbierto && (
          <div className="order-3 w-full border-t border-[#5c4545] pt-3 lg:hidden">
            <nav className="flex flex-col gap-1 font-medium text-[#cbbdad]">
              <Link to="/" className="rounded-lg px-3 py-2 hover:bg-[#302323]">Inicio</Link>
              <Link to="/catalogo" className="rounded-lg px-3 py-2 hover:bg-[#302323]">Catálogo</Link>
              <Link to="/juego" className="rounded-lg px-3 py-2 hover:bg-[#302323]">Juego</Link>
              <Link to="/contactame" className="rounded-lg px-3 py-2 hover:bg-[#302323]">Contacto</Link>
              {!sesion.logueado && (
                <div className="mt-2 flex flex-wrap gap-2 border-t border-[#5c4545] pt-3 sm:hidden">
                  <Link to="/login" state={{ from: location }} className="rounded-lg px-3 py-2 text-sm hover:bg-[#302323]">Iniciar Sesión</Link>
                  <Link to="/registro" className="rounded-lg bg-[#c9343e] px-3 py-2 text-sm font-semibold text-white">Registrarse</Link>
                </div>
              )}
            </nav>
          </div>
        )}

      </div>
    </header>
  );
}

export default Navbar;