const WORKSHOPS_ALL = [
    {
        key: 1,
        name: "Coding 101",
        logo: require("static/workshop-logos/coding-101.png"),
        session: "Session 1",
        location: "Room 2408",
        resources: [
            {
                name: "Slides",
                link: "https://docs.google.com/presentation/d/1Ua_oBxXy5mz5YjPCWCi3zxClVDzKQOyqTaOnrj3ITe8/edit?usp=sharing",
            }, {
                name: "Station 1",
                link: "https://scratch.mit.edu/projects/638101091",
            }, {
                name: "Station 2",
                link: "https://scratch.mit.edu/projects/648458946/",
            }, {
                name: "Station 3",
                link: "https://scratch.mit.edu/projects/638136677/",
            }, {
                name: "Station 4",
                link: "https://scratch.mit.edu/projects/648389443/",
            }, {
                name: "Station 5 (bonus)",
                link: "https://scratch.mit.edu/projects/650445764/",
            },
        ]
    }, {
        key: 2,
        name: "Are You Related to a Strawberry?",
        logo: require("static/workshop-logos/bioinformatics.png"),
        session: "Session 1",
        location: "Room 2412",
        resources: [
            {
                name: "Slides",
                link: "https://docs.google.com/presentation/d/167XxMzyj2Zlx3UCcJCajfznXUzEYzhp_mRFxMZ1nq2U/edit?usp=sharing",
            }, {
                name: "Strawberry DNA Activity",
                link: "https://www.genome.gov/Pages/Education/Modules/StrawberryExtractionInstructions.pdf",
            }, {
                name: "Bioinformatics Video",
                link: "https://www.youtube.com/watch?v=W-Ov2cUaYQY",
            }, {
                name: "More About Next Generation Sequencing",
                link: "https://www.illumina.com/science/technology/next-generation-sequencing/beginners.html",
            },
        ]
    }, {
        key: 3,
        name: "UI/UX",
        logo: require("static/workshop-logos/ui-ux.png"),
        session: "Session 1",
        location: "Room 3508",
        resources: [
            {
                name: "Slides",
                link: "https://docs.google.com/presentation/d/1xvJgQ2KqWKiCEmYr3Ea0IMGcjpHNSTecKWG_VTcq-mM/edit?usp=sharing",
            }
        ]
    }, {
        key: 4,
        name: "Internet of Things",
        logo: require("static/workshop-logos/iot.png"),
        session: "Session 1",
        location: "Room 3517",
        resources: [
            {
                name: "Slides",
                link: "https://docs.google.com/presentation/d/1sYEp47_nqLz-8BqVgSwz1DlkoS_uwpBgfIIl4FALN04/edit?usp=sharing",
            }, {
                name: "Resources",
                link: "https://docs.google.com/document/d/1nWZPfzaNvEq43ZflmGaHD_suWqYXZCwdcN1rzxLRo6o/edit?usp=sharing",
            }
        ]
    }, {
        key: 5,
        name: "Inside Blockchain",
        logo: require("static/workshop-logos/nft-blockchain.png"),
        session: "Session 1",
        location: "Room BRR",
        resources: [
            {
                name: "Slides",
                link: "https://docs.google.com/presentation/d/1i0ASCMTT1k2pRxd-2ilYqi3E1587Rt5DpHaJcPKU57A/edit?usp=sharing",
            },
        ]
    }, {
        key: 6,
        name: "Pear Deck",
        logo: require("static/workshop-logos/pear-deck.png"),
        session: "Sessions 1 & 2",
        location: "Room 3508",
        resources: [
            {
                name: "Website",
                link: "https://www.peardeck.com/?utm_source=google&utm_medium=cpc&utm_campaign=15840444475&utm_content=135652187681&utm_term=Pear%20Deck&aid=573893289485&dev=c&gclid=Cj0KCQjw_4-SBhCgARIsAAlegrVjNPmOjo_iVHT0pINs2J2dObfE1DToD7o1E0uf3-TY1LW5lYJsJtcaAhaQEALw_wcB"
            }
        ]
    }, {
        key: 7,
        name: "Teaching a Computer to See",
        logo: require("static/workshop-logos/computer-vision.png"),
        session: "Session 2",
        location: "Room 2412",
        resources: [
            {
                name: "Slides",
                link: "https://docs.google.com/presentation/d/1zSx-i_plBCiCC9t8xiD8fm-n2GTK9Zo_widxSmL0ufI/edit?usp=sharing",
            }, {
                name: "Resources",
                link: "https://docs.google.com/document/d/1w_IW6smjdKwp3nDFL97-UWee2Lib5UV5Ooy5-MVd8fQ/edit?usp=sharing",
            },
        ]
    }, {
        key: 8,
        name: "exploreWeb.la: Intro to Web Dev",
        logo: require("static/workshop-logos/web-dev.png"),
        session: "Session 2",
        location: "Room 2408",
        resources: [
            {
                name: "Slides",
                link: "https://docs.google.com/presentation/d/1OKKO_WLaWZQBqxTG6vVIomwo_JGSlF1sWWBraHu5l44/edit?usp=sharing"
            }, {
                name: "Codepen",
                link: "https://codepen.io/pen?template=MWOjyeb",
            },
        ]
    }, {
        key: 9,
        name: "Artificial Intelligence and Machine Learning",
        logo: require("static/workshop-logos/ai-ml.png"),
        session: "Session 2",
        location: "Room 3508",
        resources: [
            {
                name: "Slides",
                link: "https://www.hacksplaining.com/exercises/sql-injection#/start",
            }, {
                name: "Neural Networks Video",
                link: "https://www.youtube.com/watch?v=oV3ZY6tJiA0&t=324s"
            }, {
                name: "Learn more about machine learning",
                link: "https://github.com/kjaisingh/high-school-guide-to-machine-learning",
            }, {
                name: "Self-driving car moral activity",
                link: "https://www.moralmachine.net/",
            }, {
                name: "More About the Facebook Scandal",
                link: "https://www.techrepublic.com/article/facebook-data-privacy-scandal-a-cheat-sheet/",
            },
        ],
    }, {
        key: 10,
        name: "Diversity 101 Panel",
        logo: require("static/workshop-logos/diversity-101.png"),
        session: "Session 2",
        location: "TBA",
        resources: [
            {
                name: "Slides",
                link: "https://docs.google.com/presentation/d/1adtKaYiW1GIzEVGnB6r7-h1rJ57uxBQ5yQmhYUMmKp0/edit?usp=sharing",
            }, {
                name: "Wordcloud Activity",
                link: "https://www.menti.com/4yj9zwxn6p"
            }, {
                name: "Resources",
                link: "https://docs.google.com/document/d/1exbMLRhw2emX7HhpKa54j_nvonISsXTb-jel7tau6oU/edit?usp=sharing",
            },
        ],
    }, {
        key: 11,
        name: "HacKeD!",
        logo: require("static/workshop-logos/password-security.png"),
        session: "Session 3",
        location: "Room 3517",
        resources: [
            {
                name: "Slides",
                link: "https://docs.google.com/presentation/d/1a7RlA6L7_cbLU8lx3anCyUGMBD3xmKp0Zzj0Pkgckps/edit?usp=sharing",
            }, {
                name: "Passwords Interactive Activity",
                link: "https://passworks.uclaacm.com/"
            }, {
                name: "SQL Injection",
                link: "https://www.hacksplaining.com/exercises/sql-injection#/start",
            },
        ],
    }, {
        key: 12,
        name: "Spill the Tea with Cryptography!",
        logo: require("static/workshop-logos/cryptography.png"),
        session: "Session 2",
        location: "Room BRR",
        resources: [
            {
                name: "Slides",
                link: "https://docs.google.com/presentation/d/1uB5g2TzUee4Ssro2Uu8h0TtPigAdXZQGRNH2S9xEOUE/edit?usp=sharing",
            },
        ]
    }, {
        key: 13,
        name: "Augment Your Reality",
        logo: require("static/workshop-logos/ar-vr.png"),
        session: "Session 3",
        location: "Room BRR",
        resources: [
            {
                name: "Slides",
                link: "https://docs.google.com/presentation/d/12pszxNemyy2sJAgxKFg9aZl4ADPBGj_mfeuJs5vkOxM/edit?usp=sharing",
            }, {
                name: "Resources",
                link: "https://docs.google.com/document/d/1gERLaBktQB6VIhcvfZjr84FGWjtPn7JeSZE7BCkI5Ug/edit?usp=sharing",
            }
        ]
    }, {
        key: 14,
        name: "Game Dev",
        logo: require("static/workshop-logos/game-dev.png"),
        session: "Session 3",
        location: "Room 2412",
        resources: [
            {
                name: "Slides",
                link: "https://docs.google.com/presentation/d/1zyhW6E3vVFzBytB-aFcW9nb0mZw2MsAHIMcX9lLNMH0/edit?usp=sharing",
            },
        ],
    }, {
        key: 15,
        name: "Python Turtles",
        logo: require("static/workshop-logos/python-turtles.png"),
        session: "Session 3",
        location: "Room 2408",
        resources: [
            {
                name: "Slides",
                link: "https://docs.google.com/presentation/d/1xfCi4U7kR3-oSFo65zyp0QRPls0LuzV63QaDCvOxXKE/edit?usp=sharing",
            }, {
                name: "Resources",
                link: "https://docs.google.com/document/d/1K6BEInJ1x5gBkApxqeI1j5Zh6uKeJWKROblz40wzl_M/edit?usp=sharing",
            },
        ],
    }, {
        key: 16,
        name: "Natural Language Processing",
        logo: require("static/workshop-logos/nlp.png"),
        session: "Session 3",
        location: "Room 3408",
        resources: [
            {
                name: "Slides",
                link: "https://docs.google.com/presentation/d/16LflAJt277QGr_u-XAIf_9aWm4G1vYfHs7d_O5wfJpI/edit?usp=sharing",
            }, {
                name: "Resources",
                link: "https://docs.google.com/document/d/1ajAsqe11G9DqtYD_u_h1KKq2by2ssFU8VpUOoTfgtsE/edit"
            }
        ]
    }, {
        key: 17,
        name: "Careers in CS Panel",
        logo: require("static/workshop-logos/careers-in-cs.png"),
        session: "Session 3",
        location: "Room 2410",
        resources: [
            {
                name: "Slides",
                link: "https://docs.google.com/presentation/d/1OeMMIp4exQBKwLqFuXVBj-C39M20g4W0R40me-vNcVg/edit?usp=sharing",
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

export const PANELS = [
    {
        name: "Diversity 101",
        panelists: [
            {
                name: "Yoshino Goto",
                image: require("static/panelists/yoshino-goto.png"),
                link: 'https://www.linkedin.com/in/ygoto/',
            }, {
                name: "Christine Kim",
                image: require("static/panelists/christine-kim.png"),
                link: 'https://www.linkedin.com/in/minjeong-christine-kim/',
            }, {
                name: "Ingrid Tien",
                image: require("static/panelists/ingrid-tien.png"),
                link: 'https://www.linkedin.com/in/ingrid-tien-8981631a5/',
            }, {
                name: "Sydney Savage",
                image: require("static/panelists/sydney-savage.png"),
                link: 'https://www.linkedin.com/in/sydney-savage/',
            },
        ]
    }, {
        name: "Careers in CS",
        panelists: [
            {
                name: "Daniel Jaffe",
                image: require("static/panelists/daniel-jaffe.png"),
                link: 'https://www.linkedin.com/in/dgjaffe/',
            }, {
                name: "Henry Trinh",
                image: require("static/panelists/henry-trinh.png"),
                link: 'https://www.linkedin.com/in/thenry3/',
            }, {
                name: "Colleen Li",
                image: require("static/panelists/colleen-li.png"),
                link: 'https://www.linkedin.com/in/colleenli2/',
            }, {
                name: "Evan Zhong",
                image: require("static/panelists/evan-zhong.png"),
                link: 'https://www.linkedin.com/in/evan-zhong/',
            },
        ]
    }
]