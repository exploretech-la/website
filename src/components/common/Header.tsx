import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigationType } from "react-router-dom";
import HomePageSections from "../../content/sections";
import LogoWithIcons from "../../static/svg/logo-with-icons-navy.svg";
import CompassLogo from "../../static/svg/logo-compass.svg";
import Collapse from "../Collapse";
import { EVENT_ROUTES } from "../../content/events";

const menus = [
  {
    id: "home",
    title: "Home",
    links: [
      ["Home", "/"],
      ["About", `/#${HomePageSections.ABOUT.name}`],
      ["Get Involved", `/#${HomePageSections.GET_INVOLVED.name}`],
      ["Speakers", `/#${HomePageSections.SPEAKERS.name}`],
      ["Sponsors", `/#${HomePageSections.SPONSORS.name}`],
    ],
  },
  { id: "events", title: "Events", links: [["Ignite", "/ignite"]] },
  {
    id: "resources",
    title: "Resources",
    links: [...EVENT_ROUTES]
      .reverse()
      .map(({ route, navLabel }) => [navLabel, route] as const),
  },
] as const;

type MenuId = (typeof menus)[number]["id"];
export default function Header() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const [expanded, setExpanded] = useState(false);
  const [menu, setMenu] = useState<MenuId | null>(null);
  const header = useRef<HTMLElement>(null);
  const pendingHash = useRef<string | null>(null);

  useEffect(() => {
    pendingHash.current = navigationType === "POP" ? null : location.hash;
    setMenu(null);
    setExpanded(false);
  }, [location.key, location.hash, navigationType]);

  useEffect(() => {
    if (!menu) return;
    const closeOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setMenu(null);
    };
    document.addEventListener("click", closeOutside);
    return () => document.removeEventListener("click", closeOutside);
  }, [menu]);

  const selectLink = (href: string) => {
    const hash = new URL(href, window.location.href).hash;
    pendingHash.current = hash;
    setMenu(null);
    setExpanded(false);
    // Same-hash links may not change location, so scroll even without a route effect.
    if (!expanded && hash)
      requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView(),
      );
  };

  const renderMenu = (item: (typeof menus)[number]) => (
    <div
      className={`site-menu site-nav-item${menu === item.id ? " show" : ""}`}
      key={item.id}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setMenu(null);
          document.getElementById(`navbar-${item.id}`)?.focus();
          event.preventDefault();
        }
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          if (event.key === "ArrowUp" && menu !== item.id) return;
          event.preventDefault();
          setMenu(item.id);
          const parent = event.currentTarget;
          const backwards = event.key === "ArrowUp";
          requestAnimationFrame(() => {
            const links = Array.from(
              parent.querySelectorAll<HTMLAnchorElement>(".site-menu-link"),
            );
            const index = links.findIndex(
              (link) => link === document.activeElement,
            );
            const next = Math.max(
              0,
              Math.min(links.length - 1, index + (backwards ? -1 : 1)),
            );
            links[next]?.focus();
          });
        }
      }}
      onBlur={(event) => {
        if (
          event.relatedTarget instanceof Node &&
          !event.currentTarget.contains(event.relatedTarget)
        )
          setMenu(null);
      }}
    >
      <a
        aria-haspopup="true"
        aria-expanded={menu === item.id}
        id={`navbar-${item.id}`}
        href="#"
        className="site-menu-toggle site-nav-link"
        role="button"
        onClick={(event) => {
          event.preventDefault();
          setMenu((current) => (current === item.id ? null : item.id));
        }}
        onKeyDown={(event) => {
          if (event.key === " ") {
            event.preventDefault();
            setMenu((current) => (current === item.id ? null : item.id));
          }
        }}
      >
        {item.title}
      </a>
      {menu === item.id && (
        <div
          className="site-menu-items show"
          aria-labelledby={`navbar-${item.id}`}
        >
          {item.links.map(([label, href]) => (
            <Link
              key={href}
              className="site-menu-link"
              to={href}
              onClick={() => selectLink(href)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <nav
      ref={header}
      className={`Section Header${location.pathname === "/" ? " Home" : ""} site-nav site-nav-responsive site-nav-light`}
    >
      <Link className="site-brand" to="/" onClick={() => selectLink("/")}>
        <img src={CompassLogo} className="logo-compass" alt="logo-compass" />
        <img
          src={LogoWithIcons}
          className="logo-with-icons"
          alt="logo-with-icons"
        />
      </Link>
      <button
        type="button"
        aria-label="Toggle navigation"
        aria-controls="site-navigation"
        aria-expanded={expanded}
        className={`site-nav-toggle${expanded ? "" : " collapsed"}`}
        onClick={() => {
          pendingHash.current = null;
          setExpanded((value) => !value);
        }}
      >
        <span className="site-nav-toggle-icon" />
      </button>
      <Collapse
        in={expanded}
        id="site-navigation"
        className="nav-align-end site-nav-panel"
        onExited={() => {
          if (pendingHash.current)
            document
              .getElementById(pendingHash.current.slice(1))
              ?.scrollIntoView();
          pendingHash.current = null;
        }}
      >
        <div className="site-nav-items">
          <div className="site-nav-items">
            {renderMenu(menus[0])}
            <div className="site-nav-item">
              {" "}
              <Link
                className="site-nav-link"
                to="/our_team"
                onClick={() => selectLink("/our_team")}
              >
                Our Team
              </Link>{" "}
            </div>
            {renderMenu(menus[1])}
            {renderMenu(menus[2])}
          </div>
        </div>
      </Collapse>
    </nav>
  );
}
