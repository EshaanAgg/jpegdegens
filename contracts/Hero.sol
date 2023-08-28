// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Hero {
    /*
    * Each hero is stored as a uint
    * The 2 LSB store the type of hero: 0,1 or 3
    * Then each set of 5 bits (from LSB to MSB) store the corresponding value of the stats
    */
    enum Class { Mage, Healer, Barbarian }
    mapping (address => uint[]) addressToHeroes;

    /* 
    * Payable keywords show that this contract can accept money
    * As this is not a view, this function requires a provider as well as a signer
    */
    function createHero(Class class) public payable {
        require(msg.value >= 0.05 ether, "Please send atleast 0.05 ether.");
        
        // stats in order are strength, health, dexerity, intellect, magic
        uint[] memory stats = new uint[](5);
        stats[0] = 2;
        stats[1] = 7;
        stats[2] = 12;
        stats[3] = 17;
        stats[4] = 22;

        uint len = 5;
        uint hero = uint(class);

        do {
            uint pos = generateRandom() % len;
            uint value = generateRandom() % (13 + len) + 1;
            
            hero |= value << stats[pos];
            len--;
            
            stats[pos] = stats[len];
        } while (len > 0);

        addressToHeroes[msg.sender].push(hero);
    }

    /*
    * Pure functions which only depends on the parameter passed
    * Do not read or write on the blockchain
    * Getters for all the stats of the hero
    */
    function getStrength(uint hero) public pure returns (uint) {
        return (hero >> 2) & 0x1F;
    }

    function getHealth(uint hero) public pure returns (uint) {
        return (hero >> 7) & 0x1F;
    }

    function getDexerity(uint hero) public pure returns (uint) {
        return (hero >> 12) & 0x1F;
    }

    function getIntellect(uint hero) public pure returns (uint) {
        return (hero >> 17) & 0x1F;
    }

    function getMagic(uint hero) public pure returns (uint) {
        return (hero >> 22) & 0x1F;
    }

    /* 
    * This is a non state changing function which can be called for free, and only needs a provider (not signer)
    * memory tells that the return value comes from the body of the function itself
    * Can also be storage if the value of value is coming from the contract
    * Here ether would be smart enough to map the addressToHeroes in the storage to one in memory, and then return the same
    */
    function getHeroes() public view returns (uint[] memory) {
        return addressToHeroes[msg.sender];
    }

    /* 
    * A utility function for random number generation
    * Works on the current block diffculty and timestamp
    * Not secure, can be hacked. There are complete blockchains dedicated to random number generation
    */
    function generateRandom() public virtual view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.prevrandao, block.timestamp)));
    }

}

/*
* We can store the values of these offsets as constants to ease programming but storing data on blockchain is expensive. 
* It's better to hardcode stuff and make it a bit unreadable, than to use the normal programming practices and incurr heavy costs.
*/