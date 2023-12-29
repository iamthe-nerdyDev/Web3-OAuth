import dotenv from "dotenv";
import abi from "../contracts/OAuth.json";
import address from "../contracts/contractAddress.json";
import { ethers } from "ethers";

dotenv.config();

type IConfig = {
  mode: { mode: "prod" | "dev"; isProd: boolean; isDev: boolean };
  network: { pk: string; rpc_url: string };
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
  keys: { deepai?: string; freeimage?: string; alchemy?: string };
};

const contractAddress = address.address;
const contractABI = abi.abi;

const rpc_url = "https://fsc-dataseed1.fonscan.io";

const key = process.env.PRIVATE_KEY;
if (!key) throw new Error(".env variable missing: PRIVATE_KEY");

const mode = process.env.MODE || "dev";
if (mode !== "prod" && mode !== "dev") {
  throw new Error(".env variable `MODE` should be either prod or dev");
}

const SERVER_PORT = process.env.SERVER_PORT
  ? parseInt(process.env.SERVER_PORT)
  : 1337;

const Provider = new ethers.providers.JsonRpcProvider(rpc_url);
const Wallet = new ethers.Wallet(key, Provider);
const Contract = new ethers.Contract(contractAddress, contractABI, Wallet);

export const config: IConfig = {
  mode: { mode, isProd: mode === "prod", isDev: mode === "dev" },
  network: { pk: key, rpc_url },
  server: { port: SERVER_PORT },
  contract: {
    address: contractAddress,
    abi: contractABI,
    Provider,
    Contract,
    Wallet,
  },
  keys: {
    deepai: process.env.DEEPAI_KEY,
    freeimage: process.env.FREEIMAGE_KEY,
    alchemy: process.env.ALCHEMY_KEY,
  },
};
