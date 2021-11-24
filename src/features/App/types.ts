export interface UseAppProps {
  models: {
    user: string | null;
    active: boolean;
  };
  handlers: {
    onConnectWalletClicked: () => void;
  };
}
