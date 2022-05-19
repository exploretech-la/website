import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import People from "components/common/People";

import { Design } from "constants/design";

export default class DesignComponent extends Component {
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

<<<<<<< HEAD
  render() {
    const classNames = classnames("Section", "Design", this.props.className);
    return (
      <section className={classNames}>
        <div className="design-container">
          <div className="design-header">
            <h3>Design</h3>
            <div className="pill-divider" />
          </div>
          <People people={Design} />
        </div>
      </section>
    );
  }
=======
    static get defaultProps() {
        return {
            className: '',
        };
    }

    render() {
        const classNames = classnames('Section', 'Design', this.props.className);
        return (
            <section className={classNames} id="design">
                <div className="design-container">
                    <div className="design-header">
                        <h3>Design</h3>
                        <div className="pill-divider" />
                    </div>
                    <People people={Design}/>
                </div>
            </section>
        );
    }
>>>>>>> e6e24e4ca356f4e0333411abf7f99aefc3c5ff1b
}
