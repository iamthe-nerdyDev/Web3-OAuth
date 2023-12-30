// SPDX-License-Identifier: MIT

import "./EIP712.sol";
import "./extra/Utils.sol";
import "./app/CardLibrary.sol";
import "./app/dAppLibrary.sol";
import "./app/TokenLibrary.sol";

pragma solidity ^0.8.0;

/**
 * @title OAuth
 * @author ~NerdyDev🥀
 * @dev A Solidity contract for managing user cards, provider dApps, and session tokens.
 * This contract provides functions for:-
 * - creating user cards
 * - updating user cards
 * - deleting user cards
 * - registering dApps,
 * - and managing session tokens for authentication and authorization purposes.
 *
 * @notice Implements OAuth authorization flows and data storage
 */
contract OAuth is EIP712 {
    uint256 public totalCards;
    uint256 public totalTokens;
    uint256 public totaldApps;

    /// @dev owner of the contract
    address private owner;

    /// @dev to check if a dApp has been registered for localhost already
    bool private isLocalhostdAppRegistered;

    /// @dev Throws if called by any account other than the owner.
    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    /// @dev event emitted when a card is created
    event CreateCard(uint256 cardId, address indexed user, uint256 timestamp);
    /// @dev event emitted when a card is updated
    event UpdateCard(uint256 cardId, address indexed user, uint256 timestamp);
    /// @dev event emitted when a card is deleted
    event DeleteCard(uint256 cardId, address indexed user, uint256 timestamp);

    /// @dev event emitted when a dApp is registered
    event RegisterdApp(uint256 dAppId, address indexed user, uint256 timestamp);
    /// @dev event emitted when a dApp is deleted
    event DeletedApp(uint256 dAppId, address indexed user, uint256 timestamp);

    /// @dev event emitted when a token is created
    event CreateToken(address indexed user, uint256 timestamp);
    /// @dev event emitted when a token is deleted
    event DeleteToken(address indexed user, uint256 timestamp);

    CARD.Card[] private Cards;
    mapping(address => uint256[]) UserCards;
    mapping(uint256 => bool) DoesCardExist;

    DAPP.dApp[] private dApps;
    mapping(address => uint256[]) UserdApps;
    mapping(string => uint256) DomainTodAppId;
    mapping(uint256 => bool) DoesdAppExist;
    mapping(bytes32 => uint256) TokenTodAppId;

    TOKEN.Token[] private Tokens;
    mapping(uint256 => bool) DoesTokenExist;
    mapping(bytes32 => uint256) TokenToTokenId;
    mapping(address => mapping(uint256 => uint256)) UserTodAppToToken;
    mapping(uint256 => uint256[]) CardIdTodAppIds;
    mapping(uint256 => uint256[]) dAppIdToTokenIds;

    constructor() {
        owner = msg.sender;

        registerdApp("localhost"); //registering localhost stuffs
    }

    /**
     * @notice Create a new user card
     * @param username:    Username
     * @param pfp:         PFP URL
     * @param email:       Email Address
     * @param bio:         Short bio text
     * @dev Emits CreateCard event
     */
    function createCard(
        string memory username,
        string memory pfp,
        string memory email,
        string memory bio
    ) public {
        require(
            bytes(username).length > 0 &&
                bytes(pfp).length > 0 &&
                bytes(email).length > 0 &&
                bytes(bio).length > 0
        );

        CARD.createCard(
            Cards,
            UserCards,
            DoesCardExist,
            msg.sender,
            username,
            pfp,
            email,
            bio
        );

        totalCards++;

        emit CreateCard(totalCards - 1, msg.sender, block.timestamp);
    }

    /**
     * @notice Updates an existing user card
     * @param id:          cardId to update
     * @param username:    New Username
     * @param pfp:         New PFP URL
     * @param email:       New Email Address
     * @param bio:         New Short bio text
     * @dev Requires the card exists and msg.sender is the card owner
     * @dev Emits UpdateCard event
     */
    function updateCard(
        uint256 id,
        string memory username,
        string memory pfp,
        string memory email,
        string memory bio
    ) public {
        require(
            bytes(username).length > 0 &&
                bytes(pfp).length > 0 &&
                bytes(email).length > 0 &&
                bytes(bio).length > 0
        );

        CARD.updateCard(
            Cards,
            DoesCardExist,
            msg.sender,
            id,
            username,
            pfp,
            email,
            bio
        );

        emit UpdateCard(id, msg.sender, block.timestamp);
    }

    /**
     * @notice Deletes an existing user card
     * @param id:          cardId to delete
     * @dev Requires the card exists and msg.sender is the card owner
     * @dev Emits DeleteCard event
     */
    function deleteCard(uint256 id) public {
        CARD.deleteCard(Cards, DoesCardExist, msg.sender, id);

        emit DeleteCard(id, msg.sender, block.timestamp);
    }

    /**
     * @notice Gets card for a particular cardId
     * @param id:   Card ID
     * @dev Can be called by only the owner of contract
     * @return Card
     */
    function getCard(
        uint256 id
    ) public view onlyOwner returns (CARD.Card memory) {
        require(DoesCardExist[id], "not found");

        return CARD.getCard(Cards, id);
    }

    /**
     * @notice Gets card for a particular address
     * @param user:   User address
     * @dev Can be called by only the owner of contract
     * @return Card[]
     */
    function getUserCards(
        address user
    ) public view onlyOwner returns (CARD.Card[] memory) {
        return CARD.getUserCards(Cards, UserCards, DoesCardExist, user);
    }

    /**
     * @notice Registers a new dApp
     * @param domain:   Domain of dApp({domain.ltd})
     * @dev Emits RegisterdApp event
     */
    function registerdApp(string memory domain) public {
        if (bytes(domain).length == 0) revert("domain is required");

        bool isLocalhost = Utils.compareStrings(domain, "localhost");
        if (isLocalhost && isLocalhostdAppRegistered) revert("bad request");
        else isLocalhostdAppRegistered = true;

        DAPP.registerdApp(
            dApps,
            UserdApps,
            DomainTodAppId,
            DoesdAppExist,
            TokenTodAppId,
            msg.sender,
            domain,
            isLocalhost
        );

        totaldApps++;

        emit RegisterdApp(
            totaldApps - 1,
            isLocalhost ? address(0) : msg.sender,
            block.timestamp
        );
    }

    /**
     * @notice Deletes an existing dApp
     * @param id:   dApp ID to delete
     * @dev Requires the dApp is registered and msg.sender is the owner
     * @dev Emits DeletedApp event
     */
    function deletedApp(uint256 id) public {
        require(DoesdAppExist[id], "not found");
        require(
            dApps[id].owner == msg.sender || msg.sender == owner,
            "unauthorized"
        );

        DAPP.deletedApp(dApps, DomainTodAppId, DoesdAppExist, id);

        deletedAppTokens(id); // delete all tokens linked to the dApp

        emit DeletedApp(id, msg.sender, block.timestamp);
    }

    /**
     * @notice Gets dApp details from access token
     * @param token:    dApp access token
     * @dev Can be called by only contract owner
     * @return dApp
     */
    function getdAppFromToken(
        bytes32 token
    ) public view onlyOwner returns (DAPP.dApp memory) {
        uint256 id = TokenTodAppId[token];

        return DAPP.getdAppFromToken(dApps, DoesdAppExist, id, token);
    }

    /**
     * @notice Gets dapp ID from the provided domain
     * @param domain:   Domain({domain.ltd})
     * @return uint256
     */
    function getdAppIdFromDomain(
        string memory domain
    ) public view onlyOwner returns (uint256) {
        uint256 id = DomainTodAppId[domain];

        return DAPP.getdAppIdFromDomain(dApps, DoesdAppExist, domain, id);
    }

    /**
     * @notice Gets single dApp details
     * @param id:   ID of a registered dApp
     * @dev Can be called by only the contract owner
     * @return dApp
     */
    function getdApp(
        uint256 id
    ) public view onlyOwner returns (DAPP.dApp memory) {
        return DAPP.getdApp(dApps, DoesdAppExist, id);
    }

    /**
     * @notice Gets all registered dApps for a user
     * @dev Gets all dApps registered by the msg.sender
     * @return dApp[]
     */
    function getdApps() public view returns (DAPP.dApp[] memory) {
        return DAPP.getdApps(dApps, UserdApps, DoesdAppExist, msg.sender);
    }

    /**
     * @notice Gets dApps that can access a particular card
     * @param cardId:   Card ID
     * @dev Can be called by only the contract owner
     * @return dApp[]
     */
    function getdAppsConnectedToCard(
        uint256 cardId
    ) public view onlyOwner returns (DAPP.dApp[] memory) {
        require(DoesCardExist[cardId], "not found");
        require(
            Cards[cardId].owner == msg.sender || msg.sender == owner,
            "unauthorized"
        );

        uint256 available;

        for (uint256 i = 0; i < CardIdTodAppIds[cardId].length; i++) {
            if (DoesdAppExist[CardIdTodAppIds[cardId][i]]) available++;
        }

        DAPP.dApp[] memory dapps = new DAPP.dApp[](available);

        uint256 index;

        for (uint256 i = 0; i < CardIdTodAppIds[cardId].length; i++) {
            uint256 dAppId = CardIdTodAppIds[cardId][i];

            if (DoesdAppExist[dAppId]) {
                dapps[index] = dApps[dAppId];
                index++;
            }
        }

        return dapps;
    }

    /**
     * @notice Registers a new user token
     * @param cardId:       Card ID
     * @param dAppId:       dApp user is trying to login on
     * @param signer:       User address
     * @param nonce:        User nonce
     * @param signature:    Signature from signing typedData
     * @dev Can be called by only contract owner
     * @dev Emits a SessionTokenAction event
     */
    function createToken(
        uint256 cardId,
        uint256 dAppId,
        address signer,
        uint256 nonce,
        bytes memory signature
    ) public onlyOwner {
        require(verify(nonce, signature, signer));

        TOKEN.createToken(
            Tokens,
            DoesTokenExist,
            TokenToTokenId,
            UserTodAppToToken,
            CardIdTodAppIds,
            dAppIdToTokenIds,
            DoesCardExist,
            DoesdAppExist,
            Cards,
            cardId,
            dAppId,
            signer
        );

        totalTokens++;

        emit CreateToken(signer, block.timestamp);
    }

    /**
     * @notice Gets token details from id
     * @param id:    Session Token ID
     * @dev Can only be called by contract owner
     * @return Token
     */
    function getTokenDetails(
        uint256 id
    ) public view onlyOwner returns (TOKEN.Token memory) {
        return TOKEN.getTokenDetails(Tokens, DoesTokenExist, id);
    }

    /**
     * @notice Gets token ID from the token itself
     * @param token:    Session Token
     * @return uint256
     */
    function getTokenIdFromToken(bytes32 token) private view returns (uint256) {
        return
            TOKEN.getTokenIdFromToken(
                Tokens,
                DoesTokenExist,
                TokenToTokenId,
                token
            );
    }

    /**
     * @notice Gets user info from their session token
     * @param token:    Session token
     * @dev Requires that token is not invalid or expired and card exists
     * @return Card
     */
    function fetchUserInfoFromToken(
        bytes32 token
    ) public view returns (CARD.Card memory) {
        uint256 tokenId = getTokenIdFromToken(token);

        require(DoesCardExist[Tokens[tokenId].cardId], "not found");

        return Cards[Tokens[tokenId].cardId];
    }

    /**
     * @notice Gets users info from their session tokens
     * @param tokens:    Session token[] - an array on tokens
     * @return Card[]
     */
    function fetchUserInfoFromTokens(
        bytes32[] memory tokens
    ) public view returns (CARD.Card[] memory) {
        CARD.Card[] memory cards = new CARD.Card[](tokens.length);

        uint256 index;

        for (uint256 i = 0; i < tokens.length; i++) {
            uint256 tokenId = getTokenIdFromToken(tokens[i]);

            if (DoesCardExist[Tokens[tokenId].cardId]) {
                cards[index] = Cards[Tokens[tokenId].cardId];

                index++;
            }
        }

        return cards;
    }

    /**
     * @notice Deletes a session from it's token
     * @param token:    Session token
     * @dev Requires that the token is not invalid or expired
     * @dev Can be called only by contract owner
     */
    function deleteToken(bytes32 token) public onlyOwner {
        uint256 tokenId = getTokenIdFromToken(token);

        _deleteToken(tokenId);
    }

    /**
     * @notice Deletes token
     * @param tokenId:  Token ID to delete
     * @dev Emits DeleteToken event
     */
    function _deleteToken(uint256 tokenId) internal {
        TOKEN.deleteToken(Tokens, DoesTokenExist, tokenId);

        emit DeleteToken(Tokens[tokenId].user, block.timestamp);
    }

    /**
     * @notice Deactivates all token(s) if a dApp gets deleted
     * @param dAppId:   dApp ID
     * @dev Loops through then deletes all tokens
     */
    function deletedAppTokens(uint256 dAppId) internal {
        for (uint256 i = 0; i < dAppIdToTokenIds[dAppId].length; i++) {
            if (DoesTokenExist[dAppIdToTokenIds[dAppId][i]]) {
                _deleteToken(dAppIdToTokenIds[dAppId][i]);
            }
        }
    }

    /**
     * @notice Gets active session for a user on a dApp
     * @param user:     User address
     * @param dAppId:   dApp ID
     * @return tuple(bool, uint256)
     */
    function getActiveTokenId(
        address user,
        uint256 dAppId
    ) internal view returns (bool, uint256) {
        uint256 tokenId = UserTodAppToToken[user][dAppId];

        if (Tokens[tokenId].user == user && Tokens[tokenId].dAppId == dAppId) {
            return (true, tokenId);
        } else return (false, 0);
    }

    /**
     * @notice Triggers a login action
     * @param signer:       User address
     * @param dAppId:       dApp user is trying to login on
     * @param nonce:        User nonce
     * @param signature:    Signature from signing typedData
     * @dev Can be called by only contract owner
     * @return tuple(bytes32, Card[])
     */
    function triggerLogin(
        address signer,
        uint256 dAppId,
        uint256 nonce,
        bytes memory signature
    ) public view onlyOwner returns (bytes32, CARD.Card[] memory) {
        require(verify(nonce, signature, signer));

        (bool status, uint256 tokenId) = getActiveTokenId(signer, dAppId);

        if (status) return (Tokens[tokenId].token, new CARD.Card[](0));
        else return (0, getUserCards(signer));
    }
}
