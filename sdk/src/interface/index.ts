import { ReactNode } from "react";

export interface IWeb3OAuthProvider {
  children: ReactNode;
  Thirdweb_ClientID: string;
  autoSwitch: boolean;
}
