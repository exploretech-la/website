import type { PersonId } from "./people";

export interface PersonProfile {
  readonly name: string;
  readonly image?: string;
  readonly link?: string;
  readonly descriptions?: readonly string[];
}

/** A rendered role combines a profile with its context-specific title. */
export interface PersonCard extends PersonProfile {
  readonly title?: string;
}

export interface DocumentLink {
  readonly name: string;
  readonly src: string;
}

export type TeamSectionId =
  | "leadership"
  | "content"
  | "design"
  | "operations"
  | "external"
  | "web-dev"
  | "marketing";
export interface PersonRole {
  readonly personId: PersonId;
  readonly title: string;
}
export interface TeamSection {
  readonly id: TeamSectionId;
  readonly navLabel: string;
  readonly heading: string;
  readonly members: readonly PersonRole[];
}

export interface OptimizedImage {
  readonly src: string;
  readonly srcSet?: string;
  readonly sizes?: string;
  readonly width: number;
  readonly height: number;
}
