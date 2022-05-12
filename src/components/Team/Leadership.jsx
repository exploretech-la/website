import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import People from "components/common/People";

import HomePageSections from "constants/HomePageSections";
import { Leadership } from "constants/leadership";

export default class LeadershipComponent extends Component {
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
      "Leadership",
      this.props.className
    );
    return (
      <section className={classNames} id={HomePageSections.LEADERSHIP.name}>
        <div className="leadership-container">
          <div className="leadership-header">
            <h3>Leadership</h3>
            <div className="pill-divider" />
          </div>
          <People people={Leadership} />
        </div>
      </section>
    );
  }
}
