const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Contracts", () => {
  let contract, contractAddress, result, signature, owner, user1, user2;

  beforeEach(async () => {
    [owner, user1, user2] = await ethers.getSigners();

    /** Deploying the utils library used first... */
    const Utils = await ethers.getContractFactory("Utils");
    const util = await Utils.deploy();

    await util.waitForDeployment();

    /** Deploying the contract */
    const Contract = await ethers.getContractFactory("OAuth", {
      libraries: { Utils: util.target },
    });

    contract = await Contract.connect(owner).deploy();

    await contract.waitForDeployment();

    contractAddress = contract.target; //storing the CA
  });

  describe("Card(s) Management", () => {
    describe("Card Creation", () => {
      it("Should revert if username not passed", async () => {
        await expect(
          contract.createCard("", "pfp_url", "user@domain.ltd", "short bio")
        ).to.be.reverted;
      });

      it("Should revert if pfp not passed", async () => {
        await expect(
          contract.createCard("username", "", "user@domain.ltd", "short bio")
        ).to.be.reverted;
      });

      it("Should revert if email not passed", async () => {
        await expect(
          contract.createCard("username", "pfp_url", "", "short bio")
        ).to.be.reverted;
      });

      it("Should revert if bio not passed", async () => {
        await expect(
          contract.createCard("username", "pfp_url", "user@domain.ltd", "")
        ).to.be.reverted;
      });

      it("Should verify that card can be created successfully!", async () => {
        await contract
          .connect(user1)
          .createCard("username", "pfp_url", "user@domain.ltd", "short bio");

        result = await contract.connect(owner).getUserCards(user1.address);
        expect(result).to.have.lengthOf(1);

        result = await contract.connect(owner).getCard(0);
        expect(result.username).to.be.equal("username");
        expect(result.pfp).to.be.equal("pfp_url");
        expect(result.email).to.be.equal("user@domain.ltd");
        expect(result.bio).to.be.equal("short bio");
      });
    });

    describe("Card Update", () => {
      beforeEach(async () => {
        await contract
          .connect(user1)
          .createCard("username", "pfp_url", "user@domain.ltd", "short bio");
      });

      it("Should revert if username not passed", async () => {
        await expect(
          contract
            .connect(user1)
            .updateCard(0, "", "pfp_url", "user@domain.ltd", "short bio")
        ).to.be.reverted;
      });

      it("Should revert if pfp not passed", async () => {
        await expect(
          contract
            .connect(user1)
            .updateCard(0, "username", "", "user@domain.ltd", "short bio")
        ).to.be.reverted;
      });

      it("Should revert if email not passed", async () => {
        await expect(
          contract
            .connect(user1)
            .updateCard(0, "username", "pfp_url", "", "short bio")
        ).to.be.reverted;
      });

      it("Should revert if bio not passed", async () => {
        await expect(
          contract
            .connect(user1)
            .updateCard(0, "username", "pfp_url", "user@domain.ltd", "")
        ).to.be.reverted;
      });

      it("Should expect a revert if card is not found", async () => {
        await expect(
          contract
            .connect(user1)
            .updateCard(
              100,
              "username",
              "pfp_url",
              "user@domain.ltd",
              "short bio"
            )
        ).to.be.revertedWith("not found");
      });

      it("Should expect a revert if another user tries modifying a card that's not his", async () => {
        await expect(
          contract
            .connect(user2)
            .updateCard(
              0,
              "username",
              "pfp_url",
              "user@domain.ltd",
              "short bio"
            )
        ).to.be.reverted;
      });

      it("Should verify that card can be updated successfully", async () => {
        await contract
          .connect(user1)
          .updateCard(
            0,
            "username-2",
            "pfp_url-2",
            "user@domain.ltd-2",
            "short bio-2"
          );

        result = await contract.connect(owner).getCard(0);
        expect(result.username).to.be.equal("username-2");
        expect(result.pfp).to.be.equal("pfp_url-2");
        expect(result.email).to.be.equal("user@domain.ltd-2");
        expect(result.bio).to.be.equal("short bio-2");
      });
    });

    describe("Card Deletion", () => {
      beforeEach(async () => {
        await contract
          .connect(user1)
          .createCard("username", "pfp_url", "user@domain.ltd", "short bio");
      });

      it("Should expect a revert if card is not found", async () => {
        await expect(
          contract.connect(user1).deleteCard(100)
        ).to.be.revertedWith("not found");
      });

      it("Should expect a revert if another user tries deleting a card that's not his", async () => {
        await expect(contract.connect(user2).deleteCard(0)).to.be.reverted;
      });

      it("Should verify that card can be deleted successfully", async () => {
        await contract.connect(user1).deleteCard(0);

        await expect(contract.connect(owner).getCard(0)).to.be.revertedWith(
          "not found"
        );
      });
    });
  });

  describe("dApp(s) Management", () => {
    describe("dApp Registration", () => {
      it("Should revert if domain is not passed", async () => {
        await expect(contract.registerdApp("")).to.be.revertedWith(
          "domain is required"
        );
      });

      it("Should revert if domain is already registered", async () => {
        //register the first...
        await contract.registerdApp("domain.ltd");

        //trying the second time..
        await expect(contract.registerdApp("domain.ltd")).to.be.revertedWith(
          "dupicate domain entry"
        );
      });

      it("Should revert if domain is localhost", async () => {
        await expect(contract.registerdApp("localhost")).to.be.reverted;
      });

      it("Should register a dApp successfully", async () => {
        await contract.registerdApp("domain.ltd");

        const dAppId = await contract.getdAppIdFromDomain("domain.ltd");

        result = await contract.getdApps();
        expect(result).to.have.lengthOf(1);

        result = await contract.getdApp(dAppId);
        expect(result.domain).to.be.equal("domain.ltd");
      });
    });

    describe("dApp Deletion", () => {
      beforeEach(async () => {
        await contract.connect(user1).registerdApp("domain.ltd");
      });

      it("Should revert if dApp is not found", async () => {
        await expect(contract.deletedApp(100)).to.be.rejectedWith("not found");
      });

      it("Should revert if msg.sender is not owner of dApp/contract owner", async () => {
        const dAppId = await contract.getdAppIdFromDomain("domain.ltd");

        await expect(contract.connect(user2).deletedApp(dAppId)).to.be.rejected;
      });

      it("Should show that contract owner can delete dApp", async () => {
        const dAppId = await contract.getdAppIdFromDomain("domain.ltd");

        await contract.connect(owner).deletedApp(dAppId);

        await expect(
          contract.connect(owner).getdApp(dAppId)
        ).to.be.rejectedWith("not found");
      });

      it("Should show that dApp can be deleted by owner", async () => {
        const dAppId = await contract.getdAppIdFromDomain("domain.ltd");

        await contract.connect(user1).deletedApp(dAppId);

        await expect(
          contract.connect(owner).getdApp(dAppId)
        ).to.be.rejectedWith("not found");
      });
    });
  });

  describe("Token(s) Management", () => {
    describe("Login process", () => {
      beforeEach(async () => {
        await contract.connect(user1).registerdApp("domain.ltd");
      });

      it("Should go well", async () => {
        //first trigger the login....
        // const dAppId = await contract.getdAppIdFromDomain("domain.ltd");
        // const nonce = await user1.getNonce();
        // signature = await user1.signTypedData(
        //   {
        //     name: "Web3 OAuth",
        //     version: "1",
        //     chainId: 201022,
        //     verifyingContract: contractAddress,
        //   },
        //   { Message: [{ name: "nonce", type: "uint256" }] },
        //   { nonce }
        // );
        // result = await contract
        //   .connect(owner)
        //   .triggerLogin(
        //     user1.address,
        //     dAppId,
        //     ethers.toNumber(nonce),
        //     signature
        //   );
        // console.debug("Result:", result);
      });
    });
  });
});
