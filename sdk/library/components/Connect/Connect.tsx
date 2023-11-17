import React, { useEffect, useState } from "react";
import {
  ConnectWallet,
  useAddress,
  useConnectionStatus,
} from "@thirdweb-dev/react";
import { IConnect, ILoggedInBtn } from "./Connect.types";
import { useSessionToken } from "../..";
import { SignIn } from "../../functions";
import { toast } from "react-toastify";

const Connect: React.FC<IConnect> = (props) => {
  const [requiresSignIn, setRequiresSignIn] = useState<boolean>(false);

  const connectionStatus = useConnectionStatus();
  const sessionToken = useSessionToken();
  const address = useAddress();

  useEffect(() => {
    if (!sessionToken && connectionStatus === "connected") {
      if (address) setRequiresSignIn(true);
    }

    if (sessionToken && connectionStatus === "disconnected") {
      localStorage.removeItem("web3_oauth_session_token");
      setRequiresSignIn(false);
    }
  }, [connectionStatus, sessionToken, address]);

  return (
    <ConnectWallet
      detailsBtn={() => {
        return (
          <LoggedInBtn
            accessToken={props.accessToken}
            address={address!}
            requiresSignIn={requiresSignIn}
            setRequiresSignIn={setRequiresSignIn}
          />
        );
      }}
    />
  );
};

const LoggedInBtn: React.FC<ILoggedInBtn> = (props) => {
  const [cards, setCards] = useState<any[]>([]);

  const triggerSignIn = async () => {
    const _response = await SignIn(props.accessToken, props.address);

    if (typeof _response === "object") {
      if (typeof _response.data === "string") {
        localStorage.setItem("web3_oauth_session_token", _response.data);

        return;
      }

      setCards(_response.data);
      return;
    }

    toast.error("Oops! Unable to complete request");
    return;
  };

  useEffect(() => {
    console.log(cards);
  }, [cards]);

  return props.requiresSignIn ? (
    <button onClick={triggerSignIn}>Sign in</button>
  ) : (
    <button>Logged in user</button>
  );
};

export default Connect;
