import { ethers } from "ethers";
import { useQuery } from "react-query";
import WavePortalABI from "../../../../artifacts/contracts/WavePortal.sol/WavePortal.json";
import type { BigNumber } from "ethers";
import type { Wave } from "@wave3/domains/waveContract/models/Wave";

export function useAllWaves() {
  return useQuery<Wave[]>("allWaves", async () => {
    if (!window.ethereum) {
      throw Error("Missing global window.ethereum provider");
    }

    const { ethereum: ethProvider } = window;
    const web3Provider = new ethers.providers.Web3Provider(ethProvider);
    const signer = web3Provider.getSigner();

    const wavePortalContract = new ethers.Contract(
      // @ts-ignore
      import.meta.env.VITE_WAVE_PORTAL_ADDRESS ?? "MISSING_PORTAL_ADDRESS",
      WavePortalABI?.abi ?? {},
      signer
    );

    return (await wavePortalContract.getAllWaves()).map(
      (wave: [string, string, BigNumber]) => {
        const [fromUser, message, timestamp] = wave;

        return {
          fromUser,
          message,
          // @ts-ignore
          timestamp: new Date(timestamp * 1000),
        };
      }
    );
  });
}
