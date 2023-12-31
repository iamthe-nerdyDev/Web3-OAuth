import { useAddress, useSigner } from "@thirdweb-dev/react";
import { AnchorLink, ConnectBtn } from ".";
import { useEffect, useState } from "react";
import { getSingleUser } from "../utils/helper";

const Welcome = () => {
  const address = useAddress();
  const signer = useSigner();

  const [hasInfo, setHasInfo] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function init() {
      if (!address || !signer) return;

      setIsLoading(true);

      const id = await getSingleUser(address, signer);
      console.log(id);
      if (id) setHasInfo(true);

      setIsLoading(false);
    }

    init();
  }, [address, signer]);

  useEffect(() => console.log(isLoading), [isLoading]);

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
            {isLoading ? (
              <span>....</span>
            ) : hasInfo ? (
              <AnchorLink to={`/user/${address}`}>My Info</AnchorLink>
            ) : (
              <a className="text-primary" style={{ cursor: "pointer" }}>
                Add Info
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
