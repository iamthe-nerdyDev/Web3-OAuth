const { expect } = require("chai");
const { ethers } = require("hardhat");
const { expectRevert } = require("@openzeppelin/test-helpers");

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
  };

  let contract, result, owner, user1, user2;

  beforeEach(async () => {
    [owner, user1, user2] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory("OAuth");
    contract = await Contract.connect(owner).deploy();
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
      result = await contract.getUserCards(owner.address);
      expect(result).to.have.lengthOf(1);

      result = await contract.getUserCard(TEST_DATA.card._id);
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
        "Username must not be empty"
      );

      //empty pfp
      await expectRevert(
        contract.createCard(
          TEST_DATA.card._username,
          "",
          TEST_DATA.card._emailAddress,
          TEST_DATA.card._bio
        ),
        "PFP must not be empty"
      );

      //empty email address
      await expectRevert(
        contract.createCard(TEST_DATA.card._username, TEST_DATA.card._pfp, "", TEST_DATA.card._bio),
        "Email address must not be empty"
      );

      //empty bio
      await expectRevert(
        contract.createCard(
          TEST_DATA.card._username,
          TEST_DATA.card._pfp,
          TEST_DATA.card._emailAddress,
          ""
        ),
        "Bio must not be empty"
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
        "Unauthorized"
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
        "Card not found"
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
      expect(result.emailAddress).to.be.equal(TEST_DATA.update_card._emailAddress);
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
        "Username must not be empty"
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
        "PFP must not be empty"
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
        "Email address must not be empty"
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
        "Bio must not be empty"
      );
    });

    it("Should verify that cards can be deleted!", async () => {
      result = await contract.getUserCards(owner.address);
      expect(result).to.have.lengthOf(1);

      //incase of wrong user
      await expectRevert(contract.connect(user1).deleteCard(TEST_DATA.card._id), "Unauthorized");

      //in case of wrong cardId
      await expectRevert(contract.deleteCard(2), "Card not found");

      await contract.deleteCard(TEST_DATA.card._id);

      result = await contract.getUserCards(owner.address);
      expect(result).to.have.lengthOf(0);

      result = await contract.getUserCard(TEST_DATA.card._id);
      expect(result.isDeleted).to.be.equal(true);
    });
  });
});
