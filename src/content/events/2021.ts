import type { DocumentLink } from "../types";
import type { ScheduleDay, FaqContent } from "./types";
import { WAIVER_FORMS, WAIVER_INTRO, WAIVER_NOTE } from "./waivers";

/**
 * exploretech.la 2021, the virtual event still served at /register.
 * It is the only two-day event and the only page with the Socio platform links,
 * so it keeps its own shape instead of pretending to be an EventContent.
 */
export interface RegistrationContent {
  readonly title: string;
  readonly alert: {
    readonly heading: string;
    readonly note: string;
    readonly linkLabel: string;
    readonly to: string;
    /** Analytics label recorded when the alert link is followed. */
    readonly trackingLabel: string;
  };
  readonly schedule: readonly [ScheduleDay, ScheduleDay];
  readonly importantLinks: {
    readonly intro: string;
    readonly platform: DocumentLink;
    readonly documents: readonly DocumentLink[];
    readonly support: {
      readonly heading: string;
      readonly paragraphs: readonly string[];
      readonly liveHeading: string;
      readonly liveBody: string;
      readonly zoom: DocumentLink;
      readonly hoursLabel: string;
      readonly hours: string;
    };
  };
  readonly faq: FaqContent;
  readonly waivers: {
    readonly intro: string;
    readonly note: string;
    readonly forms: readonly DocumentLink[];
    readonly allFormsHeading: string;
    readonly allFormsBody: string;
    readonly allForms: DocumentLink;
  };
}

export const REGISTRATION_2021: RegistrationContent = {
  title: "Event Information",
  alert: {
    heading: "Missed our event? Want to rewatch workshops and panels?",
    note: "Checkout our past workshops and resources from previous exploretech.la main events on our Resources Page.",
    linkLabel: "exploretech.la Recordings and Resources",
    to: "/resources",
    trackingLabel: "Resources",
  },
  schedule: [
    {
      title: "Day 1 (Saturday, April 10th)",
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
      title: "Day 2 (Sunday, April 11th)",
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
  importantLinks: {
    intro: "Below are some of the important links you need for the event!",
    platform: {
      name: "Socio Virtual Platform Access",
      src: "https://tinyurl.com/exploretechla2021",
    },
    documents: [
      {
        name: "exploretech.la 2021 Program",
        src: "https://drive.google.com/file/d/1icRfJae9wy8Kld8qSUxsY0pbsyIu9nh2/view?usp=sharing",
      },
      {
        name: "Student Event Day Guide",
        src: "https://docs.google.com/document/d/14_eHYyuf4V9BnUUEUijrYEYVxUTPfAUFZrey7blTc9s/edit?usp=sharing",
      },
      {
        name: "Workshop/Panel Schedule",
        src: "https://tinyurl.com/contentschedule2021",
      },
    ],
    support: {
      heading: "Event Support",
      paragraphs: [
        "If you are experiencing any technical difficulties or have any questions about the event, please first refer to the FAQs below. ",
        " If your question is not answered below, please reach out to us at exploretechla@cs.ucla.edu for assistance! ",
      ],
      liveHeading: "Live Event Day Support",
      liveBody:
        "For the duration of our event, attendees will be able to join a Zoom meeting (link below) to ask any questions live to an exploretech.la 2021 Staff Member.",
      zoom: {
        name: "Zoom Help Room Link",
        src: "https://tinyurl.com/exploretechla2021help",
      },
      hoursLabel: "Zoom Meeting Hours:",
      hours: "Saturday and Sunday, 9:30AM to 1:30PM",
    },
  },
  faq: {
    kind: "registration",
    initialOpenKey: 11,
    intro: {
      heading: "Still interested in attending?",
      body: 'If you are still interested in attending, fill out the waivers at the bottom of the page (under "Waivers") and email them to us at exploretechla@cs.ucla.edu ASAP so we can get you registered!',
    },
    items: [
      {
        key: 11,
        question:
          "I'm still interested in attending but registration is closed! Can I still attend? ",
        answer:
          'Yes you can! Just fill out all of the waivers under the "Waivers" secrtion below and email them to us at exploretechla@cs.ucla.edu ASAP so we can get you registered!',
      },
      {
        key: 0,
        question:
          "Is there a registration fee? Are there any associated costs with the program (ie: need to pay for an account on the virtual platform?) ",
        answer:
          "This event is completely free for all attendees! All you will need is a computer and stable internet to access the event.",
      },
      {
        key: 1,
        question: "What prior background is needed? ",
        answer:
          "No experience needed! This event is meant to help you explore the different fields of CS and tech!",
      },
      {
        key: 3,
        question: "How would virtual format work? (boxes, platform, etc) ",
        answer:
          "The event will be hosted completely online. exploretech.boxes will be sent to each attendee (while supplies last) as well as instructions on how to access the virtual platform prior to the event. Attendees will receive more information once registration is closed.",
      },
      {
        key: 4,
        question: "What is an exploretech.box?",
        answer:
          "An exploretech.box is a box that will hold all of the supplemental workshop materials and swag for the event. We will ship these to our attendees prior to the event. Supplies will be limited, but not having a box will not prevent you from attending our event.",
      },
      {
        key: 6,
        question: "What is the College Buddy Chat?",
        answer:
          "Each day you will have the opportunity to talk with one to two UCLA undergraduates about their life at UCLA and in STEM. Feel free to ask them any questions you may have about going from high school to college and pursuing a STEM degree!",
      },
    ],
  },
  waivers: {
    intro: WAIVER_INTRO,
    note: WAIVER_NOTE,
    forms: WAIVER_FORMS,
    allFormsHeading:
      "All forms can also be found here, in both PDF and Google Docs formats (for easier editing):",
    allFormsBody:
      "To edit the Google Docs, please make a copy of the waiver into your own Drive and fill it out there. Simply save as PDF to upload to the registration form.",
    allForms: {
      name: "All Forms (PDFs and Google Docs)",
      src: "https://tinyurl.com/exploretechla2021-waivers",
    },
  },
};
