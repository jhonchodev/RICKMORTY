import axios from 'axios';
import { useState, useEffect } from "react";

import { API_ROUTES } from '../../utils/Routes';

// Crear una instancia de Axios
const createAxiosApi = () => {
  const api = axios.create({
    baseURL: API_ROUTES.CHARACTERS_ROUTE,
    timeout: 1000, // Tiempo de espera de la solicitud
  });

  // Interceptor de solicitud
  api.interceptors.request.use(
    (config) => {
      // Modificar la solicitud antes de enviarla
      console.log('Interceptando solicitud: ', config.url);
      const token = "MENTEE: ANDRES";
      const date = "06/09/2024";

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers.Transaction = `Mentoria: ${date}`;
        config.headers.Ejemplo = "Interceptando una petición usando axios";
      }

      // Siempre se debe retornar la configuración (config) modificada o no
      return config;
    },
    (error) => {
      // Manejar errores en la solicitud
      console.error('Error en la solicitud:', error);
      return Promise.reject(error);
    }
  );

  // Interceptor de respuesta
  api.interceptors.response.use(
    (response) => {
      // Modificar la respuesta antes de entregarla al código que llamó
      console.log('Interceptando respuesta: ', response);

      // Aquí puedes realizar alguna transformación de los datos de la respuesta si es necesario
      return response;
    },
    (error) => {
      // Manejar errores en la respuesta
      console.error('Error en la respuesta:', error);

      // Por ejemplo, si es un error 401, podrías redirigir al login
      if (error.response && error.response.status === 401) {
        console.error('No autorizado, redirigiendo...');
        // Aquí podrías redirigir al usuario a la página de login
      }

      return Promise.reject(error);
    }
  );

  return api;
}

// Usando la instancia de Axios con interceptores
export function useCallApiAxiosInterceptor(urlPath) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = createAxiosApi();

  useEffect(() => {
    async function fetchCharacter() {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(urlPath);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchCharacter();
  }, [urlPath]);
  return { loading, data, error };
}


/*
api.interceptors.request.use(authInterceptor);
api.interceptors.request.use(loggingInterceptor);
*/