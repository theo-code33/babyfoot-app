import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GameContextProvider } from "./context/gameContext";
import { UserContextProvider } from "./context/userContext";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./style.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <GameContextProvider>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </GameContextProvider>
);

serviceWorkerRegistration.register();
