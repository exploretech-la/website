import React, { Component } from "react";
import ReactGA from "react-ga";

import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

import { MdKeyboardArrowRight } from "react-icons/md";

import HomePageSections from "constants/HomePageSections";

import SpeakerConnie from "static/images/speaker-connie.jpg";
import TaboolaBooth from "static/images/taboola-booth.jpg";
import TEALS_VR from "static/images/teals-vr.jpg";

const HighSchoolInterestForm = "";
const MailingListSignUp =
  "https://mailchi.mp/e1197feb6276/ucla-student-mailing-list";
// const VolunteerApplicationLink = 'https://tinyurl.com/exploretechla2021volunteer';

export default class GetInvolved extends Component {
  render() {
    return (
      <section
        className="Section GetInvolved"
        id={`${HomePageSections.GET_INVOLVED.name}`}
      >
        <div className="cards-container">
          <div className="cards-header">
            <h3>Get Involved</h3>
            <div className="pill-divider" />
          </div>
          {/* <div className="team-application">
						<p><b>UCLA Students:</b> Our exploretech.la 2021 volunteer application deadline has been <b>EXTENDED</b>! Apply by Friday, March 12th at 11:59 PM PST!</p>
						<div className="team-application-cta">
							<ReactGA.OutboundLink to={VolunteerApplicationLink} target="_blank" eventLabel="Volunteer Application">
								<p><b>Apply now!</b></p>
								<MdKeyboardArrowRight className="MdKeyboardArrowRight" />
							</ReactGA.OutboundLink>
						</div>
					</div> */}
          <CardDeck>
            <Card className="high-schools">
              <Card.Img variant="top" src={TEALS_VR} />
              <ReactGA.OutboundLink
                to={HighSchoolInterestForm}
                target="_blank"
                eventLabel="high_school_interest_form"
              >
                <Card.ImgOverlay>
                  <div className="card-content">
                    <Card.Title>For High Schools</Card.Title>
                    <Card.Text>Inspire your students</Card.Text>
                    <div className="get-involved-cta">
                      <MdKeyboardArrowRight className="MdKeyboardArrowRight" />
                      <Card.Text className="cta-text">
                        Interest Form Out Soon
                      </Card.Text>
                    </div>
                  </div>
                  <div className="gradient-back" />
                </Card.ImgOverlay>
              </ReactGA.OutboundLink>
            </Card>
            <Card className="companies">
              <Card.Img variant="top" src={TaboolaBooth} />
              <ReactGA.OutboundLink
                to="mailto:exploretechla@cs.ucla.edu"
                target="_blank"
                eventLabel="email_us_companies"
              >
                <Card.ImgOverlay>
                  <div className="card-content">
                    <Card.Title>For Companies</Card.Title>
                    <Card.Text className="full-content">
                      Become an industry partner
                    </Card.Text>
                    <Card.Text className="short-content">
                      Partner with us
                    </Card.Text>
                    <div className="get-involved-cta">
                      <MdKeyboardArrowRight className="MdKeyboardArrowRight" />
                      <Card.Text className="cta-text">Email us</Card.Text>
                    </div>
                  </div>
                  <div className="gradient-back" />
                </Card.ImgOverlay>
              </ReactGA.OutboundLink>
            </Card>
            <Card className="ucla-students">
              <Card.Img variant="top" src={SpeakerConnie} />
              <ReactGA.OutboundLink
                to={MailingListSignUp}
                target="_blank"
                eventLabel="ucla_student_mailing_list"
              >
                <Card.ImgOverlay>
                  <div className="card-content">
                    <Card.Title>For UCLA Students</Card.Title>
                    <Card.Text>Join our team</Card.Text>
                    <div className="get-involved-cta">
                      <MdKeyboardArrowRight className="MdKeyboardArrowRight" />
                      <Card.Text className="cta-text short-content">
                        Get our newsletter
                      </Card.Text>
                      <Card.Text className="cta-text full-content">
                        Sign up for our newsletter
                      </Card.Text>
                    </div>
                  </div>
                  <div className="gradient-back" />
                </Card.ImgOverlay>
              </ReactGA.OutboundLink>
            </Card>
          </CardDeck>
        </div>
      </section>
    );
  }
}
