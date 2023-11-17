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
import { Cards, ConnectModal, ConnectedButton } from "./components";
import { Loader } from "./components/utils/icons";
import { ICardsData } from "./components/Cards/Cards.types";
import { useSessionToken } from "../../hooks";

import "./ConnectWallet.css";

const ConnectWallet: React.FC<IConnectWallet> = (props) => {
  const [selectedWallet, setSelectedWallet] = useState<null | WalletType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showConnectModal, setShowConnectModal] = useState<boolean>(false);
  const [isComponentLoading, setIsComponentLoading] = useState<boolean>(false);

  const [userCards, setUserCards] = useState<any[]>([]);
  const [shouldDisplayCards, setShouldDisplayCards] = useState<boolean>(false);
  const [data, setData] = useState<ICardsData>({
    user: null,
    accessToken: null,
    message: null,
    signature: null,
  });

  const address = useAddress();
  const signer = useSigner();
  const disconnect = useDisconnect();
  const walletConfig = useWalletConfig();
  const sessionToken = useSessionToken();

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
          const _response = await triggerSignIn(props.accessToken, address);

          if (!_response) disconnect(); //their identity could not be verified
          else if (typeof _response === "string") {
            localStorage.setItem("web3_oauth_session_token", _response); //the token is returned
          } else {
            setUserCards(_response.data);

            setData({
              user: address,
              accessToken: props.accessToken,
              message: _response.message,
              signature: _response.signature,
            });

            setShouldDisplayCards(true);
          }
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

  useEffect(() => {
    if (!showConnectModal) setIsComponentLoading(false);
  }, [showConnectModal]);

  useEffect(() => {
    if (!shouldDisplayCards) setIsComponentLoading(false);
  }, [shouldDisplayCards]);

  return (
    <React.Fragment>
      <Cards
        data={data}
        cards={userCards}
        shouldDisplayCards={shouldDisplayCards}
        setShouldDisplayCards={setShouldDisplayCards}
      />

      {address === undefined ? (
        <React.Fragment>
          <button
            className={`web3-oauth web3-oauth__connect-btn ${
              preferredTheme === "dark" && "web3-oauth__dark"
            } ${props.className || null}`}
            disabled={isComponentLoading}
            onClick={() => {
              setIsComponentLoading(true);
              setShowConnectModal(true);
            }}
          >
            {isComponentLoading ? (
              <React.Fragment>
                ....
                <Loader />
              </React.Fragment>
            ) : (
              props.btnTitle || (
                <React.Fragment>
                  <span>use</span> Web3-OAuth
                </React.Fragment>
              )
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
      ) : sessionToken === null ? (
        <button
          className={`web3-oauth web3-oauth__connect-btn ${
            preferredTheme === "dark" && "web3-oauth__dark"
          } ${props.className || null}`}
          disabled={isComponentLoading}
          onClick={async () => {
            setIsComponentLoading(true);

            const _response = await triggerSignIn(props.accessToken, address);
            if (!_response) await disconnect();
            else if (typeof _response === "string") {
              localStorage.setItem("web3_oauth_session_token", _response); //the token is returned
            } else {
              setUserCards(_response.data);

              setData({
                user: address!,
                accessToken: props.accessToken,
                message: _response.message,
                signature: _response.signature,
              });

              setShouldDisplayCards(true);
            }
          }}
        >
          {isComponentLoading ? (
            <React.Fragment>
              ....
              <Loader />
            </React.Fragment>
          ) : (
            "Import data"
          )}
        </button>
      ) : (
        <ConnectedButton
          wallet={walletConfig}
          address={address}
          balance={balance}
          disconnect={disconnect}
          theme={preferredTheme}
          accessToken={props.accessToken}
        />
      )}
    </React.Fragment>
  );
};

export default ConnectWallet;
