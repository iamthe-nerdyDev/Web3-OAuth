import { WalletConfig, WalletInstance } from "@thirdweb-dev/react";

export interface IConnectedButton {
  wallet: WalletConfig<WalletInstance> | undefined;
  address: string | undefined;
  balance: number;
  disconnect: () => Promise<void>;
  theme: "light" | "dark";
  accessToken: string;
}
