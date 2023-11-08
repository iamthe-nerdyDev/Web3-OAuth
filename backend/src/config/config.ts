import dotenv from "dotenv";
import { IConfig } from "../interface";
import abi from "../contract/contracts/OAuth.sol/OAuth.json";
import address from "../contract/contractAddress.json";
import { ethers } from "ethers";

dotenv.config();

const contractAddress = address.address;
const contractABI = abi.abi;

const EVM = {
  tesnet: "https://tesnet.telos.net/evm",
  mainnet: "https://mainnet.telos.net/evm",
};

const NETWORK_TYPE = process.env.NETWORK_TYPE;
if (!NETWORK_TYPE) throw new Error(".env variable not found: NETWORK_TYPE");

let key: string | null = null;

if (NETWORK_TYPE === "testnet") {
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

if (!key) throw new Error("key not found");

const SERVER_PORT = process.env.SERVER_PORT
  ? parseInt(process.env.SERVER_PORT)
  : 1337;

const evm = "mainnet" ? EVM.mainnet : EVM.tesnet;
const Provider = new ethers.providers.JsonRpcProvider(evm);
const Contract = new ethers.Contract(contractAddress, contractABI, Provider);
const Wallet = new ethers.Wallet(key, Provider);

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
};
