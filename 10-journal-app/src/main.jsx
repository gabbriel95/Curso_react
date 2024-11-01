import React from "react";
import ReactDOM from "react-dom/client";
import { JournalApp } from "./JournalApp.jsx";
import { Provider } from "react-redux";

import { AppTheme } from "./theme";
import { store } from "./store";

import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppTheme>
        <JournalApp />
      </AppTheme>
    </Provider>
  </React.StrictMode>
);
