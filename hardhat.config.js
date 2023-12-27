require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    testnet: {
      url: "#",
      accounts: [process.env.PRIVATE_KEY],
    },
    mainnet: {
      url: "https://fsc-dataseed1.fonscan.io",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  solidity: {
    compilers: [
      { version: "0.8.0" },
      { version: "0.8.20" },
      { version: "0.8.19" },
    ],
  },
  mocha: {
    timeout: 40000,
  },
};
