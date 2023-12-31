import { ConnectWallet } from "@thirdweb-dev/react";

const ConnectBtn = () => {
  return (
    <ConnectWallet modalSize="wide" theme={`dark`} switchToActiveChain={true} />
  );
};

export default ConnectBtn;
