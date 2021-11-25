// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
	struct Wave {
		address fromUser;
		string message;
		uint256 timestamp;
	}

	event WaveEvent(address indexed from, string message, uint256 timestamp);

	uint256 private totalWaveCount;
	Wave[] private waves;
	uint256 private seed;
	mapping(address => uint256) public lastWavedAt;

	constructor() payable {
		seed = (block.timestamp + block.difficulty) % 100;
	}

	function wave(string memory _message) public {
		// Cooldown
		require(
			lastWavedAt[msg.sender] + 15 minutes < block.timestamp,
			"Need to wait 15 minutes"
		);

		lastWavedAt[msg.sender] = block.timestamp;

		totalWaveCount++;
		console.log("%s waved", msg.sender);

		// Store a wave from a sender with a given message and a timestamp
		waves.push(Wave(msg.sender, _message, block.timestamp));

		seed = (block.difficulty + block.timestamp + seed) % 100;

		if (seed <= 50) {
			console.log("%s won!", msg.sender);
			uint256 ethPrizeAmount = 0.0001 ether;
			require(
				ethPrizeAmount <= address(this).balance,
				"Trying to withdraw more money than the account has"
			);

			(bool success, ) = (msg.sender).call{ value: ethPrizeAmount }("");
			require(
				success,
				"Failed to withdraw money from contract"
			);
		}

		emit WaveEvent(msg.sender, _message, block.timestamp);
	}

	function getTotalWaveCount() public view returns (uint256) {
		return totalWaveCount;
	}

	function getAllWaves() public view returns (Wave[] memory) {
		return waves;
	}
}
