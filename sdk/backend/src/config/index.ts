import dotenv from "dotenv";
import { IConfig } from "../interface";
import abi from "../contracts/OAuth.json";
import address from "../contracts/contractAddress.json";
import { ethers } from "ethers";

dotenv.config();

const contractAddress = address.address;
const contractABI = abi.abi;

const EVM = {
  localhost: "http://localhost:8545",
  testnet: "#",
  mainnet: "https://fsc-dataseed1.fonscan.io",
};

const NETWORK_TYPE = process.env.NETWORK_TYPE;
if (!NETWORK_TYPE) throw new Error(".env variable not found: NETWORK_TYPE");

let key: string | undefined;

if (NETWORK_TYPE === "testnet") {
  if (EVM.testnet === "#") throw new Error("Invalid testnet RPC URL");

  if (!process.env.TESTNET_PRIVATE_KEY) {
    throw new Error(".env variable not found: TESTNET_PRIVATE_KEY");
  }

  key = process.env.TESTNET_PRIVATE_KEY;
}

if (NETWORK_TYPE === "mainnet") {
  if (!process.env.MAINNET_PRIVATE_KEY) {
    throw new Error(".env variable not found: MAINNET_PRIVATE_KEY");
  }

  key = process.env.MAINNET_PRIVATE_KEY;
}

if (NETWORK_TYPE === "localhost") {
  if (!process.env.LOCALHOST_PRIVATE_KEY) {
    throw new Error(".env variable not found: LOCALHOST_PRIVATE_KEY");
  }

  key = process.env.LOCALHOST_PRIVATE_KEY;
}

if (!key) throw new Error("key not found");

const SERVER_PORT = process.env.SERVER_PORT
  ? parseInt(process.env.SERVER_PORT)
  : 1337;

const evm =
  NETWORK_TYPE == "localhost"
    ? EVM.localhost
    : NETWORK_TYPE == "mainnet"
    ? EVM.mainnet
    : EVM.testnet;

const Provider = new ethers.providers.JsonRpcProvider(evm);
const Wallet = new ethers.Wallet(key, Provider);
const Contract = new ethers.Contract(contractAddress, contractABI, Wallet);

export const config: IConfig = {
  network: {
    key,
    NETWORK_TYPE,
    EVM: evm,
  },
  server: { port: SERVER_PORT },
  contract: {
    address: contractAddress,
    abi: contractABI,
    Provider,
    Contract,
    Wallet,
  },
  keys: {
    deepai: process.env.DEEPAI_KEY ?? "",
    freeimage: process.env.FREEIMAGE_KEY ?? "",
  },
};