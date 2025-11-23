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
            <div className="program-cards-container">
              <div className="program-card">
                <h3 className="card-title">Week 1: Foundation</h3>
                <p className="card-description">Building core skills and understanding key concepts.</p>
                <div className="card-image">
                  <img src="/placeholder.png" alt="Week 1: Foundation" />
                </div>
              </div>
              <div className="program-card">
                <h3 className="card-title">Week 2: Development</h3>
                <p className="card-description">Hands-on learning and practical application.</p>
                <div className="card-image">
                  <img src="/placeholder.png" alt="Week 2: Development" />
                </div>
              </div>
              <div className="program-card">
                <h3 className="card-title">Week 3: Integration</h3>
                <p className="card-description">Advanced concepts and team collaboration.</p>
                <div className="card-image">
                  <img src="/placeholder.png" alt="Week 3: Integration" />
                </div>
              </div>
              <div className="program-card">
                <h3 className="card-title">Week 4:<br />Capstone</h3>
                <p className="card-description">Project development and final presentation.</p>
                <div className="card-image">
                  <img src="/placeholder.png" alt="Week 4: Capstone" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ignite-section workshop-section theme-light">
          <div className="content-wrapper">
            <h2 className="section-header">2025 Workshops</h2>
            <div className="workshop-cards-container">
              <div className="workshop-card">
                <h3 className="card-title">Introduction to Python</h3>
                <p className="card-description">Dive into one of the most versatile and widely used programming languages. This track will teach you essential Python concepts and guide you through practical projects, perfect for beginners.</p>
                <div className="card-image">
                  <img src="/placeholder.png" alt="Introduction to Python" />
                </div>
              </div>
              <div className="workshop-card">
                <h3 className="card-title">Game Development with Roblox</h3>
                <p className="card-description">Design and develop an exciting speed run parkour game using Roblox Studio. From building dynamic levels to scripting game mechanics with Lua, you'll gain hands-on experience in game creation.</p>
                <div className="card-image">
                  <img src="/placeholder.png" alt="Game Development with Roblox" />
                </div>
              </div>
              <div className="workshop-card">
                <h3 className="card-title">Web Development</h3>
                <p className="card-description">Learn how websites are built using HTML and CSS. Build your skills throughout the sessions and create your very own custom website as a capstone project.</p>
                <div className="card-image">
                  <img src="/placeholder.png" alt="Web Development" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ignite-section workshop-section theme-light">
          <div className="content-wrapper">
            <h2 className="section-header">2024 Workshops</h2>
            <div className="workshop-cards-container">
              <div className="workshop-card">
                <h3 className="card-title">Introduction to Python</h3>
                <p className="card-description">Dive into one of the most versatile and widely used programming languages. This track will teach you essential Python concepts and guide you through practical projects, perfect for beginners.</p>
                <div className="card-image">
                  <img src="/placeholder.png" alt="Introduction to Python" />
                </div>
              </div>
              <div className="workshop-card">
                <h3 className="card-title">Game Development with Unity</h3>
                <p className="card-description">Design and develop an exciting speed run parkour game using Roblox Studio. From building dynamic levels to scripting game mechanics with Lua, you'll gain hands-on experience in game creation.</p>
                <div className="card-image">
                  <img src="/placeholder.png" alt="Game Development with Unity" />
                </div>
              </div>
              <div className="workshop-card">
                <h3 className="card-title">Machine Learning</h3>
                <p className="card-description">Learn how websites are built using HTML and CSS. Build your skills throughout the sessions and create your very own custom website as a capstone project.</p>
                <div className="card-image">
                  <img src="/placeholder.png" alt="Machine Learning" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ignite-section capstone-section theme-light">
          <div className="content-wrapper">
            <h2 className="section-header">Capstone Project</h2>
            <p className="section-subtitle">
              The program culminates in a capstone project...
            </p>
            <div className="capstone-image-container">
              <img src="/placeholder.png" alt="Capstone Project Presentation" />
            </div>
          </div>
        </section>

        <section className="ignite-section footer-apply-section">
          <div className="content-wrapper split-layout">
            <div className="left-text-col">
              <h1 className="section-header align-left">Apply Now!</h1>
              <p className="section-subtitle-small">
                Applications for the next IGNITE are open...
              </p>
              <Button variant="primary" className="btn-apply-large">
                Apply
              </Button>
            </div>

            <div className="right-image-col">
              <div className="apply-image">
                <img src="/placeholder.png" alt="Students Workshop" />
              </div>
            </div>
          </div>
        </section>

        <section className="ignite-section gallery-section">
          <div className="content-wrapper">
            <h2 className="section-header">Gallery</h2>
            <p className="section-subtitle">Captures from previous workshops</p>
            <div className="gallery-grid">
              <div className="gallery-item">
                <img src="/placeholder.png" alt="Workshop capture 1" />
              </div>
              <div className="gallery-item">
                <img src="/placeholder.png" alt="Workshop capture 2" />
              </div>
              <div className="gallery-item">
                <img src="/placeholder.png" alt="Workshop capture 3" />
              </div>
              <div className="gallery-item">
                <img src="/placeholder.png" alt="Workshop capture 4" />
              </div>
              <div className="gallery-item">
                <img src="/placeholder.png" alt="Workshop capture 5" />
              </div>
              <div className="gallery-item">
                <img src="/placeholder.png" alt="Workshop capture 6" />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
