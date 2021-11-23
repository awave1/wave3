import { EthereumProvider as ETHProvider } from "hardhat/types";

export type EthereumProvider = typeof window.ethereum & ETHProvider;
