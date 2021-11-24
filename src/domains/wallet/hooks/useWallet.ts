import detectEthereumProvider from "@metamask/detect-provider";
import { EthereumProvider } from "hardhat/types";
import { useQuery } from "react-query";

export function useWallet() {
  return useQuery<EthereumProvider>("wallet", async () => {
    const provider = await detectEthereumProvider();
    return provider as EthereumProvider;
  });
}
