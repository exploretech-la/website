import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigationType } from "react-router-dom";
import Collapse from "../Collapse";
import { focusHashTarget } from "../../app/navigation";
import { normalizePath } from "../../content/pages";
import GA from "../../util/GoogleAnalytics";
import LogoWithIcons from "../../static/svg/logo-with-icons-navy.svg";
import CompassLogo from "../../static/svg/logo-compass.svg";

type MenuId = "programs" | "involved" | "about";
const menus = {
  programs: {
    title: "Programs",
    links: [
      ["Annual event and archives", "/events"],
      ["Ignite workshops", "/ignite"],
    ],
  },
  involved: {
    title: "Get involved",
    links: [
      ["UCLA volunteers", "/get-involved#volunteer"],
      ["Partners and sponsors", "/get-involved#partners"],
      ["All participation options", "/get-involved"],
    ],
  },
  about: {
    title: "About",
    links: [
      ["Our story", "/#about"],
      ["Our Team", "/our_team/leadership"],
    ],
  },
} as const;

export default function Header() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const [expanded, setExpanded] = useState(false);
  const [menu, setMenu] = useState<MenuId | null>(null);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const pendingHash = useRef<string | null>(null);

  useEffect(() => {
    pendingHash.current = navigationType === "POP" ? null : location.hash;
    setMenu(null);
    setExpanded(false);
  }, [location.key, location.hash, navigationType]);

  useEffect(() => {
    if (!expanded && !menu) return;
    const closeOutside = (event: globalThis.MouseEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      ) {
        pendingHash.current = null;
        setMenu(null);
        setExpanded(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setMenu(null);
      // Safari can leave focus outside a button that was opened with a pointer.
      if (expanded && toggle.current?.getClientRects().length) {
        pendingHash.current = null;
        setExpanded(false);
        toggle.current.focus();
      } else if (menu) document.getElementById(`nav-${menu}`)?.focus();
    };
    document.addEventListener("click", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("click", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [expanded, menu]);

  const selectLink = (
    href: string,
    label: string,
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    pendingHash.current = new URL(href, window.location.href).hash;
    setMenu(null);
    setExpanded(false);
    GA.trackEvent({ category: "Navigation", action: "Navigate", label });
  };

  const isCurrent = (href: string) => {
    const [path, hash] = href.split("#");
    return (
      normalizePath(location.pathname) === normalizePath(path) &&
      (!hash || location.hash === `#${hash}`)
    );
  };

  const renderMenu = (id: MenuId) => {
    const item = menus[id];
    const open = menu === id;
    return (
      <div
        className="site-menu site-nav-item"
        key={id}
        onBlur={(event) => {
          if (
            event.relatedTarget instanceof Node &&
            !event.currentTarget.contains(event.relatedTarget)
          )
            setMenu(null);
        }}
        onKeyDown={(event) => {
          if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
          if (event.key === "ArrowUp" && !open) return;
          event.preventDefault();
          setMenu(id);
          const parent = event.currentTarget;
          const backwards = event.key === "ArrowUp";
          requestAnimationFrame(() => {
            const links = Array.from(
              parent.querySelectorAll<HTMLAnchorElement>(".site-menu-link"),
            );
            const index = links.findIndex(
              (link) => link === document.activeElement,
            );
            links[
              Math.max(
                0,
                Math.min(links.length - 1, index + (backwards ? -1 : 1)),
              )
            ]?.focus();
          });
        }}
      >
        <button
          type="button"
          className="site-menu-toggle site-nav-link"
          id={`nav-${id}`}
          aria-expanded={open}
          aria-controls={`nav-${id}-links`}
          onClick={(event) => {
            event.currentTarget.focus();
            setMenu((current) => (current === id ? null : id));
          }}
        >
          {item.title}
          <span aria-hidden="true" className="nav-chevron" />
        </button>
        <div id={`nav-${id}-links`} className="site-menu-items" hidden={!open}>
          {item.links.map(([label, href]) => (
            <Link
              key={href}
              to={href}
              className="site-menu-link"
              aria-current={isCurrent(href) ? "page" : undefined}
              onClick={(event) => selectLink(href, label, event)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <nav ref={header} className="Header site-nav" aria-label="Main navigation">
      <div className="page-container site-nav-inner">
        <Link
          className="site-brand"
          to="/"
          aria-label="exploretech.la home"
          onClick={(event) => selectLink("/", "Home", event)}
        >
          <img src={CompassLogo} className="logo-compass" alt="" />
          <img src={LogoWithIcons} className="logo-with-icons" alt="" />
          <span className="brand-name" aria-hidden="true">
            exploretech.la
          </span>
        </Link>
        <button
          ref={toggle}
          type="button"
          aria-label="Toggle navigation"
          aria-controls="site-navigation"
          aria-expanded={expanded}
          className="site-nav-toggle"
          onClick={(event) => {
            event.currentTarget.focus();
            pendingHash.current = null;
            setMenu(null);
            setExpanded((value) => !value);
          }}
        >
          <span className="site-nav-toggle-icon" aria-hidden="true" />
          <span className="visually-hidden">Menu</span>
        </button>
        <Collapse
          in={expanded}
          id="site-navigation"
          className="site-nav-panel"
          onExited={() => {
            if (pendingHash.current) focusHashTarget(pendingHash.current);
            pendingHash.current = null;
          }}
        >
          <div className="site-nav-items">
            {renderMenu("programs")}
            <Link
              to="/get-involved#schools"
              className="site-nav-link"
              aria-current={
                isCurrent("/get-involved#schools") ? "page" : undefined
              }
              onClick={(event) =>
                selectLink("/get-involved#schools", "For schools", event)
              }
            >
              For schools
            </Link>
            {renderMenu("involved")}
            {renderMenu("about")}
          </div>
        </Collapse>
      </div>
    </nav>
  );
}
