export type HomeSectionId =
  | "about"
  | "our_team"
  | "get-involved"
  | "speakers"
  | "leadership"
  | "sponsors";

export interface HomePageSection {
  readonly name: HomeSectionId;
}

const HomePageSections = {
  ABOUT: { name: "about" },
  TEAM: { name: "our_team" },
  GET_INVOLVED: { name: "get-involved" },
  SPEAKERS: { name: "speakers" },
  LEADERSHIP: { name: "leadership" },
  SPONSORS: { name: "sponsors" },
} as const satisfies Record<string, HomePageSection>;

export default HomePageSections;
