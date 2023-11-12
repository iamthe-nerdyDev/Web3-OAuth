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
import {
  IConnectModal,
  IConnectWallet,
  IConnectedButton,
  WalletType,
} from "../../interface";
import { Logo, Close, Loader, ChevronRight } from "../../icons";
import { WALLETS } from "../../info";

const HandleError = (e: any): void => {
  console.error("Error:", e.message);
  alert(`ERR: ${e.message}`);
};

const ConnectWallet = (props: IConnectWallet) => {
  const [preferredWallet, setPreferredWallet] = useState<null | WalletType>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayModal, setDisplayModal] = useState<boolean>(false);

  const address = useAddress();
  const signer = useSigner();
  const disconnect = useDisconnect();
  const walletConfig = useWalletConfig();

  const preferredTheme = props.theme ?? "light";

  const authorizeUser = async () => {
    if (!window.ethereum) return;

    const messageToSign = ``;

    const messageHash = ethers.utils.solidityKeccak256(
      ["string"],
      [messageToSign]
    );

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    try {
      const signature = await provider.send("personal_sign", [
        messageHash,
        address,
      ]);

      //TODO: send to endpoint here..

      setPreferredWallet(null);
      setIsLoading(false);
      setDisplayModal(false);
    } catch (e: any) {
      disconnect(); //if the signature was not done, disconnect user
      HandleError(e);
    }
  };

  useEffect(() => {
    if (address) {
      if (preferredWallet !== null && isLoading == true) {
        authorizeUser();
      } else {
        setPreferredWallet(null);
        setIsLoading(false);
        setDisplayModal(false);
      }
    }
  }, [address]);

  return (
    <>
      <button
        className={`web3-oauth__connect-btn ${props.className || null}`}
        onClick={() => setDisplayModal(true)}
      >
        {props.btnTitle || "Sign in with Web3-OAuth"}
      </button>

      {address ? (
        <ConnectedButton />
      ) : (
        <ConnectModal
          isLoading={isLoading}
          preferredWallet={preferredWallet}
          setIsLoading={setIsLoading}
          setPreferredWallet={setPreferredWallet}
          displayModal={displayModal}
          setDisplayModal={setDisplayModal}
          theme={preferredTheme}
        />
      )}
    </>
  );
};

const ConnectModal = (props: IConnectModal) => {
  const connectWithMetamask = useMetamask();
  const connectWithTrustWallet = useTrustWallet();
  const connectWithCoinbase = useCoinbaseWallet();
  const connectWithRainbowWallet = useRainbowWallet();
  const connectWithWalletConnect = useWalletConnect();

  const chainId = TelosEvmTestnet.chainId;

  const triggerWalletConnect = (wallet: WalletType): void => {
    if (props.isLoading) return;

    props.setPreferredWallet(wallet);

    props.setIsLoading(true);

    if (wallet === "metamask") {
      try {
        connectWithMetamask({ chainId });
      } catch (e: any) {
        HandleError(e);
      }
    }

    if (wallet === "coinbase") {
      try {
        connectWithCoinbase({ chainId });
      } catch (e: any) {
        HandleError(e);
      }
    }

    if (wallet === "rainbow") {
      try {
        connectWithRainbowWallet({ chainId });
      } catch (e: any) {
        HandleError(e);
      }
    }

    if (wallet === "trust") {
      try {
        connectWithTrustWallet({ chainId });
      } catch (e: any) {
        HandleError(e);
      }
    }

    if (wallet === "walletconnect") {
      try {
        connectWithWalletConnect({ chainId });
      } catch (e: any) {
        HandleError(e);
      }
    }
  };

  const isWalletInstalled = (wallet: WalletType): boolean => {
    if (!window.ethereum) return false;

    if (wallet === "metamask" && window.ethereum?.isMetaMask) return true;
    if (wallet === "coinbase" && window.ethereum?.isCoinbaseWallet) return true;
    if (wallet === "trust" && window.ethereum?.isTrustWallet) return true;
    if (wallet === "metamask" && window.ethereum?.isRainbowWallet) return true;

    return false;
  };

  return (
    <div
      className={`web3-oauth web3-oauth__modal ${
        props.displayModal ? "web3-oauth__show" : "web3-oauth__hide"
      }`}
    >
      <div className="web3-oauth__modal-box">
        <div>
          <div className="web3-oauth__modal-header">
            <div className="web3-oauth__modal-header__title">
              <Logo />
              <p> Web3 OAuth</p>
            </div>
            <div className="web3-oauth__modal-close">
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
                  props.isLoading && props.preferredWallet !== wallet.id
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
                {props.isLoading && props.preferredWallet === wallet.id ? (
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

const ConnectedButton = (props: IConnectedButton) => {
  return <div>Welcome </div>;
};

export default ConnectWallet;
