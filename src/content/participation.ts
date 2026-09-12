export const CONTACT_EMAIL = "exploretechla@cs.ucla.edu";

function inquiry(subject: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

/** Published website status, not a claim that the organization has closed recruitment. */
export const PROGRAMS = {
  annual: {
    title: "Annual exploretech.la event",
    description:
      "Hands-on workshops, panels, and an exhibition hall for high school students and school groups.",
    status: "Next event details are not published here yet.",
    actionLabel: "Ask about the next event",
    inquiryHref: inquiry("Next exploretech.la annual event"),
    archivePath: "/resources2026",
    archiveLabel: "2026 event resources",
  },
  ignite: {
    title: "Ignite",
    description:
      "A beginner-friendly workshop series for high school students to explore technology through projects.",
    status: "Details for the next Ignite series are not published here yet.",
    actionLabel: "Ask about the next Ignite series",
    inquiryHref: inquiry("Next Ignite series"),
  },
} as const;

export const AUDIENCES = {
  schools: {
    title: "For schools and students",
    description:
      "Find a program for your students and ask about the next opportunity to take part.",
    path: "/get-involved#schools",
    actionLabel: "Ask about school participation",
    inquiryHref: inquiry("School participation enquiry"),
  },
  volunteer: {
    title: "For UCLA volunteers",
    description:
      "Help deliver workshops, organize events, or support high school students as they explore technology.",
    path: "/get-involved#volunteer",
    actionLabel: "Ask about volunteering",
    inquiryHref: inquiry("UCLA volunteer enquiry"),
  },
  partners: {
    title: "For partners and sponsors",
    description:
      "Explore opportunities to support workshops, share industry experience, or contribute to an event.",
    path: "/get-involved#partners",
    actionLabel: "Discuss a partnership",
    inquiryHref: inquiry("exploretech.la partnership enquiry"),
  },
} as const;

/** This existing list is for UCLA updates, not a substitute for a school application. */
export const UCLA_UPDATES_URL =
  "https://mailchi.mp/e1197feb6276/ucla-student-mailing-list";
