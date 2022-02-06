# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help

npx hardhat run scripts/deploy.js --network rinkeby
npx hardhat verify CONTRACT_ADDRESS --network rinkeby
```

# GAS COST

- 1st iteration: .019 to deploy contrat, .03 to mint (YIKES) https://rinkeby.etherscan.io/address/0x9f1Bf94c96702c39c68a741Fd5663745fA28aaB4
- 2nd iteration: .002 to deploy contract, 0.001 to mint https://rinkeby.etherscan.io/address/0x93125ED3a29955e6C7b413def5DF809806e72158
