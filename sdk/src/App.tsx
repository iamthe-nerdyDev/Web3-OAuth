import { OAuthProvider, ConnectWallet } from "./library";

const App = () => {
  return (
    <OAuthProvider Thirdweb_ClientID="26a58a1975789c445b50cc38b48ad8c0">
      Hello bro
      <ConnectWallet accessToken="xxx-xxx-xxx" />
    </OAuthProvider>
  );
};

export default App;
