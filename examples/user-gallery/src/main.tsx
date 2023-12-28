import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { OAuthProvider } from "web3-oauth-lib";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <OAuthProvider
      Thirdweb_ClientID="26a58a1975789c445b50cc38b48ad8c0"
      theme="dark"
    >
      <App />
    </OAuthProvider>
  </React.StrictMode>
);
