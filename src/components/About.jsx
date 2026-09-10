import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";

import Carousel from "react-bootstrap/Carousel";
import { MdKeyboardArrowRight } from "react-icons/md";

import GA from "util/GoogleAnalytics";
import HomePageSections from "constants/HomePageSections";
import CaourselImages from "constants/carousel";
import images from "constants/optimizedImages";

const FoundingStoryLink =
  "https://medium.com/techatucla/exploretechla-founding-story-3bb8a947f931";

// Match the two-column layout without sending desktop images to narrow screens.
const AboutImageSizes =
  "(min-width: 1100px) 480px, (min-width: 768px) 46vw, 100vw";

export default class About extends Component {
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

  constructor(props) {
    super(props);

    this.state = { activeIndex: 0, primed: false, requestedIndex: null };
    this.loadedSlides = new Set();

    this._onSelect = this._onSelect.bind(this);
    this._onSlideLoad = this._onSlideLoad.bind(this);
  }

  render() {
    const classNames = classnames("Section", "About", this.props.className);

    return (
      <section className={classNames} id={HomePageSections.ABOUT.name}>
        <div className="about-content about-org">
          <div className="left-column text">
            <div className="section-title">
              <h3 className="title">What is exploretech.la?</h3>
              <div className="pill-divider" />
            </div>
            <div className="about-description">
              <p>
                exploretech.la is a UCLA Samueli School of Engineering student
                organization that hosts an annual event that aims to inspire
                high school students from underserved communities in the Greater
                Los Angeles Area to explore computer science, engineering, and
                technology.
              </p>
              <p>
                In partnership with industry and academic organizations, our
                event introduces students to the various applications of tech
                through our panels, interactive workshops, and exhibition hall.
              </p>
              <p>
                Every year, exploretech.la welcomes around 500 students to our
                in-person event. The event will take place in early April, and
                we would love for you to{" "}
                <a className="in-text-link" href="#get-involved">
                  attend
                </a>
                !
              </p>
            </div>
          </div>
          {this._renderCarousel({ className: "right-column" })}
        </div>
        <div className="about-content about-team">
          <img
            {...images["images/explore-tech-2022.jpg"]}
            sizes={AboutImageSizes}
            loading="lazy"
            decoding="async"
            className="team-photo left-column"
            alt="Our Team"
          />
          <div className="right-column text">
            <div className="section-title">
              <h3 className="title">Who is exploretech.la?</h3>
              <div className="pill-divider" />
            </div>
            <p>
              Founded in 2017 as student organization at UCLA, exploretech.la is
              run by students for students. We apply our insights as recent high
              school graduates to create engaging and impactful learning
              experiences for our younger peers. We believe that every student
              should have equal access to STEM education and opportunities.
            </p>
            <div className="current-team">
              <Link
                to="/our_team"
                onClick={() =>
                  GA.trackEvent({
                    category: "Outbound",
                    action: "Click",
                    label: "current_team",
                  })
                }
              >
                <p>Check out our current full team</p>
                <MdKeyboardArrowRight className="MdKeyboardArrowRight" />
              </Link>
            </div>
            <div className="founding-story">
              <ReactGA.OutboundLink
                to={FoundingStoryLink}
                target="_blank"
                eventLabel="founding_story"
              >
                <p>Read about our founding story</p>
                <MdKeyboardArrowRight className="MdKeyboardArrowRight" />
              </ReactGA.OutboundLink>
            </div>
          </div>
        </div>
      </section>
    );
  }

  _onSelect(index) {
    this.setState(
      this.loadedSlides.has(index)
        ? { activeIndex: index, requestedIndex: null }
        : { requestedIndex: index }
    );
  }

  _onSlideLoad(index) {
    this.loadedSlides.add(index);
    this.setState((state) => ({
      primed: true,
      ...(state.requestedIndex === index
        ? { activeIndex: index, requestedIndex: null }
        : {}),
    }));
  }

  // Keep the current slide visible until a requested slide has loaded.
  _renderCarousel({ className }) {
    const carouselItems = CaourselImages.map((img, index) =>
      this._renderCarouselItem(img, index)
    );
    return (
      <Carousel
        className={className}
        activeIndex={this.state.activeIndex}
        onSelect={this._onSelect}
        interval={
          this.state.primed && this.state.requestedIndex === null ? 5000 : null
        }
      >
        {carouselItems}
      </Carousel>
    );
  }

  _renderCarouselItem(img, index) {
    if (!img || !img.src || !img.alt) {
      return null;
    }

    const { activeIndex, primed, requestedIndex } = this.state;
    const total = CaourselImages.length;
    const isNeighbour =
      index === activeIndex ||
      index === (activeIndex + 1) % total ||
      index === (activeIndex + total - 1) % total;

    return (
      <Carousel.Item key={img.alt}>
        <img
          {...img}
          alt={img.alt}
          sizes={AboutImageSizes}
          loading={
            index === requestedIndex || (primed && isNeighbour)
              ? "eager"
              : "lazy"
          }
          decoding="async"
          onLoad={() => this._onSlideLoad(index)}
        />
      </Carousel.Item>
    );
  }
}
