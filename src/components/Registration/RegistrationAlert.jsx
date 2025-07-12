import React, { Component } from "react";
// import ReactGA from 'react-ga';
import PropTypes from "prop-types";
import classnames from "classnames";

import Button from "react-bootstrap/Button";
import GA from "util/GoogleAnalytics";

export default class RegistrationAlert extends Component {
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
    const classNames = classnames("RegistrationAlert", this.props.className);

    return (
      <div className={classNames}>
        <h3>
          <b>Missed our event? Want to rewatch workshops and panels?</b>
        </h3>
        <div className="notes">
          <h5>
            Checkout our past workshops and resources from previous exploretech.la main events on our Resources Page.
          </h5>
        </div>
        <div className="buttons">
          <div className="button">
            <Button
              variant="outline-light"
              href={`/resources`}
              size="lg"
              onClick={this._trackResourcesClick}
            >
              exploretech.la Recordings and Resources
            </Button>
          </div>
        </div>
      </div>
    );
  }

  _trackResourcesClick() {
    GA.trackEvent({
      category: "RegistrationAlert",
      action: "Click",
      label: "Resources",
    });
  }
}
