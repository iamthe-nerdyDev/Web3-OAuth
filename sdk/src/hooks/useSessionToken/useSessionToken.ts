import { useState, useEffect } from "react";

type Token = string | undefined;

const useSessionToken = (): Token => {
  const [token, setToken] = useState<Token>(undefined);

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
  }, []);

  return token;
};

export default useSessionToken;
