# Web3 OAuth Library (Powered by Thirdweb)

A react library for **Web OAuth** built on the existing [thirdweb](https://thirdweb.com) library.

## Get Started

```bash

npm install @thirdweb-dev/react @thirdweb-dev/sdk ethers@^5 @thirdweb-dev/chains react-toastify

```

## Usage

After installing all necessary package, you are advised to download the library folder in this directory and include it in your project

```tsx
import React from "react";
import { OAuthProvider } from "path-to-folder/library";

const App = () => {
  return (
    <React.Fragment>
      <OAuthProvider Thirdweb_ClientID="YOUR_THIRDWEB_CLIENT_ID_HERE">
        --app stuffs here
      </OAuthProvider>
    </React.Fragment>
  );
};

export default App;
```

We created a thirdweb provider off the existing one inorder to meet our need.

To manage the connect button use this code:

```tsx
import React from "react";
import { OAuthProvider, Connect } from "path-to-folder/library";

const App = () => {
  return (
    <React.Fragment>
      <OAuthProvider Thirdweb_ClientID="YOUR_THIRDWEB_CLIENT_ID">
        <Connect accessToken="YOUR_WEB3_OAUTH_ACCESS_TOKEN" />
      </OAuthProvider>
    </React.Fragment>
  );
};

export default App;
```

### Hooks

1.  useSessionToken
2.  useUser
3.  Thirdweb available hooks

**useSessionToken**:`<string | null>` - returns the session token or null

```ts
type userStruct = {
  user?: {
    address: string;
    username: string;
    image: string;
    emailAddress: string;
    bio: string;
    createdAt: number;
    updatedAt: number;
  };
  error?: string;
};

type User = {
  user: userStruct | undefined;
  isLoading: boolean;
};
```

**useUser**:`<User>` - returns the signed in user info

## More

For more knowledge, you can check out the thirdweb docs [here](https://portal.thirdweb.com)
