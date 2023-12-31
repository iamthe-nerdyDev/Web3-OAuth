import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import {
  ThirdwebProvider,
  metamaskWallet,
  rainbowWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";

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

//@ts-ignore
const CLIENT_ID = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

if (!CLIENT_ID) {
  throw new Error(".env variable missing: VITE_THIRDWEB_CLIENT_ID");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider
      supportedWallets={[
        metamaskWallet(),
        rainbowWallet(),
        coinbaseWallet(),
        walletConnect(),
      ]}
      activeChain={customNetwork}
      autoSwitch={true}
      clientId={CLIENT_ID}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
