import React from "react";
import {
  ThirdwebProvider,
  metamaskWallet,
  trustWallet,
  rainbowWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import { TelosEvmTestnet } from "@thirdweb-dev/chains";
import { IWeb3OAuthProvider } from "./OAuthProvider.types";

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
      activeChain={TelosEvmTestnet}
      supportedChains={[TelosEvmTestnet]}
      clientId={props.Thirdweb_ClientID}
      autoSwitch={props.autoSwitch || true}
      dAppMeta={{
        name: "My App",
        description: "My app description",
        logoUrl: "https://example.com/logo.png",
        url: "https://example.com",
        isDarkMode: true,
      }}
    >
      {props.children}
    </ThirdwebProvider>
  );
};

export default OAuthProvider;
