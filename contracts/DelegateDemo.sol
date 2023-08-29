// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract A {
    uint a;

    function setA(uint _a) public {
        a = _a;
    }

    function getA() public view returns (uint) {
        return a;
    }
}

contract B {
    uint b;
    address ContractA;

    constructor(address _A) {
        ContractA = _A;
    }

    function setB(uint _b) public {
        b = _b;
        // This is a regular call
        // A(ContractA).setA(_b + 1);
        // Prints 2,1

        // This is a delegate call
        ContractA.delegatecall(
            abi.encodeWithSignature("setA(uint256)", _b + 1)
        );
        // Prints 0,2 as now the fucntion was executed in my context. Thus in the delegate call function I am accessing my own data, and modifying it. 0 is the default value in uint stored in A.
    }

    function getB() public view returns (uint) {
        return b;
    }
}