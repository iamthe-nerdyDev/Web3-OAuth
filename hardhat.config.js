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
      url: "https://testnet.telos.net/evm",
      accounts: [process.env.TESTNET_PRIVATE_KEY],
    },
    mainnet: {
      url: "https://mainnet.telos.net/evm",
      accounts: [process.env.MAINNET_PRIVATE_KEY],
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
