import React from "react";
import { spinnerBlack, spinnerWhite } from "../../../assets";
import { ThemeProps } from "../Connect.types";
import { ButtonImageStyle, ButtonLightStyle, ButtonStyle } from "./Styles";

const LoadingBtn: React.FC<ThemeProps> = (props) => {
  return (
    <button
      style={
        props.theme === "dark"
          ? (ButtonStyle as React.CSSProperties)
          : (ButtonLightStyle as React.CSSProperties)
      }
    >
      {props.theme === "dark" ? (
        <img
          src={spinnerBlack}
          style={ButtonImageStyle as React.CSSProperties}
          alt="loding-black"
        />
      ) : (
        <img
          src={spinnerWhite}
          style={ButtonImageStyle as React.CSSProperties}
          alt="loding-white"
        />
      )}
    </button>
  );
};

export default LoadingBtn;
