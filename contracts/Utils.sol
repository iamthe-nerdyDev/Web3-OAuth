// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title Utility Library for Web3 OAuth Contract
 * @author ~NerdyDev🥀
 * @dev Provides reusable functions
 */
library Utils {
    /**
     * @dev Compares two strings to check if they are equal
     * @param str1: First string
     * @param str2: Second string
     * @return bool
     */
    function compareStrings(
        string memory str1,
        string memory str2
    ) internal pure returns (bool) {
        if (bytes(str1).length != bytes(str2).length) return false;

        return keccakHash(str1) == keccakHash(str2);
    }

    /**
     * @dev Performs keccak256 hash on a string
     * @param str:  String to be hashed
     * @return bytes32
     */
    function keccakHash(string memory str) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(str));
    }

    /**
     * @dev Generates a 32 byte hash with a given salt
     * @param salt: String to add to atleast make hash more unique
     * @return bytes32
     */
    function generateHash(string memory salt) external view returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    blockhash(block.number - 1),
                    block.timestamp,
                    gasleft(),
                    block.coinbase,
                    salt
                )
            );
    }
}
