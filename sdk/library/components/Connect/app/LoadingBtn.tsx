import React from "react";
import { spinnerBlack, spinnerWhite } from "../../../dist";
import { ThemeProps } from "../Connect.types";

const LoadingBtn: React.FC<ThemeProps> = (props) => {
  return (
    <button
      className={`web3-oath__button web3-oauth__button-theme-${props.theme}`}
    >
      {props.theme === "dark" ? (
        <img src={spinnerBlack} alt="loding-black" />
      ) : (
        <img src={spinnerWhite} alt="loding-white" />
      )}
    </button>
  );
};

export default LoadingBtn;
