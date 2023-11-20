import React, { useEffect, useState } from "react";
import { ILoggedInBtn } from "../Connect.types";
import { destroySession, truncateAddress } from "../../../functions";
import {
  useAddress,
  useDisconnect,
  useSigner,
  useWalletConfig,
} from "@thirdweb-dev/react";
import { defaultUserImage, spinnerBlack, spinnerWhite } from "../../../assets";
import { useSessionToken, useUserInfo } from "../../..";
import { LoadingBtn } from ".";
import { ethers } from "ethers";
import {
  ButtonImageStyle,
  ButtonStyle,
  DisabledButton,
  DisplayBlock,
  DisplayNone,
  LoggedInBtnDiv,
  LoggedInBtnHr,
  LoggedInBtnHrDark,
  LoggedInBtnImg,
  LoggedInBtnPrice,
  LoggedInBtnS,
  LoggedInBtnSDark,
  LoggedInInfo,
  LoggedInInfoButtonsDiv,
  LoggedInInfoButtonsDivBtn,
  LoggedInInfoButtonsDivBtn1Dark,
  LoggedInInfoButtonsDivBtn2,
  LoggedInInfoDark,
  LoggedInInfoDiv,
  LoggedInInfoUser,
  LoggedInInfoUserDiv,
  LoggedInInfoUserDivP,
  LoggedInInfoUserImg,
  LoggedInInfoWallet,
  LoggedInInfoWalletDark,
  LoggedInInfoWalletImg,
  LoggedInInfoWalletP,
  PostionRelative,
} from "./Styles";

const LoggedInBtn: React.FC<ILoggedInBtn> = (props) => {
  const walletConfig = useWalletConfig();
  const address = useAddress();
  const userInfo = useUserInfo();
  const disconnect = useDisconnect();
  const signer = useSigner();
  const [token, _] = useSessionToken();

  const [displayBox, setDisplayBox] = useState<boolean>(true);
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      const _balance = await signer?.getBalance();

      setBalance(
        parseFloat(ethers.utils.formatUnits(_balance!, "gwei")) / 10 ** 9 ?? 0
      );
    };

    init();
  }, [signer]);

  const doDestroySession = async (): Promise<void> => {
    setIsLoading(true);

    if (!token || isLoading) return;

    if (
      !confirm(
        "DESTROY SESSION?\n\nAre you sure you really want to do this? To learn more about this, kindly check out https://web3-o-auth.vercel.app/#faqs\n\nIf you are familiar with what you are doing, you may proceed"
      )
    ) {
      setIsLoading(false);
      return;
    }

    const _response = await destroySession(props.accessToken, token);
    if (_response) await disconnect();
    else alert("Oops! unable to complete request");

    setIsLoading(false);

    return;
  };

  return userInfo.isLoading ? (
    <LoadingBtn theme={props.theme} />
  ) : (
    <div style={PostionRelative as React.CSSProperties}>
      <button
        style={
          props.theme === "light"
            ? ({ ...ButtonStyle, ...LoggedInBtnS } as React.CSSProperties)
            : ({
                ...ButtonStyle,
                ...LoggedInBtnS,
                ...LoggedInBtnSDark,
              } as React.CSSProperties)
        }
        className={`web3-oath__button web3-oath__button__signed-in web3-oauth__button-theme-${props.theme}`}
        onClick={() => setDisplayBox(!displayBox)}
      >
        <img
          style={LoggedInBtnImg as React.CSSProperties}
          src={userInfo.user?.image ?? defaultUserImage}
          alt={userInfo.user?.username}
        />
        <hr
          style={
            props.theme === "light"
              ? (LoggedInBtnHr as React.CSSProperties)
              : ({
                  ...LoggedInBtnHr,
                  ...LoggedInBtnHrDark,
                } as React.CSSProperties)
          }
        />
        <div style={LoggedInBtnDiv as React.CSSProperties}>
          <span>{truncateAddress(address)}</span>
          <span style={LoggedInBtnPrice as React.CSSProperties}>
            {balance.toLocaleString()} TLOS
          </span>
        </div>
      </button>

      <div
        className="web3_oauth"
        style={
          props.theme === "light"
            ? displayBox
              ? ({ ...LoggedInInfo, ...DisplayBlock } as React.CSSProperties)
              : ({ ...LoggedInInfo, ...DisplayNone } as React.CSSProperties)
            : displayBox
            ? ({
                ...LoggedInInfo,
                ...LoggedInInfoDark,
                ...DisplayBlock,
              } as React.CSSProperties)
            : ({
                ...LoggedInInfo,
                ...LoggedInInfoDark,
                ...DisplayNone,
              } as React.CSSProperties)
        }
      >
        <div style={LoggedInInfoDiv as React.CSSProperties}>
          <div
            style={
              props.theme === "light"
                ? (LoggedInInfoWallet as React.CSSProperties)
                : ({
                    ...LoggedInInfoWallet,
                    ...LoggedInInfoWalletDark,
                  } as React.CSSProperties)
            }
          >
            <img
              src={walletConfig?.meta.iconURL}
              alt={walletConfig?.meta.name ?? "Wallet"}
              style={LoggedInInfoWalletImg as React.CSSProperties}
            />
            <p style={LoggedInInfoWalletP as React.CSSProperties}>Connected</p>
          </div>

          <div style={LoggedInInfoUser as React.CSSProperties}>
            <img
              style={LoggedInInfoUserImg as React.CSSProperties}
              src={userInfo.user?.image ?? defaultUserImage}
              alt={userInfo.user?.username}
            />

            <div style={LoggedInInfoUserDiv as React.CSSProperties}>
              <h3 style={{ margin: 0, padding: 0 }}>
                {userInfo.user?.username ?? "Deleted Account"}
              </h3>
              <p style={LoggedInInfoUserDivP as React.CSSProperties}>
                {userInfo.user?.emailAddress ?? "unknownn@ltd.com"}
              </p>
            </div>
          </div>

          <div style={LoggedInInfoButtonsDiv as React.CSSProperties}>
            <button
              style={
                props.theme === "light"
                  ? (LoggedInInfoButtonsDivBtn as React.CSSProperties)
                  : ({
                      ...LoggedInInfoButtonsDivBtn,
                      ...LoggedInInfoButtonsDivBtn1Dark,
                    } as React.CSSProperties)
              }
              onClick={disconnect}
            >
              Logout
            </button>
            <button
              onClick={doDestroySession}
              style={
                isLoading
                  ? ({
                      ...LoggedInInfoButtonsDivBtn,
                      ...LoggedInInfoButtonsDivBtn2,
                      ...DisabledButton,
                    } as React.CSSProperties)
                  : ({
                      ...LoggedInInfoButtonsDivBtn,
                      ...LoggedInInfoButtonsDivBtn2,
                    } as React.CSSProperties)
              }
              disabled={isLoading}
            >
              {isLoading ? (
                props.theme === "light" ? (
                  <img
                    style={ButtonImageStyle as React.CSSProperties}
                    src={spinnerBlack}
                  />
                ) : (
                  <img
                    style={ButtonImageStyle as React.CSSProperties}
                    src={spinnerWhite}
                  />
                )
              ) : (
                "Destroy session?"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggedInBtn;
