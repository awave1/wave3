// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
	uint256 totalWaveCount;

	constructor() {
		console.log("tema's first contract !!!");
	}

	function wave() public {
		totalWaveCount++;
		console.log("waved: %s", msg.sender);
	}


	function getTotalWaveCount() public view returns (uint256) {
		return totalWaveCount;
	}
}
