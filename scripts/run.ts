import { ethers } from "hardhat";

async function main() {
  const waveContractFactory = await ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  console.log("WavePortal Address: ", waveContract.address);

  let contractBalance = await ethers.provider.getBalance(waveContract.address);

  console.log(`Contract Balance: ${ethers.utils.formatEther(contractBalance)}`);

  let waveTransaction1 = await waveContract.wave("wave 1");
  await waveTransaction1.wait();

  let waveTransaction2 = await waveContract.wave("wave 2");
  await waveTransaction2.wait();

  contractBalance = await ethers.provider.getBalance(waveContract.address);
  console.log(
    `Contract Balance (after waves): ${ethers.utils.formatEther(
      contractBalance
    )}`
  );

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
