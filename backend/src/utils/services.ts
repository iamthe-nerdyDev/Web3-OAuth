import { config } from "../config";
import { ethers } from "ethers";
import { structureCards, structureDApps } from "./helpers";

export function getContract(): ethers.Contract {
  const provider = new ethers.providers.JsonRpcProvider(config.network.rpc_url);

  const Contract = new ethers.Contract(
    config.contract.address,
    config.contract.abi,
    new ethers.Wallet(config.network.pk, provider)
  );

  return Contract;
}

export async function getDappsConnectedToCard(cardId: number) {
  try {
    const Contract = getContract();

    const result = await Contract.getdAppsConnectedToCard(cardId);

    return structureDApps(result);
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getUserCards(address: string) {
  try {
    const Contract = getContract();

    const result = await Contract.getUserCards(address);

    return structureCards(result);
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getCard(cardId: number) {
  try {
    const Contract = getContract();

    const result = await Contract.getCard(cardId);

    return structureCards([result])[0];
  } catch (e: any) {
    throw new Error(e);
  }
}
