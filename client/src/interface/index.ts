import React from "react";

export interface StateProviderProps {
  children: React.ReactNode;
}

export type Themes = "light" | "dark";

export interface StateContextType {
  theme: Themes;
  setTheme: React.Dispatch<React.SetStateAction<Themes>>;
}

export interface IIcon {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}
