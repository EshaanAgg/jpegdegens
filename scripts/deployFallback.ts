import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";

async function deploy() {
	const Fallback = await ethers.getContractFactory("Fallback");
	const fallback = await Fallback.deploy();
	await fallback.deployed();

	return fallback;
}

// @ts-ignore
async function run(fallback) {
	// Used to prevent compilation error from ethers during compilation
	const f = await ethers.getContractAt("IFallback", fallback.address);
	await f.doesNotExist();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deploy()
	.then(run)
	.catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});
