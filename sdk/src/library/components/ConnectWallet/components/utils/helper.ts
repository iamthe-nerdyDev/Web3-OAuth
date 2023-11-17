import { ethers } from "ethers";
import axios from "axios";
import { WalletType } from "../../ConnectWallet.types";

const BASE_URL = "https://web3-oauth.onrender.com/v1";

export const getDomain = (): string => {
  if (!window) throw new Error("window not defined!");

  const domain = window.location.hostname;

  if (domain === "localhost") return "*";
  else return domain;
};

export const truncateAddress = (address?: string): string => {
  if (!address) return "null";

  let prefixLength = 5;
  let suffixLength = 4;

  if (address.length <= prefixLength + suffixLength) {
    return address;
  }

  const prefix = address.slice(0, prefixLength);
  const suffix = address.slice(-suffixLength);
  const truncated = `${prefix}....${suffix}`;

  return truncated;
};

export const copyText = (text: string): void => {
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard!");
};

export const destroySession = async (accessToken: string, token: string) => {
  try {
    const domain = getDomain();

    const { data } = await axios.patch(`${BASE_URL}/logout/${token}`, {
      accessToken,
      domain,
    });

    if (data?.status) return true;
  } catch (e) {
    console.error(e);
  }

  return false;
};

export const createSession = async (
  cardId: number,
  accessToken: string,
  address: string,
  message: string,
  signature: string
) => {
  const domain = getDomain();

  try {
    const { data } = await axios.post(`${BASE_URL}/session`, {
      cardId,
      user: address,
      message,
      signature,
      domain,
      accessToken,
    });

    if (data?.status) return data?.token ?? null;
  } catch (e) {
    console.error(e);
  }

  return false;
};

export const triggerSignIn = async (accessToken: string, address?: string) => {
  if (!window.ethereum || !address) return false;

  const messageToSign = `Hello, ${address}! This is a message to sign to ensure you are the real owner of this wallet.`;

  const messageHash = ethers.utils.solidityKeccak256(
    ["string"],
    [messageToSign]
  );

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  try {
    const signature = await provider.send("personal_sign", [
      messageHash,
      address,
    ]);

    const domain = getDomain();

    try {
      const { data } = await axios.post(`${BASE_URL}/login`, {
        user: address,
        message: messageToSign,
        signature,
        domain,
        accessToken,
      });

      if (data?.status) {
        return { message: messageToSign, signature, data: data?.token ?? null };
      }
    } catch (e) {
      console.error(e);
    }
  } catch (e) {
    console.error(e);
  }

  return false;
};

export const isWalletInstalled = (wallet: WalletType): boolean => {
  if (!window.ethereum) return false;

  if (wallet === "metamask" && window.ethereum?.isMetaMask) return true;
  if (wallet === "coinbase" && window.ethereum?.isCoinbaseWallet) return true;
  if (wallet === "trust" && window.ethereum?.isTrustWallet) return true;
  if (wallet === "rainbow" && window.ethereum?.isRainbow) return true;

  return false;
};
