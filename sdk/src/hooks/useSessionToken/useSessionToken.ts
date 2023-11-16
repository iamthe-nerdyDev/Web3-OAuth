import { useState, useEffect } from "react";

type Token = string | null;

const useSessionToken = (): Token => {
  const [token, setToken] = useState<Token>(null);

  useEffect(() => {
    function init() {
      try {
        const _token = localStorage.getItem("web3_oauth_session_token");

        if (_token) setToken(_token);
      } catch (e) {
        console.error(e);
      }
    }

    init();

    const tokenChange = (e: StorageEvent) => {
      if (e.key === "web3_oauth_session_token") setToken(e.newValue);
    };

    window.addEventListener("storage", tokenChange);

    return () => window.removeEventListener("storage", tokenChange);
  }, []);

  return token;
};

export default useSessionToken;
