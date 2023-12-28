import { Connect } from "web3-oauth-lib";

const ConnectBtn = () => {
  return (
    <>
      <Connect accessToken="xxxx-localhost-key-xxxx" theme={"dark"} />
    </>
  );
};

export default ConnectBtn;
