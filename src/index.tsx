import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Analytics from "analytics";
import googleTagManager from "@analytics/google-tag-manager";
import TagManager from "react-gtm-module";

if (process.env.REACT_APP_GTM_ID) {
  TagManager.initialize({
    gtmId: process.env.REACT_APP_GTM_ID,
  });
  TagManager.dataLayer({
    dataLayer: {
      apmProject: "tryber-backoffice",
    },
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
