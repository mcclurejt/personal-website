const hre = require("hardhat");

const main = async () => {
  const svgContractFactory = await hre.ethers.getContractFactory(
    "OtterSVGData"
  );
  const svgContract = await svgContractFactory.deploy([
    { attribute: "background", color: "#ec008c" },
    { attribute: "background", color: "#8d42f5" },
    { attribute: "background", color: "#f57e42" },
    { attribute: "water", color: "#3cc" },
    { attribute: "water", color: "#42f595" },
    { attribute: "water", color: "#424bf5" },
    { attribute: "limb", color: "#8c5728" },
    { attribute: "limb", color: "#1a1717" },
    { attribute: "limb", color: "#806e6b" },
    { attribute: "body", color: "#5e2f00" },
    { attribute: "body", color: "#d49400" },
    { attribute: "body", color: "#211407" },
    { attribute: "belly", color: "#c49a6c" },
    { attribute: "belly", color: "#b511b8" },
    { attribute: "belly", color: "#b81138" },
    { attribute: "ball1", color: "#55ddff" },
    { attribute: "ball1", color: "#31e810" },
    { attribute: "ball2", color: "#fffb1f" },
    { attribute: "ball2", color: "#e86b05" },
    { attribute: "ball3", color: "#d12020" },
    { attribute: "ball3", color: "#a005e8" },
  ]);
  await svgContract.deployed();

  const nftContractFactory = await hre.ethers.getContractFactory("OtterNFT");
  const nftContract = await nftContractFactory.deploy(svgContract.address);
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // Call the function.
  let txn = await nftContract.makeAnOtterNFT();
  // Wait for it to be minted.
  await txn.wait();
  console.log("Minted NFT #1");

  txn = await nftContract.makeAnOtterNFT();
  // Wait for it to be minted.
  await txn.wait();
  console.log("Minted NFT #2");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
