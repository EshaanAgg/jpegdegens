import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";

async function deploy(name, ...args) {
	const Contract = await ethers.getContractFactory(name);
	const contract = await Contract.deploy(...args);
	await contract.deployed();

	return contract;
}

// @ts-ignore
async function run() {
	const a = await deploy("A");
	const b = await deploy("B", a.address);
	await b.setB(1);

	console.log("A", await a.getA());
	console.log("B", await b.getB());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
run().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
