const WORKSHOPS_ALL = [
    {
        key: 1,
        name: "Coding 101",
        session: "Session 1",
        location: "Room 2408",
        resources: [
            {
                name: "Scratch",
                link: "https://scratch.mit.edu/"
            }, {
                name: "Student Guide",
                link: "https://www.exploretech.la/"
            }, {
                name: "Slides",
                link: "https://www.exploretech.la/"
            }, {
                name: "Solutions",
                link: "https://www.exploretech.la/"
            }
        ]
    }, {
        key: 2,
        name: "UI/UX",
        session: "Session 1",
        location: "Room 3508",
        resources: [
            {
                name: "Slides",
                link: "https://www.exploretech.la/"
            }
        ]
    }, {
        key: 3,
        name: "Are You Related to a Strawberry?",
        session: "Session 1",
        location: "Room 2412",
        resources: [
            {
                name: "Slides",
                link: "https://www.exploretech.la/"
            }
        ]
    }, {
        key: 4,
        name: "Internet of Things",
        session: "Session 1",
        location: "Room 3517",
        resources: [
            {
                name: "Slides",
                link: "https://www.exploretech.la/"
            }
        ]
    }, {
        key: 5,
        name: "Inside Blockchain",
        session: "Session 1",
        location: "Room BRR",
        resources: [
            {
                name: "Slides",
                link: "https://www.exploretech.la/"
            }
        ]
    }, {
        key: 6,
        name: "Pear Deck",
        session: "Sessions 1 & 2",
        location: "Room 3508",
        resources: [
            {
                name: "Slides",
                link: "https://www.exploretech.la/"
            }
        ]
    }, {
        key: 7,
        name: "Teaching a Computer to See",
        session: "Session 2",
        location: "Room 2412",
        resources: [
            {
                name: "Slides",
                link: "https://www.exploretech.la/"
            }
        ]
    }, {
        key: 8,
        name: "exploreWeb.la: Intro to Web Dev",
        session: "Session 2",
        location: "Room 2408",
        resources: [
            {
                name: "Slides",
                link: "https://www.exploretech.la/"
            }, {
                name: "Codepen",
                link: "https://codepen.io/pen?template=MWOjyeb",
            }
        ]
    }, {
        key: 9,
        name: "Spill the Tea with Cryptography!",
        session: "Session 2",
        location: "Room BRR",
        resources: [
            {
                name: "Slides",
                link: "https://www.exploretech.la/"
            }
        ]
    }, {
        key: 10,
        name: "Artificial Intelligence and Machine Learning",
        session: "Session 2",
        location: "Room 3508",
        resources: [
            {
                name: "Slides",
                link: "https://www.exploretech.la/"
            }
        ]
    }, {
        key: 11,
        name: "Diversity 101 Panel",
        session: "Session 2",
        location: "TBA",
        resources: [
            {
                name: "Slides",
                link: "https://www.exploretech.la/"
            }
        ]
    }, {
        key: 12,
        name: "HacKeD!",
        session: "Session 3",
        location: "Room 3517",
        resources: [
            {
                name: "Slides",
                link: "https://www.exploretech.la/"
            }
        ]
    }, {
        key: 13,
        name: "Game Dev",
        session: "Session 3",
        location: "Room 2412",
        resources: [
            {
                name: "Slides",
                link: "https://www.exploretech.la/"
            }
        ]
    }, {
        key: 14,
        name: "Augment Your Reality",
        session: "Session 3",
        location: "Room BRR",
        resources: [
            {
                name: "Slides",
                link: "https://www.exploretech.la/"
            }
        ]
    }, {
        key: 15,
        name: "Python Turtles",
        session: "Session 3",
        location: "Room 2408",
        resources: [
            {
                name: "Slides",
                link: "https://www.exploretech.la/"
            }
        ]
    }, {
        key: 16,
        name: "Natural Language Processing",
        session: "Session 3",
        location: "Room 3408",
        resources: [
            {
                name: "Slides",
                link: "https://www.exploretech.la/"
            }
        ]
    }, {
        key: 17,
        name: "Careers in CS Panel",
        session: "Session 3",
        location: "TBA",
        resources: [
            {
                name: "Slides",
                link: "https://www.exploretech.la/"
            }, {
                name: "Resources",
                link: "https://docs.google.com/document/d/1R-O5r31aqIbyPn5n8EJPRXtFOjMYr91sn6Bg5rRtCJ8/edit?usp=sharing",
            }
        ]
    }
]

// group every workshop by two
export const WORKSHOPS = WORKSHOPS_ALL.reduce(
    (accumulator, currentValue, currentIndex, array) => {
      if (currentIndex % 2 === 0)
        accumulator.push(array.slice(currentIndex, currentIndex + 2));
      return accumulator;
    }, [])