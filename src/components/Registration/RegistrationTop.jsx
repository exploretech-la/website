import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Badge from 'react-bootstrap/Badge';

export default class RegistrationTop extends Component {

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
        const classNames = classnames('Section', 'RegistrationTop', this.props.className);

        return (
            <section className={classNames}>
                <div className="registration-content">
                    <div className="registration-content registration-event-info">
                        <div className="left-column text">
                            <div className="section-title">
                                <h3 className="title">About the Event</h3>
                                <div className="pill-divider" />
                            </div>
                            <div className="registration-description">
                                <p>exploretech.la is an annual event hosted by UCLA students that aims to inspire high school students from underserved communities in the Greater Los Angeles Area to explore computer science, engineering, and technology.</p>
                                <p>With the ongoing pandemic, our team has decided to move exploretech.la 2021 to a virtual format for the safety of our attendees, partners, and staff members.</p>
                                <ul className="no-style">
                                    <li><b>Event Dates:</b> April 10-11, 2021</li>
                                    <li><b>Time:</b> 10:00AM - 1:30PM PST</li>
                                    <li><b>Location:</b> Held virtually</li>
                                </ul>
                                <p>Our event will include:
                                    <ul className="no-margin">
                                        <li>Interactive workshops</li>
                                        <li>Panels with industry guests and college students</li>
                                        <li>Opportunity to chat with current UCLA undergraduates</li>
                                        <li>An exploretech.box for all students (while supplies last)</li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                        <div className="right-column text">
                            <div className="section-title">
                                <h3 className="title">Registration Deadlines</h3>
                                <div className="pill-divider" />
                            </div>
                            <div className="registration-types">
                                <div className="section-title">
                                    <h4 className="title">Early Registration - <Badge variant="secondary">Closed</Badge></h4>
                                </div>
                                <p><b>Deadline:</b> January 24, 2021 at 11:59PM PST</p>                                
                                <p><em>*As long as space permits and all eligibility requirements are met, you will be accepted and guaranteed a box.</em></p>
                                <div className="section-title">
                                    <h4 className="title">General Registration - <Badge variant="secondary">Closed</Badge></h4>
                                </div>
                                <p><b>Deadline:</b> February 28, 2021 at 11:59PM PST</p>
                                <p><b>NOTE:</b> Keep an eye out for a confirmation email from us by early March if you are a general registration applicant!</p>
                                <div className="section-title">
                                    <h4 className="title">Late Registration - <Badge variant="info">Ongoing</Badge></h4>
                                </div>
                                <p><em>*Late registration is first come first served. Boxes will not be guaranteed.</em></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
