import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import store from "./store.js";
import { Provider } from "react-redux";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <Router>
        <App />
      </Router>
    </StrictMode>
  </Provider>
);
