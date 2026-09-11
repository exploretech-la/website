import type { DocumentLink } from "../types";
import type { EVENTS } from "./index";

export type EventYear = keyof typeof EVENTS;
export interface ScheduleEntry {
  readonly key: number;
  readonly time: string;
  readonly name: string;
}
export interface ScheduleDay {
  readonly title: string;
  readonly items: readonly ScheduleEntry[];
}
export type WorkshopCard = {
  readonly title: string;
  readonly links: readonly DocumentLink[];
} & (
  | {
      readonly kind: "archivedVideo";
      readonly embedId: string;
      readonly subtitle?: string;
      readonly caption?: string;
    }
  | {
      readonly kind: "described";
      readonly instructors?: string;
      readonly description?: string;
    }
);
export interface WorkshopSection {
  readonly heading: "Workshops" | "Panels";
  readonly cards: readonly WorkshopCard[];
}
export interface FaqEntry {
  readonly key: number;
  readonly question: string;
  readonly answer: string;
  readonly note?: string;
}
export interface FaqContent {
  readonly kind: "registration" | "resources";
  readonly initialOpenKey: number | null;
  readonly items: readonly FaqEntry[];
  /** Extra lead-in shown only on the registration page, above the first question. */
  readonly intro?: { readonly heading: string; readonly body: string };
}
export type Feedback =
  | { readonly kind: "link"; readonly href: string }
  | { readonly kind: "coming-soon"; readonly disabled: boolean };
export interface EventContent {
  readonly year: string;
  readonly programHref: string;
  readonly schedule: readonly ScheduleEntry[];
  readonly maps: readonly DocumentLink[];
  /** 2026 added rel="noopener noreferrer" to its map buttons; 2022/2023 did not. */
  readonly mapsLinkRel?: "noopener noreferrer";
  readonly workshops: readonly WorkshopSection[];
  readonly workshopsPlacement: "before-maps" | "after-wristbands";
  readonly wristbandImage?: { readonly src: string; readonly alt: string };
  readonly faq?: FaqContent;
  readonly waivers?: readonly DocumentLink[];
  readonly feedbackHeading?: string;
  readonly feedback: Feedback;
}
