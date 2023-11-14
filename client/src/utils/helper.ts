import { ethers } from "ethers";
import { address as contractAddress } from "../contracts/contractAddress.json";
import { abi } from "../contracts/OAuth.json";
import { ICardParams, ICardStruct, IDAppStruct } from "@/interface";

const logError = (e: any) => {
  console.error("Err:", e);
};

export const redirectTo = (url: string): void => {
  location.href = url;
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

export const getContract = (_signer?: ethers.Signer): ethers.Contract => {
  const RPC_URL = "https://testnet.telos.net/evm";
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

  const Contract = new ethers.Contract(
    contractAddress,
    abi,
    _signer ?? new ethers.Wallet("__KEY HERE___", provider)
  );

  return Contract;
};

export const getDappsConnectedToCard = async (
  address: string,
  cardId: number,
  signer: ethers.Signer
) => {
  const Contract = getContract(signer);

  const result = await Contract.getDappsConnectedToCard(address, cardId);

  return structureDApps(result);
};

export const getUserCards = async (address: string) => {
  const Contract = getContract();

  const result = await Contract.getUserCards(address);

  return structureCards(result);
};

export const getUserCard = async (address: string, signer: ethers.Signer) => {
  const Contract = getContract(signer);

  const result = await Contract.getUserCard(address);

  return structureCards([result])[0];
};

export const createCard = async (data: ICardParams, signer: ethers.Signer) => {
  try {
    const Contract = getContract(signer);
    const { username, pfp, emailAddress, bio } = data;

    const _tx = await Contract.createCard(username, pfp, emailAddress, bio);

    await _tx.wait();

    return Promise.resolve(_tx);
  } catch (e: any) {
    logError(e);
    return Promise.reject(e);
  }
};

export const updateCard = async (
  cardId: number,
  data: ICardParams,
  signer: ethers.Signer
) => {
  if (!signer) return Promise.reject("Signer is required!");

  try {
    const Contract = getContract(signer);
    const { username, pfp, emailAddress, bio } = data;

    const _tx = await Contract.updateCard(
      cardId,
      username,
      pfp,
      emailAddress,
      bio
    );

    await _tx.wait();

    return Promise.resolve(_tx);
  } catch (e: any) {
    logError(e);
    return Promise.reject(e);
  }
};

export const deleteCard = async (cardId: number, signer: ethers.Signer) => {
  if (!signer) return Promise.reject("Signer is required!");

  try {
    const Contract = getContract(signer);

    const _tx = await Contract.deleteCard(cardId);

    await _tx.wait();

    return Promise.resolve(_tx);
  } catch (e: any) {
    logError(e);
    return Promise.reject(e);
  }
};

const structureCards = (cards: any[]): Array<ICardStruct> =>
  cards
    .map((card) => ({
      id: Number(card.id),
      owner: card.owner,
      username: card.username,
      pfp: card.pfp,
      emailAddress: card.emailAddress,
      bio: card.bio,
      isDeleted: card.isDeleted,
      createdAt: Number(card.createdAt),
      updatedAt: Number(card.updatedAt),
    }))
    .sort((a, b) => b.updatedAt - a.updatedAt);

const structureDApps = (dApps: any[]): Array<IDAppStruct> =>
  dApps
    .map((dApp) => ({ domain: dApp.domain }))
    .sort((a, b) => b.domain - a.domain);
