import { ethers } from "ethers";
import axios from "axios";

const BASE_URL = "https://web3-oauth.onrender.com/v1";

export const getDomain = (): string => {
  if (!window) throw new Error("window not defined!");

  return window.location.hostname;
};

export const SignIn = async (accessToken: string, address: string) => {
  if (!window.ethereum) return false;

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
