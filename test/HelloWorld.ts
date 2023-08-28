import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Hello World", () => {
	it("Should return the string 'Hello World'", async () => {
		// Deploy the contract
		const HelloWorld = await ethers.getContractFactory("HelloWorld");
		const hello = await HelloWorld.deploy();
		await hello.deployed();

		// Test the contract
		expect(await hello.hello()).to.equal("Hello World");
	});
});
