import { ConnectWalletProps } from "@thirdweb-dev/react";

export interface IConnect extends ConnectWalletProps {
  accessToken: string;
}

export interface ILoggedInBtn {
  accessToken: string;
  address: string;
  requiresSignIn: boolean;
  setRequiresSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}
