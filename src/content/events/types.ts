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
  readonly slot?: {
    readonly session: string;
    readonly time: string;
    readonly location: string;
  };
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
  readonly items: readonly FaqEntry[];
}
export interface EventContent {
  readonly year: string;
  readonly program: DocumentLink;
  readonly schedule: readonly ScheduleEntry[];
  readonly maps: readonly DocumentLink[];
  readonly workshops: readonly WorkshopSection[];
  readonly wristbandImage?: DocumentLink & { readonly alt: string };
  readonly faq?: FaqContent;
  readonly waivers?: readonly DocumentLink[];
}
