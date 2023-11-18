import React, { useState } from "react";
import {
  lockWhite,
  lockBlack,
  closeBlack,
  closeWhite,
  spinnerWhite,
} from "../../../dist";
import { ISignInBtn } from "../Connect.types";
import { SignIn, truncateAddress } from "../../../functions";
import { toast } from "react-toastify";
import { Cards } from ".";

const SignInBtn: React.FC<ISignInBtn> = (props) => {
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<any[] | null>(null);

  //....
  const [message, setMessage] = useState<string>("");
  const [signature, setSignature] = useState<string>("");

  const handleOverlayClick = (e: any) => {
    if (e.target.classList.contains("web3-oauth__pre-sign"))
      setDisplayModal(false);
  };

  const triggerSigIn = async (): Promise<void> => {
    if (!props.address) return;

    setIsLoading(true);

    const _response = await SignIn(props.accessToken, props.address);

    if (!_response) toast.error("Oops! unable to complete request");
    else if (typeof _response === "object") {
      if (typeof _response.data === "string") {
        localStorage.setItem("web3_oauth_session_token", _response.data);

        toast.success("Yippe! you are signed in successfully");
      } else {
        setCards(_response.data);
        setMessage(_response.message);
        setSignature(_response.signature);
      }
    }

    setIsLoading(false);
    return;
  };

  return (
    <React.Fragment>
      <Cards cards={cards} message={message} signature={signature} />

      <button
        className={`web3-oath__button web3-oauth__button-theme-${props.theme}`}
        onClick={() => setDisplayModal(true)}
      >
        Sign in&nbsp;
        {props.theme === "light" ? (
          <img src={lockWhite} alt="padlock white" />
        ) : (
          <img src={lockBlack} alt="padlock black" />
        )}
      </button>

      <div
        className={`web3-oauth__pre-sign ${props.theme} ${
          displayModal ? "show" : "hide"
        }`}
        onClick={handleOverlayClick}
      >
        <div className="web3-oauth__pre-sign-box">
          <div className="close" onClick={() => setDisplayModal(false)}>
            {props.theme === "light" ? (
              <img src={closeBlack} alt="close black" />
            ) : (
              <img src={closeWhite} alt="close white" />
            )}
          </div>
          <div className="web3-oauth__pre-sign-box__body">
            <div className="intro">
              <h1>Web3 OAuth</h1>
              <div>
                <p>
                  You are trying to sign in using this address:&nbsp;
                  <span>{truncateAddress(props.address)}</span>
                </p>
                <p>
                  On clicking the <span>proceed</span> button, you will be
                  prompted to sign a <span>safe message hash</span>
                </p>
              </div>
            </div>
            <div className="buttons">
              <button
                className="proceed"
                onClick={triggerSigIn}
                disabled={isLoading}
              >
                {isLoading ? (
                  <img src={spinnerWhite} alt="loading white" />
                ) : (
                  "Proceed"
                )}
              </button>
              <button className="cancel" onClick={() => setDisplayModal(false)}>
                Not interested, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignInBtn;
