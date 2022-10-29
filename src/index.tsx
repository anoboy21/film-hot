import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { SWRConfig } from "swr";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SWRConfig
        value={{ revalidateOnFocus: false, shouldRetryOnError: false }}
      >
        <App />
      </SWRConfig>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
