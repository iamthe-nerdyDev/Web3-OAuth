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

import { TelosEvmTestnet } from "@thirdweb-dev/chains";
import StateProvider from "./utils/context/StateProvider.tsx";

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
      activeChain={TelosEvmTestnet}
      supportedChains={[TelosEvmTestnet]}
      autoSwitch={true}
      clientId={CLIENT_ID}
    >
      <StateProvider>
        <App />
      </StateProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);
