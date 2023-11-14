import React from "react";

export interface StateProviderProps {
  children: React.ReactNode;
}

export type Themes = "light" | "dark";

export interface StateContextType {
  theme: Themes;
  setTheme: React.Dispatch<React.SetStateAction<Themes>>;
  isMounting: boolean;
  setIsMounting: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IIcon {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

export interface ICardStruct {
  id: number;
  owner: string;
  username: string;
  pfp: string;
  emailAddress: string;
  bio: string;
  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface IDAppStruct {
  domain: string;
}

export interface ICardParams {
  username: string;
  emailAddress: string;
  pfp: string;
  bio: string;
}
