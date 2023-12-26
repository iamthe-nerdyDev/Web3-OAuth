# web3-oauth-lib

🎉 web3-oauth-lib allows you to easily communicate with Web3 OAuth platform.

## Installation

```bash

npm  install  web3-oauth-lib@latest

```

```bash

yarn  add  web3-oauth-lib

```

## Key

You can head over to the developer area to get an access token for your dApp.

**NOTE:** For localhost dApps - i.e; testing purposes, you can use: **xxxx-localhost-key-xxxx** as your access token. As creation of access token for localhost sites is not supported

## Usage

This library is built off [**Thirdweb SDK**](https://thirdweb.com).

All thirdweb hooks can be called from our library as it the building block of our library. To check more of thirdweb, you can check [here](https://portal.thirdweb.com)

```tsx
import {
  Connect,
  OAuthProvider,
  useSessionToken,
  useUserInfo,
} from "web3-oauth-lib";

const App = () => {
  const [token, _] = useSessionToken(); //gets the session token of the logged in user or null

  const userInfo = useUserInfo(); //returns an object of the connected user..

  /**
   * All of thirdweb hooks can still be called all from 'web3-oauth' package
   **/

  return (
    //using our OAuthProvider as a wrapper round your whole application

    <OAuthProvider Thirdweb_ClientID="THIRDWEB_CLIENT_ID">
      <MainApp />
    </OAuthProvider>
  );
};

cont MainApp = () => {
  return (
    <>
      <h1>Welcome frens :-)</h1>
      <Connect accessToken="WEB3_OAUTH_ACCESS_TOKEN" />
    </>
  );
}

export default App;
```

## Demo

[A demo is worth a thousand words](https://github.com/iamthe-nerdyDev/Web3-OAuth/examples)
