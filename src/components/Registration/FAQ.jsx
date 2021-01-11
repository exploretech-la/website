import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

export default class FAQ extends Component {

    static get propTypes() {
        return {
            className: PropTypes.string,
        }
    }

    static get defaultProps() {
        return {
            className: '',
        };
    }

    render() {
        const classNames = classnames('Section', 'FAQ', this.props.className);

        return (
            <section className={classNames}>
              <div className="faq-content">
                <div className="faq-content faq-centered-title">
                  <h2 className="title">FAQs</h2>
                  <div className="pill-divider" />
                  <p>
                    If your question is not answered below, please reach out to us at exploretechla@cs.ucla.edu for more information!
                  </p>
                </div>
                {this._getStudentFAQ()}
                {this._getTeacherFAQ()}
                {this._getParentFAQ()}
              </div>
            </section>
        );
    }

    _getStudentFAQ() {
      return (
        <div className="faq-student">
          <div className="faq-section-title">
            <h4 className="title">Student FAQs</h4>
            <div className="pill-divider" />
          </div>
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
              <b>Is there a registration fee? Are there any associated costs with the program (ie: need to pay for an account on the virtual platform?) </b>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>This event is completely free for all attendees! All you will need is a computer and stable internet to access the event.</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                <b>What prior background is needed? </b>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>No experience needed! This event is meant to help you explore the different fields of CS and tech!</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="2">
                <b>What if I can only make part of the event (only one day, missing a few hours, etc)?  </b>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>Let us know in the registration form! </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="3">
                <b>How would virtual format work? (boxes, platform, etc)  </b>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  The event will be hosted completely online. exploretech.boxes will be sent to each attendee (while supplies last) 
                  as well as instructions on how to access the virtual platform prior to the event. Attendees will receive more information 
                  once registration is closed. 
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="4">
                <b>What is an exploretech.box?</b>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="4">
                <Card.Body>
                An exploretech.box is a box that will hold all of the supplemental workshop materials and swag for the event. We will ship these 
                to our attendees prior to the event. Supplies will be limited, but not having a box will not prevent you from attending our event. 
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="5">
                <b>What happens if I don’t get my box in time?</b>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="5">
                <Card.Body>
                  We plan to ship the boxes well ahead of time so you should have them by event day. 
                  In the case your box does not arrive on time, you will still be able to participate in the event.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="6">
                <b>What is the College Buddy Chat?</b>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="6">
                <Card.Body>
                  Each day you will have the opportunity to talk with one to two UCLA undergraduates about their life at UCLA and in STEM. 
                  Feel free to ask them any questions you may have about going from high school to college and pursuing a STEM degree!
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="7">
                <b>If I'm not an LA County resident, can I still participate?</b>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="7">
                <Card.Body>
                  If you do not reside in LA County and would like to attend the event, you can fill out the registration 
                  form and we will place you on a waitlist. Depending on availability, we may open up the event to non-LA 
                  County residents. However, you would not be eligible to receive an exploretech.box, as we can only ship within LA County.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="8">
                <b>When is the deadline to register for the event?</b>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="8">
                <Card.Body>
                  Please see the Registration Deadlines section for more information about deadlines.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="9">
                <b>Who can participate/register for the event? </b>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="9">
                <Card.Body>
                  Please see the Eligibility section for more information about who can participate in this event.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="10">
                <b>I am homeschooled, can I still attend the event? </b>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="10">
                <Card.Body>
                  Yes you can! Just denote on the registration form that you are homeschooled where it asks for your school name.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      );
    }

    _getTeacherFAQ() {
      return(
        <div className="faq-teacher">
          <div className="faq-section-title">
            <h4 className="title">Teacher/Educator FAQs</h4>
            <div className="pill-divider" />
          </div>
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
              <b>This sounds great! How do I sign up my students? </b>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  Have each of your students fill out the registration form separately so that they can attend the event!
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
              <b>Can I attend with my student(s)? </b>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  Yes you can! Just fill out the registration form for Educators/Teachers.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="2">
              <b>Can I attend this event even without any of my students?</b>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  Of course! We want to offer this event to teachers so you can bring back some of the activities to teach to your own students.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="3">
              <b>Will I receive supplies for the event?</b>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  Unfortunately we can only provide supplies for the students who attend our event.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      );
    }

    _getParentFAQ() {
      return(
        <div className="faq-parent">
          <div className="faq-section-title">
            <h4 className="title">Parent FAQs</h4>
            <div className="pill-divider" />
          </div>
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
              <b>Can I attend with my child/children?</b>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  Parents will not be able to attend this event with their children. This is meant to be an experience for the student only. 
                  Teachers are allowed at this event so they can get ideas for activities for their students.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
              <b>How will my child receive the supplies for the event?</b>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  We will be mailing boxes containing any necessary supplies to each attendee in the days leading up to our event. We have a limited 
                  number of boxes, so please have your child register as soon as possible.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="2">
              <b>My child is homeschooled. Can they still attend the event?</b>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  Of course! Just please make sure you follow all instructions pertaining to homeschooled students in the registration form.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      );
    }
}
