import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  canonicalUrl,
  getPageMetadata,
  SHARE_IMAGE,
  SHARE_IMAGE_ALT,
} from "../content/pages";

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = getPageMetadata(pathname);
    const url = canonicalUrl(page);
    document.title = page.title;
    setMeta("name", "description", page.description);
    setMeta(
      "name",
      "robots",
      page.indexable ? "index,follow" : "noindex,follow",
    );
    for (const [key, value] of Object.entries({
      "og:type": "website",
      "og:site_name": "exploretech.la",
      "og:title": page.title,
      "og:description": page.description,
      "og:url": url,
      "og:image": SHARE_IMAGE,
      "og:image:alt": SHARE_IMAGE_ALT,
    }))
      setMeta("property", key, value);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", page.title);
    setMeta("name", "twitter:description", page.description);
    setMeta("name", "twitter:image", SHARE_IMAGE);
    setMeta("name", "twitter:image:alt", SHARE_IMAGE_ALT);
    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [pathname]);
  return null;
}
