import { ethers } from "ethers";
import { abi as ABI, address as CA } from "../contract/contract.json";
import axiosInstance from "./axiosInstance";

function getContract(signer?: ethers.Signer): ethers.Contract {
  return new ethers.Contract(CA, ABI, signer);
}

type User = { user: string; token: number; timestamp: number };

async function getAllUsers(signer?: ethers.Signer) {
  const Contract = getContract(signer);

  const result = (await Contract.fetchAll()) as User[];

  if (result.length > 0 && result[0].token == 0) return [];

  return result;
}

export async function getSingleUser(address: string, signer?: ethers.Signer) {
  const Contract = getContract(signer);

  const id = (await Contract.userData(address)) as number;
  if (id == 0) return undefined;

  const data = (await Contract.Data(id)) as User;

  return data;
}

export type Card = {
  id: number;
  owner: string;
  username: string;
  pfp: string;
  email: string;
  bio: string;
  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;
};

export type OrganizedData = Record<string, Card[]>;

function constructData(data: Card[]) {
  if (data.length == 0) return undefined;

  const organizedData: OrganizedData = {};

  data.forEach((item) => {
    const firstLetter = item.username.charAt(0).toUpperCase();

    if (!organizedData[firstLetter]) organizedData[firstLetter] = [];

    organizedData[firstLetter].push(item);
  });

  return organizedData;
}

export async function getUsersCount(signer?: ethers.Signer): Promise<number> {
  const Contract = getContract(signer);

  const count = await Contract.totalData();

  return count ? count - 1 : 0;
}

export async function addUserInfo(token: string, signer?: ethers.Signer) {
  try {
    const Contract = getContract(signer);
    await Contract.addInfo(token);

    return true;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getUserInfo(address: string, signer?: ethers.Signer) {
  try {
    const user = await getSingleUser(address, signer);
    if (!user) throw new Error("not found");

    const { data: res } = await axiosInstance.get(`/user/${user.token}`);

    return res.data as Card;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getUserInfos(signer?: ethers.Signer) {
  try {
    const users = await getAllUsers(signer);
    const tokens: number[] = [];

    users.map((user) => tokens.push(user.token));

    if (tokens.length > 0) {
      const { data: res } = await axiosInstance.post("/user", { tokens });
      const data = res.data as Card[];

      return constructData(data);
    } else return constructData([]);
  } catch (e: any) {
    throw new Error(e);
  }
}
