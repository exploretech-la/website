import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button from "react-bootstrap/Button";
import Footer from "components/Footer";

export default class Ignite extends Component {
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
    const classNames = classnames("Ignite", this.props.className);

    return (
      <div className={classNames}>
        <section className="ignite-section header-section">
          <div className="content-wrapper">
            <h1 className="ignite-title">Ignite</h1>
            <div className="ignite-description">
              <p>
                Ignite is a 4-week series of beginner-friendly workshops
                offering an in-depth exploration of current trending topics in
                technology. It is designed to inspire and encourage high school
                students to pursue a career in the STEM/Tech field.
              </p>
            </div>
            <div className="header-buttons">
              <Button variant="primary" className="btn-apply">
                Apply Now!
              </Button>
              <Button variant="outline-light" className="btn-previous">
                Previous Workshop
              </Button>
            </div>
          </div>
        </section>

        <section className="ignite-section structure-section">
          <div className="content-wrapper">
            <h2 className="section-header">Program Structure</h2>
            <div className="large-wireframe-display">
              <div className="display-placeholder">
                Week 1, Week 2, Week 3, Week 4
              </div>
            </div>
          </div>
        </section>

        <section className="ignite-section workshop-section theme-light">
          <div className="content-wrapper">
            <h2 className="section-header">2025 Workshops</h2>
            <div className="large-wireframe-display">
              <div className="display-placeholder">2025 Workshops</div>
            </div>
          </div>
        </section>

        <section className="ignite-section workshop-section theme-light">
          <div className="content-wrapper">
            <h2 className="section-header">2024 Workshops</h2>
            <div className="large-wireframe-display">
              <div className="display-placeholder">2024 Workshops</div>
            </div>
          </div>
        </section>

        <section className="ignite-section capstone-section theme-light">
          <div className="content-wrapper">
            <h2 className="section-header">Capstone Project</h2>
            <p className="section-subtitle">
              The program culminates in a capstone project...
            </p>
            <div className="large-wireframe-display">
              <div className="display-placeholder">
                Capstone Project Projection Area
              </div>
            </div>
          </div>
        </section>

        <section className="ignite-section footer-apply-section">
          <div className="content-wrapper split-layout">
            <div className="left-text-col">
              <h1 className="section-header align-left">Apply Now!</h1>
              <p className="section-subtitle-small">
                Applications for the next IGNITE are open ....
              </p>
              <Button variant="primary" className="btn-apply-large">
                Apply
              </Button>
            </div>

            <div className="right-image-col">
              <div className="image-placeholder-large">
                Students Workshop Photo
              </div>
            </div>
          </div>
        </section>

        <section className="ignite-section gallery-section">
          <div className="content-wrapper">
            <h2 className="section-header">Gallery</h2>
            <p className="section-subtitle">Captures from previous workshops</p>
            <div className="large-wireframe-display">
              <div className="display-placeholder">
                Gallery Images
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
