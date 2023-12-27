import { ethers } from "ethers";

export interface IConfig {
  network: {
    key: string;
    EVM: string;
    NETWORK_TYPE: string;
  };
  server: {
    port: number;
  };
  contract: {
    address: string;
    abi: any;
    Provider: ethers.providers.JsonRpcProvider;
    Contract: ethers.Contract;
    Wallet: ethers.Wallet;
  };
  keys: { deepai: string; freeimage: string };
}

export interface ISignIn {
  cardId: number;
  user: string;
  accessToken: string;
  domain: string;
  message: string;
  signature: string;
}

export interface ICardStruct {
  id: number;
  owner: string;
  username: string;
  pfp: string;
  emailAddress: string;
  bio: string;
  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;
}
