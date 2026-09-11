import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "../styles/theme.css";

const root = document.getElementById("root");
if (!root) throw new Error("The application root is missing from index.html");
createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
