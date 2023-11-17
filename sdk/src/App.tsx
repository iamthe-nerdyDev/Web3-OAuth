import { OAuthProvider, ConnectWallet } from "./library";

const App = () => {
  return (
    <OAuthProvider Thirdweb_ClientID="26a58a1975789c445b50cc38b48ad8c0">
      Hello bro
      <ConnectWallet accessToken="xxxx-localhost-key-xxxx" />
    </OAuthProvider>
  );
};

export default App;
