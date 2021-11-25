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

	uint256 totalWaveCount;
	Wave[] waves;

	constructor() payable {}

	function wave(string memory _message) public {
		totalWaveCount++;
		console.log("%s waved", msg.sender);

		// Store a wave from a sender with a given message and a timestamp
		waves.push(Wave(msg.sender, _message, block.timestamp));

		emit WaveEvent(msg.sender, _message, block.timestamp);

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

	function getTotalWaveCount() public view returns (uint256) {
		return totalWaveCount;
	}

	function getAllWaves() public view returns (Wave[] memory) {
		return waves;
	}
}
