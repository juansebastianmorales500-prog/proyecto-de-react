import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Registro() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function registrar(e) {
    e.preventDefault();

    const nombreLimpio = nombre.trim();
    const emailLimpio = email.trim().toLowerCase();

    if (!nombreLimpio || !emailLimpio || !password.trim()) {
      setError("Nombre, correo y contraseña son obligatorios.");
      return;
    }

    if (!emailLimpio.includes("@") || !emailLimpio.includes(".")) {
      setError("Ingresá un correo válido.");
      return;
    }

    let usuarioExistente;
    try {
      usuarioExistente = JSON.parse(localStorage.getItem("cuenta_registrada") || "null");
    } catch {
      usuarioExistente = null;
    }

    if (
      usuarioExistente &&
      (usuarioExistente.email === emailLimpio || usuarioExistente.usuario === nombreLimpio)
    ) {
      setError("Ese usuario o correo ya existe.");
      return;
    }

    const datos = {
      nombre: nombreLimpio,
      usuario: nombreLimpio,
      email: emailLimpio,
      password,
    };

    localStorage.setItem("cuenta_registrada", JSON.stringify(datos));

    await Swal.fire({
      title: "Registro exitoso",
      text: "Usuario registrado correctamente.",
      icon: "success",
      confirmButtonColor: "#c9343e",
    });

    navigate("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e8dfcf] px-6 py-12 dark:bg-[#171313]">
      <form className="flex w-full max-w-md flex-col gap-5 rounded-2xl bg-[#f8f0e4] p-8 shadow-xl ring-1 ring-[#cbbdad] dark:bg-[#2b2525] dark:ring-[#5c4545]" onSubmit={registrar}>
        <img src="/logo.png" alt="Logo Dragon Ball" className="mx-auto h-24 w-24 rounded-full object-cover" />

        <h2 className="text-center text-2xl font-bold text-[#211d1a] dark:text-[#f8f0e4]">Crear cuenta</h2>

        <input
          type="text"
          placeholder="Nombre completo"
          required
          className="rounded-lg border border-[#cbbdad] bg-white px-4 py-3 outline-none focus:border-[#c9343e] focus:ring-2 focus:ring-[#c9343e]/20 dark:border-[#5c4545] dark:bg-[#171313] dark:text-[#f8f0e4]"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          required
          className="rounded-lg border border-[#cbbdad] bg-white px-4 py-3 outline-none focus:border-[#c9343e] focus:ring-2 focus:ring-[#c9343e]/20 dark:border-[#5c4545] dark:bg-[#171313] dark:text-[#f8f0e4]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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