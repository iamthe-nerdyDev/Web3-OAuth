//deployment script
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Contract = await hre.ethers.getContractFactory("OAuth");
  const contract = await Contract.deploy("xxxx-localhost-key-xxxx"); //_defaultToken for localhost

  await contract.waitForDeployment();

  const address = JSON.stringify({ address: contract.target }, null, 4);

  fs.writeFile(
    "./artifacts/contracts/contractAddress.json",
    address,
    "utf-8",
    (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log("Contract address:", contract.target);
    }
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
