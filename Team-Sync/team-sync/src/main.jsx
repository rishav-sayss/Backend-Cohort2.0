import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.jsx";
import { AppRoutes } from "./app/routes/approutes.jsx";
import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

let queryClient =  new QueryClient();
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient} >
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </QueryClientProvider>,
);
