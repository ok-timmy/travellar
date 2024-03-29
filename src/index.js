import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import { FilterProvider } from "./components/Context/ContextWrapper";

ReactDOM.render(
  <React.StrictMode>
    <FilterProvider>
      <MoralisProvider
        appId="FavTCaEmsyOOViBUKSKwLwQrZmVYM3s0WDAO7JBa"
        serverUrl="https://iukwfltrdns5.usemoralis.com:2053/server"
      >
        <NotificationProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NotificationProvider>
      </MoralisProvider>
    </FilterProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
