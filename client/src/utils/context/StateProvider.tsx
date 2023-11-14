import StateContext from "./StateContext";
import { StateProviderProps } from "@/interface";

const StateProvider = ({ children }: StateProviderProps) => {
  return <StateContext.Provider value={{}}>{children}</StateContext.Provider>;
};

export default StateProvider;
