import {
  useCoinbaseWallet,
  useWalletConnect,
  useMetamask,
  useTrustWallet,
  useRainbowWallet,
  useSigner,
  useWalletConfig,
  useAddress,
  useDisconnect,
} from "@thirdweb-dev/react";
import { TelosEvmTestnet } from "@thirdweb-dev/chains";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

const ConnectWallet = () => {
  const address = useAddress();

  return <div>ConnectWallet</div>;
};

const ConnectModal = () => {
  return <></>;
};

const ConnectedButton = () => {
  return <></>;
};

export default ConnectWallet;
