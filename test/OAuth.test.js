//verify it can receive funds and also withdraw it!

const { expect } = require("chai");
const { ethers } = require("hardhat");
const { expectRevert } = require("@openzeppelin/test-helpers");

const JSON_RPC_PROVIDER = "http://localhost:8545";

describe("Contracts", () => {
  const TEST_DATA = {
    card: {
      _id: 1,
      _username: "JohnDoe",
      _pfp: "https://url-to-pfp.com/pfp.png",
      _emailAddress: "user@example.com",
      _bio: "I love my job :-)",
    },
    update_card: {
      _username: "iam_JohnDoe",
      _pfp: "https://url-to-pfp.com/pfp.png-updated",
      _emailAddress: "user.updated@example.com",
      _bio: "I love my job :-) - Updated",
    },
    dapp: {
      _id: 1,
      _domain: "https://my-dapp-url.com",
      _accessToken: "xxxx-xxxx-xxxx",
      _domain_2: "https://my-dapp-url.com-2",
      _accessToken_2: "xxxx-xxxx-xxxx-2",
    },
    update_dapp: {
      _domain: "https://my-dapp-url-updated.com",
    },
    session: {
      _message: "Test message to sign!",
    },
  };

  let provider,
    contract,
    contractAddress,
    result,
    signature,
    owner,
    user1,
    messageHash;

  beforeEach(async () => {
    [owner, user1] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory("OAuth");
    contract = await Contract.connect(owner).deploy("xxxx-test-key-xxxx"); //setting the _defaultToken value

    await contract.waitForDeployment();

    contractAddress = contract.target; //storing the CA
  });

  describe("Card Management", () => {
    beforeEach(async () => {
      await contract.createCard(
        TEST_DATA.card._username,
        TEST_DATA.card._pfp,
        TEST_DATA.card._emailAddress,
        TEST_DATA.card._bio
      );
    });

    it("Should verify that cards can be created successfully!", async () => {
      result = await contract.connect(owner).getUserCards(owner.address);
      expect(result).to.have.lengthOf(1);

      result = await contract.connect(owner).getUserCard(TEST_DATA.card._id);
      expect(result.username).to.be.equal(TEST_DATA.card._username);
      expect(result.pfp).to.be.equal(TEST_DATA.card._pfp);
      expect(result.emailAddress).to.be.equal(TEST_DATA.card._emailAddress);
      expect(result.bio).to.be.equal(TEST_DATA.card._bio);

      //empty username
      await expectRevert(
        contract.createCard(
          "",
          TEST_DATA.card._pfp,
          TEST_DATA.card._emailAddress,
          TEST_DATA.card._bio
        ),
        "username required"
      );

      //empty pfp
      await expectRevert(
        contract.createCard(
          TEST_DATA.card._username,
          "",
          TEST_DATA.card._emailAddress,
          TEST_DATA.card._bio
        ),
        "pfp required"
      );

      //empty email address
      await expectRevert(
        contract.createCard(
          TEST_DATA.card._username,
          TEST_DATA.card._pfp,
          "",
          TEST_DATA.card._bio
        ),
        "email required"
      );

      //empty bio
      await expectRevert(
        contract.createCard(
          TEST_DATA.card._username,
          TEST_DATA.card._pfp,
          TEST_DATA.card._emailAddress,
          ""
        ),
        "bio required"
      );
    });

    it("Should verify that a card can be updated successfully!", async () => {
      //incase of wrong user
      await expectRevert(
        contract
          .connect(user1)
          .updateCard(
            TEST_DATA.card._id,
            TEST_DATA.update_card._username,
            TEST_DATA.update_card._pfp,
            TEST_DATA.update_card._emailAddress,
            TEST_DATA.update_card._bio
          ),
        "unauthorized"
      );

      //in case of wrong cardId
      await expectRevert(
        contract.updateCard(
          2,
          TEST_DATA.update_card._username,
          TEST_DATA.update_card._pfp,
          TEST_DATA.update_card._emailAddress,
          TEST_DATA.update_card._bio
        ),
        "not found"
      );

      result = await contract.updateCard(
        TEST_DATA.card._id,
        TEST_DATA.update_card._username,
        TEST_DATA.update_card._pfp,
        TEST_DATA.update_card._emailAddress,
        TEST_DATA.update_card._bio
      );

      result = await contract.getUserCard(TEST_DATA.card._id);
      expect(result.username).to.be.equal(TEST_DATA.update_card._username);
      expect(result.pfp).to.be.equal(TEST_DATA.update_card._pfp);
      expect(result.emailAddress).to.be.equal(
        TEST_DATA.update_card._emailAddress
      );
      expect(result.bio).to.be.equal(TEST_DATA.update_card._bio);

      //username is empty
      await expectRevert(
        contract.updateCard(
          TEST_DATA.card._id,
          "",
          TEST_DATA.update_card._pfp,
          TEST_DATA.update_card._emailAddress,
          TEST_DATA.update_card._bio
        ),
        "username required"
      );

      //pfp is empty
      await expectRevert(
        contract.updateCard(
          TEST_DATA.card._id,
          TEST_DATA.update_card._username,
          "",
          TEST_DATA.update_card._emailAddress,
          TEST_DATA.update_card._bio
        ),
        "pfp required"
      );

      //email address is empty
      await expectRevert(
        contract.updateCard(
          TEST_DATA.card._id,
          TEST_DATA.update_card._username,
          TEST_DATA.update_card._pfp,
          "",
          TEST_DATA.update_card._bio
        ),
        "email required"
      );

      //bio is empty
      await expectRevert(
        contract.updateCard(
          TEST_DATA.card._id,
          TEST_DATA.update_card._username,
          TEST_DATA.update_card._pfp,
          TEST_DATA.update_card._emailAddress,
          ""
        ),
        "bio required"
      );
    });

    it("Should verify that cards can be deleted!", async () => {
      result = await contract.connect(owner).getUserCards(owner.address);
      expect(result).to.have.lengthOf(1);

      //incase of wrong user
      await expectRevert(
        contract.connect(user1).deleteCard(TEST_DATA.card._id),
        "unauthorized"
      );

      //in case of wrong cardId
      await expectRevert(contract.deleteCard(2), "not found");

      await contract.deleteCard(TEST_DATA.card._id);

      result = await contract.connect(owner).getUserCards(owner.address);
      expect(result).to.have.lengthOf(0);

      result = await contract.connect(owner).getUserCard(TEST_DATA.card._id);
      expect(result.isDeleted).to.be.equal(true);
    });
  });

  describe("Dapp Management", () => {
    beforeEach(async () => {
      await contract.registerDapp(
        TEST_DATA.dapp._domain,
        TEST_DATA.dapp._accessToken
      );
    });

    it("Should verify that dApps can be registered successfully!", async () => {
      result = await contract.getDapps(owner.address);
      expect(result).to.have.lengthOf(1);

      result = await contract.getDapp(TEST_DATA.dapp._id);
      expect(result.id).to.be.equal(TEST_DATA.dapp._id);
      expect(result.domain).to.be.equal(TEST_DATA.dapp._domain);
      expect(result.accessToken).to.be.equal(TEST_DATA.dapp._accessToken);

      //duplicate accessToken
      await expectRevert(
        contract.registerDapp(
          TEST_DATA.dapp._domain_2,
          TEST_DATA.dapp._accessToken
        ),
        "token exist"
      );

      //duplicate domain
      await expectRevert(
        contract.registerDapp(
          TEST_DATA.dapp._domain,
          TEST_DATA.dapp._accessToken_2
        ),
        "domain exist"
      );

      //empty domain
      await expectRevert(
        contract.registerDapp("", TEST_DATA.dapp._accessToken),
        "domain required"
      );

      //empty access token
      await expectRevert(
        contract.registerDapp(TEST_DATA.dapp._domain, ""),
        "token required"
      );
    });

    it("Should verify that a dApp can be modified!", async () => {
      //duplicate domain
      await expectRevert(
        contract.modifyDapp(TEST_DATA.dapp._id, TEST_DATA.dapp._domain),
        "domain exist"
      );

      //incase of wrong user
      await expectRevert(
        contract
          .connect(user1)
          .modifyDapp(TEST_DATA.dapp._id, TEST_DATA.update_dapp._domain),
        "unauthorized"
      );

      //in case of wrong dappId
      await expectRevert(
        contract.modifyDapp(2, TEST_DATA.update_dapp._domain),
        "not found"
      );

      result = await contract.modifyDapp(
        TEST_DATA.dapp._id,
        TEST_DATA.update_dapp._domain
      );

      result = await contract.getDapp(TEST_DATA.dapp._id);
      expect(result.domain).to.be.equal(TEST_DATA.update_dapp._domain);

      //domain is empty
      await expectRevert(
        contract.modifyDapp(TEST_DATA.dapp._id, ""),
        "domain required"
      );
    });

    it("Should verify that dApps can be deleted!", async () => {
      result = await contract.getDapps(owner.address);
      expect(result).to.have.lengthOf(1);

      //in case of wrong dappId
      await expectRevert(contract.deleteDapp(2), "not found");

      //in case of wrong dappId
      await expectRevert(
        contract.connect(user1).deleteDapp(TEST_DATA.dapp._id),
        "unauthorized"
      );

      await contract.deleteDapp(TEST_DATA.dapp._id);

      result = await contract.connect(owner).getDapps(owner.address);
      expect(result).to.have.lengthOf(0);

      result = await contract.connect(owner).getDapp(TEST_DATA.dapp._id);
      expect(result.isDeleted).to.be.equal(true);
    });
  });

  describe("Payments", () => {
    it("Should verify contract can accept payment", async () => {
      const ethersToSend = ethers.parseEther("0.1");

      //transfer..
      const tx = await owner.sendTransaction({
        to: contractAddress,
        value: ethersToSend,
      });

      await tx.wait();

      result = await contract.connect(owner).getBalance();
      expect(ethers.formatUnits(result, "ether")).to.be.equal("0.1");
    });

    it("Should verify that withdrawal can be made", async () => {
      const ethersToSend = ethers.parseEther("0.1");
      const ethersToWithdraw = ethers.parseEther("0.1");

      //trying to withdraw on empty balance...
      await expectRevert(
        contract.connect(owner).withdraw(user1.address, ethersToWithdraw),
        "failed"
      );

      //add ethers now...
      const tx = await owner.sendTransaction({
        to: contractAddress,
        value: ethersToSend,
      });

      await tx.wait();

      //then withdraw...
      await contract.connect(owner).withdraw(user1.address, ethersToWithdraw);

      //checking balance
      result = await contract.connect(owner).getBalance();
      expect(ethers.formatUnits(result, "ether")).to.be.equal("0.0");
    });
  });

  describe("Session Management", () => {
    beforeEach(async () => {
      // register dApp
      await contract.registerDapp(
        TEST_DATA.dapp._domain,
        TEST_DATA.dapp._accessToken
      );

      // create card
      await contract.createCard(
        TEST_DATA.card._username,
        TEST_DATA.card._pfp,
        TEST_DATA.card._emailAddress,
        TEST_DATA.card._bio
      );

      provider = new ethers.JsonRpcProvider(JSON_RPC_PROVIDER);

      messageHash = ethers.solidityPackedKeccak256(
        ["string"],
        [TEST_DATA.session._message]
      );

      signature = await provider.send("personal_sign", [
        messageHash,
        owner.address,
      ]);

      // create session
      await contract
        .connect(owner)
        .createSession(
          TEST_DATA.card._id,
          TEST_DATA.dapp._id,
          owner.address,
          TEST_DATA.session._message,
          signature
        );
    });

    it("Should verify that session tokens can be created successfully!", async () => {
      //check that the session was registered
      result = await contract
        .connect(owner)
        .triggerLogin(
          owner.address,
          TEST_DATA.dapp._id,
          TEST_DATA.session._message,
          signature
        );

      expect(result[0]).to.not.equal(0);
      expect(result[1]).to.have.lengthOf(0);

      //wrong cardId
      await expectRevert(
        contract
          .connect(owner)
          .createSession(
            2,
            TEST_DATA.dapp._id,
            owner.address,
            TEST_DATA.session._message,
            signature
          ),
        "not found"
      );

      //wrong dappId
      await expectRevert(
        contract
          .connect(owner)
          .createSession(
            TEST_DATA.card._id,
            2,
            owner.address,
            TEST_DATA.session._message,
            signature
          ),
        "dApp not found"
      );

      //wrong owner of card
      await expectRevert(
        contract
          .connect(owner)
          .createSession(
            TEST_DATA.card._id,
            TEST_DATA.dapp._id,
            user1.address,
            TEST_DATA.session._message,
            signature
          ),
        "unauthorized"
      );

      //wrong signature, sign with user1 pass owner as the signer
      signature = await provider.send("personal_sign", [
        messageHash,
        user1.address,
      ]);

      await expectRevert(
        contract
          .connect(owner)
          .createSession(
            TEST_DATA.card._id,
            TEST_DATA.dapp._id,
            owner.address,
            TEST_DATA.session._message,
            signature
          ),
        "unable to verify sig"
      );
    });

    it("Should verify that session tokens can be deactivated successfully!", async () => {
      //check that the session was registered
      result = await contract
        .connect(owner)
        .triggerLogin(
          owner.address,
          TEST_DATA.dapp._id,
          TEST_DATA.session._message,
          signature
        );

      expect(result[0]).to.not.equal(
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      );
      expect(result[1]).to.have.lengthOf(0);

      await contract.deactivateSessionFromToken(result[0]);

      result = await contract
        .connect(owner)
        .triggerLogin(
          owner.address,
          TEST_DATA.dapp._id,
          TEST_DATA.session._message,
          signature
        );

      expect(result[0]).to.be.equal(
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      );
    });
  });
});
