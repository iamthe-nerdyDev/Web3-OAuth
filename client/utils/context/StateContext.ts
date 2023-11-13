import { StateContextType } from "@/interface";
import { createContext } from "react";

const StateContext = createContext<StateContextType | undefined>(undefined);

export default StateContext;
