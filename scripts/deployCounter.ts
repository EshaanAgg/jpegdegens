import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";

async function deploy() {
	const Counter = await ethers.getContractFactory("Counter");
	const count = await Counter.deploy();
	await count.deployed();

	return count;
}

// @ts-ignore
async function runCounter(counter) {
	await counter.count();
	console.log("Counter: ", await counter.getCount());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deploy()
	.then(runCounter)
	.catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});
