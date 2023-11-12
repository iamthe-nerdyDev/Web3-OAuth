import {
  ThirdwebProvider,
  metamaskWallet,
  trustWallet,
  rainbowWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import { TelosEvmTestnet } from "@thirdweb-dev/chains";
import { IWeb3OAuthProvider } from "../../interface";

const Web3OAuthProvider = (props: IWeb3OAuthProvider) => {
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
      autoSwitch={props.autoSwitch}
    >
      {props.children}
    </ThirdwebProvider>
  );
};

export default Web3OAuthProvider;
