import { useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "domains/wallet/hooks/useWallet";
import { useWaveCount } from "domains/waveContract/hooks/useWaveCount";
import WavePortalABI from "../../../artifacts/contracts/WavePortal.sol/WavePortal.json";
import type { ChangeEvent } from "react";
import type { UseWaveProps } from "features/Wave/types";

export function useWave(): UseWaveProps {
  const { data: ethProvider } = useWallet();
  const {
    data: waveCount,
    isLoading,
    isError,
    refetch: refetchWaveCount,
  } = useWaveCount();
  const [mining, setMining] = useState(false);
  const [waveHash, setWaveHash] = useState("");
  const [message, setMessage] = useState("");

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
      // @ts-ignore
      import.meta.env.VITE_WAVE_PORTAL_ADDRESS ?? "MISSING_PORTAL_ADDRESS",
      WavePortalABI?.abi ?? {},
      signer
    );

    try {
      const waveTransaction = await wavePortalContract.wave(
        message.length === 0 ? "Anon waved" : message
      );
      console.log("mining ...", waveTransaction.hash);
      setWaveHash(waveTransaction.hash);

      setMining(true);

      await waveTransaction.wait();
      console.log("minted ✅", waveTransaction.hash);

      refetchWaveCount();
    } catch (err) {
      console.error("Failed to mint the wave", err);
    } finally {
      setMining(false);
      setMessage("");
    }
  };

  const onMessageInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  return {
    models: {
      waveCount: isLoading || isError ? 0 : waveCount,
      mining,
      waveHash,
      message,
    },
    handlers: {
      onWaveClicked,
      onMessageInput,
    },
  };
}
