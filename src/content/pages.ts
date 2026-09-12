import { EVENT_ROUTES } from "./events";
import { teamSections } from "./teams";

export const SITE_ORIGIN = "https://www.exploretech.la";
export const SHARE_IMAGE = `${SITE_ORIGIN}/placeholder.png`;
export const SHARE_IMAGE_ALT =
  "Participants collaborating on laptops at an exploretech.la workshop";

export interface PageMetadata {
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly indexable: boolean;
}

export const SITE_PAGES: readonly PageMetadata[] = [
  {
    path: "/",
    title:
      "Technology experiences for LA high school students | exploretech.la",
    description:
      "Explore hands-on technology programs led by UCLA students. Find information for schools, UCLA volunteers, and community partners.",
    indexable: true,
  },
  {
    path: "/events",
    title: "Programs and event information | exploretech.la",
    description:
      "Explore the annual exploretech.la event and Ignite, ask about upcoming opportunities, and find clearly labeled past event resources.",
    indexable: true,
  },
  {
    path: "/get-involved",
    title: "Schools, volunteers and partners | exploretech.la",
    description:
      "Find the right contact for school participation, UCLA volunteering, or partnering with exploretech.la. Learn what to ask and how to get involved.",
    indexable: true,
  },
  {
    path: "/ignite",
    title: "Ignite workshops for high school students | exploretech.la",
    description:
      "Learn about Ignite's beginner-friendly technology workshops, explore past projects, and ask about the next series.",
    indexable: true,
  },
  {
    path: "/register",
    title: "2021 virtual event archive | exploretech.la",
    description:
      "Historical information and documents from exploretech.la's 2021 virtual event. This archive is not current registration or event support.",
    indexable: true,
  },
  ...EVENT_ROUTES.map(({ route, year }) => ({
    path: route,
    title: `${year} event resources archive | exploretech.la`,
    description: `Archived ${year} exploretech.la schedules, workshops, recordings and documents. Find current participation information through the programs hub.`,
    indexable: true,
  })),
  ...teamSections.map((team) => ({
    path: `/our_team/${team.id}`,
    title: `${team.navLabel} team | exploretech.la`,
    description: `Meet the ${team.navLabel.toLowerCase()} team behind exploretech.la, UCLA's student-led technology outreach organization.`,
    indexable: true,
  })),
];

export function normalizePath(pathname: string): string {
  let path = pathname;
  // Keep encoded separators inside their segment rather than creating new routes.
  try {
    path = decodeURI(pathname);
  } catch {
    /* Malformed URLs remain a not-found path. */
  }
  return path.replace(/\/+$/, "").toLowerCase() || "/";
}

export function getPageMetadata(pathname: string): PageMetadata {
  const path = normalizePath(pathname);
  const teamSlug = path.match(/^\/our_team\/([^/]+)$/)?.[1];
  const usesTeamFallback =
    path === "/our_team" ||
    (teamSlug !== undefined &&
      !teamSections.some((team) => team.id === teamSlug));
  const resolved = usesTeamFallback ? "/our_team/leadership" : path;
  return (
    SITE_PAGES.find((page) => page.path === resolved) ?? {
      path,
      title: "Page not found | exploretech.la",
      description:
        "This page could not be found. Explore our programs, participation information, and team.",
      indexable: false,
    }
  );
}

export function canonicalUrl(page: PageMetadata): string {
  return `${SITE_ORIGIN}${page.path === "/" ? "/" : `${page.path}/`}`;
}
