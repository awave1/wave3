import { useState } from "react";
import type { UseAppProps } from "features/App/types";
import { useWallet } from "domains/wallet/hooks/useWallet";

export function useApp(): UseAppProps {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const { isLoading, isError, data: ethProvider } = useWallet();

  const onConnectWalletClicked = async () => {
    if (isError && !isLoading && !ethProvider) {
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
      active: !!ethProvider && !isLoading && !isError,
      isLoading,
    },
    handlers: {
      onConnectWalletClicked,
    },
  };
}
