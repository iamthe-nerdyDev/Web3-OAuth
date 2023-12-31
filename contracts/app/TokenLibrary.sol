// SPDX-License-Identifier: MIT

import "./CardLibrary.sol";

pragma solidity ^0.8.0;

/**
 * @title TOKEN Library for Web3 OAuth Contract
 * @dev Provides functions for CR*D operation on Tokens
 */
library TOKEN {
    /// @dev - Token struct
    struct Token {
        uint256 id;
        uint256 cardId;
        uint256 dAppId;
        address user;
        bytes32 token;
        bool isDeleted;
        uint256 createdAt;
        uint256 updatedAt;
    }

    /**
     * @notice Create a new session token
     * @param Tokens:           all Tokens
     * @param DoesTokenExist    mapping to check if token exists
     * @param User2dApp2Token   --mappjng
     * @param CardIdTodAppIds:  ---
     * @param dAppIdToTokenIds: ---
     * @param DoesCardExist:    mapping to check if card exists
     * @param DoesdAppExist:    mapping to check if dApp exists
     * @param Cards:            all Cards
     * @param cardId:           id of card
     * @param dAppId:           id of dApp triggering the action
     * @param signer:           signer
     */
    function createToken(
        Token[] storage Tokens,
        mapping(uint256 => bool) storage DoesTokenExist,
        mapping(bytes32 => uint256) storage TokenToTokenId,
        mapping(address => mapping(uint256 => uint256)) storage User2dApp2Token,
        mapping(uint256 => uint256[]) storage CardIdTodAppIds,
        mapping(uint256 => uint256[]) storage dAppIdToTokenIds,
        mapping(uint256 => bool) storage DoesCardExist,
        mapping(uint256 => bool) storage DoesdAppExist,
        CARD.Card[] storage Cards,
        uint256 cardId,
        uint256 dAppId,
        address signer
    ) internal {
        require(DoesCardExist[cardId], "Card not found");
        require(DoesdAppExist[dAppId], "dApp not found");
        require(Cards[cardId].owner == signer);

        uint256 id = Tokens.length;
        bytes32 token = keccak256(abi.encodePacked(cardId, signer, dAppId));

        Tokens.push(
            Token(
                id,
                cardId,
                dAppId,
                signer,
                token,
                false,
                block.timestamp,
                block.timestamp
            )
        );

        DoesTokenExist[id] = true;
        TokenToTokenId[token] = id;
        User2dApp2Token[signer][dAppId] = id;
        CardIdTodAppIds[cardId].push(dAppId);
        dAppIdToTokenIds[dAppId].push(id);
    }

    /**
     * @notice Gets token ID from token itself
     * @param Tokens:            all Tokens
     * @param DoesTokenExist:    mapping to check if token exists
     * @param id:                ---
     * @return Token
     */
    function getTokenDetails(
        Token[] storage Tokens,
        mapping(uint256 => bool) storage DoesTokenExist,
        uint256 id
    ) internal view returns (Token memory) {
        require(DoesTokenExist[id], "not found");

        return Tokens[id];
    }

    /**
     * @notice Gets token ID from token itself
     * @param Tokens:            all Tokens
     * @param DoesTokenExist:    mapping to check if token exists
     * @param TokenToTokenId:    ----mapping
     * @param token:             ---
     * @return uint256
     */
    function getTokenIdFromToken(
        Token[] storage Tokens,
        mapping(uint256 => bool) storage DoesTokenExist,
        mapping(bytes32 => uint256) storage TokenToTokenId,
        bytes32 token
    ) internal view returns (uint256) {
        require(DoesTokenExist[TokenToTokenId[token]], "invalid/deleted token");
        require(Tokens[TokenToTokenId[token]].token == token);

        return TokenToTokenId[token];
    }

    /**
     * @notice Deletes an existing token
     * @param Tokens:            all Tokens
     * @param DoesTokenExist:    mapping to check if token exists
     * @param id:                id of token to delete
     */
    function deleteToken(
        Token[] storage Tokens,
        mapping(uint256 => bool) storage DoesTokenExist,
        uint256 id
    ) internal {
        require(DoesTokenExist[id], "invalid/deleted token");

        DoesTokenExist[id] = false;

        Tokens[id].isDeleted = true;
        Tokens[id].updatedAt = block.timestamp;
    }
}
