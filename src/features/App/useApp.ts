import { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import type { EthereumProvider } from "@wave3/types";
import type { UseAppProps } from "features/App/types";

export function useApp(): UseAppProps {
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

  const onConnectWalletClicked = async () => {
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

  return {
    models: {
      user: currentUser,
      active,
    },
    handlers: {
      onConnectWalletClicked,
    },
  };
}
