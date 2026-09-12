import busRoutes from "../../static/maps/bus_routes.jpg";
import ackermanUnion2F from "../../static/maps/su_map_ack_2.jpeg";
import ackermanUnion3F from "../../static/maps/su_map_ack_3.jpeg";
import wristbands from "../../static/maps/wristband_coordination.png";
import eventProgram from "../../static/pdf/Event_Program.pdf";

import type { EventContent } from "./types";
import { WAIVER_FORMS } from "./waivers";

/**
 * exploretech.la 2022, served at /resources.
 * Its workshop cards are archived recordings, so every card carries a video facade.
 */
export const EVENT_2022: EventContent = {
  year: "2022",
  program: {
    name: "2022 event program",
    src: eventProgram,
    file: { format: "PDF", bytes: 29500282 },
  },
  schedule: [
    { key: 1, name: "Opening Ceremony", time: "9:00AM - 9:30AM" },
    { key: 2, name: "Session 1", time: "9:30AM - 10:15AM" },
    { key: 3, name: "Session 2", time: "10:30AM - 11:15AM" },
    { key: 4, name: "Session 3", time: "11:30AM - 12:15PM" },
    { key: 5, name: "Lunch with a Mentor", time: "12:15PM - 1:00PM" },
    { key: 6, name: "Closing Ceremony", time: "1:00PM - 1:30PM" },
  ],
  maps: [
    {
      name: "Bus Routes",
      src: busRoutes,
      file: { format: "JPG", bytes: 59864 },
    },
    {
      name: "Ackerman Union 2F",
      src: ackermanUnion2F,
      file: { format: "JPG", bytes: 46939 },
    },
    {
      name: "Ackerman Union 3F",
      src: ackermanUnion3F,
      file: { format: "JPG", bytes: 18761 },
    },
  ],
  wristbandImage: {
    name: "2022 wristband coordination map",
    src: wristbands,
    alt: "Wristband coordination",
    file: { format: "PNG", bytes: 54090 },
  },
  workshops: [
    {
      heading: "Workshops",
      cards: [
        {
          kind: "archivedVideo",
          title: "Coding 101",
          embedId: "WaZ2bN8t2cc",
          caption: "(Session 1 Recording)",
          links: [
            {
              name: "Session 2 Recording",
              src: "https://youtu.be/-NN-O42OleY",
            },
            {
              name: "Student Guide",
              src: "https://docs.google.com/document/d/1ElU9F8cRtpw7QWjIj3QkJsBVG8xmE2Ywpd2b8Gxi75w/edit",
            },
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1sZ5aDpGpKbjd5CuhOd5hTCljncScBwf3m7FWMb6_jd4/edit#slide=id.gbbd58c2398_0_15",
            },
            {
              name: "Solutions",
              src: "https://docs.google.com/document/d/1UDakvA2lzu5px7Ox20s7E8ZYN17WtcPTcmtoTANRL5o/edit",
            },
          ],
        },
        {
          kind: "archivedVideo",
          title: "ExploreWeb.la: Web Design & Dev",
          embedId: "jP8itIcFFa4",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/u/0/d/1QB4seIW1s97Aqrf-Wn8n9UQq6YNM3opvqzt3ZUZtGOM/edit",
            },
            {
              name: "Review Sheet",
              src: "https://docs.google.com/document/d/1zAbuNQzRgHYhH9E9sdJudYQ96FJYfXcqfO4qJv736K4/edit",
            },
            {
              name: "Codepen",
              src: "https://codepen.io/raphaeling/pen/VwmjxzJ",
            },
          ],
        },
        {
          kind: "archivedVideo",
          title: "Operating Systems",
          embedId: "u-X1K9Rz75U",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/17Dl1hE1kUmffXtlF8aC_CMuXNvFgTp3IgLADvT9pJmw/edit#slide=id.g7cb5bbd26d_0_20",
            },
            {
              name: "Linux Emulator",
              src: "http://copy.sh/v86/?profile=linux26",
            },
          ],
        },
        {
          kind: "archivedVideo",
          title: "Draw with Code",
          embedId: "oTzUKgOTEGE",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1yKOG-eBJveoCHa0XX0-JhGSxVLSJ6x4d993uWdySm_I/edit?usp=sharing",
            },
            {
              name: "Repl.it Project",
              src: "https://repl.it/@AlyssaSchimm/Python-Graphics-Skeleton",
            },
          ],
        },
        {
          kind: "archivedVideo",
          title: "Less Quantum More Computing",
          embedId: "rC-llUnQt88",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1ceW21j9s6EwD4MtMN8gytIH_ku-sZLy0JnAuQ4pmrlQ/edit#slide=id.gc204a219fe_1_10",
            },
            {
              name: "Definitions Doc",
              src: "https://docs.google.com/document/d/1dbcPxbjI50PYgRMoLolfNP3FGHvBojHuFfYHRtzGNv4/edit?usp=sharing",
            },
            {
              name: "Google Colab",
              src: "https://colab.research.google.com/drive/1jViSXWVgbFK6GeU2z7VrSxx8PjOF8dOk",
            },
          ],
        },
        {
          kind: "archivedVideo",
          title: "Crack the Code with Cryptography",
          embedId: "HCrLnfs5yqU",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1Z2GZoJtq2IwqjO2Akr9vIv6km_Pc_a1h_0b98HMQNIA/edit?usp=sharing",
            },
            {
              name: "Escape Room Google Form",
              src: "https://forms.gle/bmewxDNqbuXENENf8",
            },
            {
              name: "Escape Room Questions and Solutions",
              src: "https://docs.google.com/document/d/14P2cz0_CLCPlWJFjyXICMdhN_YfoRlUiPSZW0wxvf1w/edit",
            },
          ],
        },
        {
          kind: "archivedVideo",
          title: "Escaping Reality with Game Development",
          embedId: "PiDWtEGfgiM",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1-FAlSMU2WDh_qZVjUSUV6bNSShXxCP5IAzx9y3guXW8/edit",
            },
            {
              name: "Codepen Activity",
              src: "https://codepen.io/catpls/pen/QWdgpwe",
            },
          ],
        },
        {
          kind: "archivedVideo",
          title: "Murder Mystery!",
          embedId: "RPZqYD4KX9I",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/17QCnC1LfixiFyfCSMTwE-6VUC-NyznB3UHs3Szrx3HQ/edit#slide=id.g7cb5bbd26d_0_20",
            },
            {
              name: "Worksheet",
              src: "https://docs.google.com/document/d/1R0Ne_90c7aRuzvtkA5HSPAgBw70GJfwiH6i1-1BCxh0/copy",
            },
          ],
        },
        {
          kind: "archivedVideo",
          title: "AI Adventures",
          embedId: "YemyR8KdDe0",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1rq2lxcW1MK1pSZZP2bl1-kz5JkvRN0kJ-GpzIXxm1UY/edit#slide=id.g7cb5bbd26d_0_20",
            },
            {
              name: "Worksheet",
              src: "https://docs.google.com/document/d/1KQi86CtI4OG2cgEoZLQCDeQk8a_204Ek_yESjdlAAaM/edit?usp=sharing",
            },
          ],
        },
        {
          kind: "archivedVideo",
          title: "Digital Design",
          embedId: "sjHU3FDty68",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1SzxLUCi8xBJRQC4uGt9fIk-gZvdqeS-_HdIG0ToaQpU/edit?usp=sharing",
            },
            {
              name: "Miro Whiteboard",
              src: "https://miro.com/app/board/o9J_lMyUL1U=/",
            },
          ],
        },
        {
          kind: "archivedVideo",
          title: "Data Science",
          embedId: "OlKpWAwA32Q",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1WonMzMY2AaReC5yPW94akZaSKOuBV2ci2iYswWIEG5U/edit#slide=id.g7cb5bbd26d_0_20",
            },
            {
              name: "Spreadsheet",
              src: "https://docs.google.com/spreadsheets/d/1E6mFcAMfeSlz1B61lInOuTVO1tvR7ggYzXTeqxCxkQQ/edit#gid=1207580287",
            },
          ],
        },
        {
          kind: "archivedVideo",
          title: "Tech & Society",
          embedId: "b-bgVV-aEKI",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/15Kcr7BihmCtBo-l2CxGelzLGCglmXhx0-3L-YtonyDo/edit#slide=id.g7cb5bbd26d_0_20",
            },
          ],
        },
        {
          kind: "archivedVideo",
          title: "Bot Buddy",
          subtitle: "Hosted by DIY Girls",
          embedId: "b2ijVF2aLQs",
          caption: "(Session 1 Recording)",
          links: [
            {
              name: "Session 2 Recording",
              src: "https://youtu.be/jhGA1TZG9PA",
            },
            {
              name: "Skin Templates",
              src: "https://drive.google.com/drive/folders/1aaPdABZMsORNaRHP7EZKMbfST2x6j_bt",
            },
            {
              name: "Youtube Tutorial",
              src: "https://www.youtube.com/watch?v=JKoLj8lmkfM",
            },
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1XNH37Cw5P7_tEWqWckaev5vxETBVVapTIbJXXr-6uNs/edit#slide=id.p",
            },
            {
              name: "Follow Up Instructions",
              src: "https://docs.google.com/document/d/1xSpGUjHA2qL8DJjGagBPAolmfcHAdcHvuTpl_lC67po/edit",
            },
          ],
        },
      ],
    },
    {
      heading: "Panels",
      cards: [
        {
          kind: "archivedVideo",
          title: "Diverse Careers in Computer Science",
          embedId: "xzZzhmeo9_Y",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/18H8XdlIscdZdeLiOUCPtAfu0tuhukW1EfDBH8uDkUXE/edit#slide=id.gc5794a6fcc_0_12",
            },
            {
              name: "Padlet",
              src: "https://padlet.com/bonniebonnielee/nm6pc2j59e5hhigl",
            },
            {
              name: "Panelist Info and Resources",
              src: "https://docs.google.com/document/d/1hG6YO9epajDiYqma-j882qRzmUITZdlTFWvvjrTTy44/edit?usp=sharing",
            },
          ],
        },
        {
          kind: "archivedVideo",
          title: "Representation in Computer Science",
          embedId: "vrPl7EmwV9A",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/16KnUGORLcdWsVqfCFgGzkqFniVPzHvtL2WyoY22Mgv4/edit#slide=id.gc7ccf7fc99_0_0",
            },
            {
              name: "Padlet",
              src: "https://padlet.com/wsu315/a9fa6pk1k3iodi7o",
            },
          ],
        },
      ],
    },
  ],
  faq: {
    items: [
      {
        key: 2,
        question: "Was there a registration fee?",
        answer: "The 2022 event was free for attendees.",
      },
      {
        key: 3,
        question: "What prior background was needed?",
        answer:
          "No prior experience was needed. The event introduced different fields of computer science and technology.",
      },
      {
        key: 4,
        question: "When did the event start and end?",
        answer:
          "The archived schedule lists the opening ceremony at 9 AM and the closing ceremony from 1 PM to 1:30 PM.",
      },
      {
        key: 5,
        question: "How did the raffle work?",
        answer:
          "The event plan awarded one ticket for asking a good question or completing a workshop activity, and one ticket for attending a panel. The raffle took place during the closing ceremony.",
      },
      {
        key: 6,
        question: "Where was bus pick-up?",
        answer:
          "The event logistics placed bus pick-up at the drop-off area across from Intramural Field.",
      },
      {
        key: 7,
        question: "How many schools and students participated?",
        answer: "The 2022 event page recorded eight schools and 371 students.",
      },
      {
        key: 8,
        question: "How did mentorship and lunch work?",
        answer:
          "Students used the number on their wristband to find their mentor group. Mentors held signs with group numbers. Groups took turns getting lunch and gathered in the Ackerman Grand Ballroom for mentorship.",
        note: "The schedule directed Group 3 students to find their mentors 15 minutes before the end of Session 3 and get lunch first.",
      },
      {
        key: 9,
        question: "Could students choose their workshops?",
        answer:
          "Students could choose workshops, subject to room and material capacity. Admission was first-come, first-served, with students directed to other workshops when a room reached capacity.",
      },
      {
        key: 10,
        question: "Where were the venue restrooms?",
        answer:
          "The event guide listed restrooms on the third floor of Ackerman Union.",
      },
      {
        key: 12,
        question: "Who organized this event?",
        answer:
          "exploretech.la, a group of UCLA undergraduate students, organized the event.",
      },
      {
        key: 13,
        question: "What were the raffle prizes?",
        answer:
          "Three big prizes, including AirPods, were given out during the closing ceremony.",
      },
      {
        key: 14,
        question: "How many students were at UCLA?",
        answer:
          "The 2022 event FAQ listed UCLA's enrollment as over 40,000 students.",
      },
    ],
  },
  waivers: WAIVER_FORMS,
};
