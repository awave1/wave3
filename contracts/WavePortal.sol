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

	function wave(string memory _message) public {
		totalWaveCount++;
		console.log("%s waved", msg.sender);

		// Store a wave from a sender with a given message and a timestamp
		waves.push(Wave(msg.sender, _message, block.timestamp));

		emit WaveEvent(msg.sender, _message, block.timestamp);
	}

	function getTotalWaveCount() public view returns (uint256) {
		return totalWaveCount;
	}

	function getAllWaves() public view returns (Wave[] memory) {
		return waves;
	}
}
