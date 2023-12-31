import { useAddress } from "web3-oauth-main";
import { AnchorLink, ConnectBtn } from ".";

const Welcome = () => {
  const address = useAddress();

  return (
    <div className="container">
      <div className="px-2">
        <div className="welcome-box d-flex flex-column align-items-center justify-content-center text-center">
          <img src="/convo.gif" alt="convo" className="mb-3" />
          <h1 className="mb-2">
            Howdy! Welcome <span>Pal</span>
          </h1>
          <p className="mb-4">
            Just a basic implementation of the Web3 OAuth library and platform.
            Connect your wallet, import the card you will wish to share with the
            platform and that&apos;s all.
          </p>
          <div className="d-flex align-items-center flex-column flex-md-row">
            <ConnectBtn />
            {address && (
              <AnchorLink to={`/user/${address}`}>My Info</AnchorLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
