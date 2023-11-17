import React from "react";
import {
  useCoinbaseWallet,
  useWalletConnect,
  useMetamask,
  useTrustWallet,
  useRainbowWallet,
} from "@thirdweb-dev/react";
import { TelosEvmTestnet } from "@thirdweb-dev/chains";
import { IConnectModal } from "./ConnectModal.types";
import { isWalletInstalled } from "../utils/helper";
import { WalletType } from "../../ConnectWallet.types";
import WALLETS from "../utils/wallets";
import { ChevronRight, Close, Loader, Logo } from "../utils/icons";

const logError = (e: any) => {
  const _msg =
    "ERR: Unable to connect wallet\n\nYou can check console for more details";
  alert(_msg);
  console.error(e);
};

const ConnectModal: React.FC<IConnectModal> = (props) => {
  const connectWithMetamask = useMetamask();
  const connectWithTrustWallet = useTrustWallet();
  const connectWithCoinbase = useCoinbaseWallet();
  const connectWithRainbowWallet = useRainbowWallet();
  const connectWithWalletConnect = useWalletConnect();

  const chainId = TelosEvmTestnet.chainId;

  const handleOverlayClick = (e: any) => {
    if (e.target.classList.contains("web3-oauth__modal")) {
      props.setShowConnectModal(false);
      props.setIsLoading(false);
      props.setSelectedWallet(null);
    }
  };

  const triggerWalletConnect = (wallet: WalletType): void => {
    if (props.isLoading) return;

    props.setSelectedWallet(wallet);

    props.setIsLoading(true);

    if (wallet === "metamask") {
      try {
        connectWithMetamask({ chainId });
      } catch (e: any) {
        logError(e);
      }
    }

    if (wallet === "coinbase") {
      try {
        connectWithCoinbase({ chainId });
      } catch (e: any) {
        logError(e);
      }
    }

    if (wallet === "rainbow") {
      try {
        connectWithRainbowWallet({ chainId });
      } catch (e: any) {
        logError(e);
      }
    }

    if (wallet === "trust") {
      try {
        connectWithTrustWallet({ chainId });
      } catch (e: any) {
        logError(e);
      }
    }

    if (wallet === "walletconnect") {
      try {
        connectWithWalletConnect({ chainId });
      } catch (e: any) {
        logError(e);
      }
    }
  };

  return (
    <div
      className={`web3-oauth web3-oauth__modal
      ${props.theme === "dark" && "web3-oauth__dark"}
       ${props.showConnectModal ? "web3-oauth__show" : "web3-oauth__hide"}`}
      onClick={handleOverlayClick}
    >
      <div className="web3-oauth__modal-box">
        <div>
          <div className="web3-oauth__modal-header">
            <div className="web3-oauth__modal-header__title">
              <Logo />
              <p> Web3 OAuth</p>
            </div>
            <div
              className="web3-oauth__modal-close"
              onClick={() => {
                props.setShowConnectModal(false);
                props.setIsLoading(false);
                props.setSelectedWallet(null);
              }}
            >
              <Close />
            </div>
          </div>
          <div className="web3-oauth__intro-text">
            <h3>Choose your wallet</h3>
          </div>
          <div className="web3-oauth__wallets-list">
            {WALLETS.map((wallet, index) => (
              <div
                key={`web3-oauth-wallet-${index}`}
                className={`web3-oauth__wallet-single ${
                  props.isLoading && props.selectedWallet !== wallet.id
                    ? "disabled"
                    : null
                }`}
                onClick={() => triggerWalletConnect(wallet.id)}
              >
                <div>
                  <img src={wallet.logo} alt={`${wallet.name} Icon`} />
                  <div>
                    <h4>{wallet.name}</h4>
                    {isWalletInstalled(wallet.id) && <p>Installed</p>}
                  </div>
                </div>
                {props.isLoading && props.selectedWallet === wallet.id ? (
                  <Loader />
                ) : (
                  <ChevronRight />
                )}
              </div>
            ))}
          </div>
          <div className="web3-oauth__thirdweb">
            <p>
              Powered by&nbsp;
              <a href="https://thirdweb.com" target="_blank">
                <strong>thirdweb</strong>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;
