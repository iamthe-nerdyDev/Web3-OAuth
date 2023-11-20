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
  theme: Theme;
}

export interface ISignInBtn extends ThemeProps {
  accessToken: string;
  setNewToken: (newToken: string) => void;
}

export interface ICardsProps extends ISignInBtn {
  cards: any[] | null;
  message: string;
  signature: string;
  displayCardModal: boolean;
  setDisplayCardModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IConnectBtn extends ThemeProps {
  className?: string;
}
