import React from "react";
import Swal from "sweetalert2";
import { ethers } from "ethers";
import { CHAIN_ID } from "../../utils/constants";
import { address as ContractAddress } from "../../contract/contractAddress.json";
import { getInitFields } from "../../utils";
import axiosInstance from "../../utils/axiosInstance";
import { Card } from "../../utils/interface";
import { fetchUserInfoFromToken } from "../../functions";

type Theme = "light" | "dark";

type StoreState = {
  isMounting: boolean;
  isLoading: boolean;
  address?: string;
  signer?: ethers.Signer;
  isLoggedIn: boolean;
  balance: number;
  token?: string;
  chainId?: number;
  cards?: Card[];
  user?: Omit<Card, "id" | "isDeleted">;
  accessToken?: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  connectWallet: () => void;
  disconnectWallet: () => void;
  signIn: () => void;
  createSession: (cardId: number) => void;
  deleteToken: () => void;
};

const OAuthContext = React.createContext<StoreState>({
  isMounting: true,
  isLoading: false,
  isLoggedIn: false,
  balance: 0,
  setAccessToken: () => {},
  theme: "light",
  setTheme: () => {},
  connectWallet: () => {},
  disconnectWallet: () => {},
  signIn: () => {},
  createSession: () => {},
  deleteToken: () => {},
});

export const useOAuthStore = () => React.useContext(OAuthContext);

type Props = {
  children?: React.ReactNode;
};

const OAuthProvider = (props: Props) => {
  const [user, setUser] = React.useState<Omit<Card, "id" | "isDeleted">>();
  const [address, setAddress] = React.useState<string>();
  const [signer, setSigner] = React.useState<ethers.Signer>();
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [balance, setBalance] = React.useState<number>(0);
  const [token, setToken] = React.useState<string>();
  const [chainId, setChainId] = React.useState<number>(0);
  const [accessToken, setAccessToken] = React.useState<string>();
  const [isMounting, setIsMounting] = React.useState<boolean>(true);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [theme, setTheme] = React.useState<Theme>("light");
  const [cards, setCards] = React.useState<Card[]>();

  //so as to avoid requesting for signature twice
  const [signature, setSignature] = React.useState<string>();
  const [nonce, setNonce] = React.useState<number>();

  const ethereum = (window as any).ethereum;

  async function populateInitFields() {
    if (typeof ethereum === "undefined") return;

    const Provider = new ethers.providers.Web3Provider(ethereum);
    const Signer = Provider.getSigner();

    setIsLoading(true);

    try {
      const data = await getInitFields(Signer);

      if (data.token) {
        const _user = await fetchUserInfoFromToken(data.token);

        setUser(_user || undefined);
      }

      setSigner(Signer);
      setAddress(data.address);
      setBalance(data.balance);
      setChainId(data.chainId);
      setNonce(data.nonce);
      setToken(data.token);

      setIsLoggedIn(true);
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    async function init() {
      const theme = localStorage.getItem("theme");
      setTheme(!theme ? "light" : theme === "dark" ? "dark" : "light");

      if (typeof ethereum === "undefined") return;

      //request eth_accounts
      const accounts = await ethereum.request({
        method: "eth_accounts",
        params: [],
      });

      if (accounts.length > 0) await populateInitFields();

      setIsMounting(false); //set is mouting to false once everything is done
    }

    init();
  }, []);

  React.useEffect(() => {
    //change event.......
    const handleChainChanged = (chainId: number) => setChainId(chainId);

    async function handleAccountsChanged(accounts: string[]) {
      if (accounts.length > 0 && accounts[0] !== address) {
        await populateInitFields();
      }
    }

    ethereum.on("chainChanged", handleChainChanged);
    ethereum.on("accountsChanged", handleAccountsChanged);

    return function () {
      ethereum.off("chainChanged", handleChainChanged);
      ethereum.off("accountsChanged", handleAccountsChanged);
    };
  }, []);

  async function connectWallet() {
    if (typeof ethereum === "undefined") {
      Swal.fire({
        title: "Wallet not found",
        text: "Operation could not be completed, try using an injected wallet",
        icon: "error",
      });

      return;
    }

    try {
      await ethereum.request({ method: "eth_requestAccounts" });

      await populateInitFields();
    } catch (e: any) {
      console.error(e);
    }
  }

  async function disconnectWallet() {
    if (isLoading) return;

    setIsLoading(true);

    try {
      await ethereum.request({
        method: "wallet_revokePermissions",
        params: [{ eth_accounts: {} }],
      });
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn() {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const _signature = await ethereum.request({
        method: "eth_signTypedData_v4",
        params: [
          address,
          {
            types: {
              EIP712Domain: [
                { name: "name", type: "string" },
                { name: "version", type: "string" },
                { name: "chainId", type: "uint256" },
                { name: "verifyingContract", type: "address" },
              ],
              Message: [{ name: "nonce", type: "uint256" }],
            },
            domain: {
              name: "Web3 OAuth",
              version: "1",
              chainId: CHAIN_ID,
              verifyingContract: ContractAddress,
            },
            Message: { nonce: 0 },
          },
        ],
      });

      const { data } = await axiosInstance.post("/login", {
        signer: address,
        signature: _signature,
        nonce,
      });

      //was it a token that was returned?...
      //it's a countable something that means card(s) was returned
      if (data?.count) {
        setCards(data.data);
        setSignature(_signature);
      } else setToken(data.data); //set the token
    } catch (e: any) {
      Swal.fire({
        title: "Unable to complete request",
        text: "Oops! Operation could not be completed",
        icon: "error",
      });

      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function createSession(cardId: number) {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const { data } = await axiosInstance.post("/login", {
        cardId,
        signer: address,
        signature,
        nonce,
      });

      if (data.status) setToken(data.data);

      setCards(undefined); //to hide the card select modal...
    } catch (e: any) {
      Swal.fire({
        title: "Unable to complete request",
        text: "Oops! Operation could not be completed",
        icon: "error",
      });

      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteToken() {
    if (isLoading) return;

    setIsLoading(true);

    //deletion of token.....
    try {
      const { data } = await axiosInstance.delete(`/session/${token}`);

      if (data.staus) {
        setToken(undefined);

        localStorage.removeItem("web3_oauth_user_token"); //remove it from user token
      }
    } catch (e: any) {
      console.error(e);

      Swal.fire({
        title: "Unable to complete request",
        text: "Oops! Operation could not be completed",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <OAuthContext.Provider
      value={{
        isLoading,
        isMounting,
        address,
        signer,
        isLoggedIn,
        balance,
        token,
        chainId,
        cards,
        user,
        accessToken,
        setAccessToken,
        theme,
        setTheme,
        connectWallet,
        disconnectWallet,
        signIn,
        createSession,
        deleteToken,
      }}
    >
      {props.children}
    </OAuthContext.Provider>
  );
};

export default OAuthProvider;
