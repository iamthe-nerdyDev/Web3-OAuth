const { expect } = require("chai");
const { ethers } = require("hardhat");
const { expectRevert } = require("@openzeppelin/test-helpers");

const TEST_DATA = {
  card: {
    _id: 1,
    _username: "JohnDoe",
    _pfp: "https://url-to-pfp.com/pfp.png",
    _emailAddress: "user@example.com",
    _bio: "I love my job :-)",
  },
};

describe("Contracts", () => {
  let contract, result;

  beforeEach(async () => {
    const Contract = await ethers.getContractFactory("OAuth");
    ;[owner, user1, user2] = await ethers.getSigner();

    contract = await Contract.deploy();
    await contract.deployed();
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
      result = await contract.getUserCards(owner);
      expect(result).to.have.lengthOf(1);

      result = await contract.getUserCard(TEST_DATA.card._id);
      expect(result.username).to.be.equal(TEST_DATA.card._username);
      expect(result.pfp).to.be.equal(TEST_DATA.card._pfp);
      expect(result.emailAddress).to.be.equal(TEST_DATA.card._emailAddress);
      expect(result.bio).to.be.equal(TEST_DATA.card._bio);
    });
  });
});
