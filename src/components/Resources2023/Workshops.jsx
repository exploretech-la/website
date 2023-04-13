import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

export default class Workshops extends Component {
  static get propTypes() {
    return {
      className: PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      className: "",
    };
  }

  render() {
    const classNames = classnames("Section", "Workshops", this.props.className);

    return (
      <section className={classNames}>
        <div className="workshops-content">
          <div className="workshops-title">
            <h2>Workshops</h2>
            <div className="pill-divider" />
          </div>
          {this._getWorkshopCards()}
        </div>
        <div className="workshops-content">
          <div className="workshops-title">
            <h2>Panels</h2>
            <div className="pill-divider" />
          </div>
          {this._getPanelCards()}
        </div>
      </section>
    );
  }

  _getWorkshopCards() {
    return (
      <div className="workshops-cards">
        <CardDeck className="card-row">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>
                <b>Fundamentals of Data Science</b>
              </Card.Title>
              <Card.Text>Instuctors: Takao Oba and Riya Bhatla</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
              <Card.Text>Unlock the power of data and enhance your skills with our comprehensive Data Science workshop. Join us and discover the latest tools and techniques to turn data into actionable insights and drive better decision making.</Card.Text>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="https://docs.google.com/presentation/d/1fxkiS4XMG671dKL1WzmJzBGUzU10INoKsWndY9HnvBc/edit#slide=id.g7cb5bbd26d_0_20">
                  Slides
                </Card.Link>
              </ListGroupItem>
            </ListGroup>
          </Card>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>
                <b>Game Development</b>
              </Card.Title>
              <Card.Text>Instuctors: Michael Bunte and Grace Mao</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <Card.Text>Ever wonder how your favorite games are created? How do artists, programmers, composers, and others work together to create an amazing final product? Come find out at the game development workshop!</Card.Text>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="https://docs.google.com/presentation/d/1p-yarwAOKpz6IMsHkZAFFdjfmZ_G1qHaT_1XrrDNEzY/edit?usp=sharing">
                  Slides
                </Card.Link>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </CardDeck>
        <CardDeck className="card-row">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>
                <b>Python Turtle</b>
              </Card.Title>
              <Card.Text>Instuctors: Aparna Hariharan and Isha Rajput</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <Card.Text>Come learn how to code in Python using Python's fun art library called Python Turtle! By the end, you'll have created a customized digital sticker that you can design!</Card.Text>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="https://docs.google.com/presentation/d/16Ip1fP3i4CPrJL6g_jn22DaIsZH1nY_a4OiTXoTkMp4/edit?usp=sharing">
                  Slides
                </Card.Link>
              </ListGroupItem>
            </ListGroup>
          </Card>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>
                <b>SCRATCHing the Surface of Coding</b>
              </Card.Title>
              <Card.Text>Instuctors: Michael Bunte and Jason Lozada</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <Card.Text>Want to learn how to code but don’t know where to start? Come join us as we introduce you to Scratch, a visual programming language that allows you to create your own interactive animations, stories, and games.</Card.Text>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="https://docs.google.com/presentation/d/1f8GMGnJuTECpuWZ1JYiYT5e-qf_SXuyY_x3WqQ5VsmQ/edit?usp=sharing">
                  Slides
                </Card.Link>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </CardDeck>
        <CardDeck className="card-row">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>
                <b>CS Operations in Minecraft</b>
              </Card.Title>
              <Card.Text>Instuctors: Grace Mao and Kelly Zhang</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <Card.Text>Logic gates, circuits, game dev...in Minecraft ?!?! Come to our workshop to learn about Minecraft's amazing redstone system and how it connects to engineering :0</Card.Text>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="https://docs.google.com/presentation/d/1QgNJpiJEAx07bN88bUnQjo8nLJvXR26ivJB7x3J2p2Q/edit?usp=sharing">
                  Slides
                </Card.Link>
              </ListGroupItem>
            </ListGroup>
          </Card>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>
                <b>Are you Related to a Strawberry?</b>
              </Card.Title>
              <Card.Text>Instuctors: Wendy Su and Krisha Chokshi</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <Card.Text>Are you related to a strawberry? Are you the plant parent? Learn about the intersection of biology and computer science in what we call bioinformatics. Come for a hands-on experience in extracting DNA!</Card.Text>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="https://docs.google.com/presentation/d/1dH1imIjo3ZSOoGxk3vyewLHc5G3JQufePPGY-5pxriE/edit?usp=sharing">
                  Slides
                </Card.Link>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </CardDeck>
        <CardDeck className="card-row">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>
                <b>Basics of Encryption</b>
              </Card.Title>
              <Card.Text>Instuctors: Ashish Basetty and Takao Oba</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <Card.Text>You’ve heard of hackers, but do you know about the people who stop them? Join us as we learn about how we keep our data secure. Work together to solve codes and puzzles, and learn how we can keep passwords and personal information private.</Card.Text>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="https://docs.google.com/presentation/d/1Rpj6HeWxVXUPhcaeAA8StKu5Vkv6zR8Di1hQegGkHag/edit?usp=sharing">
                  Slides
                </Card.Link>
              </ListGroupItem>
            </ListGroup>
          </Card>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>
                <b>Intro to Web Development</b>
              </Card.Title>
              <Card.Text>Instuctors: Emily Nham and Jazlin Ong</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <Card.Text>Have you ever wondered how websites are made? Join us to learn the basics of HTML and CSS, the coding languages of the web. By the end of our session, you’ll walk out with the ability to make your own website!</Card.Text>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="https://docs.google.com/presentation/d/139VY0bVt_-fYPsUwpGKRgFs7QJVkpEg1FoHmVEuksiI/edit?usp=sharing">
                  Slides
                </Card.Link>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </CardDeck>
        <CardDeck className="card-row">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>
                <b>Internet of Things</b>
              </Card.Title>
              <Card.Text>Instuctors: Kunal Patil and Krisha Chokshi</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <Card.Text>Explore the Internet of Things, its evolution, and its relevance to today’s society! Students will learn about cybersecurity protocols and get a chance to demo and test IoT products. While brainstorming daily uses of IoT, they will discover its widespread impact on each of our lives.</Card.Text>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="https://docs.google.com/presentation/d/1dv_L1bAyp3XUmvUKLUO70yvJec7yGDDqHjTltZckrMk/edit?usp=sharing">
                  Slides
                </Card.Link>
              </ListGroupItem>
            </ListGroup>
          </Card>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>
                <b>Natural Language Proccessing</b>
              </Card.Title>
              <Card.Text>Instuctors: Ashish Basetty and Jazlin Ong</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <Card.Text>Every used Siri? ChatGPT? Google Translate? Come to this workshop to learn how a computer thinking in 0’s and 1’s can learn to speak like a human. Learn more about how human language works, and how we can come up with rules to teach it to a machine.</Card.Text>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="https://docs.google.com/presentation/d/1OUdQO-sLEhkZEgIDItNT-2VPtL_DmPZjz43SiW1GYXo/edit?usp=sharing">
                  Slides
                </Card.Link>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </CardDeck>
        <CardDeck className="card-row">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>
                <b>Machines Learn How to Learn</b>
              </Card.Title>
              <Card.Text>Instuctors: Michael Song and Kelly Zhang</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <Card.Text>As technology advances and we get smarter devices, we are also collecting more and more data. All of this data is meaningless without the help of machine learning. In this workshop we’ll delve into how machines use data to predict and answer questions.</Card.Text>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="https://docs.google.com/presentation/d/1kp-5c-YiCRJOgF6xbcHn7mzWIFt9eBSVZTwLsQVhz7o/edit?usp=sharing">
                  Slides
                </Card.Link>
              </ListGroupItem>
            </ListGroup>
          </Card>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>
                <b>Making Your Own Shazam</b>
              </Card.Title>
              <Card.Text>Instuctors: Riya Bhatla and Joe Lin</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <Card.Text>Ever heard a song at a party that you didn’t recognize? Shazam is the solution. In this workshop, you’ll get hands-on experience to build your own song recognizer. You’ll learn about the basics of audio processing and analysis and much more!</Card.Text>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="https://docs.google.com/presentation/d/1DzbhxN7w5s9n2F7jyAOIv4ZvDkF-ILkaamgSqM98gvU/edit?usp=sharing">
                  Slides
                </Card.Link>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </CardDeck>
        <CardDeck className="card-row">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>
                <b>Introduction to Autonomous Vehicles</b>
              </Card.Title>
              <Card.Text>Instuctors: Michael Song and Joe Lin</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <Card.Text>Ever wondered how a Tesla or Waymo car navigates itself through a seemingly countless number of road scenarios? Join us in this workshop to learn about the fundamental building blocks of autonomous vehicle technology and even get a chance to witness object detection models in action!</Card.Text>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="https://docs.google.com/presentation/d/11jR37NzXGQYdFi_RJgtd7LBzPaSyA31vdjlfSBxEj1k/edit?usp=sharing">
                  Slides
                </Card.Link>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </CardDeck>
      </div>
    );
  }

