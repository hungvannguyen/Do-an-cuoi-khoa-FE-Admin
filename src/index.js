import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Admin from "./pages/admin/Admin";
import axios from "axios";
import API_BASE_URL from "./apiConfig";
import reportWebVitals from "./reportWebVitals";
import "jquery/dist/jquery.min.js";
// React-router-dom imports

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

axios.defaults.baseURL = API_BASE_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <Router>
      <Admin />
    </Router>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
