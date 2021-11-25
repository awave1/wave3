import { ethers } from "hardhat";

async function main() {
  const [owner, otherPerson] = await ethers.getSigners();

  const waveContractFactory = await ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  console.log("Deployed to: ", waveContract.address);
  console.log("Deployed by: ", owner.address);

  let waveToken = await waveContract.wave("ayooo !");
  await waveToken.wait();

  const [_, randomPerson] = await ethers.getSigners();
  waveToken = await waveContract.connect(randomPerson).wave("Another one");
  await waveToken.wait();

  const allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
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
