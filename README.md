# JPEGDegens

This project demonstrates a basic Hardhat use case and later uses `wepback` to create a simple website for interacting with the contacts.

### Contracts

- `Hello World`: Print "Hello World" to the console.
- `Counter`: Maintain and increment a simple counter. Use `events` to hook into state changes for the counter instead of traditional `await`s.

### HardHat Help

```shell
npx hardhat help
npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

### Using Webpack

You can create a `.env` with a `CONTRACT_ADDRESS` for the contract that you want to interact with. Then you need to run `npx wepback` to generate a `dist` folder of all the compiled source code. Finally you can serve the `dist` folder to view the simple web application. There are multiple ways of doing the same, but I prefer using `Python` simply:

```script
cd dist
python3 -m http.server 6969
```

After executing the same, you can go to `http:localhost:6969/` to view the simple web application.
