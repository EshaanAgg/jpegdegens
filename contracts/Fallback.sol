// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface IFallback {
    function doesNotExist() external;
}

contract Fallback {
    function foo() pure internal {
        console.log("Hello World!");
    }

    fallback() payable external {
        foo();
        console.log("You are in the fallback function");
        revert("You shouldn't be here");
    }

}