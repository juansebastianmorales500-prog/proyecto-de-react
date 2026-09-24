import { useState } from "react";
import { Camera, UserRound } from "lucide-react";
import fotoPerfilDefault from "../../assets/foto-perfil.svg";

const FOTO_PERFIL_KEY = "fotoPerfil";

function Perfil() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  const [fotoPerfil, setFotoPerfil] = useState(() => localStorage.getItem(FOTO_PERFIL_KEY) || fotoPerfilDefault);

  const handleFotoChange = (event) => {
    const archivo = event.target.files?.[0];

    if (!archivo) return;

    if (!archivo.type.startsWith("image/")) {
      return;
    }

    const lector = new FileReader();

    lector.onload = () => {
      const resultado = String(lector.result || "");
      setFotoPerfil(resultado);
      localStorage.setItem(FOTO_PERFIL_KEY, resultado);
    };

    lector.readAsDataURL(archivo);
  };

  return (
    <main className="min-h-screen bg-[#e8dfcf] px-6 py-12 dark:bg-[#171313]">
      <section className="mx-auto max-w-xl rounded-2xl bg-[#f8f0e4] p-8 text-center shadow-sm dark:bg-[#2b2525]">
        <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-[#c9343e] bg-[#f1e3d2] shadow-md dark:border-[#f7b267] dark:bg-[#3a2f2d]">
          {fotoPerfil ? (
            <img src={fotoPerfil} alt="Foto de perfil" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center">
              <UserRound className="text-[#c9343e]" size={52} />
            </div>
          )}

          <label
            htmlFor="foto-perfil"
            className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#c9343e] text-white shadow-lg transition hover:bg-[#a72a34]"
            title="Cambiar foto de perfil"
          >
            <Camera size={18} />
            <input
              id="foto-perfil"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFotoChange}
            />
          </label>
        </div>

        <h1 className="mt-6 text-2xl font-bold text-[#211d1a] dark:text-[#f8f0e4]">Perfil del investigador</h1>
        <p className="mt-3 text-[#695849] dark:text-[#cbbdad]">{usuario?.usuario || "Usuario"}</p>
        <p className="mt-2 text-sm text-[#7d6858] dark:text-[#dcccb5]">Sube tu foto para personalizar tu perfil.</p>
      </section>
    </main>
  );
}

export default Perfil;
