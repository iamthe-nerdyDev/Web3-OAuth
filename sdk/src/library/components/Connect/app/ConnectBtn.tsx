import React from "react";
import { ConnectWallet, useSetIsWalletModalOpen } from "@thirdweb-dev/react";
import { IConnectBtn } from "../Connect.types";
import { ButtonLightStyle, ButtonStyle, DisplayNone } from "./Styles";

const ConnectBtn: React.FC<IConnectBtn> = (props) => {
  const setIsWalletModalOpen = useSetIsWalletModalOpen();

  return (
    <React.Fragment>
      <button
        onClick={() => setIsWalletModalOpen(true)}
        style={
          props.theme === "dark"
            ? (ButtonStyle as React.CSSProperties)
            : (ButtonLightStyle as React.CSSProperties)
        }
      >
        Connect Wallet
      </button>

      <ConnectWallet
        style={DisplayNone as React.CSSProperties}
        theme={props.theme}
      />
    </React.Fragment>
  );
};

export default ConnectBtn;
