import React, { useEffect, useState } from "react";
import {
  ConnectWallet,
  useAddress,
  useConnectionStatus,
} from "@thirdweb-dev/react";
import { IConnect } from "./Connect.types";
import { useSessionToken } from "../..";
import "../../dist/main.css";
import { LoadingBtn, SignInBtn } from "./app";
import LoggedInBtn from "./app/LoggedInBtn";

const Connect: React.FC<IConnect> = (props) => {
  const [requiresSignIn, setRequiresSignIn] = useState<boolean | null>(null);

  const connectionStatus = useConnectionStatus();
  const sessionToken = useSessionToken();
  const address = useAddress();

  useEffect(() => {
    if (!sessionToken && connectionStatus === "connected") {
      if (address) setRequiresSignIn(true);
    } else if (sessionToken && connectionStatus === "disconnected") {
      localStorage.removeItem("web3_oauth_session_token");

      setRequiresSignIn(false);
    } else setRequiresSignIn(false);
  }, [connectionStatus, sessionToken, address]);

  const web3_theme = typeof props.theme === "string" ? props.theme : "light";

  return (connectionStatus == "connected" ||
    connectionStatus == "disconnected") &&
    requiresSignIn !== null ? (
    requiresSignIn ? (
      <SignInBtn
        theme={web3_theme}
        accessToken={props.accessToken}
        address={address!}
      />
    ) : (
      <ConnectWallet
        className={`web3-oath__button web3-oauth__button-theme-${web3_theme}`}
        theme={web3_theme}
        detailsBtn={() => {
          return (
            <LoggedInBtn
              connectionStatus={connectionStatus}
              accessToken={props.accessToken}
              address={address!}
              requiresSignIn={requiresSignIn}
              setRequiresSignIn={setRequiresSignIn}
              theme={web3_theme}
            />
          );
        }}
      />
    )
  ) : (
    <LoadingBtn theme={web3_theme} />
  );
};

export default Connect;
