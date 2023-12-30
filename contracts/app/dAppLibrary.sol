// SPDX-License-Identifier: MIT

import "../extra/Utils.sol";

pragma solidity ^0.8.0;

/**
 * @title DAPP Library for Web3 OAuth Contract
 * @dev Provides functions for CR*D operation on dApps
 */
library DAPP {
    /// @dev - dApp struct
    struct dApp {
        uint256 id;
        string domain;
        bytes32 accessToken;
        address owner;
        bool isDeleted;
        uint256 createdAt;
        uint256 updatedAt;
    }

    /**
     * @notice Registers a new dApp
     * @param dApps:            all dApps
     * @param UserdApps:        user dApps mapping
     * @param DomainTodAppId:   --mapping
     * @param DoesdAppExist:    mapping to check if dApp exists
     * @param TokenTodAppId:    --mapping
     * @param owner:            msg.sender
     * @param domain:           domain
     * @param isLocalhost:      true/false
     */
    function registerdApp(
        dApp[] storage dApps,
        mapping(address => uint256[]) storage UserdApps,
        mapping(string => uint256) storage DomainTodAppId,
        mapping(uint256 => bool) storage DoesdAppExist,
        mapping(bytes32 => uint256) storage TokenTodAppId,
        address owner,
        string memory domain,
        bool isLocalhost
    ) internal {
        require(DomainTodAppId[domain] == 0, "dupicate domain entry");

        uint256 id = dApps.length;
        bytes32 hash = Utils.generateHash(domain);

        dApps.push(
            dApp(
                id,
                domain,
                hash,
                isLocalhost ? address(0) : owner,
                false,
                block.timestamp,
                block.timestamp
            )
        );

        DomainTodAppId[domain] = id;
        DoesdAppExist[id] = true;
        UserdApps[isLocalhost ? address(0) : owner].push(id);
        TokenTodAppId[hash] = id;
    }

    /**
     * @notice Deletes an existing dApp
     * @param dApps:            all dApps
     * @param DomainTodAppId:   --mapping
     * @param DoesdAppExist:    mapping to check if dApp exists
     * @param id:               --id of dApp
     */
    function deletedApp(
        dApp[] storage dApps,
        mapping(string => uint256) storage DomainTodAppId,
        mapping(uint256 => bool) storage DoesdAppExist,
        uint256 id
    ) internal {
        DomainTodAppId[dApps[id].domain] = 0;
        DoesdAppExist[id] = false;

        dApps[id].isDeleted = true;
        dApps[id].updatedAt = block.timestamp;
    }

    /**
     * @notice Gets dApp from accessToken
     * @param dApps:            all dApps
     * @param DoesdAppExist:    mapping to check if dApp exists
     * @param id:               --id of dApp
     * @param token:            --token
     * @return dApp
     */
    function getdAppFromToken(
        dApp[] storage dApps,
        mapping(uint256 => bool) storage DoesdAppExist,
        uint256 id,
        bytes32 token
    ) internal view returns (dApp memory) {
        require(DoesdAppExist[id], "not found");
        require(dApps[id].accessToken == token, "bad request");

        return dApps[id];
    }

    /**
     * @notice Gets dAppId from domain
     * @param dApps:            all dApps
     * @param DoesdAppExist:    mapping to check if dApp exists
     * @param domain:           --domain
     * @param id:               --id of dApp
     * @return uint256
     */
    function getdAppIdFromDomain(
        dApp[] storage dApps,
        mapping(uint256 => bool) storage DoesdAppExist,
        string memory domain,
        uint256 id
    ) internal view returns (uint256) {
        require(DoesdAppExist[id], "not found");
        require(Utils.compareStrings(dApps[id].domain, domain), "bad request");

        return id;
    }

    /**
     * @notice Gets dApp details
     * @param dApps:            all Cards
     * @param DoesdAppExist:    mapping to check if dApp exists
     * @param id:               id of dApp
     * @return dApp
     */
    function getdApp(
        dApp[] storage dApps,
        mapping(uint256 => bool) storage DoesdAppExist,
        uint256 id
    ) internal view returns (dApp memory) {
        require(DoesdAppExist[id], "not found");

        return dApps[id];
    }

    /**
     * @notice Gets all dApps of a user
     * @param dApps:            all dApps
     * @param UserdApps:        user dApps mapping
     * @param DoesdAppExist:    mapping to check if dApp exists
     * @param user:             user dApps to fetch
     * @return dApp[]
     */
    function getdApps(
        dApp[] storage dApps,
        mapping(address => uint256[]) storage UserdApps,
        mapping(uint256 => bool) storage DoesdAppExist,
        address user
    ) internal view returns (dApp[] memory) {
        uint256[] storage dAppsId = UserdApps[user];

        uint256 available;

        for (uint256 i = 0; i < dAppsId.length; i++) {
            if (DoesdAppExist[dAppsId[i]]) available++;
        }

        dApp[] memory dapps = new dApp[](available);

        uint256 index;

        for (uint256 i = 0; i < dAppsId.length; i++) {
            uint256 dAppId = dAppsId[i];

            if (DoesdAppExist[dAppId]) {
                dapps[index] = dApps[dAppId];
                index++;
            }
        }

        return dapps;
    }
}
