import dotenv from "dotenv";
import abi from "../contracts/OAuth.json";
import address from "../contracts/contractAddress.json";
import { ethers } from "ethers";

dotenv.config();

type IConfig = {
  network: { pk: string; rpc_url: string };
  server: { port: number };
  contract: {
    address: string;
    abi: any;
    Provider: ethers.providers.JsonRpcProvider;
    Contract: ethers.Contract;
    Wallet: ethers.Wallet;
  };
};

const contractAddress = address.address;
const contractABI = abi.abi;

const rpc_url = "https://fsc-dataseed1.fonscan.io";

const key = process.env.PRIVATE_KEY;
if (!key) throw new Error(".env variable missing: PRIVATE_KEY");

const SERVER_PORT = process.env.SERVER_PORT
  ? parseInt(process.env.SERVER_PORT)
  : 1338;

const Provider = new ethers.providers.JsonRpcProvider(rpc_url);
const Wallet = new ethers.Wallet(key, Provider);
const Contract = new ethers.Contract(contractAddress, contractABI, Wallet);

export const config: IConfig = {
  network: { pk: key, rpc_url },
  server: { port: SERVER_PORT },
  contract: {
    address: contractAddress,
    abi: contractABI,
    Provider,
    Contract,
    Wallet,
  },
};
