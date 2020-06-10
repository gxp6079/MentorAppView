import React from "react";
import ReactDOM from "react-dom";
import "@athena/forge/static/css/forge.css";
import { Root } from "@athena/forge";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <Router>
    <Root>
      <App />
    </Root>
  </Router>,
  document.getElementById("root")
);
