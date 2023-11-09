// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title OAuth
 * @author ~NerdyDev🥀 & lolodusiji
 * @dev A Solidity contract for managing user cards, provider dApps, and session tokens.
 * This contract provides functions for creating, updating, and deleting user cards, registering dApps,
 * and managing session tokens for authentication and authorization purposes.
 * @notice Implements OAuth authorization flows and data storage
 */
contract OAuth is Ownable {
    uint256 private _totalCardsCount;
    uint256 private _totalProviderDappCount;
    uint256 private _totalSessionTokensCount;

    // Structs to represent user cards
    struct CardStruct {
        uint256 id;
        address owner;
        string username;
        string pfp;
        string emailAddress;
        string bio;
        bool isDeleted;
        uint256 createdAt;
        uint256 updatedAt;
    }

    // Structs to represent session tokens
    struct SessionTokenStruct {
        uint256 id;
        uint256 cardId;
        uint256 dappId;
        address owner;
        bytes32 token;
        bool isActive;
        uint256 createdAt;
        uint256 updatedAt;
    }

    // Structs to represent provider dApps
    struct ProviderDappStruct {
        uint256 id;
        string domain;
        string accessToken;
        address owner;
        bool isDeleted;
        uint256 createdAt;
        uint256 updatedAt;
    }

    /**
     * Events to log actions within the contract.
     */
    event CardAction(
        uint256 id,
        string actionType,
        address indexed executor,
        uint256 timestamp
    );

    event ProviderAction(
        uint256 id,
        string actionType,
        address indexed executor,
        uint256 timestamp
    );

    event SessionTokenAction(
        uint256 id,
        string actionType,
        address indexed executor,
        uint256 timestamp
    );

    mapping(uint256 => bool) doesCardExist;
    mapping(uint256 => CardStruct) cards;
    mapping(address => uint256[]) userCards;
    mapping(address => uint256) userCardCount;

    mapping(uint256 => bool) isSessionTokenActive;
    mapping(uint256 => SessionTokenStruct) sessionTokens;

    mapping(bytes32 => uint256) tokenSessionTokenId;

    mapping(uint256 => uint256[]) dAppSessionTokens;
    mapping(uint256 => uint256) dAppSessionTokenCount;

    mapping(uint256 => uint256[]) cardIdToDapps;

    mapping(uint256 => bool) doesProviderDappExist;
    mapping(uint256 => ProviderDappStruct) providerDapps;

    mapping(string => uint256) tokenProviderDapps;
    mapping(address => uint256[]) userProviderDapps;
    mapping(address => uint256) userProviderDappCount;

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Private function to get the adjusted current timestamp.
     * @return timestamp.
     */
    function _time() private view returns (uint256) {
        return (block.timestamp * 1000) + 1000;
    }

    /**
     * @notice Verifies the signer of a messgae
     * @param _message Message to be signed
     * @param _signer Address that signed the message
     * @param _signature Signature gotten from signing the message hash
     * @return bool
     */
    function verify(
        string memory _message,
        address _signer,
        bytes memory _signature
    ) private pure returns (bool) {
        bytes32 messageHash = getMessageHash(_message);
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);

        return recover(ethSignedMessageHash, _signature) == _signer;
    }

    /**
     * @notice Returns the keecak256 hash of the message
     * @param _message Message to be hashed
     * @return bytes32
     */
    function getMessageHash(
        string memory _message
    ) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(_message));
    }

    /**
     * @notice Returns the keecak256 hash of the eth signed message
     * @param _messageHash Message hash to be hashed
     * @return bytes32
     */
    function getEthSignedMessageHash(
        bytes32 _messageHash
    ) private pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    "\x19Ethereum Signed Message:\n32",
                    _messageHash
                )
            );
    }

    /**
     * @notice Recovers the address of the signature signer
     * @param _ethSignedMessageHash ETH signed message
     * @param _signature Signature gotten from signing the message hash
     * @return address of the signer
     */
    function recover(
        bytes32 _ethSignedMessageHash,
        bytes memory _signature
    ) private pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = _split(_signature);
        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    /**
     * @notice Splits the signature into r, s and v values
     * @param _signature Signature gotten from signing the message hash
     */
    function _split(
        bytes memory _signature
    ) private pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(_signature.length == 65, "Invalid signature length");

        assembly {
            r := mload(add(_signature, 32))
            s := mload(add(_signature, 64))
            v := byte(0, mload(add(_signature, 96)))
        }
    }

    /**
     * @notice Create a new user card
     * @param _username Username
     * @param _pfp PFP URL
     * @param _emailAddress Email Address
     * @param _bio Short bio text
     * @dev Emits a CardAction event
     */
    function createCard(
        string memory _username,
        string memory _pfp,
        string memory _emailAddress,
        string memory _bio
    ) public {
        require(bytes(_username).length > 0, "Username must not be empty");
        require(bytes(_pfp).length > 0, "PFP must not be empty");
        require(
            bytes(_emailAddress).length > 0,
            "Email address must not be empty"
        );
        require(bytes(_bio).length > 0, "Bio must not be empty");

        CardStruct memory card;

        card.id = ++_totalCardsCount;
        card.username = _username;
        card.owner = msg.sender;
        card.pfp = _pfp;
        card.emailAddress = _emailAddress;
        card.bio = _bio;
        card.createdAt = _time();
        card.updatedAt = _time();

        cards[card.id] = card;
        doesCardExist[card.id] = true;
        userCards[msg.sender].push(card.id);
        userCardCount[msg.sender] += 1;

        emit CardAction(card.id, "Created Card", msg.sender, _time());
    }

    /**
     * @notice Updates an existing card
     * @param _cardId Card ID to update
     * @param _username New username
     * @param _pfp New PFP URL
     * @param _emailAddress New Email address
     * @param _bio New Short bio text
     * @dev Requires the card exists and msg.sender is the owner
     * @dev Emits a CardAction event
     */
    function updateCard(
        uint256 _cardId,
        string memory _username,
        string memory _pfp,
        string memory _emailAddress,
        string memory _bio
    ) public {
        require(doesCardExist[_cardId], "Card not found");
        require(cards[_cardId].owner == msg.sender, "Unauthorized");
        require(bytes(_username).length > 0, "Username must not be empty");
        require(bytes(_pfp).length > 0, "PFP must not be empty");
        require(
            bytes(_emailAddress).length > 0,
            "Email address must not be empty"
        );
        require(bytes(_bio).length > 0, "Bio must not be empty");

        cards[_cardId].username = _username;
        cards[_cardId].pfp = _pfp;
        cards[_cardId].emailAddress = _emailAddress;
        cards[_cardId].bio = _bio;
        cards[_cardId].updatedAt = _time();

        emit CardAction(_cardId, "Updated Card", msg.sender, _time());
    }

    /**
     * @notice Deletes an existing card
     * @param _id Card ID to delete
     * @dev Requires the card exists and msg.sender is the owner
     * @dev Emits a CardAction event
     */
    function deleteCard(uint256 _id) public {
        require(doesCardExist[_id], "Card not found");
        require(cards[_id].owner == msg.sender, "Unauthorized");

        doesCardExist[_id] = false;
        cards[_id].isDeleted = true;
        cards[_id].updatedAt = _time();

        emit CardAction(_id, "Deleted Card", msg.sender, _time());
    }

    /**
     * @notice Gets card for a particular cardId
     * @param _cardId Card ID
     * @return Card
     */
    function getUserCard(
        uint256 _cardId
    ) public view returns (CardStruct memory Card) {
        return cards[_cardId];
    }

    /**
     * @notice Gets card for a particular address
     * @param _user User address
     * @dev Can be called by only contract owner
     * @return Cards
     */
    function getUserCards(
        address _user
    ) public view onlyOwner returns (CardStruct[] memory Cards) {
        uint256 available;

        for (uint256 i = 0; i < userCardCount[_user]; i++) {
            uint256 _cardId = userCards[_user][i];

            if (cards[_cardId].owner == _user && !cards[_cardId].isDeleted) {
                available++;
            }
        }

        Cards = new CardStruct[](available);

        uint256 index;

        for (uint256 i = 0; i < userCardCount[_user]; i++) {
            uint256 _cardId = userCards[_user][i];

            if (cards[_cardId].owner == _user && !cards[_cardId].isDeleted) {
                Cards[index++] = cards[_cardId];
            }
        }
    }

    /**
     * @notice Registers a new dApp
     * @param _domain Domain of dApp or '*' for local access
     * @param _accessToken Somewhat like an API token
     * @dev Emits a ProviderAction event
     */
    function registerDapp(
        string memory _domain,
        string memory _accessToken
    ) public {
        require(bytes(_domain).length > 0, "Domain must not be empty");
        require(
            bytes(_accessToken).length > 0,
            "Access Token must not be empty"
        );

        ProviderDappStruct memory providerDapp;

        providerDapp.id = ++_totalProviderDappCount;
        providerDapp.domain = _domain;
        providerDapp.accessToken = _accessToken;
        providerDapp.owner = msg.sender;
        providerDapp.createdAt = _time();
        providerDapp.updatedAt = _time();

        providerDapps[providerDapp.id] = providerDapp;
        doesProviderDappExist[providerDapp.id] = true;
        tokenProviderDapps[_accessToken] = providerDapp.id;
        userProviderDapps[msg.sender].push(providerDapp.id);
        userProviderDappCount[msg.sender] += 1;

        emit ProviderAction(
            providerDapp.id,
            "Registered dApp",
            msg.sender,
            _time()
        );
    }

    /**
     * @notice Updates an existing dApp
     * @param _id dApp ID to update
     * @param _domain Domain of dApp or '*' for local access
     * @dev Requires the dApp is registered and msg.sender is the owner
     * @dev Emits a ProviderAction event
     */
    function modifyDapp(uint256 _id, string memory _domain) public {
        require(doesProviderDappExist[_id], "dApp not registered");
        require(providerDapps[_id].owner == msg.sender, "Unauthorized");
        require(bytes(_domain).length > 0, "Domain must not be empty");

        providerDapps[_id].domain = _domain;
        providerDapps[_id].updatedAt = _time();

        emit ProviderAction(_id, "Updated dApp", msg.sender, _time());
    }

    /**
     * @notice Deletes an existing dApp
     * @param _id dApp ID to delete
     * @dev Requires the dApp is registered and msg.sender is the owner
     * @dev Emits a ProviderAction event
     */
    function deleteDapp(uint256 _id) public {
        require(doesProviderDappExist[_id], "dApp not registered");
        require(providerDapps[_id].owner == msg.sender, "Unauthorized");

        doesProviderDappExist[_id] = false;
        providerDapps[_id].isDeleted = true;
        providerDapps[_id].updatedAt = _time();

        deactivateSessionTokensForDapp(_id);

        emit ProviderAction(_id, "Deleted dApp", msg.sender, _time());
    }

    /**
     * @notice Gets all registered dApps for a particular address
     * @param _user User address
     * @return dApps
     */
    function getDapps(
        address _user
    ) public view returns (ProviderDappStruct[] memory dApps) {
        uint256 available;

        for (uint256 i = 0; i < userProviderDappCount[_user]; i++) {
            uint256 _dappId = userProviderDapps[_user][i];

            if (
                providerDapps[_dappId].owner == _user &&
                !providerDapps[_dappId].isDeleted
            ) {
                available++;
            }
        }

        dApps = new ProviderDappStruct[](available);

        uint256 index;

        for (uint256 i = 0; i < userProviderDappCount[_user]; i++) {
            uint256 _dappId = userProviderDapps[_user][i];

            if (
                providerDapps[_dappId].owner == _user &&
                !providerDapps[_dappId].isDeleted
            ) {
                dApps[index++] = providerDapps[_dappId];
            }
        }
    }

    /**
     * @notice Gets single dApp details
     * @param _dappId ID of a registered dApp
     * @return dApp
     */
    function getDapp(
        uint256 _dappId
    ) public view returns (ProviderDappStruct memory dApp) {
        return providerDapps[_dappId];
    }

    /**
     * @notice Gets dApp details from access token
     * @param _token dApp access token
     * @dev Can be called by only contract owner
     * @return dApp
     */
    function getDappFromToken(
        string memory _token
    ) public view onlyOwner returns (ProviderDappStruct memory dApp) {
        return providerDapps[tokenProviderDapps[_token]];
    }

    /**
     * @notice Gets dApps that can access a particular card
     * @param _user User address
     * @param _cardId Card ID
     * @return dApps
     */
    function getDappsConnectedToCard(
        address _user,
        uint256 _cardId
    ) public view returns (ProviderDappStruct[] memory dApps) {
        uint256 available;

        for (uint256 i = 0; i < cardIdToDapps[_cardId].length; i++) {
            if (getActiveSessionId(_user, cardIdToDapps[_cardId][i]) != 0) {
                available++;
            }
        }

        dApps = new ProviderDappStruct[](available);

        uint256 index;

        for (uint256 i = 0; i < cardIdToDapps[_cardId].length; i++) {
            if (getActiveSessionId(_user, cardIdToDapps[_cardId][i]) != 0) {
                dApps[index++] = getDapp(cardIdToDapps[_cardId][i]);
            }
        }
    }

    /**
     * @notice Deactivates all session token(s) if a dApp gets deleted
     * @param _dappId dApp ID
     */
    function deactivateSessionTokensForDapp(uint256 _dappId) private {
        for (uint256 i = 0; i < dAppSessionTokenCount[_dappId]; i++) {
            uint256 _sessionId = dAppSessionTokens[_dappId][i];

            if (
                sessionTokens[_sessionId].dappId == _dappId &&
                sessionTokens[_sessionId].isActive
            ) {
                deactivateSessionToken(_sessionId);
            }
        }
    }

    /**
     * @notice Deactivates session token
     * @param _id Session ID to deactivate
     * @dev Emits a SessionTokenAction event
     */
    function deactivateSessionToken(uint256 _id) private {
        sessionTokens[_id].isActive = false;
        sessionTokens[_id].updatedAt = _time();
        isSessionTokenActive[_id] = false;

        emit SessionTokenAction(
            _id,
            "Deactivated Session Token",
            msg.sender,
            _time()
        );
    }

    /**
     * @notice Triggers a login instance
     * @param _user User address
     * @param _dappId dApp user is trying to login on
     * @param _message Message signed by user
     * @param _signature Signature from signing message hash
     * @dev Can be called by only contract owner
     * @return tuple(bytes32, Cards)
     */
    function triggerLogin(
        address _user,
        uint256 _dappId,
        string memory _message,
        bytes memory _signature
    ) public view onlyOwner returns (bytes32, CardStruct[] memory Cards) {
        require(_signature.length == 65, "Invalid signature length");
        require(
            verify(_message, _user, _signature),
            "Unable to validate signature"
        );

        uint256 sessionId = getActiveSessionId(_user, _dappId);

        if (sessionId == 0) {
            return (
                0x0000000000000000000000000000000000000000000000000000000000000000,
                getUserCards(_user)
            );
        } else return (sessionTokens[sessionId].token, new CardStruct[](0));
    }

    /**
     * @notice Gets active session for a user on a dApp
     * @param _user User address
     * @param _dappId dApp ID
     * @return uint256
     */
    function getActiveSessionId(
        address _user,
        uint256 _dappId
    ) private view returns (uint256) {
        for (uint256 i = 0; i < dAppSessionTokenCount[_dappId]; i++) {
            uint256 _sessionId = dAppSessionTokens[_dappId][i];

            if (
                sessionTokens[_sessionId].owner == _user &&
                sessionTokens[_sessionId].isActive &&
                sessionTokens[_sessionId].dappId == _dappId
            ) {
                return _sessionId;
            }
        }

        return 0;
    }

    /**
     * @notice Registers a new user session
     * @param _cardId Username
     * @param _dappId dApp user is trying to login on
     * @param _user User address
     * @param _message Message signed by user
     * @param _signature Signature from signing message hash
     * @dev Can be called by only contract owner
     * @dev Emits a SessionTokenAction event
     */
    function createSession(
        uint256 _cardId,
        uint256 _dappId,
        address _user,
        string memory _message,
        bytes memory _signature
    ) public onlyOwner returns (bytes32) {
        require(doesCardExist[_cardId], "Card does not exist");
        require(cards[_cardId].owner == _user, "Access denied");
        require(doesProviderDappExist[_dappId], "dApp not registered");
        require(
            verify(_message, _user, _signature),
            "Unable to validate signature"
        );

        bytes32 _token = keccak256(abi.encodePacked(_cardId, _user, _dappId));

        SessionTokenStruct memory sessionToken;

        sessionToken.id = ++_totalSessionTokensCount;
        sessionToken.cardId = _cardId;
        sessionToken.dappId = _dappId;
        sessionToken.owner = _user;
        sessionToken.token = _token;
        sessionToken.isActive = true;
        sessionToken.createdAt = _time();
        sessionToken.updatedAt = _time();

        sessionTokens[sessionToken.id] = sessionToken;
        isSessionTokenActive[sessionToken.id] = true;
        dAppSessionTokens[_dappId].push(sessionToken.id);
        dAppSessionTokenCount[_dappId] += 1;
        tokenSessionTokenId[_token] = sessionToken.id;
        cardIdToDapps[_cardId].push(_dappId);

        emit SessionTokenAction(
            sessionToken.id,
            "Created Session Token",
            msg.sender,
            _time()
        );

        return _token;
    }

    /**
     * @notice Gets session ID from session token
     * @param _token Session Token
     * @return uint256
     */
    function getSessionIdFromToken(
        bytes32 _token
    ) private view returns (uint256) {
        uint256 sessionId = tokenSessionTokenId[_token];

        if (
            sessionTokens[sessionId].isActive &&
            sessionTokens[sessionId].token == _token
        ) {
            return sessionId;
        }

        return 0;
    }

    /**
     * @notice Deactivates a session from it's token
     * @param _token Session token
     * @dev Requires that the token is not invalid or expired
     */
    function deactivateSessionFromToken(bytes32 _token) public onlyOwner {
        require(
            getSessionIdFromToken(_token) != 0,
            "Invalid or Expired token provided"
        );

        deactivateSessionToken(getSessionIdFromToken(_token));
    }

    /**
     * @notice Gets user info from their session token
     * @param _token session token
     * @dev Requires that token is not invalid or expired and card exists
     * @return Card
     */
    function fetchUserInfo(
        bytes32 _token
    ) public view returns (CardStruct memory Card) {
        require(
            getSessionIdFromToken(_token) != 0,
            "Invalid or Expired token provided"
        );
        require(
            doesCardExist[sessionTokens[getSessionIdFromToken(_token)].cardId],
            "Card not found!"
        );

        return cards[sessionTokens[getSessionIdFromToken(_token)].cardId];
    }
}
