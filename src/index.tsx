import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GameContextProvider } from "./context/gameContext";
import { UserContextProvider } from "./context/userContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GameContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </GameContextProvider>
  </React.StrictMode>
);
