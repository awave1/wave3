import { useState } from "react";
import type { UseAppProps } from "features/App/types";
import { useWallet } from "domains/wallet/hooks/useWallet";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { login } from "@wave3/features/App/store/appSlice";

export function useApp(): UseAppProps {
  const userAddress = useAppSelector((state) => state.app.userAddress);
  const dispatch = useAppDispatch();
  const { isLoading, isError, data: ethProvider } = useWallet();

  const onConnectWalletClicked = async () => {
    if (isError && !isLoading && !ethProvider) {
      console.warn("Metamask isn't connected");
      return;
    }

    if (userAddress) {
      return;
    }

    const accounts = (await ethProvider?.request({
      method: "eth_requestAccounts",
    })) as string[];

    if (accounts.length > 0) {
      dispatch(login(accounts[0]));
    } else {
      console.error("Failed to login: no accounts found");
    }
  };

  return {
    models: {
      user: userAddress,
      active: !!ethProvider && !isLoading && !isError,
      isLoading,
    },
    handlers: {
      onConnectWalletClicked,
    },
  };
}
