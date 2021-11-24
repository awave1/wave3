import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import detectEthereumProvider from "@metamask/detect-provider";
import type { EthereumProvider } from "./types";
import "./App.css";

export function App() {
  const [active, setActive] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [ethProvider, setEthProvider] = useState<EthereumProvider | null>(null);

  const checkWalletConnection = async () => {
    const provider = await detectEthereumProvider({ mustBeMetaMask: true });
    if (provider) {
      setEthProvider((window?.ethereum as EthereumProvider) ?? null);
      setActive(true);
    } else {
      console.warn("Metamask isn't connected");
    }
  };

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const onConnectWallet = async () => {
    if (!active) {
      console.warn("Metamask isn't connected");
      return;
    }

    if (currentUser) {
      return;
    }

    const accounts = (await ethProvider?.request({
      method: "eth_requestAccounts",
    })) as string[];

    setCurrentUser(accounts[0]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <animated.div>{currentUser ? `👋` : `😱`}</animated.div>
        {active && !currentUser ? (
          <button onClick={onConnectWallet}>Connect</button>
        ) : null}
      </header>
    </div>
  );
}
