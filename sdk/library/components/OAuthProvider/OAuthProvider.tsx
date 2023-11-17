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

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
        theme={props.theme || "light"}
      />
      {props.children}
    </ThirdwebProvider>
  );
};

export default OAuthProvider;
