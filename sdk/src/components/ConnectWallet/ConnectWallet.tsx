//TODO: How card stuffs will work
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
import {
  Logo,
  Close,
  Loader,
  ChevronRight,
  ChevronDown,
  Clipboard,
} from "../../icons";
import { WALLETS } from "../../info";
import axiosInstance from "../axiosInstance";
import { AxiosError } from "axios";

const HandleError = (e: any): void => {
  console.error("Error:", e.message);
  alert(`ERR: ${e.message}`);
};

const HandleNormalError = (e: string): void => {
  console.error("Error:", e);
  alert(`ERR: ${e}`);
};

const HandleAxiosError = (e: AxiosError): void => {
  console.error("Error:", e.message);
  alert(`ERR: ${e.message}`);
};

const trauncateAddress = (address: string): string => {
  return address;
};

const copyText = (text: string): void => {
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard!");
};

const getDomain = (): string => {
  return "google.com";
};

const ConnectWallet = (props: IConnectWallet) => {
  const domain = getDomain();

  const [preferredWallet, setPreferredWallet] = useState<null | WalletType>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayModal, setDisplayModal] = useState<boolean>(false);

  const address = useAddress();
  const signer = useSigner();
  const disconnect = useDisconnect();
  const walletConfig = useWalletConfig();

  const [balance, setBalance] = useState<number>(0); //balance in users wallet

  const preferredTheme = props.theme ?? "dark";

  const [sessionToken, setSessionToken] = useState<null | string>(null);
  const [userCards, setUserCards] = useState<any[] | [] | null>(null);
  const [shouldDisplayCards, setShouldDisplayCards] = useState<boolean>(false);

  //handling the session tokens
  useEffect(() => {
    if (sessionToken) {
      try {
        localStorage.setItem("web3_oauth_session_token", sessionToken);
      } catch (e: any) {
        HandleNormalError("Unable to write to local storage");
      }
    }
  }, [sessionToken]);

  const authorizeUser = async () => {
    if (!window.ethereum || !address) return;

    const messageToSign = `Hello, ${address}! This is a message to sign to ensure you are the real owner of this wallet.`;

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

      try {
        const { data } = await axiosInstance.post("/login", {
          accessToken: props.accessToken,
          user: address,
          message: messageToSign,
          signature,
          domain,
        });

        if (data?.status) {
          if (typeof data?.token === "string") setSessionToken(data.token);
          else setUserCards(data?.token);

          setShouldDisplayCards(true);
        } else HandleNormalError(data?.message ?? "Unable to complete request");

        setPreferredWallet(null);
        setIsLoading(false);
        setDisplayModal(false);
      } catch (e: unknown) {
        if (e && e instanceof AxiosError) {
          HandleAxiosError(e);
        } else {
          HandleError(e);
        }
      }
    } catch (e: any) {
      disconnect(); //if the signature was not done, disconnect user
      HandleError(e);
    }
  };

  const getBalance = async () => {
    if (!address) setBalance(0);

    const balance = await signer?.getBalance();

    setBalance(parseFloat(ethers.utils.formatUnits(balance!, "gwei")) ?? 0);
  };

  useEffect(() => {
    if (address) {
      const _address = async () => {
        if (preferredWallet !== null && isLoading == true) {
          await authorizeUser();
        } else {
          setPreferredWallet(null);
          setIsLoading(false);
          setDisplayModal(false);
        }

        getBalance();
      };

      _address();
    }
  }, [address]);

  return (
    <>
      {address ? (
        <ConnectedButton
          wallet={walletConfig}
          address={address}
          balance={balance}
          disconnect={disconnect}
          theme={preferredTheme}
        />
      ) : (
        <>
          <button
            className={`web3-oauth web3-oauth__connect-btn 
        ${preferredTheme === "dark" && "web3-oauth__dark"}
         ${props.className || null}`}
            onClick={() => setDisplayModal(true)}
          >
            {props.btnTitle || (
              <>
                Connect Wallet <Logo />
              </>
            )}
          </button>
          <ConnectModal
            isLoading={isLoading}
            preferredWallet={preferredWallet}
            setIsLoading={setIsLoading}
            setPreferredWallet={setPreferredWallet}
            displayModal={displayModal}
            setDisplayModal={setDisplayModal}
            theme={preferredTheme}
          />
        </>
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

  const handleOverlayClick = (e: any) => {
    if (e.target.classList.contains("web3-oauth__modal")) {
      props.setDisplayModal(false);
      props.setIsLoading(false);
      props.setPreferredWallet(null);
    }
  };

  return (
    <div
      className={`web3-oauth web3-oauth__modal
      ${props.theme === "dark" && "web3-oauth__dark"}
       ${props.displayModal ? "web3-oauth__show" : "web3-oauth__hide"}`}
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
                props.setDisplayModal(false);
                props.setIsLoading(false);
                props.setPreferredWallet(null);
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
  const [displayLoggedInInfo, setDisplayLoggedInfo] = useState<boolean>(false);

  return !props.address ? (
    <p>--null!</p>
  ) : (
    <div
      className={`web3-oauth web3-oauth__position-relative 
      ${props.theme === "dark" && "web3-oauth__dark"}`}
    >
      <button
        className="web3-oauth__connected-btn"
        onClick={() => setDisplayLoggedInfo(!displayLoggedInInfo)}
      >
        <div>
          <img
            src={props.wallet?.meta.iconURL}
            alt={`${props.wallet?.meta.name} icon`}
          />
          <div>
            <p>{trauncateAddress(props.address)}</p>
            <span>{props.balance.toLocaleString()} TLOS</span>
          </div>
        </div>
        <ChevronDown />
      </button>

      <div
        className={`web3-oauth__connected-wallet-details ${
          displayLoggedInInfo
            ? "connected-wallet-details__show"
            : "connected-wallet-details__hide"
        }`}
      >
        <span className="connection-status">
          <span></span>Connected
        </span>

        <div className="wallet-info">
          <img
            src={props.wallet?.meta.iconURL}
            alt={`${props.wallet?.meta.name} icon`}
          />
          <div>
            <p>
              <span>{trauncateAddress(props.address)}</span>
              <div onClick={() => copyText(props.address!)}>
                <Clipboard />
              </div>
            </p>
            <span>{props.balance.toLocaleString()} TLOS</span>
          </div>
        </div>

        <div className="disconnect-btn" onClick={props.disconnect}>
          Disconnect Wallet
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
