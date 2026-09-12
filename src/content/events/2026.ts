import busRoutes from "../../static/maps/bus_routes.jpg";
import ackermanUnion2F from "../../static/maps/su_map_ack_2.jpeg";
import ackermanUnion3F from "../../static/maps/su_map_ack_3.jpeg";
import eventProgram from "../../static/pdf/Event_Program_2026.pdf";

import type { EventContent } from "./types";

/**
 * exploretech.la 2026, served at /resources2026.
 * Panels are authored after the workshops; both render as described cards.
 * Session times and rooms are transcribed from Event_Program_2026.pdf, pages 3, 5, 7, and 8.
 */
export const EVENT_2026: EventContent = {
  year: "2026",
  program: {
    name: "2026 event program",
    src: eventProgram,
    file: { format: "PDF", bytes: 41255757 },
  },
  schedule: [
    { key: 1, name: "Opening Ceremony", time: "9:55AM - 10:10AM" },
    { key: 2, name: "Session 1", time: "10:15AM - 10:50AM" },
    { key: 3, name: "Session 2", time: "11:00AM - 11:40AM" },
    { key: 4, name: "Session 3", time: "11:50AM - 12:30PM" },
    { key: 5, name: "Lunch with a Mentor", time: "12:30PM - 1:10PM" },
    { key: 6, name: "Closing Ceremony", time: "1:10PM - 1:30PM" },
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
  workshops: [
    {
      heading: "Workshops",
      cards: [
        {
          kind: "described",
          title: "Tower Stacking Game",
          slot: {
            session: "Session 3",
            time: "11:50 AM - 12:30 PM",
            location: "Ackerman Union 3517",
          },
          instructors: "Emma Qiu and Eli Drewry",
          description:
            "Students will compete in groups to see who can create the tallest free-standing tower with limited materials (popsicle sticks, tape, rope, etc). This challenge tests their communication, strategy, and discovering the importance of architecture while getting a chance to win prizes.",
          links: [
            { name: "Slides", src: "https://canva.link/79sw40e0u4vhk4j" },
          ],
        },
        {
          kind: "described",
          title: "Intro to Game Development",
          slot: {
            session: "Session 1",
            time: "10:15 AM - 10:50 AM",
            location: "Ackerman Union 3508",
          },
          instructors: "Joshua Jin and Paul Macapinlac",
          description:
            "Learn how the snake game works in this fun workshop! Uncover the secrets of Python and learn to customize your snake. Before you know it, you’ll be a pro game dev with a fully customized snake game.",
          links: [
            { name: "Slides", src: "https://canva.link/y27fiyfbq1pfd3t" },
          ],
        },
        {
          kind: "described",
          title: "Battle Bots",
          slot: {
            session: "Session 3",
            time: "11:50 AM - 12:30 PM",
            location: "Ackerman Union 2412",
          },
          instructors: "Sofia Matos and Benjamin Garcia",
          description:
            "Drive XRP Robots on a field to take down your opponents in a game of robot soccer! After interacting with code, you will be able to drive and dribble past other robots to score using teamwork and strategy.",
          links: [
            { name: "Slides", src: "https://canva.link/6edmsozmzcmhkf2" },
          ],
        },
        {
          kind: "described",
          title: "Squid Games Several-Legged Pentathlon (STEM Edition)",
          slot: {
            session: "Session 3",
            time: "11:50 AM - 12:30 PM",
            location: "Ackerman Union 3508",
          },
          instructors: "Matthew Chen and Paul Macapinlac",
          description:
            "Inspired by the hit Netflix series “Squid Games,” collaborate with up to 3 of your friends to participate in the STEM Games Several-Legged Pentathlon, where you will be tasked to solve STEM puzzles and activities in an interactive race against time.",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/10K0MQv8v8IqyC8qRrrJJanGZpn2YVPQUX6VFvdg_1ww/edit?slide=id.gf6d3ad9fd1_0_1011#slide=id.gf6d3ad9fd1_0_1011",
            },
          ],
        },
        {
          kind: "described",
          title: "AI Photobooth",
          slot: {
            session: "Session 3",
            time: "11:50 AM - 12:30 PM",
            location: "Ackerman Union 2408",
          },
          instructors: "Ridhima Seth and Joshua Jin",
          description:
            "Do you want to learn more about AI image generation? Come to AI Photobooth! This workshop will show you the basics of how an AI image generator works, and then we’ll let you try it for yourself!",
          links: [
            { name: "Slides", src: "https://canva.link/p62kuwtzwy1ieb6" },
          ],
        },
        {
          kind: "described",
          title: "COVID-19 Simulator",
          slot: {
            session: "Session 2",
            time: "11:00 AM - 11:40 AM",
            location: "Ackerman Union 2412",
          },
          instructors: "Clemente Irarrazaval and Eli Drewry",
          description:
            "Students will get an introduction into the field of game development by designing a COVID-19 spread simulator. Using Scratch they’ll explore conditionals, loops, and movement while working through obstacles. Students work in teams to build, test, and modify their own simulation-based game, also encouraging teamwork.",
          links: [
            { name: "Slides", src: "https://canva.link/5noyqe130bqgdqs" },
          ],
        },
        {
          kind: "described",
          title: "AI Music",
          slot: {
            session: "Session 2",
            time: "11:00 AM - 11:40 AM",
            location: "Ackerman Union 3517",
          },
          instructors: "Matthew Chen and Benjamin Garcia",
          description:
            "The purpose of this workshop is to teach students how to use suno.com, an AI music website that allows users to create any form of music by simply entering into the prompt bar.",
          links: [
            { name: "Slides", src: "https://canva.link/ja5m1l7cy6k1zsh" },
          ],
        },
        {
          kind: "described",
          title: "Bridge Building Competition",
          slot: {
            session: "Session 1",
            time: "10:15 AM - 10:50 AM",
            location: "Ackerman Union 2412",
          },
          instructors: "Atharv Panditrao and Clemente Irarrazaval",
          description:
            "Students will design and build a small bridge using limited materials. They will learn basic structural concepts, apply problem-solving skills, and work collaboratively to create a bridge that can hold the greatest load. Students compete in teams and test their designs in a fun final challenge.",
          links: [
            { name: "Slides", src: "https://canva.link/6ov265jv8fwkeql" },
          ],
        },
        {
          kind: "described",
          title: "Live Coding Music",
          slot: {
            session: "Session 3",
            time: "11:50 AM - 12:30 PM",
            location: "Bruin Reception Room",
          },
          instructors: "Ana Laura Santana and Atharv Panditrao",
          description:
            "Sometimes learning code can seem like it’s exclusively professional or something you will never see in your career. But in truth, coding can be useful for all types of passions beyond a corporate life, which is what gives it its beauty. In this workshop, you will learn how to become a DJ using only code!",
          links: [
            { name: "Slides", src: "https://canva.link/9pwbi4o0ztadleh" },
          ],
        },
        {
          kind: "described",
          title: "Prompt Engineering",
          slot: {
            session: "Session 2",
            time: "11:00 AM - 11:40 AM",
            location: "Ackerman Union 3508",
          },
          instructors: "Alexander Chien and Arjun Asudani",
          description:
            "Join our prompt engineering workshop to learn how to make the most out of your AI credits. Today’s chat models have vast capabilities, but accessing these skills can be more nuanced than just a straightforward question. We’ll cover prompting methods you can use to ensure you get the results you want. Let’s harness the power of AI!",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1IJsZaSjOSEOXJBQJAjdo4N0Zz3iFHkn5otzM8JBI4do/edit?usp=sharing",
            },
          ],
        },
        {
          kind: "described",
          title: "How Machines can learn like humans (Neural Networks)",
          slot: {
            session: "Session 2",
            time: "11:00 AM - 11:40 AM",
            location: "Ackerman Union 2408",
          },
          instructors: "Ana Laura Santana and Emma Qiu",
          description:
            "Students will learn the basics of neural networks, and how they are present in our everyday lives. They will also get hands-on experience with neural networks by loading data and training their own model. In the end, students will gain a conceptual understanding and practical skills in AI, which has become increasingly influential in the tech world.",
          links: [
            { name: "Slides", src: "https://canva.link/t49ze6ojz5edwil" },
          ],
        },
        {
          kind: "described",
          title: "AI Guess Who",
          slot: {
            session: "Session 1",
            time: "10:15 AM - 10:50 AM",
            location: "Ackerman Union 3517",
          },
          instructors: "Ridhima Seth and Amy Lloyd",
          description:
            "Want to master Guess Who? with logic and strategy? Learn how decision trees and probability help you ask the smartest questions, minimize guesswork, and consistently win. This session makes algorithmic thinking fun and practical—sharpen your problem-solving skills while gaining a competitive edge in both games and real-world decision-making!",
          links: [
            { name: "Slides", src: "https://canva.link/gu84339jr1878xm" },
          ],
        },
        {
          kind: "described",
          title: "Game Theory",
          slot: {
            session: "Session 1",
            time: "10:15 AM - 10:50 AM",
            location: "Ackerman Union 2408",
          },
          instructors: "Arjun Asudani and Alexander Chien",
          description:
            "What would you do if your success depended on someone else’s choice? This interactive workshop introduces game theory through fast-paced games and real-life scenarios. You’ll explore why people compete, when cooperation fails, and how small incentives can completely change outcomes.",
          links: [
            {
              name: "Slides",
              src: "https://www.canva.com/design/DAHDlh96pCw/4F5lGBuqGXyBBO1a2Lyutg/edit",
            },
          ],
        },
      ],
    },
    {
      heading: "Panels",
      cards: [
        {
          kind: "described",
          title: "Careers in Tech Panel",
          slot: {
            session: "Session 1",
            time: "10:15 AM - 10:50 AM",
            location: "Bruin Reception Room",
          },
          instructors: "Meet Modi / Tammy Sujaritchai and Sofia Matos",
          description:
            "Curious about what a career in tech actually looks like? Join us for a discussion with students and professionals as they share their experiences, career paths, and advice for breaking into the industry. Learn about different roles in tech, what skills matter most, and how to start exploring your own path.",
          links: [
            {
              name: "Slides",
              src: "https://drive.google.com/drive/folders/1ZBMXid-LFwTB84lA5etUmEHMExT9Ee9W",
            },
            {
              name: "Panelist Info",
              src: "https://docs.google.com/document/d/1Gaj_cB8Y7RgeDnxmjOmZGS6XhREWHHRYwg-b7EyUBiw/edit?usp=sharing",
            },
          ],
        },
        {
          kind: "described",
          title: "CS/Tech in College Panel",
          slot: {
            session: "Session 2",
            time: "11:00 AM - 11:40 AM",
            location: "Bruin Reception Room",
          },
          instructors: "Meet Modi / Tammy Sujaritchai and Amy Lloyd",
          description:
            "What is it really like to study computer science or tech in college? In this panel, students will talk about classes, projects, internships, clubs, and how they found their place in tech. Come ask questions, hear honest advice, and get a better sense of what the college experience can look like.",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1XCDfJbdINGh4_OCPuUYX9roVqXul3N04L3zM6cUqm5M/edit?usp=sharing",
            },
            {
              name: "Panelist Info",
              src: "https://docs.google.com/document/d/1Fkc3Ot_d7xpQTU8_oOfYIu_ugJzcenvjnlOOvWkVBBM/edit?usp=sharing",
            },
          ],
        },
      ],
    },
  ],
};
