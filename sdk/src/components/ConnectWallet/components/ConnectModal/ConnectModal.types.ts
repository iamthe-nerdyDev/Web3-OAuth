import { Dispatch, SetStateAction } from "react";
import { WalletType } from "../../ConnectWallet.types";

export interface IConnectModal {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  showConnectModal: boolean;
  setShowConnectModal: Dispatch<SetStateAction<boolean>>;
  selectedWallet: WalletType | null;
  setSelectedWallet: Dispatch<SetStateAction<WalletType | null>>;
  theme: "light" | "dark";
}
