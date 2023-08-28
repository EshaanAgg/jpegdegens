import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Hero", () => {
	async function createHero() {
		// Deploy the contract
		const Hero = await ethers.getContractFactory("TestHero");
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

	it("Should create the heroes correctly with the right stats", async () => {
		const hero = await createHero();

		await hero.setRandom(69);
		await hero.createHero(0, {
			value: ethers.utils.parseEther("0.05"),
		});

		const heroes = await hero.getHeroes();
		expect(heroes.length).to.equal(1);

		const h = heroes[0];
		expect(await hero.getClass(h)).to.equal(0);
		expect(await hero.getMagic(h)).to.equal(16);
		expect(await hero.getHealth(h)).to.equal(2);
	});
});
