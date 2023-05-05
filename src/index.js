import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { MailProvider } from "./context/MailContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MailProvider>
      <Router>
        <App />
      </Router>
    </MailProvider>
  </React.StrictMode>
);

reportWebVitals();
