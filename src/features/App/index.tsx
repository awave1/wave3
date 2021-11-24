import { useApp } from "features/App/useApp";
import { AppStyle, AppHeaderStyle } from "features/App/style.css";

export function App() {
  const { models, handlers } = useApp();

  return (
    <div className={AppStyle}>
      <header className={AppHeaderStyle}>
        <p>{models?.user ? `👋` : `😱`}</p>
        {models.active && !models?.user ? (
          <button onClick={handlers.onConnectWalletClicked}>Connect</button>
        ) : null}
      </header>
    </div>
  );
}
