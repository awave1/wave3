import { useApp } from "features/App/useApp";
import { Wave } from "features/Wave";
import { Transactions } from "features/Transactions";

export function App() {
  const { models, handlers } = useApp();

  return (
    <div className="h-screen bg-gray-900">
      <div className="container mx-auto h-full">
        <main className="justify-center align-middle flex flex-col h-full">
          <h1 className="self-start my-0 mx-auto text-2xl">
            {models?.user ? `👋` : `🙈`}
          </h1>
          {models.active && !models?.user ? (
            <button
              className="self-start my-6 mx-auto py-2 px-4 bg-gray-200 text-gray-900 uppercase font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none"
              onClick={handlers.onConnectWalletClicked}
            >
              Connect
            </button>
          ) : null}
          {models.active && models.user ? <Wave /> : null}
          {models.active && models.user ? (
            <div className="flex flex-col">
              <h2 className="font-bold text-xl text-gray-50 mt-10">
                Transaction History
              </h2>
              <Transactions />
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}
