import { useEffect, useState } from "react";
import StateContext from "./StateContext";
import { StateProviderProps, Themes } from "@/interface";

const StateProvider = ({ children }: StateProviderProps) => {
  const [theme, setTheme] = useState<Themes>("dark");

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
    <StateContext.Provider value={{ theme, setTheme }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
