// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Storage.sol";
import "hardhat/console.sol";

contract A2 {
    AppStorage s;

    function setA(uint _a) public {
        s.a = _a;
    }

    function getA() public view returns (uint) {
        return s.a;
    }
}

contract B2 {
    AppStorage s;

    constructor(address _A) {
        s.contractA = _A;
        s.a = 4;
        s.b = 0x45;
        s.c = 0xF5;
    }

    function setB(uint8 _b) public {
        s.b = _b;

        (bool success,) = s.contractA.delegatecall(
            abi.encodeWithSignature("setA(uint256)", _b + 1)
        );
        console.log(success);
    }

    function getB() public view returns (uint) {
        return s.b;
    }
}