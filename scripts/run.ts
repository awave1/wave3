import { ethers } from "hardhat";

async function main() {
  const [owner, otherPerson] = await ethers.getSigners();

  const waveContractFactory = await ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  console.log("WavePortal Address: ", waveContract.address);
  console.log("Deployed by: ", owner.address);

  let contractBalance = await ethers.provider.getBalance(waveContract.address);

  console.log(`Contract Balance: ${ethers.utils.formatEther(contractBalance)}`);

  let waveTransaction = await waveContract.wave("ayooo !");
  await waveTransaction.wait();
  contractBalance = await ethers.provider.getBalance(waveContract.address);
  console.log(
    `Contract Balance (after wave): ${ethers.utils.formatEther(
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
