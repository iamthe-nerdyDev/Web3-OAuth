import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { OAuthProvider } from "web3-oauth-main";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <OAuthProvider>
      <App />
    </OAuthProvider>
  </React.StrictMode>
);
