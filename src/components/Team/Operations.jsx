import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import People from "components/common/People";

import { Operations } from "constants/operations";

export default class OperationsComponent extends Component {
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
      "Operations",
      this.props.className
    );
    return (
      <section className={classNames}>
        <div className="operations-container">
          <div className="operations-header">
            <h3>Operations</h3>
            <div className="pill-divider" />
          </div>
          <People people={Operations} />
        </div>
      </section>
    );
  }
}
