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

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

//@ts-ignore
const CLIENT_ID = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
