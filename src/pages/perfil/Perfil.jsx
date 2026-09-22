import { UserRound } from "lucide-react";

function Perfil() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  return (
    <main className="min-h-screen bg-[#e8dfcf] px-6 py-12 dark:bg-[#171313]">
      <section className="mx-auto max-w-xl rounded-2xl bg-[#f8f0e4] p-8 text-center shadow-sm dark:bg-[#2b2525]">
        <UserRound className="mx-auto text-[#c9343e]" size={48} />
        <h1 className="mt-4 text-2xl font-bold text-[#211d1a] dark:text-[#f8f0e4]">Perfil del investigador</h1>
        <p className="mt-3 text-[#695849] dark:text-[#cbbdad]">{usuario?.usuario || "Usuario"}</p>
      </section>
    </main>
  );
}

export default Perfil;
