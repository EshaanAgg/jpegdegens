# JPEGDegens

This is a basic design of a RPG (a very very simple one indeed) implemented via a simple smart contract. We also demonstrate a basic Hardhat use case and later use `wepback` to create a simple website for interacting with the contacts.

I also try to dwell into the Diamond pattern to address cotracts that are too large (`>= 24 Kb`) and scenarios where a contract needs to be updated (and not deployed to a new address).

### Game Design and Requirements

- We want to be able to generate random Hereos.
- The user gets to put in their class of here on generation (`Mage`, `Healer`, `Barbarian`)
- Class will not influence stats created, therefore getting an epic hero will be hard.
- I want to be paid, thus will be charging `0.05 ETH` per hero!
- Should be able to get my heroes that I have generated.
- Heroes should be stored on the chain.
- `stats` are `strength`, `health`, `intellect`, `magic` and `dexterity`
- `stats` are randomly generated of a scale of 1 - 18.
- The stats are randomly picked and their amplitude is randomly determined according to the following:

```
Stat 1 can max at 18
Stat 2 can max at 17
Stat 3 can max at 16
...
```

- You could imagine these heros as being an `NFT`. They are non divisible.
- The primary aim of this contract would be to showcase more complex datatypes that can be used in Solidity.

### Contracts

- `Hello World`: Print "Hello World" to the console.
- `Counter`: Maintain and increment a simple counter. Use `events` to hook into state changes for the counter instead of traditional `await`s.
- `Hero`: The contract for the RPG.

### HardHat Help

```shell
npx hardhat help
npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts --network localhost
```

### Using Webpack

You can create a `.env` with a `CONTRACT_ADDRESS` for the contract that you want to interact with. Then you need to run `npx wepback` to generate a `dist` folder of all the compiled source code. Finally you can serve the `dist` folder to view the simple web application. There are multiple ways of doing the same, but I prefer using `Python` simply:

```script
cd dist
python3 -m http.server 6969
```

After executing the same, you can go to `http:localhost:6969/` to view the simple web application.
