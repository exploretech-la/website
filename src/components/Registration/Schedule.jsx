import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// import { SCHEDULE } from 'constants/schedule';

export default class Schedule extends Component {
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
    const classNames = classnames("Section", "Schedule", this.props.className);

    return (
      <section className={classNames}>
        <div className="schedule-content">
          <div className="schedule-content schedule-title">
            <h2 className="title">Schedule</h2>
            <div className="pill-divider" />
          </div>
          <div className="schedule-content schedule-column-container">
            <div className="left-column text">
              <div className="section-title">
                <h3 className="title">Day 1 (Saturday, April 10th)</h3>
                <div className="pill-divider" />
              </div>
              <div className="schedule-text">
                <p>
                  <h4>
                    <b>9:30 AM:</b> Virtual Platform Opens
                  </h4>
                  <h4>
                    <b>10:00 AM:</b> Opening Ceremony
                  </h4>
                  <h4>
                    <b>10:30 AM:</b> Session 1
                  </h4>
                  <h4>
                    <b>11:40 AM:</b> College Buddy Chat
                  </h4>
                  <h4>
                    <b>12:20 PM:</b> Session 2
                  </h4>
                  <h4>
                    <b>1:20 PM:</b> Closing Briefing
                  </h4>
                </p>
              </div>
            </div>
            <div className="right-column text">
              <div className="section-title">
                <h3 className="title">Day 2 (Sunday, April 11th)</h3>
                <div className="pill-divider" />
              </div>
              <div className="schedule-text">
                <p>
                  <h4>
                    <b>9:30 AM:</b> Virtual Platform Opens
                  </h4>
                  <h4>
                    <b>10:00 AM:</b> Opening Briefing
                  </h4>
                  <h4>
                    <b>10:10 AM:</b> Session 3
                  </h4>
                  <h4>
                    <b>11:20 AM:</b> College Buddy Chat
                  </h4>
                  <h4>
                    <b>12:00 PM:</b> Session 4
                  </h4>
                  <h4>
                    <b>1:00 PM:</b> Closing Ceremony
                  </h4>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