  _getPanelCards() {
    return (
      <div className="workshops-cards">
        <CardDeck className="card-row">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>
                <b>Careers in Computer Science</b>
              </Card.Title>
              <Card.Text>Moderators: Isha Rajput and Emily Nham</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <Card.Text>Want to know what it's like working in tech? Meetcurrent students and graduates pursuing Computer Science at places like Google, Facebook, Atlassian, and CreditKarma! Come learn about what they do and how they ended up where they are!</Card.Text>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="https://docs.google.com/presentation/d/1mVDXX-o_0BZO19UC-kFXJVUkMU7wvUfgaNii9bxDxNE/edit?usp=sharing">
                  Slides
                </Card.Link>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="https://docs.google.com/document/d/1_a-basdjuWGzqQe_9g3LwmtLoQhuPX_Bmhpx-llbyZo/edit?usp=sharing">
                  Panelist Info
                </Card.Link>
              </ListGroupItem>
            </ListGroup>
          </Card>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>
                <b>Divieristy 101</b>
              </Card.Title>
              <Card.Text>Moderators: Aparna Hariharan and Jason Lozada</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
              <Card.Text>Join the conversation with our esteemed guests regarding Diversity in Computer Science and what their experiences are like as minorities in this field.</Card.Text>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="https://docs.google.com/presentation/d/1LPeMr3cr28CYTaLrrDpeh3EMlx5tyaZ1HzyRoLDaqOw/edit?usp=sharing">
                  Slides
                </Card.Link>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="https://docs.google.com/document/d/1BvEGkB0tGuW9C-pyQFqqC_f-rgnLe8NEEccIaj5-NnU/edit?usp=sharing">
                  Panelist Info
                </Card.Link>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </CardDeck>
      </div>
    );
  }
}
