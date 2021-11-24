export interface UseAppProps {
  models: {
    user: string | null;
    active: boolean;
    isLoading: boolean;
  };
  handlers: {
    onConnectWalletClicked: () => void;
  };
}
