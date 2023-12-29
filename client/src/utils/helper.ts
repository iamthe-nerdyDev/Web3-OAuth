import { ethers } from "ethers";
import { address as contractAddress } from "../contracts/contractAddress.json";
import { abi } from "../contracts/OAuth.json";
import { ICardParams, ICardStruct, IDAppStruct } from "@/interface";
import axiosInstance from "./axiosInstance";

const logError = (e: any) => console.error("Err:", e);

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

export const getContract = (signer: ethers.Signer): ethers.Contract => {
  return new ethers.Contract(contractAddress, abi, signer);
};

export const getDappsConnectedToCard = async (cardId: number) => {
  try {
    const { data } = await axiosInstance.get(`/dApps-to-cards/${cardId}`);

    return data.data as unknown as IDAppStruct[];
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getUserCards = async (address: string) => {
  try {
    const { data } = await axiosInstance.get(`/user-cards/${address}`);

    return data.data as unknown as ICardStruct[];
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getUserCard = async (cardId: number) => {
  try {
    const { data } = await axiosInstance.get(`/card/${cardId}`);

    return data.data as unknown as ICardStruct;
  } catch (e: any) {
    throw new Error(e);
  }
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

export const updateCard = async (data: ICardParams, signer: ethers.Signer) => {
  try {
    const Contract = getContract(signer);
    const { cardId, username, pfp, emailAddress, bio } = data;

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

export const serializeForm = (form: HTMLFormElement) => {
  const formData: Record<string, string> = {};
  const elements = form.elements;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i] as HTMLInputElement;
    const name = element.name;

    if (name) formData[name] = element.value;
  }

  return formData;
};

export const clearForm = (form: HTMLFormElement) => {
  const formElements = form.elements;

  for (let i = 0; i < formElements.length; i++) {
    const element = formElements[i] as HTMLInputElement;

    if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
      element.value = "";
    }
  }

  return;
};
