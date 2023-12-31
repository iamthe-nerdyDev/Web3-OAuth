import { ethers } from "ethers";
import { address as ContractAddress } from "../contract/contractAddress.json";
import { abi as ABI } from "../contract/OAuth.json";
import { useOAuthStore } from "../context/OAuthProvider/OAuthProvider";
import { omit } from "lodash";
import { Card } from "../utils/interface";

function getContract(): ethers.Contract {
  const { signer } = useOAuthStore();

  return new ethers.Contract(ContractAddress, ABI, signer);
}

export async function fetchUserInfoFromToken(token: string) {
  try {
    const Contract = getContract();

    const card: Card = await Contract.fetchUsersInfoFromToken(token);

    return omit(card, "id", "isDeleted");
  } catch (e: any) {
    console.error(e);

    return null;
  }
}

export async function fetchUserInfoFromTokens(tokens: string[]) {
  const Contract = getContract();

  const cards: Card[] = await Contract.fetchUsersInfoFromTokens(tokens);

  return cards.map((card) => omit(card, "id", "isDeleted"));
}
