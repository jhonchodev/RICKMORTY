import fetchIntercept from 'fetch-intercept';
import { useState, useEffect } from "react";



export function useCallApiFetchIntercept(apiUrl) {
  // Registra el interceptor globalmente
fetchIntercept.register({
  request: function (url, config) {
    // Modificar la solicitud
    const token = "MENTEE: ANDRES";
    const date = "06/09/2024";

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
      Transaction: `Mentoria: ${date}`,
      Ejemplo: "Interceptando una petición usando fetch-intercept"
    };

    console.log("Interceptando solicitud: ", url);
    return [url, config];
  },

  requestError: function (error) {
    console.log("Interceptando el fallo de la solicitud: ", error);
    return Promise.reject(error);
  },

  response: function (response) {
    // Interceptar la respuesta
    console.log("Interceptando respuesta: ", response);
    return response;
  },

  responseError: function (error) {
    console.log("Interceptando el fallo de la respuesta: ", error);
    return Promise.reject(error);
  },
});

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(apiUrl, {});
        // const response = await fetch("https://cognito-identity.us-east-1.amazonaws.com/", {});
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [apiUrl]);

  return { loading, data, error };
}
