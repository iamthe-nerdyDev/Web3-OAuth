// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

library ECDSA {
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
    ) internal pure returns (bool) {
        return
            recover(
                getEthSignedMessageHash(getMessageHash(_message)),
                _signature
            ) == _signer;
    }

    /**
     * @notice Returns the keecak256 hash of the message
     * @param _message Message to be hashed
     * @return bytes32
     */
    function getMessageHash(
        string memory _message
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_message));
    }

    /**
     * @notice Returns the keecak256 hash of the eth signed message
     * @param _messageHash Message hash to be hashed
     * @return bytes32
     */
    function getEthSignedMessageHash(
        bytes32 _messageHash
    ) internal pure returns (bytes32) {
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
    ) internal pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = _split(_signature);
        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    /**
     * @notice Splits the signature into r, s and v values
     * @param _signature Signature gotten from signing the message hash
     */
    function _split(
        bytes memory _signature
    ) internal pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(_signature.length == 65);

        assembly {
            r := mload(add(_signature, 32))
            s := mload(add(_signature, 64))
            v := byte(0, mload(add(_signature, 96)))
        }
    }
}
