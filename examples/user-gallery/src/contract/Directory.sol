// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Directory {
    uint256 public totalData;

    struct DataStruct {
        address user;
        bytes32 token;
        uint256 timestamp;
    }

    DataStruct[] public Data;

    mapping(address => uint256) public userData;

    event Add(address indexed executor, uint256 timestamp);
    event Update(address indexed executor, uint256 timestamp);

    constructor() {
        Data.push(DataStruct(address(0), 0, time()));

        totalData++;
    }

    function addInfo(bytes32 token) public {
        if (userData[msg.sender] == 0) {
            //a new entry for the address
            Data.push(DataStruct(msg.sender, token, time()));

            userData[msg.sender] = totalData;
            totalData++;

            emit Add(msg.sender, block.timestamp);
        } else {
            //just update the existing one..
            Data[userData[msg.sender]].token = token;
            Data[userData[msg.sender]].timestamp = time();

            emit Update(msg.sender, block.timestamp);
        }
    }

    function fetchAll() public view returns (DataStruct[] memory) {
        return Data;
    }

    function time() private view returns (uint256) {
        return (block.timestamp * 1000) + 1000;
    }
}
