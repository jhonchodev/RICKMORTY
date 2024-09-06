import { useState, useEffect } from "react";
import { monkeypatchrequest, monkeypatchrequestFakeResponse, monkeypatchrequestToken } from "./monkeyRequest";

export function useCallApi(apiUrl) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  monkeypatchrequest();
  // monkeypatchrequestToken();
  // monkeypatchrequestFakeResponse();
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
