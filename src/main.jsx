import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter as Router, HashRouter } from "react-router-dom";

import { store } from "./Redux/store";

import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>

  // </React.StrictMode>,
);

ReactDOM.createRoot(document.getElementById("portalDiv")).render(

)