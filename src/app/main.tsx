import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { normalizePath } from "../content/pages";
import "../styles/theme.css";

const root = document.getElementById("root");
if (!root) throw new Error("The application root is missing from index.html");
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
if (root.dataset.page === normalizePath(window.location.pathname)) {
  hydrateRoot(root, app);
} else {
  // The Pages 404 recovery can serve the home shell for a different route.
  createRoot(root).render(app);
}
