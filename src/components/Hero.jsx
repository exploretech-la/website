import React, { Component } from "react";

import Button from "react-bootstrap/Button";

import GA from "util/GoogleAnalytics";
import HomePageSections from "constants/HomePageSections";
import LogoWithIconGroup from "static/svg/logo-navy-with-icon-group-white.svg";

export default class Hero extends Component {
  render() {
    return (
      <section className="Section Hero">
        <img
          src={LogoWithIconGroup}
          className="logo-with-icon-group"
          alt="logo-with-icon-group"
        />
        <div className="hero-content">
          <h1 className="h1-title">Welcome to exploretech.la!</h1>
          <p className="h1-title">
            {" "}
            <b>Any questions? Contact our executive directors:</b>{" "}
          </p>
          <p>
            Alex Walsh:{" "}
            <a
              href="mailto:alexandrew@ucla.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              alexandrew@ucla.edu
            </a>{" "}
          </p>
          <p>
            Haley Zhang:{" "}
            <a
              href="mailto:xiaohe@g.ucla.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              xiaohe@g.ucla.edu
            </a>{" "}
          </p>

          <div className="hero-cta">
            {/* <Button variant="info" href={`/exploretechla2021`} onClick={this._trackRegisterTodayClick}>
                            Event Info
                        </Button> */}
            <Button
              variant="info"
              href={`#${HomePageSections.ABOUT.name}`}
              onClick={this._trackLearnMoreClick}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    );
  }

  _trackGetInvolvedClick() {
    GA.trackEvent({
      category: "Hero",
      action: "Click",
      label: "Get Involved",
    });
  }

  _trackRegisterTodayClick() {
    GA.trackEvent({
      category: "Hero",
      action: "Click",
      label: "Register Today",
    });
  }

  _trackLearnMoreClick() {
    GA.trackEvent({
      category: "Hero",
      action: "Click",
      label: "Learn More",
    });
  }
}
