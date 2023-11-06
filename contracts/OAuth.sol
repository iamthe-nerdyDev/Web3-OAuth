// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract OAuth is Ownable {
    uint256 private _totalCards;
    uint256 private _totalProviderDapp;
    uint256 private _totalSessionTokens;

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

    struct ProviderDappStruct {
        uint256 id;
        string domain;
        string accessToken;
        address owner;
        bool isDeleted;
        uint256 createdAt;
        uint256 updatedAt;
    }

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
    mapping(address => uint256[]) userProviderDapps;
    mapping(address => uint256) userProviderDappCount;

    constructor() Ownable(msg.sender) {}

    function _time() private view returns (uint256) {
        return (block.timestamp * 1000) + 1000;
    }

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

        card.id = ++_totalCards;
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

    function updateCard(
        uint256 _id,
        string memory _username,
        string memory _pfp,
        string memory _emailAddress,
        string memory _bio
    ) public {
        require(doesCardExist[_id], "Card not found");
        require(cards[_id].owner == msg.sender, "Unauthorized");
        require(bytes(_username).length > 0, "Username must not be empty");
        require(bytes(_pfp).length > 0, "PFP must not be empty");
        require(
            bytes(_emailAddress).length > 0,
            "Email address must not be empty"
        );
        require(bytes(_bio).length > 0, "Bio must not be empty");

        cards[_id].username = _username;
        cards[_id].pfp = _pfp;
        cards[_id].emailAddress = _emailAddress;
        cards[_id].bio = _bio;
        cards[_id].updatedAt = _time();

        emit CardAction(_id, "Updated Card", msg.sender, _time());
    }

    function deleteCard(uint256 _id) public {
        require(doesCardExist[_id], "Card not found");
        require(cards[_id].owner == msg.sender, "Unauthorized");

        doesCardExist[_id] = false;
        cards[_id].isDeleted = true;
        cards[_id].updatedAt = _time();

        emit CardAction(_id, "Deleted Card", msg.sender, _time());
    }

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

    function getUserCard(
        uint256 _cardId
    ) public view onlyOwner returns (CardStruct memory Card) {
        return cards[_cardId];
    }

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

        providerDapp.id = ++_totalProviderDapp;
        providerDapp.domain = _domain;
        providerDapp.accessToken = _accessToken;
        providerDapp.owner = msg.sender;
        providerDapp.createdAt = _time();
        providerDapp.updatedAt = _time();

        providerDapps[providerDapp.id] = providerDapp;
        doesProviderDappExist[providerDapp.id] = true;
        userProviderDapps[msg.sender].push(providerDapp.id);
        userProviderDappCount[msg.sender] += 1;

        emit ProviderAction(
            providerDapp.id,
            "Registered dApp",
            msg.sender,
            _time()
        );
    }

    function modifyDapp(uint256 _id, string memory _domain) public {
        require(doesProviderDappExist[_id], "dApp not registered");
        require(providerDapps[_id].owner == msg.sender, "Unauthorized");
        require(bytes(_domain).length > 0, "Domain must not be empty");

        providerDapps[_id].domain = _domain;
        providerDapps[_id].updatedAt = _time();

        emit ProviderAction(_id, "Updated dApp", msg.sender, _time());
    }

    function deleteDapp(uint256 _id) public {
        require(doesProviderDappExist[_id], "dApp not registered");
        require(providerDapps[_id].owner == msg.sender, "Unauthorized");

        doesProviderDappExist[_id] = false;
        providerDapps[_id].isDeleted = true;
        providerDapps[_id].updatedAt = _time();

        deactivateSessionTokensForDapp(_id);

        emit ProviderAction(_id, "Deleted dApp", msg.sender, _time());
    }

    function getDapps(
        address _user
    ) public view returns (ProviderDappStruct[] memory Dapps) {
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

        Dapps = new ProviderDappStruct[](available);

        uint256 index;

        for (uint256 i = 0; i < userProviderDappCount[_user]; i++) {
            uint256 _dappId = userProviderDapps[_user][i];

            if (
                providerDapps[_dappId].owner == _user &&
                !providerDapps[_dappId].isDeleted
            ) {
                Dapps[index++] = providerDapps[_dappId];
            }
        }
    }

    function getDapp(
        uint256 _dappId
    ) public view returns (ProviderDappStruct memory Dapp) {
        return providerDapps[_dappId];
    }

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

    function verify(
        string memory _message,
        address _signer,
        bytes memory _signature
    ) public pure returns (bool) {
        bytes32 messageHash = getMessageHash(_message);
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);

        return recover(ethSignedMessageHash, _signature) == _signer;
    }

    function getMessageHash(
        string memory _message
    ) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(_message));
    }

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

    function recover(
        bytes32 _ethSignedMessageHash,
        bytes memory _signature
    ) private pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = _split(_signature);
        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

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

        sessionToken.id = ++_totalSessionTokens;
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

    function deactivateSessionFromToken(bytes32 _token) public onlyOwner {
        require(
            getSessionIdFromToken(_token) != 0,
            "Invalid or Expired token provided"
        );

        deactivateSessionToken(getSessionIdFromToken(_token));
    }

    function fetchUserInfo(
        bytes32 _token
    ) public view returns (CardStruct memory Card) {
        require(
            getSessionIdFromToken(_token) != 0,
            "Invalid or Expired token provided"
        );

        return cards[sessionTokens[getSessionIdFromToken(_token)].cardId];
    }
}
