import type { EventContent, EventYear } from "./types";
import { EVENT_2022 } from "./2022";
import { EVENT_2023 } from "./2023";
import { EVENT_2026 } from "./2026";

export * from "./types";
export { REGISTRATION_2021 } from "./2021";
export type { RegistrationContent } from "./2021";
export { WAIVER_FORMS } from "./waivers";

export const EVENTS = {
  "2022": EVENT_2022,
  "2023": EVENT_2023,
  "2026": EVENT_2026,
} satisfies Record<string, EventContent>;

/**
 * Public routes, in the order they were published. The 2022 event keeps the
 * unnumbered /resources path it shipped with.
 */
export const EVENT_ROUTES: readonly {
  readonly route: string;
  readonly year: EventYear;
  readonly navLabel: string;
}[] = [
  { route: "/resources", year: "2022", navLabel: "2022 event archive" },
  { route: "/resources2023", year: "2023", navLabel: "2023 event archive" },
  { route: "/resources2026", year: "2026", navLabel: "2026 event archive" },
];
