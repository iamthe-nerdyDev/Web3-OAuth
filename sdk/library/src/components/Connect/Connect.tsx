import React from "react";
import { useOAuthStore } from "../../context/OAuthProvider/OAuthProvider";
import axiosInstance from "../../utils/axiosInstance";
import { AxiosError } from "axios";
import { CHAIN_ID } from "../../utils/constants";
import { switchToChain } from "../../utils";
import { LoggedInBtn, Button, CardSelector } from "./sub-components";

type ComnectProps = {
  theme?: "dark" | "light";
  accessToken: string;
};

const Connect: React.FC<ComnectProps> = (props) => {
  const [displayModal, setDisplayModal] = React.useState<boolean>(false);

  const {
    setAccessToken,
    chainId,
    address,
    connectWallet,
    token,
    signIn,
    cards,
    setTheme,
  } = useOAuthStore();

  React.useEffect(() => setTheme(props.theme || "light"), [props.theme]);

  React.useEffect(() => {
    if (cards) setDisplayModal(true); //display modal if cards is set
    else setDisplayModal(false);
  }, [cards]);

  React.useEffect(() => {
    async function init() {
      setAccessToken(props.accessToken); //setting it in store first...

      try {
        const { data } = await axiosInstance.get("/dApp");

        if (data.data && data.data.accessToken !== `0x${props.accessToken}`) {
          throw new Error("Unable to verify accessToken to domain");
        }
      } catch (e: any) {
        console.error(e);

        if (e && e instanceof AxiosError) {
          if (e.status == 403) throw new Error("Access token missing");
          if (e.status == 400) throw new Error("Unable to verify domain");
          if (e.status == 500) throw new Error("Something went wrong");
        }
      }
    }

    init();
  }, [props.accessToken]);

  return (
    <React.Fragment>
      <CardSelector
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
      />

      {!address ? (
        // connect wallet button
        <Button btnText="Connect Wallet" handleClick={connectWallet} />
      ) : chainId !== CHAIN_ID ? (
        // switch to preferred chain
        <Button btnText="Switch Network" handleClick={switchToChain} />
      ) : !token ? (
        // ask to sign in
        <Button btnText="Sign In" handleClick={signIn} />
      ) : (
        //logged in buttonn
        <LoggedInBtn />
      )}
    </React.Fragment>
  );
};

export default Connect;
