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

  const props = useSpring({
    x: currentUser ? 1 : 0,
    config: { duration: 1000 },
  });

  return (
    <div className="App">
      <header className="App-header">
        <animated.div
          style={{
            transform: props.x
              .to({
                range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                output: [1, 0.97, 0.9, 1.5, 0.9, 2.0, 1.03, 1],
              })
              .to((x) => `scale(${x})`),
          }}
        >
          {currentUser ? `👋` : `😱`}
        </animated.div>
        {active && !currentUser ? (
          <button onClick={onConnectWallet}>Connect</button>
        ) : null}
      </header>
    </div>
  );
}
