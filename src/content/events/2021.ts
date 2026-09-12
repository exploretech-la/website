import type { DocumentLink } from "../types";
import type { ScheduleDay, FaqContent } from "./types";
import { WAIVER_FORMS } from "./waivers";

/** The historical two-day virtual event remains reachable at /register. */
export interface RegistrationContent {
  readonly title: string;
  readonly schedule: readonly [ScheduleDay, ScheduleDay];
  readonly documents: readonly DocumentLink[];
  readonly faq: FaqContent;
  readonly waivers: readonly DocumentLink[];
}

export const REGISTRATION_2021: RegistrationContent = {
  title: "exploretech.la 2021 virtual event archive",
  schedule: [
    {
      title: "Day 1, Saturday, April 10, 2021",
      items: [
        { key: 1, time: "9:30 AM", name: "Virtual Platform Opens" },
        { key: 2, time: "10:00 AM", name: "Opening Ceremony" },
        { key: 3, time: "10:30 AM", name: "Session 1" },
        { key: 4, time: "11:40 AM", name: "College Buddy Chat" },
        { key: 5, time: "12:20 PM", name: "Session 2" },
        { key: 6, time: "1:20 PM", name: "Closing Briefing" },
      ],
    },
    {
      title: "Day 2, Sunday, April 11, 2021",
      items: [
        { key: 1, time: "9:30 AM", name: "Virtual Platform Opens" },
        { key: 2, time: "10:00 AM", name: "Opening Briefing" },
        { key: 3, time: "10:10 AM", name: "Session 3" },
        { key: 4, time: "11:20 AM", name: "College Buddy Chat" },
        { key: 5, time: "12:00 PM", name: "Session 4" },
        { key: 6, time: "1:00 PM", name: "Closing Ceremony" },
      ],
    },
  ],
  documents: [
    {
      name: "exploretech.la 2021 Program",
      src: "https://drive.google.com/file/d/1icRfJae9wy8Kld8qSUxsY0pbsyIu9nh2/view?usp=sharing",
    },
    {
      name: "2021 Student Event Day Guide",
      src: "https://docs.google.com/document/d/14_eHYyuf4V9BnUUEUijrYEYVxUTPfAUFZrey7blTc9s/edit?usp=sharing",
    },
    {
      name: "2021 Workshop/Panel Schedule",
      src: "https://tinyurl.com/contentschedule2021",
    },
  ],
  faq: {
    items: [
      {
        key: 0,
        question: "Was there a registration fee?",
        answer:
          "The 2021 event was free for attendees. A computer and stable internet connection were needed to access the virtual event.",
      },
      {
        key: 1,
        question: "What prior background was needed?",
        answer:
          "No prior experience was needed. The event introduced students to different fields of computer science and technology.",
      },
      {
        key: 3,
        question: "How did the virtual format work?",
        answer:
          "The event took place entirely online using the Socio virtual platform. The event plan included exploretech.boxes with workshop materials for attendees, while supplies lasted, and platform access instructions sent before the event.",
      },
      {
        key: 4,
        question: "What was an exploretech.box?",
        answer:
          "An exploretech.box held supplemental workshop materials and swag. Boxes were planned for shipment to attendees before the event, while supplies lasted. A box was not required to attend.",
      },
      {
        key: 6,
        question: "What was the College Buddy Chat?",
        answer:
          "Each day included an opportunity to talk with one or two UCLA undergraduates about life at UCLA, STEM, and the transition from high school to college.",
      },
    ],
  },
  waivers: [
    {
      name: "2021 waiver archive, PDFs and Google Docs",
      src: "https://tinyurl.com/exploretechla2021-waivers",
    },
    ...WAIVER_FORMS,
  ],
};
