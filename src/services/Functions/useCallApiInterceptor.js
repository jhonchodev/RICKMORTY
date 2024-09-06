import { useState, useEffect } from "react";

const customFetch = (url, options = {}) => {
  // Interceptor de solicitud: añadir cabeceras como un token de autenticación
  const token = "ANDRES";
  const date = "06/09/2024";
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    Transaction: `Mentoria: ${date}`,
    Ejemplo: "Interceptando una petición usando un customFetch"
  };

  return fetch(url, options)
    .then(response => {
      // Interceptor de respuesta: manejar errores
      if (!response.ok) {
        if (response.status === 401) {
          // Manejar error de autorización
          console.error("No autorizado, redirigir al login");
        }
        return Promise.reject(response);
      }
      return response;
    })
    .catch(error => {
      // Manejo global de errores
      console.error("Error en la petición:", error);
      throw error;
    });
};


export function useCallApiWithInterceptor(apiUrl) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCharacter() {
      setLoading(true);
      setError(null);
      try {
        const response = await customFetch(apiUrl);
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchCharacter();
  }, [apiUrl]);
  return { loading, data, error };
}
