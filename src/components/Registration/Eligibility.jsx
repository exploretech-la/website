import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class Eligibility extends Component {
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
    const classNames = classnames(
      "Section",
      "Eligibility",
      this.props.className
    );

    return (
      <section className={classNames}>
        <div className="eligibility-content">
          <div className="eligibility-content eligibility-centered-title">
            <h2 className="title">Eligibility</h2>
            <div className="pill-divider" />
          </div>
          <div className="eligibility-content eligibility-column-container">
            <div className="left-column text">
              <div className="section-title">
                <h3 className="title">Student Eligibility</h3>
              </div>
              <div className="eligiblity-description">
                <ul>
                  <li>Must be a current high school student (grades 9-12)</li>
                  <ul>
                    <li>
                      Public or private high school students are eligible, as
                      well as homeschooled students
                    </li>
                  </ul>
                  <li>Must be a Los Angeles County resident</li>
                  <li>
                    Must have a computer and reliable internet connection for
                    the duration of the event
                  </li>
                  <li>
                    Must fill out all required waivers (Liability, Multimedia
                    Release, and Student Verification)
                  </li>
                </ul>
              </div>
            </div>
            <div className="right-column text">
              <div className="section-title">
                <h3 className="title">Teacher/Educator Eligibility</h3>
              </div>
              <div className="eligiblity-description">
                <ul>
                  <li>
                    Must be a current high school teacher in Los Angeles County
                  </li>
                  <li>
                    Must have a computer and reliable internet connection for
                    the duration of the event
                  </li>
                  <li>
                    Must fill out all required waivers (Liability and Multimedia
                    Release)
                  </li>
                  <li>Must submit photo of teacher badge/ID as verification</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
