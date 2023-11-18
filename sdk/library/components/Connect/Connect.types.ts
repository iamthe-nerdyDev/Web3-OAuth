import { ConnectWalletProps } from "@thirdweb-dev/react";

export interface IConnect extends ConnectWalletProps {
  accessToken: string;
}

export type Theme = "light" | "dark";

export interface ThemeProps {
  theme: Theme;
}

export interface ILoggedInBtn {
  accessToken: string;
  address: string;
  requiresSignIn: boolean | null;
  theme: Theme;
  connectionStatus: "unknown" | "connected" | "disconnected" | "connecting";
  setRequiresSignIn: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export interface ISignInBtn extends ThemeProps {
  accessToken: string;
  address: string;
}

export interface ICardsProps {
  cards: any[] | null;
  message: string;
  signature: string;
}
