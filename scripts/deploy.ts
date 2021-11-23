import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log(`Deploying contracts with account: ${deployer.address}`);
  console.log(`Account balance: ${accountBalance}`);

  const WaveToken = await ethers.getContractFactory("WavePortal");
  const portal = await WaveToken.deploy();
  await portal.deployed();

  console.log(`WavePortal address: ${portal.address}`);
}

async function runMain() {
  try {
    await main();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

runMain();
