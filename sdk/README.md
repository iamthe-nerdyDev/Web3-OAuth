# web3-oauth

🎉 web3-oauth allows you to easily communicate with Web3 OAuth platform.

## Installation

```bash
npm install web3-oauth@latest
```

```bash
yarn add web3-oauth
```

## Usage

After installing all necessary package, you are advised to download the library folder in this directory and include it in your project

```tsx
import {
  Connect,
  OAuthProvider,
  useSessionToken,
  useUserInfo,
} from "web3-oauth";

const App = () => {
  const [token, _] = useSessionToken(); //gets the session token of the logged in user or null

  const userInfo = useUserInfo(); //returns an object of the connected user..

  /**

* All of thirdweb hooks can still be called all from 'web3-oauth' package

*/

  return (
    //using our OAuthProvider as a wrapper round your whole application

    <OAuthProvider Thirdweb_ClientID="THIRDWEB_CLIENT_ID">
      <Connect accessToken="WEB3_OAUTH_ACCESS_TOKEN" />
    </OAuthProvider>
  );
};

export default App;
```

## Demo

[A demo is worth a thousand words](#)
