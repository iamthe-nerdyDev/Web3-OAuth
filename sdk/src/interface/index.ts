import { Dispatch, ReactNode, SetStateAction } from "react";

export type WalletType =
  | "trust"
  | "metamask"
  | "coinbase"
  | "rainbow"
  | "walletconnect";

export interface IWeb3OAuthProvider {
  children: ReactNode;
  Thirdweb_ClientID: string;
  autoSwitch: boolean;
}

export interface IIcon {
  width?: number;
  height?: number;
  fill?: string;
}

export interface IConnectWallet {
  btnTitle?: string;
  theme?: "light" | "dark";
  className?: string;
}

export interface IWalletObj {
  id: WalletType;
  name: string;
  logo: string;
}

export interface IConnectedButton {}

export interface IConnectModal {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  displayModal: boolean;
  setDisplayModal: Dispatch<SetStateAction<boolean>>;
  preferredWallet: WalletType | null;
  setPreferredWallet: Dispatch<SetStateAction<WalletType | null>>;
  theme: string;
}
