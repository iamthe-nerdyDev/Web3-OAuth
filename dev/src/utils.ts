import { ethers } from "ethers";
import { address as contractAddress } from "./contracts/contractAddress.json";
import { abi } from "./contracts/OAuth.json";

const getContract = (_signer: ethers.Signer): ethers.Contract => {
  const Contract = new ethers.Contract(contractAddress, abi, _signer);

  return Contract;
};

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

export const getDApps = async (signer: ethers.Signer) => {
  const Contract = getContract(signer);

  const result = await Contract.getdApps();

  return structureDApps(result);
};

export const registerDApp = async (domain: string, signer: ethers.Signer) => {
  try {
    const Contract = getContract(signer);

    const _tx = await Contract.registerdApp(domain);

    await _tx.wait();

    return Promise.resolve(_tx);
  } catch (e: any) {
    logError(e);
    return Promise.reject(e);
  }
};

export const deleteDApp = async (id: number, signer: ethers.Signer) => {
  try {
    const Contract = getContract(signer);

    const _tx = await Contract.deletedApp(id);

    await _tx.wait();

    return Promise.resolve(_tx);
  } catch (e: any) {
    logError(e);
    return Promise.reject(e);
  }
};

const formatTimestamp = (input: number) => input * 1000 + 1000;

const structureDApps = (dApps: any[]) =>
  dApps
    .map((dApp) => ({
      id: Number(dApp.id),
      domain: dApp.domain,
      accessToken: dApp.accessToken,
      owner: dApp.owner,
      isDeleted: dApp.isDeleted,
      createdAt: formatTimestamp(Number(dApp.createdAt)),
      updatedAt: formatTimestamp(Number(dApp.updatedAt)),
    }))
    .sort((a, b) => b.updatedAt - a.updatedAt);

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
