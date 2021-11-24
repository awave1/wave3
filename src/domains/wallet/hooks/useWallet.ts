import detectEthereumProvider from "@metamask/detect-provider";
import { useQuery } from "react-query";

export function useWallet() {
  return useQuery("wallet", () => detectEthereumProvider());
}
