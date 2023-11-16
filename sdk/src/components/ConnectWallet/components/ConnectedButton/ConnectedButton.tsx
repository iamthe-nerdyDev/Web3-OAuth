import React, { useState } from "react";
import { IConnectedButton } from "./ConnectedButton.types";
import { ChevronDown, Loader, Clipboard } from "../utils/icons";
import { copyText, truncateAddress } from "../utils/helper";

const ConnectedButton: React.FC<IConnectedButton> = (props) => {
  const [displayLoggedInInfo, setDisplayLoggedInfo] = useState<boolean>(false);

  return !props.address ? (
    <button
      className={`web3-oauth web3-oauth__connect-btn 
        ${props.theme === "dark" && "web3-oauth__dark"}
         `}
    >
      <Loader />
    </button>
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
            <p>{truncateAddress(props.address)}</p>
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
              <span>{truncateAddress(props.address)}</span>
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
        <div className="logout-btn" onClick={props.disconnect}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default ConnectedButton;
