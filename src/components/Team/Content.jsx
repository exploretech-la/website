import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import People from "components/common/People";

import { Content } from "constants/content";

export default class ContentComponent extends Component {
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
    const classNames = classnames("Section", "Content", this.props.className);
    return (
      <section className={classNames}>
        <div className="content-container">
          <div className="content-header">
            <h3>Content</h3>
            <div className="pill-divider" />
          </div>
          <People people={Content} />
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
        const classNames = classnames('Section', 'Content', this.props.className);
        return (
            <section className={classNames} id="content">
                <div className="content-container">
                    <div className="content-header">
                        <h3>Content</h3>
                        <div className="pill-divider" />
                    </div>
                    <People people={Content}/>
                </div>
            </section>
        );
    }
>>>>>>> e6e24e4ca356f4e0333411abf7f99aefc3c5ff1b
}
