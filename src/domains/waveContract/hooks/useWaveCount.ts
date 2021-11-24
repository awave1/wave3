import { ethers } from "ethers";
import { useQuery } from "react-query";
import WavePortalABI from "../../../../artifacts/contracts/WavePortal.sol/WavePortal.json";

export function useWaveCount() {
  return useQuery("waveCount", () => {
    if (!window.ethereum) {
      throw Error("Missing global window.ethereum provider");
    }

    const { ethereum: ethProvider } = window;
    const web3Provider = new ethers.providers.Web3Provider(ethProvider);
    const signer = web3Provider.getSigner();

    const wavePortalContract = new ethers.Contract(
      (import.meta.env?.VITE_WAVE_PORTAL_ADDRESS as string) ??
        "MISSING_PORTAL_ADDRESS",
      WavePortalABI?.abi ?? {},
      signer
    );

    return wavePortalContract.getTotalWaveCount();
  });
}
