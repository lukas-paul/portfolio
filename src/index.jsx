import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Applied before the first paint so every route (not just Home, where the
// toggle lives) renders in the right theme from the start.
if (localStorage.getItem("theme") === "dark") {
    document.documentElement.dataset.theme = "dark";
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
