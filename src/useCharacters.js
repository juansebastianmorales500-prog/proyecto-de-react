import { useEffect, useState } from "react";

const API_URL = "https://dragonball-api.com/api/characters";

function esperar(milisegundos, signal) {
  return new Promise((resolve, reject) => {
    const temporizador = setTimeout(resolve, milisegundos);
    signal.addEventListener("abort", () => {
      clearTimeout(temporizador);
      const error = new Error("Solicitud cancelada.");
      error.name = "AbortError";
      reject(error);
    }, { once: true });
  });
}

async function consultarApi(url, signal) {
  const maximosIntentos = 3;

  for (let intento = 1; intento <= maximosIntentos; intento += 1) {
    try {
      const respuesta = await fetch(url, { signal });

      if (respuesta.ok) {
        return respuesta.json();
      }

      const puedeReintentar = respuesta.status === 429 || respuesta.status >= 500;
      if (!puedeReintentar || intento === maximosIntentos) {
        if (respuesta.status === 429) {
          throw new Error("La API de Dragon Ball está recibiendo muchas solicitudes. Espera unos segundos e inténtalo de nuevo.");
        }
        throw new Error(`La API de Dragon Ball no pudo cargar los personajes (${respuesta.status}).`);
      }
    } catch (error) {
      if (error.name === "AbortError") {
        throw error;
      }

      if (intento === maximosIntentos) {
        throw new Error("La API de Dragon Ball no está disponible en este momento. Intenta de nuevo en unos segundos.", { cause: error });
      }
    }

    await esperar(800 * intento, signal);
  }

  throw new Error("La API de Dragon Ball no está disponible en este momento. Intenta de nuevo en unos segundos.");
}

export function useCharacters(pagina = 1) {
  const [estado, setEstado] = useState({ personajes: [], cargando: true, error: "", haySiguiente: false, pagina: 0, intento: -1 });
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();

    consultarApi(`${API_URL}?page=${pagina}&limit=12`, controlador.signal)
      .then((resultado) => {
        if (!Array.isArray(resultado.items)) {
          throw new Error("La API de Dragon Ball devolvió una respuesta sin personajes.");
        }

        const personajes = resultado.items.map((character) => ({
          id: character.id,
          name: character.name,
          image: character.image,
          role: character.race || character.gender || "Personaje",
          episodio: character.affiliation || "Dragon Ball",
          race: character.race || "No disponible",
          gender: character.gender || "No disponible",
          ki: character.ki || "No disponible",
          maxKi: character.maxKi || "No disponible",
          description: character.description || "No hay una descripción disponible para este personaje.",
          precio: 25000 + (character.id % 10) * 2500,
        }));
        const paginaActual = resultado.meta?.currentPage ?? pagina;
        const totalPaginas = resultado.meta?.totalPages ?? paginaActual;
        setEstado({ personajes, cargando: false, error: "", haySiguiente: paginaActual < totalPaginas, pagina, intento });
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setEstado({ personajes: [], cargando: false, error: error.message, haySiguiente: false, pagina, intento });
        }
      });

    return () => controlador.abort();
  }, [pagina, intento]);

  return {
    ...estado,
    error: estado.pagina === pagina && estado.intento === intento ? estado.error : "",
    cargando: estado.cargando || estado.pagina !== pagina || estado.intento !== intento,
    recargar: () => setIntento((actual) => actual + 1),
  };
}

