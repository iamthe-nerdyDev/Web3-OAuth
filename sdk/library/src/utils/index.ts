import { ethers } from "ethers";
import { CHAIN_ID } from "./constants";

export function truncateAddress(address?: string) {
  if (!address) return "null";

  const prefixLength = 5;
  const suffixLength = 4;

  if (address.length <= prefixLength + suffixLength) {
    return address;
  }

  const prefix = address.slice(0, prefixLength);
  const suffix = address.slice(-suffixLength);
  const truncated = `${prefix}....${suffix}`;

  return truncated;
}

export async function getInitFields(signer: ethers.Signer) {
  try {
    const address = await signer.getAddress();
    const balance = await signer.getBalance();
    const nonce = await signer.getTransactionCount();
    const chainId = await signer.getChainId();
    const token = localStorage.getItem("web3_oauth_user_token");

    return {
      address,
      balance: ethers.BigNumber.from(balance).toNumber(),
      nonce,
      chainId,
      token: token || undefined,
    };
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function switchToChain() {
  const ethereum = (window as any).ethereum;

  try {
    await ethereum.request("wallet_switchEthereumChain", [
      { chainId: ethers.utils.hexValue(CHAIN_ID) },
    ]);
  } catch (e: any) {
    if (e.code === 4902) await addChain(); //add the chain

    console.error("Error while switching the network:", e);
  }
}

async function addChain() {
  const ethereum = (window as any).ethereum;

  const chainData = {
    chainId: ethers.utils.hexValue(CHAIN_ID),
    chainName: "FON Smart Chain",
    rpcUrls: [
      "https://fsc-dataseed1.fonscan.io",
      "https://fsc-dataseed2.fonscan.io",
    ],
    iconUrls: ["https://iili.io/JRcuTDF.png"],
    nativeCurrency: {
      name: "FON",
      symbol: "FON",
      decimals: 18,
    },
    blockExplorerUrls: ["https://fonscan.io/"],
  };

  try {
    await ethereum.request("wallet_addEthereumChain", [chainData]);

    await switchToChain();
  } catch (e: any) {
    console.error("Error while adding network:", e);
  }
}
