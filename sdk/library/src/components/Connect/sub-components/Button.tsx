import React from "react";
import { useOAuthStore } from "../../../context/OAuthProvider/OAuthProvider";

type ButtonProps = {
  btnText: string;
  handleClick?: () => void;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { theme, isMounting, isLoading } = useOAuthStore();

  return (
    <div className={theme}>
      <button
        onClick={props.handleClick}
        className="flex min-w-40 items-center justify-center rounded-md bg-black px-7 py-4 text-white dark:bg-white dark:text-black"
      >
        {isLoading || isMounting ? (
          <span className="loader w-7 h-7 border-t-white dark:border-t-black border-t-2"></span>
        ) : (
          <p className="font-bold text-lg">{props.btnText}</p>
        )}
      </button>
    </div>
  );
};

export default Button;
