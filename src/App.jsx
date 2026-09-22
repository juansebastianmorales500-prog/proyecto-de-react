import "./App.css";

import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/Themecontext";
import { CartProvider } from "./contexts/CartContext"; // ✅ Mantenemos solo esta

import { Toaster } from "react-hot-toast";

import Navbar from "./components/layout/cabezera";

import Inicio from "./pages/inicio/Inicio";
import Catalogo from "./pages/catalogo/productos";
import Contactame from "./pages/contacto/Contactame";
import Carrito from "./pages/carrito/Carrito";
import Perfil from "./pages/perfil/Perfil";

import Escenario from "./components/escenario/escenario";

import Login from "./components/auth/Login";
import Registro from "./components/auth/Registro";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <>
          <Toaster />
          <Navbar />

          <Routes>
            <Route path="/" element={<Inicio />} />

            <Route path="/login" element={<Login />} />

            <Route path="/registro" element={<Registro />} />

            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/perfil" element={<Perfil />} />
            </Route>
            <Route path="/contactame" element={<Contactame />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/juego" element={<Escenario />} />
            </Route>
          </Routes>
        </>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;