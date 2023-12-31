# 1️⃣ Using Web3 OAuth

**Web3 OAuth CA &rarr;**

```
0xfCE8cAAF609F1CD0E7D0F489a2fD474002e2a9B1
```

**NOTE:** Along the line, a react component library will be created to make things easier and deal with direct communication with our endpoint and contract

> **Endpoint:** https://api-web3-oauth.onrender.com

For the purpose of this documentation, we will be making use of axios, you can install it by using any of the following commands

**Using yarn:**

    yarn add axios

**Using npm:**

    npm install axios

# 2️⃣ Authentication

For authentication purposes, your accessToken gotten from you developers dashboard here, will be set as your `Authorization` header and the window.location.hostname of where you are requesting from as the `X-Origin` header

**NOTE:** The accessToken for localhost site is: `1c1a26ad51fa75720666336a9b7af297ab8cf1c78a617a65ba779f143a1a398d`

# 3️⃣ Endpoint Routes

```javascript
type Card = {
  id: number,
  owner: string,
  username: string,
  pfp: string,
  email: string,
  bio: string,
  isDeleted: boolean,
  createdAt: number,
  updatedAt: number,
};
```

1. POST: ${endpoint}/dApp - get's info of the dApp from the accessToken
2. POST: ${endpoint}/login - to trigger the login instance.
   **REQUEST**

```json
"req":{
    "body":{
        "signer": "0x....",
        "nonce": 1,
        "signature": "0x...."
    }
}
```

**SUCCESS RESPONSE**
The response will be in two form. If there is an existing token between the user-and-dApp, the response will be the `Token` otherwise it will return all the user `Card[]`

```json
{
  "status": true,
  "data": "Card[]",
  "count": "data.length"
}
```

or

```json
{
  "status": true,
  "data": "0x.......{token}"
}
```

3. POST: ${endpoint}/session - to create a session token for a particular card-and-dApp
   **REQUEST**

```json
"req":{
    "body":{
        "cardId": 1,
        "signer": "0x....",
        "nonce": 1,
        "signature": "0x...."
    }
}
```

**SUCCESS RESPONSE**

```json
{
  "status": true,
  "data": "0x.......{token}"
}
```

4. DELETE: ${endpoint}/session/:token - deletes an existing session token
   **SUCCESS RESPONSE**

```json
{
  "status": true
}
```

5. GET: ${endpoint}/user/:token - gets user info from the session token
   **SUCCESS RESPONSE**

```json
{
  "status": true,
  "data": "Card"
}
```

6. POST: ${endpoint}/user - gets user info from an array of session tokens
   **REQUEST**

```json
"req":{
    "body":{
        "tokens": ["0x.....", "0x.....", "...."]
    }
}
```

**SUCCESS RESPONSE**

```json
{
  "status": true,
  "data": "Card[]",
  "count": "data.length"
}
```

# 4️⃣ Trying out the '/dApp' route

```javascript
import axios from "axios";

const ACCESS_TOKEN = "1c1a26ad51fa75720666336a9b7af297ab8cf1c78a617a65ba779f143a1a398d";

const  axiosInstance  =  axios.create({
   baseURL: "https://api-web3-oauth.onrender.com",
   headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${ACCESS_TOKEN}`,
      "X-Origin": "localhost"
   }
});

async function getdApp(): Promise<void> {
   try {
      const {data} = await axiosInstance.get("/dApp");

      console.log(data); //log details about the dApp
   } catch (e:any) {
      console.error(e);
   }
}
```

# 5️⃣ Got questions?

Reach out to me directly via telegram: [@NerdyDev](https://t.me/NerdyDev)
