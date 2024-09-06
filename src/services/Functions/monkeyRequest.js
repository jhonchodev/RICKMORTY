export const monkeypatchrequest = () => {
  const { fetch: originalFetch } = window;

  window.fetch = async (...args) => {
    let [resource, config] = args;

    // request interceptor starts
    resource = 'https://jsonplaceholder.typicode.com/todos/2';
    // request interceptor ends

    const response = await originalFetch(resource, config);

    // response interceptor here
    return response;
  };
};

export const monkeypatchrequestToken = async () => {
  // Guardamos una referencia a la función fetch original
  const originalFetch = window.fetch;

  // Sobrescribimos fetch para interceptar todas las peticiones
  window.fetch = async function (url, options = {}) {
    // Interceptor de solicitud: añadimos un token de autenticación
    const token = "MENTEE: ANDRES";
    const date = "06/09/2024";
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      Transaction: `Mentoria: ${date}`,
      Ejemplo: "Interceptando una petición usando Monkey Fetch"
    };

    try {
      // Llamamos a la función fetch original con los parámetros modificados
      const response = await originalFetch(url, options);
      return response;

    } catch (error) {
      // Manejo global de errores
      console.error("Error en la petición:", error);
      throw error; // Lanza el error para que pueda ser manejado por quien llame a fetch
    }
  };
};

export const monkeypatchrequestFakeResponse = async () => {
  // Guardamos una referencia a la función fetch original
  const originalFetch = window.fetch;

  // Sobrescribimos fetch para interceptar todas las peticiones
  window.fetch = async function (url, options = {}) {

    try {
      // Llamamos a la función fetch original con los parámetros modificados
      const response = await originalFetch(url, options).then(() => ({
        ok: false,
        status: 401
      }));

      // Interceptor de respuesta: manejar errores, como un 401
      if (!response.ok) {
        if (response.status === 401) {
          console.error("No autorizado, redirigiendo al login...");
        }
        // Puedes manejar otros códigos de estado aquí también
      }

      return response;
    } catch (error) {
      // Manejo global de errores
      console.error("Error en la petición:", error);
      throw error; // Lanza el error para que pueda ser manejado por quien llame a fetch
    }
  };
};
