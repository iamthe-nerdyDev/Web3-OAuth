export interface IConnectWallet {
  btnTitle?: string;
  theme?: "light" | "dark";
  className?: string;
  accessToken: string;
}

export type WalletType =
  | "trust"
  | "metamask"
  | "coinbase"
  | "rainbow"
  | "walletconnect";
