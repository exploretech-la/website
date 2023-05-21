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
          <h1 className="h1-title">Recruiting Now!</h1>
          <h5 className="h1-title">Design and External Team</h5>
          <p className="h1-title">
            {" "}
            <b>Any questions? Contact our executive director:</b>{" "}
          </p>
          <p>
            Melody Chen:{" "}
            <a
              href="mailto:melody8686@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              melody8686@gmail.com
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
