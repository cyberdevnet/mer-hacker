import { useEffect, useState, useRef } from "react";

// custom Hook for API keys retrieving

export default function GetApiKey(User) {
  const [error, setError] = useState(null);
  const apikey = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/flask/get-api-key", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: User }),
        });
        const json = await res.json();
        let key = json.apiKey;
        if (apikey.current) {
          apikey.current = key;
          return;
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);
  return { apikey, error };
}
