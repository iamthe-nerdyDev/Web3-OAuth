import React from "react";
import { useConnectionStatus } from "@thirdweb-dev/react";
import { IConnect } from "./Connect.types";
import { useSessionToken } from "../..";
import { LoadingBtn, SignInBtn } from "./app";
import LoggedInBtn from "./app/LoggedInBtn";
import ConnectBtn from "./app/ConnectBtn";

const Connect: React.FC<IConnect> = (props) => {
  const connectionStatus = useConnectionStatus();

  const [token, setNewToken] = useSessionToken();

  const web3_theme = typeof props.theme === "string" ? props.theme : "light";

  if (connectionStatus === "connecting" || connectionStatus === "unknown") {
    return <LoadingBtn theme={web3_theme} />;
  }

  if (connectionStatus === "connected" && !token) {
    return (
      <SignInBtn
        theme={web3_theme}
        accessToken={props.accessToken}
        setNewToken={setNewToken}
      />
    );
  }

  if (connectionStatus === "disconnected") {
    return <ConnectBtn theme={web3_theme} className={props.className} />;
  }

  return <LoggedInBtn accessToken={props.accessToken} theme={web3_theme} />;
};

export default Connect;
