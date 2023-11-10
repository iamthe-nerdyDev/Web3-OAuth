const { ethers } = require("hardhat");
const dotenv = require("dotenv");
const ca = "0xf74CA66a274f10C64Eb3271dF268B214C6e32915";
const abi = require("./artifacts/contracts/OAuth.sol/OAuth.json");
const ABI = abi.abi;

dotenv.config();

const Provider = new ethers.JsonRpcProvider("https://testnet.telos.net/evm");

const key = process.env.TESTNET_PRIVATE_KEY;

const Wallet = new ethers.Wallet(key, Provider);
const Contract = new ethers.Contract(ca, ABI, Wallet);

async function main() {
  const tx1 = await Contract.createCard(
    "NerdyDev",
    "https://my-logo.com",
    "momoreoluwaadedeji@gmail.com",
    "I love coding :-)"
  );
  await tx1.wait();

  const tx2 = await Contract.registerDapp("https://google.com", "xxxx-xxxx");
  await tx2.wait();

  const result1 = await Contract.getUserCards(Wallet.address);
  console.log("Cards:", result1);

  const result = await Contract.getDappFromToken("xxxx-xxxx");
  console.log("Result:", result);
}

main();
