import { useState, useEffect } from "react";

export function useCallApi(apiUrl) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCharacter() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(apiUrl);
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
