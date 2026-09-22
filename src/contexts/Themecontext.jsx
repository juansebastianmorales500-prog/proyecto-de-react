import { createContext, useContext, useState, useEffect } from "react";

// Crea el contexto que contiene los valores del tema
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(() => localStorage.getItem("tema") || "claro");

  // Cambia de claro a oscuro o de oscuro a claro
  const cambiarTema = () => {
    setTema((actual) =>
      actual === "claro" ? "oscuro" : "claro"
    );
  };

  // Agrega o elimina la clase dark del HTML
  useEffect(() => {
    const root = document.documentElement;

    if (tema === "oscuro") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
    localStorage.setItem("tema", tema);
  }, [tema]);

  return (
    <ThemeContext.Provider value={{ tema, cambiarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext);
}