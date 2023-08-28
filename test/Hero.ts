import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Hero", () => {
	async function createHero() {
		// Deploy the contract
		const Hero = await ethers.getContractFactory("Hero");
		const hero = await Hero.deploy();
		await hero.deployed();

		return hero;
	}

	let hero;
	before(async function () {
		hero = await createHero();
	});

	it("Should fail at creating hero because of payment", async () => {
		let e;

		try {
			await hero.createHero(0, {
				value: ethers.utils.parseEther("0.049"),
			});
		} catch (err) {
			e = err;
		}

		expect(e.message.includes("Please send atleast 0.05 ether.")).to.equal(true);
	});

	it("Should get an empty array of heroes if I haven't bought any heroes", async () => {
		expect(await hero.getHeroes()).to.deep.equal([]);
	});
});
