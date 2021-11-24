import { useApp } from "features/App/useApp";
import { AppStyle, AppHeaderStyle } from "features/App/style.css";
import { Wave } from "features/Wave";

export function App() {
  const { models, handlers } = useApp();

  return (
    <div className={AppStyle}>
      <header className={AppHeaderStyle}>
        <p>{models?.user ? `👋` : `😱`}</p>
        {models.active && !models?.user ? (
          <button onClick={handlers.onConnectWalletClicked}>Connect</button>
        ) : null}
        {models.active && models.user ? <Wave /> : null}
      </header>
    </div>
  );
}
