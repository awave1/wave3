import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider as ReduxProvider } from "react-redux";
import { ReactQueryDevtools } from "react-query/devtools";
import { App } from "features/App";
import { store } from "@wave3/app/store/store";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        {process.env.NODE_ENV === "development" ? (
          <ReactQueryDevtools initialIsOpen={false} />
        ) : null}
      </QueryClientProvider>
    </ReduxProvider>
  </StrictMode>,
  document.getElementById("root")
);
