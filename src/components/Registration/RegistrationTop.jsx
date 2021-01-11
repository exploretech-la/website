import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from 'react-bootstrap/Button';

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
                                <ul>
                                    <li><b>Event Dates:</b> April 10-11, 2021</li>
                                    <li><b>Time:</b> 10:00AM - 1:30PM</li>
                                    <li><b>Location:</b> Held virtually</li>
                                </ul>
                            </div>
                        </div>
                        <div className="right-column text">
                        <div className="section-title">
                                <h3 className="title">Registration Deadlines</h3>
                                <div className="pill-divider" />
                            </div>
                            <div className="registration-types">
                                <div className="section-title">
                                    <h4 className="title">Early Registration - <b>Open Now!</b></h4>
                                </div>
                                <p><b>Deadline:</b> January 24, 2021 at 11:59PM PST</p>
                                <p><em>*As long as space permits and all eligibility requirements are met, you will be accepted and guaranteed a box.</em></p>
                                <div className="section-title">
                                    <h4 className="title">General Registration</h4>
                                </div>
                                <p><b>Deadline:</b> February 28, 2021 at 11:59PM PST</p>
                            </div>
                        </div>
                    </div>
                    {this._getCovid19Update()}
                </div>
            </section>
        );
    }

    _getCovid19Update() {
        return (
            <div className="registration-content covid19-update">
                <div className="text">
                    <div className="section-title">
                        <h3 className="title">COVID-19 Update</h3>
                        <div className="pill-divider" />
                    </div>
                    <p>
                        With the ongoing pandemic, our team has decided to move exploretech.la 2021 to a virtual format for the safety of our attendees, partners, and staff members.
                        exploretech.la 2021 will be a virtual event with interactive, live-streamed activities that will take place over the course of two days.
                    </p>
                </div>
            </div>
        );
    }
}
