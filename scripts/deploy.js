//deployment script
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Contract = await hre.ethers.getContractFactory("OAuth");
  const contract = await Contract.deploy();

  await contract.waitForDeployment();

  const address = JSON.stringify({ address: contract.target }, null, 4);

  fs.writeFile(
    "./backend/src/contract/contractAddress.json",
    address,
    "utf-8",
    (err) => {
      if (err) {
        console.error(err);
        return;
      }

      fs.cp(
        "./backend/src/contract",
        "./client/contract",
        { recursive: true },
        (copyErr) => {
          if (copyErr) {
            console.error(copyErr);
          } else {
            console.log(
              "Contents copied from ./backend/src/contract to ./client/contract"
            );
          }
        }
      );
    }
  );

  console.log("Contract address:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
