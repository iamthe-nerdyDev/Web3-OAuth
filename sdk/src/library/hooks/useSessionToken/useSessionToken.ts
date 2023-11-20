import { useConnectionStatus } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";

const useSessionToken = () => {
  const connectionStatus = useConnectionStatus();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const init = (): void => {
      try {
        const _token = localStorage.getItem("web3_oauth_session_token");

        if (_token) setToken(_token);
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (connectionStatus === "disconnected" && token) {
      localStorage.removeItem("web3_oauth_session_token");
      setToken(null);
    }
  }, [connectionStatus, token]);

  const setNewToken = (newToken: string) => {
    try {
      localStorage.setItem("web3_oauth_session_token", newToken);
      setToken(newToken);
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }

    return;
  };

  return [token, setNewToken] as const;
};

export default useSessionToken;
