import { useEffect, useState } from "react";
import "./App.css";

export function App() {
  const [active, setActive] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const checkWalletConnection = () => {
    if (window.ethereum) {
      console.log(window.ethereum);

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

    const { ethereum } = window;

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log(accounts);
    setCurrentUser(accounts[0]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>{currentUser ? `👋` : `😱`}</p>
        {active && !currentUser ? (
          <button onClick={onConnectWallet}>Connect</button>
        ) : null}
      </header>
    </div>
  );
}
