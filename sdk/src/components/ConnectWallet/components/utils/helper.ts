import { ethers } from "ethers";
import axios from "axios";
import { WalletType } from "../../ConnectWallet.types";

const BASE_URL = "https://web3-oauth.onrender.com/v1";

export function getDomain(): string {
  if (!window) throw new Error("window not defined!");

  const domain = window.location.hostname;

  if (domain === "localhost") return "*";
  else return domain;
}

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

export async function triggerSignIn(
  address: string | undefined,
  accessToken: string
) {
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
      const { data } = await axios.post(
        `${BASE_URL}/login`,
        {
          accessToken,
          user: address,
          message: messageToSign,
          signature,
          domain,
        },
        {
          headers: { cache: "no-store", "Content-Type": "application/json" },
        }
      );

      if (data?.status) return data?.token ?? null;
    } catch (e) {
      console.error(e);
    }
  } catch (e) {
    console.error(e);
  }

  return false;
}

export const isWalletInstalled = (wallet: WalletType): boolean => {
  if (!window.ethereum) return false;

  if (wallet === "metamask" && window.ethereum?.isMetaMask) return true;
  if (wallet === "coinbase" && window.ethereum?.isCoinbaseWallet) return true;
  if (wallet === "trust" && window.ethereum?.isTrustWallet) return true;
  if (wallet === "metamask" && window.ethereum?.isRainbowWallet) return true;

  return false;
};
