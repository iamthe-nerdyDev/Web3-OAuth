import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { Logo } from "@/icons";
// @ts-ignore
import Jdenticon from "react-jdenticon";
import { truncateAddress } from "@/utils/helper";
import { useContext } from "react";
import StateContext from "@/utils/context/StateContext";

import "./ConnectBtn.css";
import { Themes } from "@/interface";

const ConnectBtn = ({ className }: { className?: string }) => {
  const { theme } = useContext(StateContext)!;

  return (
    <ConnectWallet
      className={`connect-wallet-btn ${className}`}
      modalSize="wide"
      theme={theme}
      switchToActiveChain={true}
      welcomeScreen={() => {
        return <WelcomeScreen />;
      }}
      detailsBtn={() => {
        return <DetailsBtn theme={theme} />;
      }}
    />
  );
};

const DetailsBtn = ({ theme }: { theme: Themes }) => {
  const address = useAddress() ?? "null";

  return (
    <button className={`connected-wallet ${theme}`}>
      <Jdenticon value={address} />
      <p>{truncateAddress(address)}</p>
    </button>
  );
};

const WelcomeScreen = () => {
  return (
    <div className="welcome-screen">
      <Logo />
      <div>
        <h2>Web3 OAuth</h2>
        <p>Connect your wallet to get started</p>
      </div>
    </div>
  );
};

export default ConnectBtn;
