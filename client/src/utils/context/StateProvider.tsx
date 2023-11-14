import { useEffect, useState } from "react";
import StateContext from "./StateContext";
import { StateProviderProps, Themes } from "@/interface";
import { useConnectionStatus } from "@thirdweb-dev/react";

const StateProvider = ({ children }: StateProviderProps) => {
  const [theme, setTheme] = useState<Themes>("dark");
  const [isMounting, setIsMounting] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const connectionStatus = useConnectionStatus();

  //to control mounting and logged in status
  useEffect(() => {
    if (
      connectionStatus === "connected" ||
      connectionStatus === "disconnected"
    ) {
      if (connectionStatus === "connected") setIsLoggedIn(true);
      if (connectionStatus === "disconnected") setIsLoggedIn(false);

      setTimeout(() => {
        setIsMounting(false);
      }, 2000);
    }
  }, [connectionStatus]);

  //getting current theme
  useEffect(() => {
    const getCurrentTheme = () => {
      try {
        const storedTheme = localStorage.getItem("theme") as Themes | null;
        setTheme(storedTheme ?? "light");
      } catch (e: any) {
        console.error("Unable to get theme:", e);
      }
    };

    getCurrentTheme();
  }, []);

  //updating current theme
  useEffect(() => {
    const updateCurrentTheme = () => {
      try {
        localStorage.setItem("theme", theme);

        //@ts-ignore
        document.querySelector('meta[name="theme-color"]')!.content =
          theme === "light" ? "#fff" : "#000";
      } catch (e: any) {
        console.error("Unable to get theme:", e);
      }
    };

    updateCurrentTheme();
  }, [theme]);

  return (
    <StateContext.Provider
      value={{
        theme,
        setTheme,
        isLoggedIn,
        setIsLoggedIn,
        isMounting,
        setIsMounting,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
