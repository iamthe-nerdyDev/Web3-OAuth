import React from "react";
import {
  ThirdwebProvider,
  metamaskWallet,
  trustWallet,
  rainbowWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import { IWeb3OAuthProvider } from "./OAuthProvider.types";
import customNetwork from "../custom-network.json";

const OAuthProvider: React.FC<IWeb3OAuthProvider> = (props) => {
  return (
    <ThirdwebProvider
      supportedWallets={[
        metamaskWallet(),
        trustWallet(),
        rainbowWallet(),
        coinbaseWallet(),
        walletConnect(),
      ]}
      activeChain={customNetwork}
      clientId={props.Thirdweb_ClientID}
      autoSwitch={props.autoSwitch || true}
    >
      {props.children}
    </ThirdwebProvider>
  );
};

export default OAuthProvider;
