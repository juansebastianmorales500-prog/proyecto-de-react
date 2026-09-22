import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Registro() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function registrar(e) {
    e.preventDefault();

    if (usuario.trim() === "" || password.trim() === "") {
      setError("Todos los campos son obligatorios.");
      return;
    }

    let usuarioExistente;
    try {
      usuarioExistente = JSON.parse(localStorage.getItem("usuario") || "null");
    } catch {
      usuarioExistente = null;
    }

    if (
      usuarioExistente &&
      usuarioExistente.usuario === usuario
    ) {
      setError("Ese usuario ya existe.");
      return;
    }

    const datos = {
      usuario,
      password,
    };

    localStorage.setItem("usuario", JSON.stringify(datos));

    alert("Usuario registrado correctamente.");

    navigate("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e8dfcf] px-6 py-12 dark:bg-[#171313]">
      <form className="flex w-full max-w-md flex-col gap-5 rounded-2xl bg-[#f8f0e4] p-8 shadow-xl ring-1 ring-[#cbbdad] dark:bg-[#2b2525] dark:ring-[#5c4545]" onSubmit={registrar}>
        <img src="/logo.png" alt="Logo Dragon Ball" className="mx-auto h-24 w-24 rounded-full object-cover" />

        <h2 className="text-center text-2xl font-bold text-[#211d1a] dark:text-[#f8f0e4]">Crear cuenta</h2>

        <input
          type="text"
          placeholder="Usuario"
          required
          className="rounded-lg border border-[#cbbdad] bg-white px-4 py-3 outline-none focus:border-[#c9343e] focus:ring-2 focus:ring-[#c9343e]/20 dark:border-[#5c4545] dark:bg-[#171313] dark:text-[#f8f0e4]"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          required
          className="rounded-lg border border-[#cbbdad] bg-white px-4 py-3 outline-none focus:border-[#c9343e] focus:ring-2 focus:ring-[#c9343e]/20 dark:border-[#5c4545] dark:bg-[#171313] dark:text-[#f8f0e4]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-center text-sm text-rose-600">{error}</p>}

        <button type="submit" className="rounded-lg bg-[#c9343e] px-4 py-3 font-bold text-white transition-colors hover:bg-[#a9232c]">Registrarse</button>

        <p className="text-center text-sm text-[#695849] dark:text-[#cbbdad]">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login">
            Inicia sesión
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Registro;