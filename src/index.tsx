import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GameContextProvider } from "./context/gameContext";
import { UserContextProvider } from "./context/userContext";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./style.css";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (const registration of registrations) {
      registration.unregister();
    }
  });
}

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
