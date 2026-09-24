import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  function iniciarSesion(e) {
    e.preventDefault();

    let datos;
    try {
      datos = JSON.parse(localStorage.getItem("cuenta_registrada") || "null");
    } catch {
      datos = null;
    }

    if (!datos) {
      setError("Primero debes registrarte.");
      return;
    }

    const emailIngresado = email.trim().toLowerCase();

    if (
      emailIngresado === (datos.email || "").toLowerCase() &&
      password === datos.password
    ) {
      localStorage.setItem("logueado", "true");
      localStorage.setItem(
        "usuario",
        JSON.stringify({
          usuario: datos.usuario || datos.nombre || emailIngresado,
          nombre: datos.nombre || "",
          email: datos.email || emailIngresado,
          password: datos.password || "",
        })
      );
      sessionStorage.removeItem("logueado");

      window.dispatchEvent(new Event("sesion-cambiada"));
      navigate(from, { replace: true });
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e8dfcf] px-6 py-12 dark:bg-[#171313]">
      <form className="flex w-full max-w-md flex-col gap-5 rounded-2xl bg-[#f8f0e4] p-8 shadow-xl ring-1 ring-[#cbbdad] dark:bg-[#2b2525] dark:ring-[#5c4545]" onSubmit={iniciarSesion}>
        <img src="/logo.png" alt="Logo Dragon Ball" className="mx-auto h-24 w-24 rounded-full object-cover" />

        <h2 className="text-center text-2xl font-bold text-[#211d1a] dark:text-[#f8f0e4]">Iniciar sesión</h2>

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

        <button type="submit" className="rounded-lg bg-[#c9343e] px-4 py-3 font-bold text-white transition-colors hover:bg-[#a9232c]">Entrar</button>

        <p className="text-center text-sm text-[#695849] dark:text-[#cbbdad]">
          ¿No tienes cuenta?{" "}
          <Link to="/registro">
            Regístrate aquí
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Login;