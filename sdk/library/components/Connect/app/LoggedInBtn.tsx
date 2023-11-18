import { ILoggedInBtn } from "../Connect.types";

const LoggedInBtn: React.FC<ILoggedInBtn> = (props) => {
  return (
    props.connectionStatus == "connected" &&
    props.requiresSignIn !== null &&
    props.requiresSignIn !== false && (
      <button
        className={`web3-oath__button web3-oauth__button-theme-${props.theme}`}
      >
        Logged in !
      </button>
    )
  );
};

export default LoggedInBtn;
