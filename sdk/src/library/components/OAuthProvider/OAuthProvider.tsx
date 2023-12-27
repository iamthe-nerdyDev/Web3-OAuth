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

const customNetwork = {
  chainId: 201022,
  networkId: 201022,
  explorers: [
    {
      name: "fonscan",
      url: "https://fonscan.io/",
      standard: "EIP3091",
    },
  ],
  icon: {
    url: "https://iili.io/JRcuTDF.png",
    width: 36,
    height: 36,
    format: "png",
  },
  infoURL: "https://fonchain.io",
  rpc: ["https://fsc-dataseed1.fonscan.io", "https://fsc-dataseed2.fonscan.io"],
  nativeCurrency: {
    decimals: 18,
    name: "FON",
    symbol: "FON",
  },
  shortName: "FSC",
  slug: "fon-smart-chain",
  testnet: false,
  chain: "FON",
  name: "FON Smart Chain",
};

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
