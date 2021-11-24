import { useApp } from "features/App/useApp";

export function App() {
  const { models, handlers } = useApp();

  return (
    <div className="App">
      <header className="App-header">
        <p>{models?.user ? `👋` : `😱`}</p>
        {models.active && !models?.user ? (
          <button onClick={handlers.onConnectWalletClicked}>Connect</button>
        ) : null}
      </header>
    </div>
  );
}
