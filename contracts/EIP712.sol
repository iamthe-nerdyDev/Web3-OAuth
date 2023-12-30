// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title EIP712 Library for Web3 OAuth Signature Verification
 * @dev Provides functions to verify signatures using EIP712 standard.
 */
abstract contract EIP712 {
    /// @notice Constant for name used in EIP712 domain separator
    string private constant NAME = "Web3 OAuth";

    /// @notice Constant for version used in EIP712 domain separator
    string private constant VERSION = "1";

    /// @notice Constant for chain ID used in EIP712 domain separator
    uint256 private constant CHAIN_ID = 201022;

    /// @notice EIP712 Domain Separator Typehash
    string private constant EIP712_DOMAIN_TYPE =
        "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)";

    /// @notice Typehash for Message struct used in encoding
    string private constant MESSAGE_TYPE = "Message(uint256 nonce)";

    /**
     * @dev Verifies the signature against the provided parameters.
     * @param nonce:        The unique nonce for the message.
     * @param signature:    The signature to be verified.
     * @param signer:       The expected signer's address.
     * @return bool
     */
    function verify(
        uint256 nonce,
        bytes memory signature,
        address signer
    ) internal view returns (bool) {
        bytes32 DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(abi.encodePacked(EIP712_DOMAIN_TYPE)),
                keccak256(abi.encodePacked(NAME)),
                keccak256(abi.encodePacked(VERSION)),
                CHAIN_ID,
                address(this)
            )
        );

        bytes32 hash = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(keccak256(abi.encodePacked(MESSAGE_TYPE)), nonce)
                )
            )
        );

        return getSigner(signature, hash) == signer;
    }

    /**
     * @dev Recovers the signer's address from the given signature and hash.
     * @param _signature:   The signature to be processed.
     * @param hash:         The hash to be signed.
     * @return address
     */
    function getSigner(
        bytes memory _signature,
        bytes32 hash
    ) internal pure returns (address) {
        bytes32 r;
        bytes32 s;
        uint8 v;

        require(_signature.length == 65, "Invalid signature length");

        assembly {
            r := mload(add(_signature, 32))
            s := mload(add(_signature, 64))
            v := byte(0, mload(add(_signature, 96)))
        }

        if (v < 27) v += 27;

        require(v == 27 || v == 28, "Invalid signature recovery id");

        return ecrecover(hash, v, r, s);
    }
}
