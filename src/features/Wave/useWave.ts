import { useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "domains/wallet/hooks/useWallet";
import { UseWaveProps } from "features/Wave/types";
import { useWaveCount } from "domains/waveContract/hooks/useWaveCount";
import WavePortalABI from "../../../artifacts/contracts/WavePortal.sol/WavePortal.json";

export function useWave(): UseWaveProps {
  const { data: ethProvider } = useWallet();
  // TODO: move to global state
  // const [waveCount, setWaveCount] = useState(0);
  const {
    data: waveCount,
    isLoading,
    isError,
    refetch: refetchWaveCount,
  } = useWaveCount();
  const [mining, setMining] = useState(false);
  const [waveHash, setWaveHash] = useState("");

  const onWaveClicked = async () => {
    if (!ethProvider) {
      console.warn("Ethereum provider is missing :(");
      return;
    }

    // types are being weird
    // @ts-ignore
    const web3Provider = new ethers.providers.Web3Provider(ethProvider);
    const signer = web3Provider.getSigner();

    const wavePortalContract = new ethers.Contract(
      (import.meta.env?.VITE_WAVE_PORTAL_ADDRESS as string) ??
        "MISSING_PORTAL_ADDRESS",
      WavePortalABI?.abi ?? {},
      signer
    );

    try {
      const waveToken = await wavePortalContract.wave();
      console.log("mining ...", waveToken.hash);
      setWaveHash(waveToken.hash);

      setMining(true);

      await waveToken.wait();
      console.log("minted ✅", waveToken.hash);

      refetchWaveCount();
    } catch (err) {
      console.error("Failed to mint the wave", err);
    } finally {
      setMining(false);
    }
  };

  return {
    models: {
      waveCount: isLoading || isError ? 0 : waveCount,
      mining,
      waveHash,
    },
    handlers: {
      onWaveClicked,
    },
  };
}
