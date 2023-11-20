import React, { useState } from "react";
import {
  lockWhite,
  lockBlack,
  closeBlack,
  closeWhite,
  spinnerWhite,
} from "../../../assets";
import { ISignInBtn } from "../Connect.types";
import { SignIn, truncateAddress } from "../../../functions";
import { Cards } from ".";
import { useAddress } from "@thirdweb-dev/react";
import {
  ButtonImageStyle,
  ButtonLightStyle,
  ButtonStyle,
  DisabledButton,
  DisplayBlock,
  DisplayNone,
  PreSignBody,
  PreSignBox,
  PreSignBoxDark,
  PreSignBoxIntro,
  PreSignBoxIntroDiv,
  PreSignBoxIntroP,
  PreSignBoxIntroSpan,
  PreSignBoxIntroSpanDark,
  PreSignButton1,
  PreSignButton2,
  PreSignButton2Dark,
  PreSignButtonsDiv,
  PreSignClose,
  PreSignCloseImage,
  PreSignModal,
} from "./Styles";

const SignInBtn: React.FC<ISignInBtn> = (props) => {
  const address = useAddress();

  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [displayCardModal, setDisplayCardModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<any[] | null>(null);

  //....
  const [message, setMessage] = useState<string>("");
  const [signature, setSignature] = useState<string>("");

  const handleOverlayClick = (e: any) => {
    if (e.target.classList.contains("web3_oauth")) setDisplayModal(false);
  };

  const triggerSigIn = async (): Promise<void> => {
    if (!address) return;

    setIsLoading(true);

    const _response = await SignIn(props.accessToken, address);

    if (!_response) alert("Oops! unable to complete request");
    else if (typeof _response === "object") {
      if (typeof _response.data === "string") {
        props.setNewToken(_response.data);
        setDisplayModal(false);
      } else {
        if (_response.data.length <= 0) {
          alert(
            "No card(s) found, create a card at 'Web3 OAuth' and head back here :-)"
          );
        } else {
          setDisplayModal(false);
          setDisplayCardModal(true);
          setCards(_response.data);
          setMessage(_response.message);
          setSignature(_response.signature);
        }
      }
    }

    setIsLoading(false);

    return;
  };

  return (
    <React.Fragment>
      <Cards
        cards={cards}
        message={message}
        signature={signature}
        accessToken={props.accessToken}
        theme={props.theme}
        displayCardModal={displayCardModal}
        setDisplayCardModal={setDisplayCardModal}
        setNewToken={props.setNewToken}
      />

      <button
        onClick={() => setDisplayModal(true)}
        style={
          props.theme === "dark"
            ? (ButtonStyle as React.CSSProperties)
            : (ButtonLightStyle as React.CSSProperties)
        }
      >
        Sign in&nbsp;
        {props.theme === "light" ? (
          <img
            src={lockWhite}
            alt="padlock white"
            style={ButtonImageStyle as React.CSSProperties}
          />
        ) : (
          <img
            src={lockBlack}
            alt="padlock black"
            style={ButtonImageStyle as React.CSSProperties}
          />
        )}
      </button>

      <div
        style={
          displayModal
            ? ({ ...PreSignModal, ...DisplayBlock } as React.CSSProperties)
            : ({ ...PreSignModal, ...DisplayNone } as React.CSSProperties)
        }
        className="web3_oauth"
        onClick={handleOverlayClick}
      >
        <div
          style={
            props.theme === "light"
              ? (PreSignBox as React.CSSProperties)
              : ({ ...PreSignBox, ...PreSignBoxDark } as React.CSSProperties)
          }
        >
          <div
            style={PreSignClose as React.CSSProperties}
            onClick={() => setDisplayModal(false)}
          >
            {props.theme === "light" ? (
              <img
                src={closeBlack}
                style={PreSignCloseImage as React.CSSProperties}
                alt="close black"
              />
            ) : (
              <img
                src={closeWhite}
                style={PreSignCloseImage as React.CSSProperties}
                alt="close white"
              />
            )}
          </div>
          <div style={PreSignBody as React.CSSProperties}>
            <div style={PreSignBoxIntro as React.CSSProperties}>
              <div style={PreSignBoxIntroDiv as React.CSSProperties}>
                <p style={PreSignBoxIntroP as React.CSSProperties}>
                  You are trying to sign in using this address:&nbsp;
                  <span
                    style={
                      props.theme === "light"
                        ? (PreSignBoxIntroSpan as React.CSSProperties)
                        : ({
                            ...PreSignBoxIntroSpan,
                            ...PreSignBoxIntroSpanDark,
                          } as React.CSSProperties)
                    }
                  >
                    {truncateAddress(address)}
                  </span>
                </p>
                <p style={PreSignBoxIntroP as React.CSSProperties}>
                  On clicking the&nbsp;
                  <span
                    style={
                      props.theme === "light"
                        ? (PreSignBoxIntroSpan as React.CSSProperties)
                        : ({
                            ...PreSignBoxIntroSpan,
                            ...PreSignBoxIntroSpanDark,
                          } as React.CSSProperties)
                    }
                  >
                    proceed
                  </span>
                  &nbsp; button, you will be prompted to sign a&nbsp;
                  <span
                    style={
                      props.theme === "light"
                        ? (PreSignBoxIntroSpan as React.CSSProperties)
                        : ({
                            ...PreSignBoxIntroSpan,
                            ...PreSignBoxIntroSpanDark,
                          } as React.CSSProperties)
                    }
                  >
                    safe message hash
                  </span>
                </p>
              </div>
            </div>
            <div style={PreSignButtonsDiv as React.CSSProperties}>
              <button
                style={
                  isLoading
                    ? ({
                        ...PreSignButton1,
                        ...DisabledButton,
                      } as React.CSSProperties)
                    : (PreSignButton1 as React.CSSProperties)
                }
                onClick={triggerSigIn}
                disabled={isLoading}
              >
                {isLoading ? (
                  <img
                    style={ButtonImageStyle as React.CSSProperties}
                    src={spinnerWhite}
                    alt="loading white"
                  />
                ) : (
                  "Proceed"
                )}
              </button>
              <button
                style={
                  props.theme === "light"
                    ? (PreSignButton2 as React.CSSProperties)
                    : ({
                        ...PreSignButton2,
                        ...PreSignButton2Dark,
                      } as React.CSSProperties)
                }
                onClick={() => setDisplayModal(false)}
              >
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
