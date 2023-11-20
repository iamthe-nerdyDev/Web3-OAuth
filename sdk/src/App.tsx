import { Connect, OAuthProvider } from "./library";

const App = () => {
  return (
    <OAuthProvider Thirdweb_ClientID="26a58a1975789c445b50cc38b48ad8c0">
      <Connect theme={"light"} accessToken="xxxx-localhost-key-xxxx" />
    </OAuthProvider>
  );
};

export default App;
