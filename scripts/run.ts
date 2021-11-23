import { ethers } from "hardhat";

async function main() {
  const [owner, otherPerson] = await ethers.getSigners();

  const waveContractFactory = await ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  console.log("Deployed to: ", waveContract.address);
  console.log("Deployed by: ", owner.address);

  let waveCount = await waveContract.getTotalWaveCount();
  const wave = await waveContract.wave();
  await wave.wait();

  waveCount = await waveContract.getTotalWaveCount();
}

async function runMain() {
  try {
    await main();
  } catch (error) {
    console.error(error);
  }
}

runMain();
