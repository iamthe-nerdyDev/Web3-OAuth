import React, { useEffect, useState } from "react";
import {
  useSigner,
  useWalletConfig,
  useAddress,
  useDisconnect,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { IConnectWallet, WalletType } from "./ConnectWallet.types";
import { triggerSignIn } from "./components/utils/helper";
import { ConnectModal, ConnectedButton } from "./components";
import { Logo } from "./components/utils/icons";
import "./ConnectWallet.css";

const ConnectWallet: React.FC<IConnectWallet> = (props) => {
  const [selectedWallet, setSelectedWallet] = useState<null | WalletType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showConnectModal, setShowConnectModal] = useState<boolean>(false);

  const address = useAddress();
  const signer = useSigner();
  const disconnect = useDisconnect();
  const walletConfig = useWalletConfig();

  const [balance, setBalance] = useState<number>(0);

  const getBalance = async () => {
    if (!address) setBalance(0);

    const balance = await signer?.getBalance();

    setBalance(parseFloat(ethers.utils.formatUnits(balance!, "gwei")) ?? 0);
  };

  useEffect(() => {
    if (address) {
      const _address = async () => {
        if (selectedWallet !== null && isLoading == true) {
          await triggerSignIn(address, props.accessToken);
        } else {
          setSelectedWallet(null);
          setIsLoading(false);
          setShowConnectModal(false);
        }

        getBalance();
      };

      _address();
    }
  }, [address]);

  const preferredTheme = props.theme ?? "dark";

  return (
    <React.Fragment>
      {address ? (
        <ConnectedButton
          wallet={walletConfig}
          address={address}
          balance={balance}
          disconnect={disconnect}
          theme={preferredTheme}
        />
      ) : (
        <React.Fragment>
          <button
            className={`web3-oauth web3-oauth__connect-btn ${
              preferredTheme === "dark" && "web3-oauth__dark"
            } ${props.className || null}`}
            onClick={() => setShowConnectModal(true)}
          >
            {props.btnTitle || (
              <React.Fragment>
                Connect Wallet <Logo />
              </React.Fragment>
            )}
          </button>
          <ConnectModal
            isLoading={isLoading}
            selectedWallet={selectedWallet}
            setIsLoading={setIsLoading}
            setSelectedWallet={setSelectedWallet}
            showConnectModal={showConnectModal}
            setShowConnectModal={setShowConnectModal}
            theme={preferredTheme}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ConnectWallet;
