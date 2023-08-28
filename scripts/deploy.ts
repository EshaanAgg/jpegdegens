import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";

async function deploy() {
	const HelloWorld = await ethers.getContractFactory("HelloWorld");
	const hello = await HelloWorld.deploy();
	await hello.deployed();

	return hello;
}

// @ts-ignore
async function sayHello(hello) {
	console.log("Say Hello: ", await hello.hello());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deploy()
	.then(sayHello)
	.catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});
