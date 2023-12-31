// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title CARD Library for Web3 OAuth Contract
 * @dev Provides functions for CRUD operation on Cards
 */
library CARD {
    /// @dev - Card struct
    struct Card {
        uint256 id;
        address owner;
        string username;
        string pfp;
        string email;
        string bio;
        bool isDeleted;
        uint256 createdAt;
        uint256 updatedAt;
    }

    /**
     * @notice Create a new user card
     * @param Cards:            all Cards
     * @param UserCards:        user cards mapping
     * @param DoesCardExist:    mapping to check if card exists
     * @param owner:            msg.sender
     * @param username:         Username
     * @param pfp:              PFP URL
     * @param email:            Email Address
     * @param bio:              Short bio text
     */
    function createCard(
        Card[] storage Cards,
        mapping(address => uint256[]) storage UserCards,
        mapping(uint256 => bool) storage DoesCardExist,
        address owner,
        string memory username,
        string memory pfp,
        string memory email,
        string memory bio
    ) internal {
        uint256 id = Cards.length;

        Cards.push(
            Card(
                id,
                owner,
                username,
                pfp,
                email,
                bio,
                false,
                block.timestamp,
                block.timestamp
            )
        );

        UserCards[owner].push(id);
        DoesCardExist[id] = true;
    }

    /**
     * @notice Updates an exisiting user card
     * @param Cards:            all Cards
     * @param DoesCardExist:    mapping to check if card exists
     * @param owner:            msg.sender
     * @param id:               id of the card
     * @param username:         Username
     * @param pfp:              PFP URL
     * @param email:            Email Address
     * @param bio:              Short bio text
     */
    function updateCard(
        Card[] storage Cards,
        mapping(uint256 => bool) storage DoesCardExist,
        address owner,
        uint256 id,
        string memory username,
        string memory pfp,
        string memory email,
        string memory bio
    ) internal {
        require(DoesCardExist[id], "not found");
        require(Cards[id].owner == owner);

        Card storage card = Cards[id];

        card.username = username;
        card.pfp = pfp;
        card.email = email;
        card.bio = bio;
        card.updatedAt = block.timestamp;
    }

    /**
     * @notice Deletes an existing card
     * @param Cards:            all Cards
     * @param DoesCardExist:    mapping to check if card exists
     * @param owner:            msg.sender
     * @param id:               id of card to delete
     */
    function deleteCard(
        Card[] storage Cards,
        mapping(uint256 => bool) storage DoesCardExist,
        address owner,
        uint256 id
    ) internal {
        require(DoesCardExist[id], "not found");
        require(Cards[id].owner == owner);

        Card storage card = Cards[id];

        card.isDeleted = true;
        card.updatedAt = block.timestamp;

        DoesCardExist[id] = false;
    }

    /**
     * @notice Gets card details
     * @param Cards:            all Cards
     * @param cardId:           id of card
     * @return Card
     */
    function getCard(
        Card[] storage Cards,
        uint256 cardId
    ) internal view returns (Card memory) {
        return Cards[cardId];
    }

    /**
     * @notice Gets all cards of a user
     * @param Cards:            all Cards
     * @param UserCards:        user cards mapping
     * @param DoesCardExist:    mapping to check if card exists
     * @param user:             user cards to fetch
     * @return Cardd[]
     */
    function getUserCards(
        Card[] storage Cards,
        mapping(address => uint256[]) storage UserCards,
        mapping(uint256 => bool) storage DoesCardExist,
        address user
    ) internal view returns (Card[] memory) {
        uint256[] storage cardsId = UserCards[user];

        uint256 available;

        for (uint256 i = 0; i < cardsId.length; i++) {
            if (DoesCardExist[cardsId[i]]) available++;
        }

        Card[] memory cards = new Card[](available);

        uint256 index;

        for (uint256 i = 0; i < cardsId.length; i++) {
            uint256 cardId = cardsId[i];

            if (DoesCardExist[cardId]) {
                cards[index] = Cards[cardId];
                index++;
            }
        }

        return cards;
    }
}
