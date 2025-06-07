import React from "react";
import ReactGA from "react-ga";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import { MdKeyboardArrowRight } from "react-icons/md";

import SpeakerConnie from "static/images/speaker-connie.jpg";
import TaboolaBooth from "static/images/taboola-booth.jpg";
import TEALS_VR from "static/images/teals-vr.jpg";

import "./GetInvolved.scss";

const HighSchoolInterestForm = "";
const MailingListSignUp = "https://mailchi.mp/e1197feb6276/ucla-student-mailing-list";

const GetInvolved = () => {
  return (
    <div className="get-involved">
      <div className="container">
        <h1 className="title">Get Involved</h1>
        <div className="content">
          <div className="cards-container">
            <div className="cards-header">
              <h3>Get Involved</h3>
              <div className="pill-divider" />
            </div>
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
        </div>
      </div>
    </div>
  );
};

export default GetInvolved; 