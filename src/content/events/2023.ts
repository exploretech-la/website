import busRoutes from "../../static/maps/bus_routes.jpg";
import ackermanUnion2F from "../../static/maps/su_map_ack_2.jpeg";
import ackermanUnion3F from "../../static/maps/su_map_ack_3.jpeg";

import type { EventContent } from "./types";

/**
 * exploretech.la 2023, served at /resources2023.
 * The page reuses the 2022 schedule times verbatim and has no FAQ or waiver section.
 */
export const EVENT_2023: EventContent = {
  year: "2023",
  programHref:
    "https://drive.google.com/file/d/1QBPh_9WEnlVxcw18xKHrCtPD4Wv9tfrj/view?usp=sharing",
  schedule: [
    { key: 1, name: "Opening Ceremony", time: "9:00AM - 9:30AM" },
    { key: 2, name: "Session 1", time: "9:30AM - 10:15AM" },
    { key: 3, name: "Session 2", time: "10:30AM - 11:15AM" },
    { key: 4, name: "Session 3", time: "11:30AM - 12:15PM" },
    { key: 5, name: "Lunch with a Mentor", time: "12:15PM - 1:00PM" },
    { key: 6, name: "Closing Ceremony", time: "1:00PM - 1:30PM" },
  ],
  maps: [
    { name: "Bus Routes", src: busRoutes },
    { name: "Ackerman Union 2F", src: ackermanUnion2F },
    { name: "Ackerman Union 3F", src: ackermanUnion3F },
  ],
  workshopsPlacement: "before-maps",
  workshops: [
    {
      heading: "Workshops",
      cards: [
        {
          kind: "described",
          title: "Fundamentals of Data Science",
          instructors: "Takao Oba and Riya Bhatla",
          description:
            "Unlock the power of data and enhance your skills with our comprehensive Data Science workshop. Join us and discover the latest tools and techniques to turn data into actionable insights and drive better decision making.",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1fxkiS4XMG671dKL1WzmJzBGUzU10INoKsWndY9HnvBc/edit#slide=id.g7cb5bbd26d_0_20",
            },
          ],
        },
        {
          kind: "described",
          title: "Game Development",
          instructors: "Michael Bunte and Grace Mao",
          description:
            "Ever wonder how your favorite games are created? How do artists, programmers, composers, and others work together to create an amazing final product? Come find out at the game development workshop!",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1p-yarwAOKpz6IMsHkZAFFdjfmZ_G1qHaT_1XrrDNEzY/edit?usp=sharing",
            },
          ],
        },
        {
          kind: "described",
          title: "Python Turtle",
          instructors: "Aparna Hariharan and Isha Rajput",
          description:
            "Come learn how to code in Python using Python's fun art library called Python Turtle! By the end, you'll have created a customized digital sticker that you can design!",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/16Ip1fP3i4CPrJL6g_jn22DaIsZH1nY_a4OiTXoTkMp4/edit?usp=sharing",
            },
          ],
        },
        {
          kind: "described",
          title: "SCRATCHing the Surface of Coding",
          instructors: "Michael Bunte and Jason Lozada",
          description:
            "Want to learn how to code but don’t know where to start? Come join us as we introduce you to Scratch, a visual programming language that allows you to create your own interactive animations, stories, and games.",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1f8GMGnJuTECpuWZ1JYiYT5e-qf_SXuyY_x3WqQ5VsmQ/edit?usp=sharing",
            },
          ],
        },
        {
          kind: "described",
          title: "CS Operations in Minecraft",
          instructors: "Grace Mao and Kelly Zhang",
          description:
            "Logic gates, circuits, game dev...in Minecraft ?!?! Come to our workshop to learn about Minecraft's amazing redstone system and how it connects to engineering :0",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1QgNJpiJEAx07bN88bUnQjo8nLJvXR26ivJB7x3J2p2Q/edit?usp=sharing",
            },
          ],
        },
        {
          kind: "described",
          title: "Are you Related to a Strawberry?",
          instructors: "Wendy Su and Krisha Chokshi",
          description:
            "Are you related to a strawberry? Are you the plant parent? Learn about the intersection of biology and computer science in what we call bioinformatics. Come for a hands-on experience in extracting DNA!",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1dH1imIjo3ZSOoGxk3vyewLHc5G3JQufePPGY-5pxriE/edit?usp=sharing",
            },
          ],
        },
        {
          kind: "described",
          title: "Basics of Encryption",
          instructors: "Ashish Basetty and Takao Oba",
          description:
            "You’ve heard of hackers, but do you know about the people who stop them? Join us as we learn about how we keep our data secure. Work together to solve codes and puzzles, and learn how we can keep passwords and personal information private.",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1Rpj6HeWxVXUPhcaeAA8StKu5Vkv6zR8Di1hQegGkHag/edit?usp=sharing",
            },
          ],
        },
        {
          kind: "described",
          title: "Intro to Web Development",
          instructors: "Emily Nham and Jazlin Ong",
          description:
            "Have you ever wondered how websites are made? Join us to learn the basics of HTML and CSS, the coding languages of the web. By the end of our session, you’ll walk out with the ability to make your own website!",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/139VY0bVt_-fYPsUwpGKRgFs7QJVkpEg1FoHmVEuksiI/edit?usp=sharing",
            },
          ],
        },
        {
          kind: "described",
          title: "Internet of Things",
          instructors: "Kunal Patil and Krisha Chokshi",
          description:
            "Explore the Internet of Things, its evolution, and its relevance to today’s society! Students will learn about cybersecurity protocols and get a chance to demo and test IoT products. While brainstorming daily uses of IoT, they will discover its widespread impact on each of our lives.",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1dv_L1bAyp3XUmvUKLUO70yvJec7yGDDqHjTltZckrMk/edit?usp=sharing",
            },
          ],
        },
        {
          kind: "described",
          title: "Natural Language Proccessing",
          instructors: "Ashish Basetty and Jazlin Ong",
          description:
            "Every used Siri? ChatGPT? Google Translate? Come to this workshop to learn how a computer thinking in 0’s and 1’s can learn to speak like a human. Learn more about how human language works, and how we can come up with rules to teach it to a machine.",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1OUdQO-sLEhkZEgIDItNT-2VPtL_DmPZjz43SiW1GYXo/edit?usp=sharing",
            },
          ],
        },
        {
          kind: "described",
          title: "Machines Learn How to Learn",
          instructors: "Michael Song and Kelly Zhang",
          description:
            "As technology advances and we get smarter devices, we are also collecting more and more data. All of this data is meaningless without the help of machine learning. In this workshop we’ll delve into how machines use data to predict and answer questions.",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1kp-5c-YiCRJOgF6xbcHn7mzWIFt9eBSVZTwLsQVhz7o/edit?usp=sharing",
            },
          ],
        },
        {
          kind: "described",
          title: "Making Your Own Shazam",
          instructors: "Riya Bhatla and Joe Lin",
          description:
            "Ever heard a song at a party that you didn’t recognize? Shazam is the solution. In this workshop, you’ll get hands-on experience to build your own song recognizer. You’ll learn about the basics of audio processing and analysis and much more!",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1DzbhxN7w5s9n2F7jyAOIv4ZvDkF-ILkaamgSqM98gvU/edit?usp=sharing",
            },
          ],
        },
        {
          kind: "described",
          title: "Introduction to Autonomous Vehicles",
          instructors: "Michael Song and Joe Lin",
          description:
            "Ever wondered how a Tesla or Waymo car navigates itself through a seemingly countless number of road scenarios? Join us in this workshop to learn about the fundamental building blocks of autonomous vehicle technology and even get a chance to witness object detection models in action!",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/11jR37NzXGQYdFi_RJgtd7LBzPaSyA31vdjlfSBxEj1k/edit?usp=sharing",
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
          title: "Careers in Computer Science",
          instructors: "Isha Rajput and Emily Nham",
          description:
            "Want to know what it's like working in tech? Meetcurrent students and graduates pursuing Computer Science at places like Google, Facebook, Atlassian, and CreditKarma! Come learn about what they do and how they ended up where they are!",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1mVDXX-o_0BZO19UC-kFXJVUkMU7wvUfgaNii9bxDxNE/edit?usp=sharing",
            },
            {
              name: "Panelist Info",
              src: "https://docs.google.com/document/d/1_a-basdjuWGzqQe_9g3LwmtLoQhuPX_Bmhpx-llbyZo/edit?usp=sharing",
            },
          ],
        },
        {
          kind: "described",
          title: "Divieristy 101",
          instructors: "Aparna Hariharan and Jason Lozada",
          description:
            "Join the conversation with our esteemed guests regarding Diversity in Computer Science and what their experiences are like as minorities in this field.",
          links: [
            {
              name: "Slides",
              src: "https://docs.google.com/presentation/d/1LPeMr3cr28CYTaLrrDpeh3EMlx5tyaZ1HzyRoLDaqOw/edit?usp=sharing",
            },
            {
              name: "Panelist Info",
              src: "https://docs.google.com/document/d/1BvEGkB0tGuW9C-pyQFqqC_f-rgnLe8NEEccIaj5-NnU/edit?usp=sharing",
            },
          ],
        },
      ],
    },
  ],
  feedback: { kind: "coming-soon", disabled: false },
};
