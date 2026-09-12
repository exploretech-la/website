import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";

export {
  SITE_PAGES,
  SHARE_IMAGE,
  SHARE_IMAGE_ALT,
  SITE_ORIGIN,
  getPageMetadata,
  canonicalUrl,
} from "../content/pages";

export function renderPage(path: string): string {
  return renderToString(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>,
  );
}
